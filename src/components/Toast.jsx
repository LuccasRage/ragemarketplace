import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

const Toast = ({ type = 'info', message, isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-900/90',
          border: 'border-green-600',
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        };
      case 'error':
        return {
          bg: 'bg-red-900/90',
          border: 'border-red-600',
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        };
      case 'warning':
        return {
          bg: 'bg-yellow-900/90',
          border: 'border-yellow-600',
          icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
        };
      default:
        return {
          bg: 'bg-blue-900/90',
          border: 'border-blue-600',
          icon: <Info className="w-5 h-5 text-blue-500" />,
        };
    }
  };

  const styles = getStyles();

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
      <div
        className={`${styles.bg} ${styles.border} border backdrop-blur-sm rounded-lg shadow-xl p-4 flex items-center space-x-3 min-w-[300px] max-w-md`}
      >
        {styles.icon}
        <p className="flex-1 text-white text-sm">{message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
