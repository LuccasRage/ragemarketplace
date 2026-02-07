import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, CheckCircle, Star, MapPin, Mail, ExternalLink } from 'lucide-react';
import StarRating from '../components/StarRating';
import Badge from '../components/Badge';
import ItemCard from '../components/ItemCard';
import { mockUsers, mockReviews } from '../data/mockUsers';
import { mockListings } from '../data/mockListings';

const Profile = () => {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('listings');
  
  const user = mockUsers.find(u => u.username === username);

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">User Not Found</h2>
          <p className="text-gray-400 mb-6">This user doesn't exist.</p>
          <Link to="/listings" className="btn-primary">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const userListings = mockListings.filter(l => l.userId === user.id);
  const userReviews = mockReviews.filter(r => r.userId === user.id);

  const mockTrades = [
    {
      id: 1,
      date: '2024-02-05',
      gave: 'Frost Dragon',
      received: 'Parrot + Adds',
      partner: 'DragonTrader99',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-02-03',
      gave: 'Evil Unicorn',
      received: 'Crow',
      partner: 'NightWingTrader',
      status: 'completed'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-32 h-32 rounded-full ring-4 ring-dark-700"
            />
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                    {user.verified && (
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={user.reputation} size="md" />
                    <span className="text-gray-400">({user.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {formatDate(user.joinDate)}</span>
                  </div>
                </div>

                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Contact User
                </button>
              </div>

              {user.bio && (
                <p className="text-gray-300 mb-4">{user.bio}</p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-dark-900 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{user.activeListings}</p>
                  <p className="text-sm text-gray-400">Active Listings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{user.completedTrades}</p>
                  <p className="text-sm text-gray-400">Completed Sales</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{user.reputation}</p>
                  <p className="text-sm text-gray-400">Rating</p>
                </div>
              </div>

              {/* Connected Accounts */}
              <div className="flex gap-4 mt-4">
                {user.robloxUsername && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-dark-900 rounded-lg text-sm">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{user.robloxUsername}</span>
                  </div>
                )}
                {user.discordConnected && (
                  <div className="px-3 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg text-sm">
                    Discord Connected
                  </div>
                )}
                {user.googleConnected && (
                  <div className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm">
                    Google Connected
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card p-2 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'listings'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
              }`}
            >
              Active Listings ({userListings.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
              }`}
            >
              Sales History
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
              }`}
            >
              Reviews ({userReviews.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'listings' && (
          <div>
            {userListings.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-gray-400">No active listings</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map(listing => (
                  <ItemCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {mockTrades.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-gray-400">No sales history</p>
              </div>
            ) : (
              mockTrades.map(trade => (
                <div key={trade.id} className="card p-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-400">
                          {formatDate(trade.date)}
                        </span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                            Gave
                          </p>
                          <p className="text-white font-medium">{trade.gave}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                            Received
                          </p>
                          <p className="text-white font-medium">{trade.received}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Link
                        to={`/profile/${trade.partner}`}
                        className="text-primary hover:underline"
                      >
                        {trade.partner}
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {userReviews.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-gray-400">No reviews yet</p>
              </div>
            ) : (
              userReviews.map(review => (
                <div key={review.id} className="card p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.reviewerUsername}`}
                      alt={review.reviewerUsername}
                      className="w-12 h-12 rounded-full ring-2 ring-dark-700"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <Link
                          to={`/profile/${review.reviewerUsername}`}
                          className="font-medium text-white hover:text-primary transition-colors"
                        >
                          {review.reviewerUsername}
                        </Link>
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} size="sm" />
                          <span className="text-sm text-gray-500">
                            {formatDate(review.date)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
