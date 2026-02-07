import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create users
  const users = [];
  const usernames = [
    'DragonTrader99',
    'NightWingTrader',
    'FrostyTrades',
    'PetCollector',
    'MegaNeonKing',
  ];

  for (const username of usernames) {
    const password = await bcrypt.hash('password123', 10);
    const user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: {
        username,
        email: `${username.toLowerCase()}@example.com`,
        password,
        robloxUsername: username,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        balance: 1000.00, // Give each user $1000 starting balance
        isVerified: true,
      },
    });
    users.push(user);
    console.log(`✅ Created user: ${user.username}`);
  }

  // Create listings
  const petData = [
    { name: 'Shadow Dragon', category: 'Legendary', age: 'FULL_GROWN', potion: 'FLY_RIDE', rarity: 'NORMAL', price: 150.00 },
    { name: 'Bat Dragon', category: 'Legendary', age: 'POST_TEEN', potion: 'FLY_RIDE', rarity: 'NORMAL', price: 200.00 },
    { name: 'Frost Dragon', category: 'Legendary', age: 'FULL_GROWN', potion: 'FLY_RIDE', rarity: 'NEON', price: 500.00 },
    { name: 'Parrot', category: 'Legendary', age: 'TEEN', potion: 'FLY', rarity: 'NORMAL', price: 45.00 },
    { name: 'Owl', category: 'Legendary', age: 'PRE_TEEN', potion: 'RIDE', rarity: 'NORMAL', price: 40.00 },
    { name: 'Evil Unicorn', category: 'Legendary', age: 'FULL_GROWN', potion: 'FLY_RIDE', rarity: 'NORMAL', price: 65.00 },
    { name: 'Crow', category: 'Legendary', age: 'JUNIOR', potion: 'FLY', rarity: 'NORMAL', price: 42.00 },
    { name: 'Arctic Reindeer', category: 'Legendary', age: 'FULL_GROWN', potion: 'FLY_RIDE', rarity: 'MEGA_NEON', price: 350.00 },
    { name: 'Turtle', category: 'Legendary', age: 'POST_TEEN', potion: 'RIDE', rarity: 'NORMAL', price: 25.00 },
    { name: 'Kangaroo', category: 'Legendary', age: 'FULL_GROWN', potion: 'FLY_RIDE', rarity: 'NEON', price: 120.00 },
  ];

  for (let i = 0; i < petData.length; i++) {
    const pet = petData[i];
    const seller = users[i % users.length];
    
    const listing = await prisma.listing.create({
      data: {
        sellerId: seller.id,
        petName: pet.name,
        petCategory: pet.category,
        age: pet.age,
        potion: pet.potion,
        rarity: pet.rarity,
        price: pet.price,
        description: `High-quality ${pet.name} - ${pet.rarity.toLowerCase().replace('_', ' ')} ${pet.age.toLowerCase().replace('_', ' ')}. Well trained and ready for a new home!`,
        status: 'ACTIVE',
      },
    });
    console.log(`✅ Created listing: ${listing.petName} - $${listing.price}`);
  }

  console.log('✨ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
