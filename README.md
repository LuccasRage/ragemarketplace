# RageMarketplace

![RageMarketplace Banner](https://via.placeholder.com/1200x300/0a0a0a/e11d48?text=RageMarketplace)

The most trusted marketplace for Roblox Adopt Me pet **buying and selling**. Secure transactions with our **escrow payment system**.

## 🚀 Features

- **🔍 Advanced Search & Filters** - Find exactly what you're looking for with powerful filtering options
- **📝 Easy Listing Creation** - List your pets for sale in minutes with our intuitive form
- **💰 Escrow Payment System** - Secure buy/sell transactions with 7% platform fee
- **⭐ User Reputation System** - Buy from trusted sellers with our rating system
- **🛡️ Scam Protection** - Built-in dispute system and admin resolution
- **📊 Live Value Guide** - Stay updated with the latest pet values and demand
- **💼 Order Management** - Track all your purchases and sales in one dashboard
- **💳 Wallet System** - Manage your balance and transaction history
- **🌙 Dark Theme** - Easy on the eyes with our sleek dark interface
- **📱 Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

## 🎨 Design

RageMarketplace features a modern, gaming-inspired dark theme with:
- Dark backgrounds (#0a0a0a, #111, #1a1a1a)
- Red accent color (#e11d48) for highlights and CTAs
- Smooth transitions and hover effects
- Card-based layouts for clean organization
- Inter font for maximum readability

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js + Express.js** - RESTful API
- **PostgreSQL** - Relational database
- **Prisma ORM** - Type-safe database access
- **JWT** - Secure authentication
- **bcrypt** - Password hashing

## 📦 Installation

### Frontend

1. Clone the repository:
```bash
git clone https://github.com/LuccasRage/ragemarketplace.git
cd ragemarketplace
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Backend

See [backend/README.md](backend/README.md) for complete backend setup instructions.

Quick start:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

The backend API will run on `http://localhost:5000`

## 🏗️ Build for Production

### Frontend
```bash
npm run build
npm run preview
```

### Backend
```bash
cd backend
npm start
```

## 📁 Project Structure

```
ragemarketplace/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ItemCard.jsx
│   │   ├── FilterSidebar.jsx
│   │   ├── Modal.jsx
│   │   ├── Badge.jsx
│   │   ├── StarRating.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── Toast.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Listings.jsx
│   │   ├── CreateListing.jsx
│   │   ├── ListingDetail.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Trades.jsx
│   │   ├── Reports.jsx
│   │   ├── Values.jsx
│   │   └── Settings.jsx
│   ├── data/           # Mock data
│   │   ├── mockListings.js
│   │   ├── mockUsers.js
│   │   └── mockValues.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # App entry point
│   └── index.css       # Global styles
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## 🎯 Pages

- **Home** (`/`) - Hero section, featured listings, how it works, stats
- **Marketplace** (`/listings`) - Browse all pet listings with filters
- **Create Listing** (`/create`) - Form to create new listings with pricing
- **Listing Detail** (`/listing/:id`) - Full details of a specific listing
- **Orders** (`/orders`) - Track purchases and sales with escrow status
- **Wallet** (`/wallet`) - Manage balance, view transactions, deposit/withdraw
- **Profile** (`/profile/:username`) - User profile with listings, reviews, and sales stats
- **Login** (`/login`) - Authentication page
- **Register** (`/register`) - New user registration
- **Reports** (`/reports`) - Report scams and view disputes
- **Values** (`/values`) - Pet value guide with search and filters
- **Settings** (`/settings`) - Account settings and preferences

## 💡 How It Works

### Buy/Sell Flow

1. **Browse Marketplace** - Find pets you want to buy
2. **Secure Purchase** - Buy with funds held in escrow
3. **In-Game Delivery** - Seller delivers pet in Adopt Me
4. **Confirm Receipt** - Release payment to seller (7% platform fee applied)
5. **Leave Review** - Rate your experience

### Escrow System

- Buyer's funds are held securely in escrow
- Seller delivers pet in-game
- Buyer confirms receipt to release payment
- Platform takes 7% fee, seller receives 93%
- Disputes can be opened if issues arise
- Admin resolves disputes fairly

## 🔒 Security

- JWT token authentication
- bcrypt password hashing (10 rounds)
- Atomic database transactions for money operations
- Input validation on all endpoints
- Role-based access control (USER, ADMIN, SUPPORT)
- Escrow system prevents fraud

## 🔮 Future Enhancements

- Stripe & Cryptocurrency payment integration
- Real-time messaging system
- In-app notifications
- Advanced analytics dashboard
- Mobile app (React Native)
- Multi-language support
- Social features (following, favorites)
- Transaction export

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

RageMarketplace is not affiliated with Roblox Corporation. Adopt Me is a trademark of Uplift Games. This is an independent platform created to facilitate legitimate player-to-player pet sales with secure escrow protection.

## 📧 Contact

For support or inquiries, please contact us at support@ragemarketplace.com

---

Made with ❤️ by the RageMarketplace Team

