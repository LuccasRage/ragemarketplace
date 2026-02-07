const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="h-full w-full border-4 border-gray-700 border-t-primary rounded-full"></div>
      </div>
      {text && <p className="mt-4 text-gray-400 text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
