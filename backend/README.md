# RageMarketplace Backend API

Backend API for RageMarketplace with escrow payment system.

## Tech Stack

- **Node.js** + Express.js
- **PostgreSQL** database
- **Prisma** ORM
- **JWT** authentication
- **bcrypt** password hashing

## Setup

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/ragemarketplace
JWT_SECRET=your-secret-key-change-this-in-production
PORT=5000
PLATFORM_FEE_PERCENT=7
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

5. Generate Prisma client:
```bash
npm run prisma:generate
```

6. Run database migrations:
```bash
npm run prisma:migrate
```

7. Seed the database with test data:
```bash
npm run prisma:seed
```

### Development

Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Production

Start the production server:
```bash
npm start
```

## API Endpoints

### Authentication (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /me` - Get current user
- `POST /discord` - Discord OAuth (placeholder)
- `POST /google` - Google OAuth (placeholder)

### Users (`/api/users`)

- `GET /profile/:username` - Get user profile
- `PUT /profile` - Update own profile (auth required)
- `GET /balance` - Get balance (auth required)
- `GET /transactions` - Get transaction history (auth required)
- `POST /deposit` - Test deposit (auth required)

### Listings (`/api/listings`)

- `GET /` - Get all active listings (with filters)
- `GET /:id` - Get listing details
- `POST /` - Create listing (auth required)
- `PUT /:id` - Update listing (auth required)
- `DELETE /:id` - Cancel listing (auth required)
- `GET /my` - Get user's listings (auth required)

### Orders (`/api/orders`)

- `POST /buy/:listingId` - Buy item (auth required)
- `PUT /:id/delivered` - Mark as delivered (auth required)
- `PUT /:id/confirm` - Confirm receipt (auth required)
- `GET /my` - Get user's orders (auth required)
- `GET /:id` - Get order details (auth required)

### Disputes (`/api/disputes`)

- `POST /` - Open dispute (auth required)
- `GET /my` - Get user's disputes (auth required)
- `GET /:id` - Get dispute details (auth required)
- `PUT /:id/resolve` - Resolve dispute (admin required)

### Reviews (`/api/reviews`)

- `POST /` - Create review (auth required)
- `GET /seller/:sellerId` - Get seller reviews
- `GET /order/:orderId` - Get order review

## Escrow Flow

1. **Buyer purchases item**
   - Money deducted from buyer's balance
   - Funds held in escrow (frozen balance)
   - Order status: `PENDING_DELIVERY`

2. **Seller delivers pet**
   - Seller marks order as delivered
   - Order status: `DELIVERED`

3. **Buyer confirms receipt**
   - Escrow released
   - 7% platform fee deducted
   - 93% credited to seller
   - Order status: `COMPLETED`

4. **Disputes**
   - Either party can open dispute
   - Admin resolves
   - Funds refunded or released based on resolution

## Database Schema

See `prisma/schema.prisma` for full schema details.

Key tables:
- **Users** - User accounts with balances
- **Listings** - Pet listings for sale
- **Orders** - Purchase orders with escrow
- **Transactions** - Financial transaction history
- **Disputes** - Order disputes
- **Reviews** - Seller reviews

## Security

- JWT tokens for authentication
- bcrypt password hashing (10 rounds)
- Input validation on all endpoints
- Role-based access control (USER, ADMIN, SUPPORT)
- Atomic database transactions for money operations

## Test Users

After seeding, you can login with:
- Email: `dragontrader99@example.com`
- Password: `password123`

All seeded users use the same password for testing.
