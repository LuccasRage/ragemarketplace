import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Eye, Heart, Clock, MessageCircle, Flag, Share2, ArrowLeft } from 'lucide-react';
import Badge from '../components/Badge';
import StarRating from '../components/StarRating';
import { listingsAPI, ordersAPI, usersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [listing, setListing] = useState(null);
  const [seller, setSeller] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBuying, setIsBuying] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await listingsAPI.getById(id);
        setListing(response.data);
        
        // Fetch seller info
        if (response.data.userId) {
          const sellerResponse = await usersAPI.getById(response.data.userId);
          setSeller(sellerResponse.data);
        }
      } catch (err) {
        console.error('Failed to fetch listing:', err);
        setError('Failed to load listing');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!user || user.balance < listing.price) {
      alert('Insufficient balance. Please add funds to your wallet.');
      navigate('/wallet');
      return;
    }

    setIsBuying(true);
    try {
      await ordersAPI.buyItem(listing.id);
      alert('Purchase successful! Check your orders page.');
      navigate('/orders');
    } catch (err) {
      console.error('Failed to buy item:', err);
      alert(err.response?.data?.message || 'Failed to complete purchase');
    } finally {
      setIsBuying(false);
      setShowBuyModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !listing) {
  if (error || !listing) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Listing Not Found</h2>
          <p className="text-gray-400 mb-6">{error || "The listing you're looking for doesn't exist."}</p>
          <Link to="/listings" className="btn-primary">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isOwnListing = user && seller && user.id === seller.id;

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="card p-6">
              {/* Price Display */}
              <div className="mb-4 p-4 bg-dark-900 rounded-lg border-2 border-primary">
                <p className="text-sm text-gray-400 mb-1">Price</p>
                <p className="text-4xl font-bold text-primary">${listing.price ? listing.price.toFixed(2) : '0.00'}</p>
              </div>

              <div className="relative aspect-square bg-gradient-to-br from-dark-800 to-dark-850 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-7xl">🐾</span>
                    </div>
                    <p className="text-gray-500">Pet Image</p>
                  </div>
                </div>
                
                {listing.rarity !== 'Normal' && (
                  <div className="absolute top-4 left-4">
                    <Badge type="rarity" value={listing.rarity} />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowBuyModal(true)}
                  disabled={isBuying || isOwnListing}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-5 h-5" />
                  {isOwnListing ? 'Your Listing' : isBuying ? 'Processing...' : 'Buy Now'}
                </button>
                <button className="px-4 py-3 bg-dark-900 text-gray-400 hover:text-white rounded-lg transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="px-4 py-3 bg-dark-900 text-gray-400 hover:text-white rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="px-4 py-3 bg-dark-900 text-gray-400 hover:text-primary rounded-lg transition-colors">
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              {/* Escrow Info */}
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-400 flex items-center gap-2">
                  💰 Funds held securely in escrow until you confirm delivery
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="card p-6">
              <h1 className="text-3xl font-bold text-white mb-4">{listing.petName}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge type="category" value={listing.category} />
                <Badge type="age" value={listing.age} />
                {listing.potion !== 'None' && (
                  <Badge type="potion" value={listing.potion} />
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                    Description
                  </p>
                  <p className="text-lg text-white">{listing.description || 'No description provided.'}</p>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{listing.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>{listing.favorites} favorites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Posted {formatDate(listing.datePosted)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Listings */}
            {/* Removed similar listings section for now */}
          </div>

          {/* Right Column - Seller Info */}
          <div className="space-y-6">
            {/* Seller Card */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Seller Information</h2>
              
              {seller && (
                <div className="space-y-4">
                  <Link
                    to={`/profile/${seller.username}`}
                    className="flex items-center gap-3 group"
                  >
                    <img
                      src={seller.avatar}
                      alt={seller.username}
                      className="w-16 h-16 rounded-full ring-2 ring-dark-700 group-hover:ring-primary transition-all"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium group-hover:text-primary transition-colors">
                          {seller.username}
                        </p>
                        {seller.verified && (
                          <span className="text-primary text-xs">✓</span>
                        )}
                      </div>
                      <StarRating rating={seller.reputation} size="sm" />
                      <p className="text-xs text-gray-500">
                        {seller.reviewCount} reviews
                      </p>
                    </div>
                  </Link>

                  <div className="pt-4 border-t border-dark-700 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Listings</span>
                      <span className="text-white">{seller.activeListings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Completed Sales</span>
                      <span className="text-white">{seller.completedTrades}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Member Since</span>
                      <span className="text-white">
                        {new Date(seller.joinDate).getFullYear()}
                      </span>
                    </div>
                  </div>

                  {seller.bio && (
                    <div className="pt-4 border-t border-dark-700">
                      <p className="text-sm text-gray-400">{seller.bio}</p>
                    </div>
                  )}

                  <Link
                    to={`/profile/${seller.username}`}
                    className="block w-full px-4 py-2 bg-dark-900 text-white text-center rounded-lg hover:bg-dark-800 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              )}
            </div>

            {/* Trading Tips */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-white mb-4">Safety Tips</h2>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Funds are held in escrow for your protection</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Check seller's reputation and reviews before buying</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Never share personal account information</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Report suspicious activity immediately</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Buy Confirmation Modal */}
        {showBuyModal && (
          <Modal onClose={() => setShowBuyModal(false)}>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Confirm Purchase</h3>
              <p className="text-gray-400 mb-4">
                Are you sure you want to buy <span className="text-white font-semibold">{listing.petName}</span> for{' '}
                <span className="text-primary font-semibold">${listing.price.toFixed(2)}</span>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Funds will be held in escrow until you confirm delivery.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleBuyNow}
                  disabled={isBuying}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBuying ? 'Processing...' : 'Confirm Purchase'}
                </button>
                <button
                  onClick={() => setShowBuyModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ListingDetail;
