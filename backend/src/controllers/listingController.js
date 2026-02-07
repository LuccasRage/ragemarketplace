import prisma from '../config/database.js';

export const getListings = async (req, res) => {
  try {
    const {
      petName,
      petCategory,
      age,
      potion,
      rarity,
      minPrice,
      maxPrice,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 12,
    } = req.query;

    const where = {
      status: 'ACTIVE',
      ...(petName && {
        petName: { contains: petName, mode: 'insensitive' },
      }),
      ...(petCategory && { petCategory }),
      ...(age && { age }),
      ...(potion && { potion }),
      ...(rarity && { rarity }),
      ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
    };

    const skip = (page - 1) * limit;

    const listings = await prisma.listing.findMany({
      where,
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
            isVerified: true,
          },
        },
      },
      orderBy: { [sort]: order },
      take: parseInt(limit),
      skip,
    });

    const total = await prisma.listing.count({ where });

    res.json({
      listings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};

export const getListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            robloxUsername: true,
            avatarUrl: true,
            isVerified: true,
            reviewsReceived: {
              select: { rating: true },
            },
            sellerOrders: {
              where: { status: 'COMPLETED' },
              select: { id: true },
            },
          },
        },
      },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Calculate seller stats
    const avgRating = listing.seller.reviewsReceived.length > 0
      ? listing.seller.reviewsReceived.reduce((sum, r) => sum + r.rating, 0) / 
        listing.seller.reviewsReceived.length
      : 0;

    res.json({
      ...listing,
      seller: {
        ...listing.seller,
        stats: {
          completedSales: listing.seller.sellerOrders.length,
          averageRating: avgRating.toFixed(1),
          totalReviews: listing.seller.reviewsReceived.length,
        },
        reviewsReceived: undefined,
        sellerOrders: undefined,
      },
    });
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
};

export const createListing = async (req, res) => {
  try {
    const {
      petName,
      petCategory,
      age,
      potion = 'NONE',
      rarity = 'NORMAL',
      price,
      description,
      imageUrl,
    } = req.body;

    const listing = await prisma.listing.create({
      data: {
        sellerId: req.user.id,
        petName,
        petCategory,
        age,
        potion,
        rarity,
        price: parseFloat(price),
        description,
        imageUrl,
      },
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
            isVerified: true,
          },
        },
      },
    });

    res.status(201).json({
      message: 'Listing created successfully',
      listing,
    });
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ error: 'Failed to create listing' });
  }
};

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      petName,
      petCategory,
      age,
      potion,
      rarity,
      price,
      description,
      imageUrl,
    } = req.body;

    // Check if listing exists and belongs to user
    const existing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (existing.sellerId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this listing' });
    }

    if (existing.status !== 'ACTIVE') {
      return res.status(400).json({ error: 'Cannot update inactive listing' });
    }

    const listing = await prisma.listing.update({
      where: { id },
      data: {
        ...(petName && { petName }),
        ...(petCategory && { petCategory }),
        ...(age && { age }),
        ...(potion && { potion }),
        ...(rarity && { rarity }),
        ...(price && { price: parseFloat(price) }),
        ...(description && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
            isVerified: true,
          },
        },
      },
    });

    res.json({
      message: 'Listing updated successfully',
      listing,
    });
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ error: 'Failed to update listing' });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (existing.sellerId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this listing' });
    }

    if (existing.status === 'SOLD') {
      return res.status(400).json({ error: 'Cannot delete sold listing' });
    }

    await prisma.listing.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    res.json({ message: 'Listing cancelled successfully' });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ error: 'Failed to delete listing' });
  }
};

export const getMyListings = async (req, res) => {
  try {
    const { status, page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      sellerId: req.user.id,
      ...(status && { status }),
    };

    const listings = await prisma.listing.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip,
    });

    const total = await prisma.listing.count({ where });

    res.json({
      listings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get my listings error:', error);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};
