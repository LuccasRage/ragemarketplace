import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Shield, Users, TrendingUp, Zap, CheckCircle } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import { listingsAPI } from '../services/api';

const Home = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        const response = await listingsAPI.getAll({ limit: 6 });
        setFeaturedListings(response.data.slice(0, 6));
      } catch (err) {
        console.error('Failed to fetch listings:', err);
        setError('Failed to load listings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedListings();
  }, []);

  const stats = [
    { icon: TrendingUp, label: 'Total Sales', value: '50,000+' },
    { icon: Users, label: 'Active Users', value: '10,000+' },
    { icon: Shield, label: 'Secure Transactions', value: '99.9%' },
    { icon: Zap, label: 'Avg Response', value: '< 5min' },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'List Your Pet',
      description: 'Set your price and list your pet for sale on our secure marketplace',
      icon: '🔍',
    },
    {
      step: 2,
      title: 'Secure Purchase',
      description: 'Buyer pays, funds held in escrow for your protection during delivery',
      icon: '🎮',
    },
    {
      step: 3,
      title: 'Deliver & Get Paid',
      description: 'Deliver in-game, get 93% after 7% platform fee once buyer confirms receipt',
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
            Buy Smarter. Sell{' '}
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
              Start Selling
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
              <p className="text-gray-400">Check out the latest listings for sale</p>
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
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                <p className="text-gray-400 mt-4">Loading listings...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-400">{error}</p>
              </div>
            ) : featuredListings.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">No listings available at the moment</p>
              </div>
            ) : (
              featuredListings.map((listing) => (
                <ItemCard key={listing.id} listing={listing} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">How It Works</h2>
            <p className="text-gray-400">Start buying and selling in three simple steps</p>
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
            <p className="text-gray-400">The safest and most reliable marketplace platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Verified Sellers',
                description: 'All users go through verification to ensure legitimate transactions',
                icon: Shield,
              },
              {
                title: 'User Reputation',
                description: 'Rating system helps you buy and sell with confidence',
                icon: Users,
              },
              {
                title: 'Scam Reports',
                description: 'Built-in reporting system to flag suspicious activity',
                icon: CheckCircle,
              },
              {
                title: 'Value Guide',
                description: 'Up-to-date pet values to help you make fair deals',
                icon: TrendingUp,
              },
              {
                title: 'Fast Transactions',
                description: 'Find the perfect pet quickly with our search filters',
                icon: Zap,
              },
              {
                title: 'Escrow Protection',
                description: 'Secure payments - funds held safely until delivery confirmed',
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Buying and Selling?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of users and find your dream pets today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="btn-primary">
              Create Account
            </Link>
            <Link to="/listings" className="btn-secondary">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
