import prisma from '../config/database.js';

export const createReview = async (req, res) => {
  try {
    const { orderId, rating, comment } = req.body;
    const reviewerId = req.user.id;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // Get order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { review: true },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Only buyer can leave review
    if (order.buyerId !== reviewerId) {
      return res.status(403).json({ error: 'Only the buyer can leave a review' });
    }

    // Order must be completed
    if (order.status !== 'COMPLETED') {
      return res.status(400).json({ error: 'Can only review completed orders' });
    }

    // Check if review already exists
    if (order.review) {
      return res.status(400).json({ error: 'Review already exists for this order' });
    }

    const review = await prisma.review.create({
      data: {
        orderId,
        reviewerId,
        sellerId: order.sellerId,
        rating: parseInt(rating),
        comment,
      },
      include: {
        reviewer: {
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
        order: {
          include: {
            listing: {
              select: {
                id: true,
                petName: true,
                petCategory: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      message: 'Review submitted successfully',
      review,
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

export const getSellerReviews = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const reviews = await prisma.review.findMany({
      where: { sellerId },
      include: {
        reviewer: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
        order: {
          include: {
            listing: {
              select: {
                id: true,
                petName: true,
                petCategory: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip,
    });

    const total = await prisma.review.count({
      where: { sellerId },
    });

    // Calculate average rating
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.json({
      reviews,
      stats: {
        averageRating: avgRating.toFixed(1),
        totalReviews: total,
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get seller reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const getOrderReview = async (req, res) => {
  try {
    const { orderId } = req.params;

    const review = await prisma.review.findUnique({
      where: { orderId },
      include: {
        reviewer: {
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
        order: {
          include: {
            listing: {
              select: {
                id: true,
                petName: true,
                petCategory: true,
              },
            },
          },
        },
      },
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ review });
  } catch (error) {
    console.error('Get order review error:', error);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
};
