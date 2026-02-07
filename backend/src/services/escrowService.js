import prisma from '../config/database.js';
import { calculatePlatformFee, calculateSellerEarnings } from '../utils/helpers.js';

export const holdInEscrow = async (userId, amount, orderId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  
  if (!user) {
    throw new Error('User not found');
  }

  const amountNum = parseFloat(amount);
  const currentBalance = parseFloat(user.balance);

  if (currentBalance < amountNum) {
    throw new Error('Insufficient balance');
  }

  // Deduct from balance and add to frozen balance
  await prisma.user.update({
    where: { id: userId },
    data: {
      balance: { decrement: amountNum },
      frozenBalance: { increment: amountNum },
    },
  });

  // Create transaction record
  await prisma.transaction.create({
    data: {
      userId,
      type: 'ESCROW_HOLD',
      amount: amountNum,
      balanceBefore: currentBalance,
      balanceAfter: currentBalance - amountNum,
      description: `Escrow hold for order ${orderId}`,
      relatedOrderId: orderId,
    },
  });

  return true;
};

export const releaseEscrow = async (buyerId, sellerId, amount, orderId) => {
  const buyer = await prisma.user.findUnique({ where: { id: buyerId } });
  const seller = await prisma.user.findUnique({ where: { id: sellerId } });

  if (!buyer || !seller) {
    throw new Error('User not found');
  }

  const amountNum = parseFloat(amount);
  const platformFee = calculatePlatformFee(amountNum);
  const sellerEarnings = calculateSellerEarnings(amountNum);

  // Release from buyer's frozen balance
  await prisma.user.update({
    where: { id: buyerId },
    data: {
      frozenBalance: { decrement: amountNum },
    },
  });

  // Add to seller's balance (minus platform fee)
  const sellerBalanceBefore = parseFloat(seller.balance);
  await prisma.user.update({
    where: { id: sellerId },
    data: {
      balance: { increment: sellerEarnings },
    },
  });

  // Create transaction records
  await prisma.transaction.create({
    data: {
      userId: buyerId,
      type: 'ESCROW_RELEASE',
      amount: -amountNum,
      balanceBefore: parseFloat(buyer.frozenBalance),
      balanceAfter: parseFloat(buyer.frozenBalance) - amountNum,
      description: `Escrow released for order ${orderId}`,
      relatedOrderId: orderId,
    },
  });

  await prisma.transaction.create({
    data: {
      userId: sellerId,
      type: 'SALE_EARNING',
      amount: sellerEarnings,
      balanceBefore: sellerBalanceBefore,
      balanceAfter: sellerBalanceBefore + sellerEarnings,
      description: `Sale earnings for order ${orderId} (${amountNum} - ${platformFee} fee)`,
      relatedOrderId: orderId,
    },
  });

  return { platformFee, sellerEarnings };
};

export const refundEscrow = async (buyerId, amount, orderId) => {
  const buyer = await prisma.user.findUnique({ where: { id: buyerId } });

  if (!buyer) {
    throw new Error('User not found');
  }

  const amountNum = parseFloat(amount);
  const frozenBalance = parseFloat(buyer.frozenBalance);

  if (frozenBalance < amountNum) {
    throw new Error('Insufficient frozen balance for refund');
  }

  // Return from frozen balance to regular balance
  const balanceBefore = parseFloat(buyer.balance);
  await prisma.user.update({
    where: { id: buyerId },
    data: {
      balance: { increment: amountNum },
      frozenBalance: { decrement: amountNum },
    },
  });

  // Create transaction record
  await prisma.transaction.create({
    data: {
      userId: buyerId,
      type: 'REFUND',
      amount: amountNum,
      balanceBefore,
      balanceAfter: balanceBefore + amountNum,
      description: `Refund for order ${orderId}`,
      relatedOrderId: orderId,
    },
  });

  return true;
};
