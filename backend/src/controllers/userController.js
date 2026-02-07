import prisma from '../config/database.js';
import { addBalance } from '../services/balanceService.js';

export const getProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        robloxUsername: true,
        avatarUrl: true,
        isVerified: true,
        createdAt: true,
        sellerOrders: {
          where: { status: 'COMPLETED' },
          select: { id: true },
        },
        reviewsReceived: {
          select: {
            rating: true,
            comment: true,
            createdAt: true,
            reviewer: {
              select: {
                username: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        listings: {
          where: { status: 'ACTIVE' },
          select: {
            id: true,
            petName: true,
            petCategory: true,
            age: true,
            potion: true,
            rarity: true,
            price: true,
            imageUrl: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate average rating
    const avgRating = user.reviewsReceived.length > 0
      ? user.reviewsReceived.reduce((sum, r) => sum + r.rating, 0) / user.reviewsReceived.length
      : 0;

    const completedSales = user.sellerOrders.length;

    res.json({
      ...user,
      stats: {
        completedSales,
        averageRating: avgRating.toFixed(1),
        totalReviews: user.reviewsReceived.length,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { robloxUsername, avatarUrl } = req.body;
    const userId = req.user.id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(robloxUsername && { robloxUsername }),
        ...(avatarUrl && { avatarUrl }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        robloxUsername: true,
        avatarUrl: true,
        balance: true,
        frozenBalance: true,
        role: true,
        isVerified: true,
      },
    });

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const getBalance = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { balance: true, frozenBalance: true },
    });

    res.json(user);
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip,
      include: {
        relatedOrder: {
          select: {
            id: true,
            listing: {
              select: {
                petName: true,
              },
            },
          },
        },
      },
    });

    const total = await prisma.transaction.count({
      where: { userId: req.user.id },
    });

    res.json({
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

export const deposit = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // This is a test endpoint - in production, this would integrate with Stripe/Crypto
    const newBalance = await addBalance(
      req.user.id,
      amount,
      'Test deposit (Stripe/Crypto integration coming soon)'
    );

    res.json({
      message: 'Deposit successful',
      balance: newBalance,
    });
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({ error: 'Deposit failed' });
  }
};
