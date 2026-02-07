import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, TrendingUp, Zap, CheckCircle } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import { mockListings } from '../data/mockListings';

const Home = () => {
  const featuredListings = mockListings.slice(0, 6);

  const stats = [
    { icon: TrendingUp, label: 'Total Sales', value: '50,000+' },
    { icon: Users, label: 'Active Users', value: '10,000+' },
    { icon: Shield, label: 'Safe Transactions', value: '99.9%' },
    { icon: Zap, label: 'Avg Response', value: '< 5min' },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Browse & Buy',
      description: 'Browse listings and purchase pets securely with our escrow system',
      icon: '🔍',
    },
    {
      step: 2,
      title: 'Seller Delivers In-Game',
      description: 'Sellers deliver your pet in Adopt Me while funds are held safely in escrow',
      icon: '🎮',
    },
    {
      step: 3,
      title: 'Confirm & Complete',
      description: 'Confirm receipt to release payment to seller. Protected by our 7% platform fee',
      icon: '✅',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Trade Smarter. Trade{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-600">
              Safer.
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The most trusted marketplace for Roblox Adopt Me pets. Buy and sell with confidence using our secure escrow payment system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listings" className="btn-primary text-lg px-8 py-4">
              Browse Marketplace
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/create"
              className="px-8 py-4 bg-dark-850 hover:bg-dark-800 text-white font-semibold rounded-lg border-2 border-dark-700 hover:border-primary transition-all duration-200 flex items-center justify-center"
            >
              Sell Your Pets
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-dark-700 bg-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Listings</h2>
              <p className="text-gray-400">Check out the latest pet trades</p>
            </div>
            <Link
              to="/listings"
              className="text-primary hover:text-primary-600 font-medium flex items-center space-x-2 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <ItemCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">How It Works</h2>
            <p className="text-gray-400">Start trading in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="card p-8 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="inline-flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white font-bold text-sm mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Why Choose RageMarketplace?</h2>
            <p className="text-gray-400">The safest and most reliable trading platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Verified Traders',
                description: 'All users go through verification to ensure legitimate trading',
                icon: Shield,
              },
              {
                title: 'User Reputation',
                description: 'Rating system helps you trade with confidence',
                icon: Users,
              },
              {
                title: 'Scam Reports',
                description: 'Built-in reporting system to flag suspicious activity',
                icon: CheckCircle,
              },
              {
                title: 'Value Guide',
                description: 'Up-to-date pet values to help you make fair trades',
                icon: TrendingUp,
              },
              {
                title: 'Fast Matching',
                description: 'Find the perfect trade quickly with our search filters',
                icon: Zap,
              },
              {
                title: 'No Bot Trading',
                description: 'Real players only - meet in-game to complete trades',
                icon: Users,
              },
            ].map((feature, index) => (
              <div key={index} className="card p-6 hover:shadow-xl hover:shadow-primary/10 transition-all">
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of traders and find your dream pets today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="btn-primary">
              Create Account
            </Link>
            <Link to="/listings" className="btn-secondary">
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
