# RageMarketplace

![RageMarketplace Banner](https://via.placeholder.com/1200x300/0a0a0a/e11d48?text=RageMarketplace)

The most trusted marketplace for Roblox Adopt Me pet trading. Connect with verified traders, find fair deals, and build your dream collection.

## 🚀 Features

- **🔍 Advanced Search & Filters** - Find exactly what you're looking for with powerful filtering options
- **📝 Easy Listing Creation** - List your pets in minutes with our intuitive form
- **⭐ User Reputation System** - Trade with confidence using our rating system
- **🛡️ Scam Protection** - Built-in reporting system and user verification
- **📊 Live Value Guide** - Stay updated with the latest pet values and demand
- **💬 Trade Management** - Track all your trades in one convenient dashboard
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

- **React 19** - Modern React with hooks
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Lucide React** - Beautiful icon library

## 📦 Installation

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

## 🏗️ Build for Production

```bash
npm run build
npm run preview
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
- **Listings** (`/listings`) - Browse all pet listings with filters
- **Create Listing** (`/create`) - Form to create new listings
- **Listing Detail** (`/listing/:id`) - Full details of a specific listing
- **Profile** (`/profile/:username`) - User profile with listings and reviews
- **Login** (`/login`) - Authentication page
- **Register** (`/register`) - New user registration
- **Trades** (`/trades`) - Manage incoming, outgoing, and completed trades
- **Reports** (`/reports`) - Report scams and view flagged users
- **Values** (`/values`) - Pet value guide with search and filters
- **Settings** (`/settings`) - Account settings and preferences

## 🔮 Future Enhancements

- Backend API integration
- Real-time messaging system
- In-app notifications
- Advanced analytics dashboard
- Mobile app (React Native)
- Multi-language support
- Social features (following, favorites)
- Trade history export

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

RageMarketplace is not affiliated with Roblox Corporation. Adopt Me is a trademark of Uplift Games. This is an independent fan project created to facilitate legitimate player-to-player trading.

## 📧 Contact

For support or inquiries, please contact us at support@ragemarketplace.com

---

Made with ❤️ by the RageMarketplace Team

