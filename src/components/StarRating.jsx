import { Star, StarHalf } from 'lucide-react';

const StarRating = ({ rating, size = 'sm', showCount = false, count = 0 }) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className={`${sizeClasses[size]} fill-yellow-500 text-yellow-500`}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf
            key={i}
            className={`${sizeClasses[size]} fill-yellow-500 text-yellow-500`}
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            className={`${sizeClasses[size]} text-gray-600`}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center">
        {renderStars()}
      </div>
      {showCount && count > 0 && (
        <span className="text-sm text-gray-400">({count})</span>
      )}
    </div>
  );
};

export default StarRating;
