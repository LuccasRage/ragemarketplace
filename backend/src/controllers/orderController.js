import prisma from '../config/database.js';
import { holdInEscrow, releaseEscrow } from '../services/escrowService.js';
import { calculatePlatformFee, calculateSellerEarnings } from '../services/feeService.js';

export const buyItem = async (req, res) => {
  try {
    const { listingId } = req.params;
    const buyerId = req.user.id;

    // Get listing
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { seller: true },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (listing.status !== 'ACTIVE') {
      return res.status(400).json({ error: 'Listing is no longer available' });
    }

    if (listing.sellerId === buyerId) {
      return res.status(400).json({ error: 'Cannot buy your own listing' });
    }

    const price = parseFloat(listing.price);
    const platformFee = calculatePlatformFee(price);
    const sellerEarnings = calculateSellerEarnings(price);

    // Check buyer balance
    const buyer = await prisma.user.findUnique({ where: { id: buyerId } });
    if (parseFloat(buyer.balance) < price) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Start transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          listingId,
          buyerId,
          sellerId: listing.sellerId,
          price,
          platformFee,
          sellerEarnings,
          status: 'PENDING_DELIVERY',
          escrowAmount: price,
        },
      });

      // Hold money in escrow
      await holdInEscrow(buyerId, price, newOrder.id);

      // Mark listing as sold
      await tx.listing.update({
        where: { id: listingId },
        data: { status: 'SOLD' },
      });

      return newOrder;
    });

    const fullOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        listing: true,
        buyer: {
          select: {
            id: true,
            username: true,
            robloxUsername: true,
            avatarUrl: true,
          },
        },
        seller: {
          select: {
            id: true,
            username: true,
            robloxUsername: true,
            avatarUrl: true,
          },
        },
      },
    });

    res.status(201).json({
      message: 'Purchase successful - funds held in escrow',
      order: fullOrder,
    });
  } catch (error) {
    console.error('Buy item error:', error);
    res.status(500).json({ error: error.message || 'Purchase failed' });
  }
};

export const markDelivered = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user.id;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.sellerId !== sellerId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (order.status !== 'PENDING_DELIVERY') {
      return res.status(400).json({ error: 'Order cannot be marked as delivered' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: 'DELIVERED',
        sellerDeliveredAt: new Date(),
      },
      include: {
        listing: true,
        buyer: {
          select: {
            id: true,
            username: true,
            robloxUsername: true,
            avatarUrl: true,
          },
        },
        seller: {
          select: {
            id: true,
            username: true,
            robloxUsername: true,
            avatarUrl: true,
          },
        },
      },
    });

    res.json({
      message: 'Order marked as delivered',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Mark delivered error:', error);
    res.status(500).json({ error: 'Failed to mark as delivered' });
  }
};

export const confirmReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const buyerId = req.user.id;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.buyerId !== buyerId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (order.status !== 'DELIVERED') {
      return res.status(400).json({ error: 'Order must be delivered before confirmation' });
    }

    // Release escrow and complete order
    await prisma.$transaction(async (tx) => {
      await releaseEscrow(
        order.buyerId,
        order.sellerId,
        parseFloat(order.escrowAmount),
        order.id
      );

      await tx.order.update({
        where: { id },
        data: {
          status: 'COMPLETED',
          buyerConfirmedAt: new Date(),
        },
      });
    });

    const updatedOrder = await prisma.order.findUnique({
      where: { id },
      include: {
        listing: true,
        buyer: {
          select: {
            id: true,
            username: true,
            robloxUsername: true,
            avatarUrl: true,
          },
        },
        seller: {
          select: {
            id: true,
            username: true,
            robloxUsername: true,
            avatarUrl: true,
          },
        },
      },
    });

    res.json({
      message: 'Order completed - funds released to seller',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Confirm receipt error:', error);
    res.status(500).json({ error: 'Failed to confirm receipt' });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const { type = 'all', status, page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    let where = {
      ...(status && { status }),
    };

    if (type === 'purchases') {
      where.buyerId = req.user.id;
    } else if (type === 'sales') {
      where.sellerId = req.user.id;
    } else {
      where.OR = [
        { buyerId: req.user.id },
        { sellerId: req.user.id },
      ];
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        listing: {
          select: {
            id: true,
            petName: true,
            petCategory: true,
            age: true,
            potion: true,
            rarity: true,
            imageUrl: true,
          },
        },
        buyer: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
        seller: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip,
    });

    const total = await prisma.order.count({ where });

    res.json({
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        listing: true,
        buyer: {
          select: {
            id: true,
            username: true,
            robloxUsername: true,
            avatarUrl: true,
          },
        },
        seller: {
          select: {
            id: true,
            username: true,
            robloxUsername: true,
            avatarUrl: true,
          },
        },
        dispute: true,
        review: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check authorization
    if (order.buyerId !== req.user.id && order.sellerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized to view this order' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};
