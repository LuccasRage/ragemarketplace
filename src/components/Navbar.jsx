import { Link, NavLink } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, Settings, Package } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/listings', label: 'Marketplace' },
    { to: '/values', label: 'Values' },
    { to: '/orders', label: 'Orders' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-dark-900 border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-primary transition-colors">
              Rage<span className="text-primary">Marketplace</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-dark-850'
                      : 'text-gray-400 hover:text-white hover:bg-dark-850'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search pets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-850 border border-dark-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/wallet"
                  className="px-4 py-2 bg-dark-850 border border-dark-700 rounded-lg text-sm font-medium text-primary hover:bg-dark-800 transition-colors"
                >
                  💰 ${user?.balance?.toFixed(2) || '0.00'}
                </Link>
                <Link
                  to="/create"
                  className="btn-primary text-sm"
                >
                  Sell
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
                      alt={user?.username}
                      className="w-8 h-8 rounded-full border-2 border-primary"
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-dark-850 border border-dark-700 rounded-lg shadow-xl py-2">
                      <Link
                        to={`/profile/${user?.username}`}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-dark-800 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm">Profile</span>
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-dark-800 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        <span className="text-sm">My Orders</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-dark-800 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Settings</span>
                      </Link>
                      <hr className="my-2 border-dark-700" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-dark-800 transition-colors w-full text-left text-red-400"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-850 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-dark-700 bg-dark-900">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search pets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-850 border border-dark-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500"
              />
            </div>

            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-dark-850'
                      : 'text-gray-400 hover:text-white hover:bg-dark-850'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/wallet"
                  className="block px-4 py-2 bg-dark-850 border border-dark-700 text-primary text-center font-medium rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  💰 ${user?.balance?.toFixed(2) || '0.00'}
                </Link>
                <Link
                  to="/create"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 bg-primary hover:bg-primary-600 text-white text-center font-medium rounded-lg transition-colors"
                >
                  Sell
                </Link>
                <Link
                  to={`/profile/${user?.username}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-dark-850 rounded-lg text-sm"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-dark-850 rounded-lg text-sm"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-dark-850 rounded-lg text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 bg-dark-850 hover:bg-dark-800 text-white text-center font-medium rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 bg-primary hover:bg-primary-600 text-white text-center font-medium rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
