import prisma from '../config/database.js';

export const getBalance = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { balance: true, frozenBalance: true },
  });

  return user;
};

export const addBalance = async (userId, amount, description) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  const amountNum = parseFloat(amount);
  const balanceBefore = parseFloat(user.balance);

  await prisma.user.update({
    where: { id: userId },
    data: { balance: { increment: amountNum } },
  });

  await prisma.transaction.create({
    data: {
      userId,
      type: 'DEPOSIT',
      amount: amountNum,
      balanceBefore,
      balanceAfter: balanceBefore + amountNum,
      description,
    },
  });

  return balanceBefore + amountNum;
};

export const deductBalance = async (userId, amount, description, orderId = null) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  const amountNum = parseFloat(amount);
  const balanceBefore = parseFloat(user.balance);

  if (balanceBefore < amountNum) {
    throw new Error('Insufficient balance');
  }

  await prisma.user.update({
    where: { id: userId },
    data: { balance: { decrement: amountNum } },
  });

  await prisma.transaction.create({
    data: {
      userId,
      type: 'PURCHASE',
      amount: -amountNum,
      balanceBefore,
      balanceAfter: balanceBefore - amountNum,
      description,
      relatedOrderId: orderId,
    },
  });

  return balanceBefore - amountNum;
};
