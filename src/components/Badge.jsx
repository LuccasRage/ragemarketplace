const Badge = ({ type, value }) => {
  const getBadgeStyles = () => {
    switch (type) {
      case 'rarity':
        if (value === 'Mega Neon') {
          return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
        }
        if (value === 'Neon') {
          return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
        }
        return 'bg-gray-700 text-gray-300';
      
      case 'potion':
        if (value === 'Fly Ride' || value === 'Fly & Ride') {
          return 'bg-gradient-to-r from-green-500 to-blue-500 text-white';
        }
        if (value === 'Fly') {
          return 'bg-blue-600 text-white';
        }
        if (value === 'Ride') {
          return 'bg-green-600 text-white';
        }
        return 'bg-gray-700 text-gray-300';
      
      case 'age':
        const ageColors = {
          'Newborn': 'bg-red-900/50 text-red-300 border border-red-700',
          'Junior': 'bg-orange-900/50 text-orange-300 border border-orange-700',
          'Pre-Teen': 'bg-yellow-900/50 text-yellow-300 border border-yellow-700',
          'Teen': 'bg-green-900/50 text-green-300 border border-green-700',
          'Post-Teen': 'bg-blue-900/50 text-blue-300 border border-blue-700',
          'Full Grown': 'bg-purple-900/50 text-purple-300 border border-purple-700',
        };
        return ageColors[value] || 'bg-gray-700 text-gray-300';
      
      case 'demand':
        if (value === 'High') return 'bg-green-600 text-white';
        if (value === 'Medium') return 'bg-yellow-600 text-white';
        if (value === 'Low') return 'bg-red-600 text-white';
        return 'bg-gray-700 text-gray-300';
      
      case 'tier':
        return 'bg-primary/20 text-primary border border-primary';
      
      case 'status':
        if (value === 'Pending') return 'bg-yellow-600 text-white';
        if (value === 'Accepted') return 'bg-green-600 text-white';
        if (value === 'Declined') return 'bg-red-600 text-white';
        if (value === 'Completed') return 'bg-blue-600 text-white';
        return 'bg-gray-700 text-gray-300';
      
      case 'verified':
        return 'bg-blue-600 text-white';
      
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getBadgeStyles()}`}>
      {value}
    </span>
  );
};

export default Badge;
