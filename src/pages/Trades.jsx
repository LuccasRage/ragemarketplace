import { useState } from 'react';
import { Clock, ArrowRight, ArrowLeft, CheckCircle, X } from 'lucide-react';
import Badge from '../components/Badge';

const Trades = () => {
  const [activeTab, setActiveTab] = useState('incoming');

  const mockTrades = {
    incoming: [
      {
        id: 1,
        from: 'DragonTrader99',
        fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DragonTrader99',
        offering: ['Frost Dragon (FR)', 'Parrot (R)'],
        requesting: ['Shadow Dragon (FR)'],
        date: '2024-02-07T10:30:00Z',
        status: 'pending',
        message: 'Fair trade! Let me know if interested.'
      },
      {
        id: 2,
        from: 'NightWingTrader',
        fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NightWingTrader',
        offering: ['Evil Unicorn (NFR)', 'Turtle (FR)'],
        requesting: ['Bat Dragon (FR)'],
        date: '2024-02-07T09:15:00Z',
        status: 'pending',
        message: 'Can add small pets if needed!'
      }
    ],
    outgoing: [
      {
        id: 3,
        to: 'FrostyTrades',
        toAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FrostyTrades',
        offering: ['Owl (FR)', 'Kangaroo (R)'],
        requesting: ['Parrot (FR)'],
        date: '2024-02-06T14:20:00Z',
        status: 'pending',
        message: 'Looking for a fair trade!'
      }
    ],
    completed: [
      {
        id: 4,
        partner: 'SafariHunter',
        partnerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SafariHunter',
        gave: ['Arctic Reindeer (FR)'],
        received: ['Turtle (FR)', 'Dodo (R)'],
        date: '2024-02-05T16:45:00Z',
        status: 'completed'
      },
      {
        id: 5,
        partner: 'ParrotLover',
        partnerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ParrotLover',
        gave: ['Crow (FR)'],
        received: ['Evil Unicorn (R)'],
        date: '2024-02-03T11:20:00Z',
        status: 'completed'
      }
    ]
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

  const handleAcceptTrade = (tradeId) => {
    console.log('Accept trade:', tradeId);
  };

  const handleDeclineTrade = (tradeId) => {
    console.log('Decline trade:', tradeId);
  };

  const handleCancelTrade = (tradeId) => {
    console.log('Cancel trade:', tradeId);
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Trade Offers</h1>
          <p className="text-gray-400">Manage your incoming and outgoing trade offers</p>
        </div>

        {/* Tabs */}
        <div className="card p-2 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('incoming')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'incoming'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
              }`}
            >
              Incoming ({mockTrades.incoming.length})
            </button>
            <button
              onClick={() => setActiveTab('outgoing')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'outgoing'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
              }`}
            >
              Outgoing ({mockTrades.outgoing.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
              }`}
            >
              Completed ({mockTrades.completed.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'incoming' && (
            <>
              {mockTrades.incoming.length === 0 ? (
                <div className="card p-12 text-center">
                  <p className="text-gray-400">No incoming trade offers</p>
                </div>
              ) : (
                mockTrades.incoming.map(trade => (
                  <div key={trade.id} className="card p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <img
                          src={trade.fromAvatar}
                          alt={trade.from}
                          className="w-12 h-12 rounded-full ring-2 ring-dark-700"
                        />
                        <div>
                          <p className="text-white font-medium">{trade.from}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(trade.date)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Trade Details */}
                      <div className="flex-1 flex flex-col sm:flex-row items-center gap-4">
                        {/* Offering */}
                        <div className="flex-1 p-4 bg-dark-900 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                            Offering
                          </p>
                          <div className="space-y-1">
                            {trade.offering.map((item, index) => (
                              <p key={index} className="text-white text-sm">{item}</p>
                            ))}
                          </div>
                        </div>

                        <ArrowRight className="w-6 h-6 text-gray-500 hidden sm:block" />
                        <ArrowLeft className="w-6 h-6 text-gray-500 block sm:hidden rotate-90" />

                        {/* Requesting */}
                        <div className="flex-1 p-4 bg-dark-900 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                            For Your
                          </p>
                          <div className="space-y-1">
                            {trade.requesting.map((item, index) => (
                              <p key={index} className="text-white text-sm">{item}</p>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2">
                        <button
                          onClick={() => handleAcceptTrade(trade.id)}
                          className="flex-1 lg:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleDeclineTrade(trade.id)}
                          className="flex-1 lg:flex-none px-4 py-2 bg-dark-800 hover:bg-dark-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Decline
                        </button>
                      </div>
                    </div>

                    {trade.message && (
                      <div className="mt-4 pt-4 border-t border-dark-700">
                        <p className="text-sm text-gray-400">
                          <span className="font-medium">Message:</span> {trade.message}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'outgoing' && (
            <>
              {mockTrades.outgoing.length === 0 ? (
                <div className="card p-12 text-center">
                  <p className="text-gray-400">No outgoing trade offers</p>
                </div>
              ) : (
                mockTrades.outgoing.map(trade => (
                  <div key={trade.id} className="card p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <img
                          src={trade.toAvatar}
                          alt={trade.to}
                          className="w-12 h-12 rounded-full ring-2 ring-dark-700"
                        />
                        <div>
                          <p className="text-white font-medium">{trade.to}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(trade.date)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Trade Details */}
                      <div className="flex-1 flex flex-col sm:flex-row items-center gap-4">
                        {/* Offering */}
                        <div className="flex-1 p-4 bg-dark-900 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                            Your Offer
                          </p>
                          <div className="space-y-1">
                            {trade.offering.map((item, index) => (
                              <p key={index} className="text-white text-sm">{item}</p>
                            ))}
                          </div>
                        </div>

                        <ArrowRight className="w-6 h-6 text-gray-500 hidden sm:block" />
                        <ArrowLeft className="w-6 h-6 text-gray-500 block sm:hidden rotate-90" />

                        {/* Requesting */}
                        <div className="flex-1 p-4 bg-dark-900 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                            Requesting
                          </p>
                          <div className="space-y-1">
                            {trade.requesting.map((item, index) => (
                              <p key={index} className="text-white text-sm">{item}</p>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2">
                        <button
                          onClick={() => handleCancelTrade(trade.id)}
                          className="flex-1 lg:flex-none px-4 py-2 bg-dark-800 hover:bg-dark-700 text-white rounded-lg transition-colors"
                        >
                          Cancel Offer
                        </button>
                      </div>
                    </div>

                    {trade.message && (
                      <div className="mt-4 pt-4 border-t border-dark-700">
                        <p className="text-sm text-gray-400">
                          <span className="font-medium">Your message:</span> {trade.message}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'completed' && (
            <>
              {mockTrades.completed.length === 0 ? (
                <div className="card p-12 text-center">
                  <p className="text-gray-400">No completed trades</p>
                </div>
              ) : (
                mockTrades.completed.map(trade => (
                  <div key={trade.id} className="card p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <img
                          src={trade.partnerAvatar}
                          alt={trade.partner}
                          className="w-12 h-12 rounded-full ring-2 ring-dark-700"
                        />
                        <div>
                          <p className="text-white font-medium">{trade.partner}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{formatDate(trade.date)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Trade Details */}
                      <div className="flex-1 flex flex-col sm:flex-row items-center gap-4">
                        {/* Gave */}
                        <div className="flex-1 p-4 bg-dark-900 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                            You Gave
                          </p>
                          <div className="space-y-1">
                            {trade.gave.map((item, index) => (
                              <p key={index} className="text-white text-sm">{item}</p>
                            ))}
                          </div>
                        </div>

                        <ArrowRight className="w-6 h-6 text-green-500 hidden sm:block" />
                        <ArrowLeft className="w-6 h-6 text-green-500 block sm:hidden rotate-90" />

                        {/* Received */}
                        <div className="flex-1 p-4 bg-dark-900 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                            You Received
                          </p>
                          <div className="space-y-1">
                            {trade.received.map((item, index) => (
                              <p key={index} className="text-white text-sm">{item}</p>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Review Button */}
                      <div className="flex items-center">
                        <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
                          Leave Review
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trades;
