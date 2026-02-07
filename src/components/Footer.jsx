import { Link } from 'react-router-dom';
import { Twitter, Github, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    marketplace: [
      { label: 'Browse Listings', to: '/listings' },
      { label: 'Create Listing', to: '/create' },
      { label: 'Value Guide', to: '/values' },
      { label: 'My Orders', to: '/orders' },
    ],
    support: [
      { label: 'Report Scam', to: '/reports' },
      { label: 'Help Center', to: '#' },
      { label: 'Safety Tips', to: '#' },
      { label: 'Safety Guide', to: '#' },
    ],
    legal: [
      { label: 'Terms of Service', to: '#' },
      { label: 'Privacy Policy', to: '#' },
      { label: 'Cookie Policy', to: '#' },
      { label: 'Guidelines', to: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: MessageCircle, label: 'Discord', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Mail, label: 'Email', href: 'mailto:support@ragemarketplace.com' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold text-white">
                Rage<span className="text-primary">Marketplace</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4 max-w-xs">
              The trusted marketplace for Roblox Adopt Me pet buying and selling. Connect with users, find fair deals, and build your dream collection.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-dark-850 hover:bg-dark-800 border border-dark-700 hover:border-primary rounded-lg flex items-center justify-center transition-all duration-200 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-2">
              {footerLinks.marketplace.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} RageMarketplace. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Not affiliated with Roblox Corporation. Adopt Me is a trademark of Uplift Games.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
