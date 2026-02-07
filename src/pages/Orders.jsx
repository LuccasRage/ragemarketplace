import { useState } from 'react';
import { Package, Clock, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';
import Badge from '../components/Badge';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('purchases');

  const mockOrders = {
    purchases: [
      {
        id: 1,
        petName: 'Frost Dragon',
        petCategory: 'Legendary',
        age: 'Full Grown',
        potion: 'Fly Ride',
        rarity: 'Neon',
        price: 500.00,
        seller: {
          username: 'DragonTrader99',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DragonTrader99',
          robloxUsername: 'DragonTrader99',
        },
        status: 'DELIVERED',
        createdAt: '2024-02-07T10:30:00Z',
        sellerDeliveredAt: '2024-02-07T11:00:00Z',
      },
      {
        id: 2,
        petName: 'Shadow Dragon',
        petCategory: 'Legendary',
        age: 'Full Grown',
        potion: 'Fly Ride',
        rarity: 'Normal',
        price: 150.00,
        seller: {
          username: 'NightWingTrader',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NightWingTrader',
          robloxUsername: 'NightWingTrader',
        },
        status: 'PENDING_DELIVERY',
        createdAt: '2024-02-07T09:15:00Z',
      },
    ],
    sales: [
      {
        id: 3,
        petName: 'Parrot',
        petCategory: 'Legendary',
        age: 'Teen',
        potion: 'Fly',
        rarity: 'Normal',
        price: 45.00,
        buyer: {
          username: 'FrostyTrades',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FrostyTrades',
          robloxUsername: 'FrostyTrades',
        },
        status: 'PENDING_DELIVERY',
        createdAt: '2024-02-06T14:20:00Z',
      },
      {
        id: 4,
        petName: 'Evil Unicorn',
        petCategory: 'Legendary',
        age: 'Full Grown',
        potion: 'Fly Ride',
        rarity: 'Normal',
        price: 65.00,
        buyer: {
          username: 'SafariHunter',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SafariHunter',
          robloxUsername: 'SafariHunter',
        },
        status: 'COMPLETED',
        createdAt: '2024-02-05T16:45:00Z',
        sellerDeliveredAt: '2024-02-05T17:00:00Z',
        buyerConfirmedAt: '2024-02-05T17:30:00Z',
      },
    ],
  };

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

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING_DELIVERY: { variant: 'warning', label: 'Pending Delivery' },
      DELIVERED: { variant: 'info', label: 'Delivered' },
      COMPLETED: { variant: 'success', label: 'Completed' },
      DISPUTED: { variant: 'danger', label: 'Disputed' },
      REFUNDED: { variant: 'secondary', label: 'Refunded' },
    };

    const config = statusConfig[status] || { variant: 'secondary', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING_DELIVERY':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'DELIVERED':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'DISPUTED':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleMarkDelivered = (orderId) => {
    console.log('Mark delivered:', orderId);
    // API call would go here
  };

  const handleConfirmReceipt = (orderId) => {
    console.log('Confirm receipt:', orderId);
    // API call would go here
  };

  const handleOpenDispute = (orderId) => {
    console.log('Open dispute:', orderId);
    // Navigate to dispute page
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
          <p className="text-gray-400">Track your purchases and sales</p>
        </div>

        {/* Tabs */}
        <div className="card p-2 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('purchases')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'purchases'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              My Purchases
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'sales'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              My Sales
            </button>
          </div>
        </div>

        {/* Purchases Tab */}
        {activeTab === 'purchases' && (
          <div className="space-y-4">
            {mockOrders.purchases.length === 0 ? (
              <div className="card p-12 text-center">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No purchases yet</h3>
                <p className="text-gray-400 mb-6">Start shopping in our marketplace!</p>
                <Link to="/listings" className="btn-primary inline-flex items-center">
                  Browse Marketplace
                </Link>
              </div>
            ) : (
              mockOrders.purchases.map((order) => (
                <div key={order.id} className="card p-6 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {order.petName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{order.age}</span>
                            <span>•</span>
                            <span>{order.potion}</span>
                            <span>•</span>
                            <span>{order.rarity}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusIcon(order.status)}
                          {getStatusBadge(order.status)}
                        </div>
                      </div>

                      {/* Seller Info */}
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-dark-700">
                        <img
                          src={order.seller.avatar}
                          alt={order.seller.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm text-gray-400">Seller</p>
                          <Link
                            to={`/profile/${order.seller.username}`}
                            className="text-white hover:text-primary font-medium"
                          >
                            {order.seller.username}
                          </Link>
                          <p className="text-xs text-gray-500">Roblox: {order.seller.robloxUsername}</p>
                        </div>
                      </div>

                      {/* Price & Date */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                          <DollarSign className="w-5 h-5" />
                          ${order.price.toFixed(2)}
                        </div>
                        <span className="text-gray-500">{formatDate(order.createdAt)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 lg:w-48">
                      {order.status === 'DELIVERED' && (
                        <>
                          <button
                            onClick={() => handleConfirmReceipt(order.id)}
                            className="btn-primary w-full"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirm Received
                          </button>
                          <button
                            onClick={() => handleOpenDispute(order.id)}
                            className="btn-secondary w-full text-sm"
                          >
                            Open Dispute
                          </button>
                        </>
                      )}
                      {order.status === 'PENDING_DELIVERY' && (
                        <button
                          onClick={() => handleOpenDispute(order.id)}
                          className="btn-secondary w-full"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Issue?
                        </button>
                      )}
                      {order.status === 'COMPLETED' && (
                        <Link
                          to={`/orders/${order.id}/review`}
                          className="btn-secondary w-full text-center"
                        >
                          Leave Review
                        </Link>
                      )}
                      <Link
                        to={`/orders/${order.id}`}
                        className="text-center text-sm text-gray-400 hover:text-primary py-2"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-4">
            {mockOrders.sales.length === 0 ? (
              <div className="card p-12 text-center">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No sales yet</h3>
                <p className="text-gray-400 mb-6">Create a listing to start selling!</p>
                <Link to="/create" className="btn-primary inline-flex items-center">
                  Create Listing
                </Link>
              </div>
            ) : (
              mockOrders.sales.map((order) => (
                <div key={order.id} className="card p-6 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {order.petName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{order.age}</span>
                            <span>•</span>
                            <span>{order.potion}</span>
                            <span>•</span>
                            <span>{order.rarity}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusIcon(order.status)}
                          {getStatusBadge(order.status)}
                        </div>
                      </div>

                      {/* Buyer Info */}
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-dark-700">
                        <img
                          src={order.buyer.avatar}
                          alt={order.buyer.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm text-gray-400">Buyer</p>
                          <Link
                            to={`/profile/${order.buyer.username}`}
                            className="text-white hover:text-primary font-medium"
                          >
                            {order.buyer.username}
                          </Link>
                          <p className="text-xs text-gray-500">Roblox: {order.buyer.robloxUsername}</p>
                        </div>
                      </div>

                      {/* Price & Date */}
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                            <DollarSign className="w-5 h-5" />
                            ${order.price.toFixed(2)}
                          </div>
                          {order.status === 'COMPLETED' && (
                            <p className="text-xs text-gray-500 mt-1">
                              You earned: ${(order.price * 0.93).toFixed(2)} (7% platform fee)
                            </p>
                          )}
                        </div>
                        <span className="text-gray-500">{formatDate(order.createdAt)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 lg:w-48">
                      {order.status === 'PENDING_DELIVERY' && (
                        <>
                          <button
                            onClick={() => handleMarkDelivered(order.id)}
                            className="btn-primary w-full"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Delivered
                          </button>
                          <button
                            onClick={() => handleOpenDispute(order.id)}
                            className="btn-secondary w-full text-sm"
                          >
                            Issue?
                          </button>
                        </>
                      )}
                      {(order.status === 'DELIVERED' || order.status === 'COMPLETED') && (
                        <div className="bg-dark-850 border border-dark-700 rounded-lg p-3 text-sm text-center">
                          <p className="text-gray-400 mb-1">Waiting for buyer</p>
                          <p className="text-xs text-gray-500">to confirm receipt</p>
                        </div>
                      )}
                      <Link
                        to={`/orders/${order.id}`}
                        className="text-center text-sm text-gray-400 hover:text-primary py-2"
                      >
                        View Details
                      </Link>
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

export default Orders;
