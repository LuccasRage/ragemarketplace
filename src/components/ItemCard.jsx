import { Link } from 'react-router-dom';
import { Eye, Heart, Clock } from 'lucide-react';
import Badge from './Badge';
import StarRating from './StarRating';

const ItemCard = ({ listing }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="card p-4 hover:shadow-xl hover:shadow-primary/10 transition-all duration-200 group"
    >
      {/* Image Placeholder */}
      <div className="relative mb-4 aspect-square bg-gradient-to-br from-dark-800 to-dark-850 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-2">
              <span className="text-3xl">🐾</span>
            </div>
            <p className="text-xs text-gray-500">Pet Image</p>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {listing.rarity !== 'Normal' && (
            <Badge type="rarity" value={listing.rarity} />
          )}
        </div>
        
        {/* Favorite Button */}
        <button className="absolute top-2 right-2 w-8 h-8 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary transition-colors group/fav">
          <Heart className="w-4 h-4 text-gray-400 group-hover/fav:text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Pet Name */}
        <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
          {listing.petName}
        </h3>

        {/* Attributes */}
        <div className="flex flex-wrap gap-2">
          <Badge type="age" value={listing.age} />
          {listing.potion !== 'None' && (
            <Badge type="potion" value={listing.potion} />
          )}
        </div>

        {/* Want in Return */}
        <div className="bg-dark-850 rounded-lg p-2">
          <p className="text-xs text-gray-500 mb-1">Price:</p>
          <p className="text-lg font-bold text-primary">${listing.price ? listing.price.toFixed(2) : '0.00'}</p>
        </div>

        {/* User Info */}
        <div className="flex items-center justify-between pt-3 border-t border-dark-700">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary">
                {listing.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm text-white font-medium">{listing.username}</p>
              <div className="flex items-center space-x-1">
                <StarRating rating={listing.userReputation} size="xs" />
                <span className="text-xs text-gray-500">
                  {listing.userReputation.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{listing.views}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{listing.favorites}</span>
            </span>
          </div>
          <span className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatDate(listing.datePosted)}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
