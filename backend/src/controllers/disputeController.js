import prisma from '../config/database.js';
import { refundEscrow, releaseEscrow } from '../services/escrowService.js';

export const createDispute = async (req, res) => {
  try {
    const { orderId, reason, proofUrls = [] } = req.body;
    const userId = req.user.id;

    if (!orderId || !reason) {
      return res.status(400).json({ error: 'Order ID and reason are required' });
    }

    // Get order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { dispute: true },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user is buyer or seller
    if (order.buyerId !== userId && order.sellerId !== userId) {
      return res.status(403).json({ error: 'Not authorized to dispute this order' });
    }

    // Check if order can be disputed
    if (!['PENDING_DELIVERY', 'DELIVERED'].includes(order.status)) {
      return res.status(400).json({ error: 'This order cannot be disputed' });
    }

    // Check if dispute already exists
    if (order.dispute) {
      return res.status(400).json({ error: 'Dispute already exists for this order' });
    }

    const dispute = await prisma.dispute.create({
      data: {
        orderId,
        openedById: userId,
        reason,
        proofUrls,
        status: 'OPEN',
      },
      include: {
        order: {
          include: {
            listing: true,
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
        },
        openedBy: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'DISPUTED' },
    });

    res.status(201).json({
      message: 'Dispute opened successfully',
      dispute,
    });
  } catch (error) {
    console.error('Create dispute error:', error);
    res.status(500).json({ error: 'Failed to create dispute' });
  }
};

export const getMyDisputes = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      OR: [
        { openedById: req.user.id },
        {
          order: {
            OR: [
              { buyerId: req.user.id },
              { sellerId: req.user.id },
            ],
          },
        },
      ],
      ...(status && { status }),
    };

    const disputes = await prisma.dispute.findMany({
      where,
      include: {
        order: {
          include: {
            listing: {
              select: {
                id: true,
                petName: true,
                petCategory: true,
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
        },
        openedBy: {
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

    const total = await prisma.dispute.count({ where });

    res.json({
      disputes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get my disputes error:', error);
    res.status(500).json({ error: 'Failed to fetch disputes' });
  }
};

export const getDispute = async (req, res) => {
  try {
    const { id } = req.params;

    const dispute = await prisma.dispute.findUnique({
      where: { id },
      include: {
        order: {
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
        },
        openedBy: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!dispute) {
      return res.status(404).json({ error: 'Dispute not found' });
    }

    // Check authorization
    const isInvolved = 
      dispute.openedById === req.user.id ||
      dispute.order.buyerId === req.user.id ||
      dispute.order.sellerId === req.user.id;

    if (!isInvolved && req.user.role !== 'ADMIN' && req.user.role !== 'SUPPORT') {
      return res.status(403).json({ error: 'Not authorized to view this dispute' });
    }

    res.json({ dispute });
  } catch (error) {
    console.error('Get dispute error:', error);
    res.status(500).json({ error: 'Failed to fetch dispute' });
  }
};

export const resolveDispute = async (req, res) => {
  try {
    const { id } = req.params;
    const { resolution, adminNotes } = req.body;

    if (!['RESOLVED_BUYER', 'RESOLVED_SELLER', 'CLOSED'].includes(resolution)) {
      return res.status(400).json({ error: 'Invalid resolution' });
    }

    const dispute = await prisma.dispute.findUnique({
      where: { id },
      include: { order: true },
    });

    if (!dispute) {
      return res.status(404).json({ error: 'Dispute not found' });
    }

    if (dispute.status !== 'OPEN' && dispute.status !== 'UNDER_REVIEW') {
      return res.status(400).json({ error: 'Dispute is already resolved' });
    }

    // Handle resolution based on type
    await prisma.$transaction(async (tx) => {
      if (resolution === 'RESOLVED_BUYER') {
        // Refund buyer from escrow
        await refundEscrow(
          dispute.order.buyerId,
          parseFloat(dispute.order.escrowAmount),
          dispute.order.id
        );

        await tx.order.update({
          where: { id: dispute.orderId },
          data: { status: 'REFUNDED' },
        });
      } else if (resolution === 'RESOLVED_SELLER') {
        // Release escrow to seller
        await releaseEscrow(
          dispute.order.buyerId,
          dispute.order.sellerId,
          parseFloat(dispute.order.escrowAmount),
          dispute.order.id
        );

        await tx.order.update({
          where: { id: dispute.orderId },
          data: { status: 'COMPLETED' },
        });
      }

      await tx.dispute.update({
        where: { id },
        data: {
          status: resolution,
          adminNotes,
          resolvedAt: new Date(),
        },
      });
    });

    const updatedDispute = await prisma.dispute.findUnique({
      where: { id },
      include: {
        order: {
          include: {
            listing: true,
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
        },
        openedBy: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    res.json({
      message: 'Dispute resolved successfully',
      dispute: updatedDispute,
    });
  } catch (error) {
    console.error('Resolve dispute error:', error);
    res.status(500).json({ error: 'Failed to resolve dispute' });
  }
};
