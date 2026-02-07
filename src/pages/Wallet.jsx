import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, ArrowDownCircle, ArrowUpCircle, Lock } from 'lucide-react';
import Badge from '../components/Badge';
import { transactionsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Wallet = () => {
  const { user, updateUser } = useAuth();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await transactionsAPI.getAll();
      setTransactions(response.data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      setError('Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setActionLoading(true);
    try {
      await transactionsAPI.deposit(amount);
      setDepositAmount('');
      await fetchTransactions();
      
      // Update user balance in context
      if (user) {
        updateUser({ ...user, balance: user.balance + amount });
      }
      alert('Deposit successful!');
    } catch (err) {
      console.error('Failed to deposit:', err);
      alert(err.response?.data?.message || 'Failed to deposit');
    } finally {
      setActionLoading(false);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (user && amount > user.balance) {
      alert('Insufficient balance');
      return;
    }

    setActionLoading(true);
    try {
      await transactionsAPI.withdraw(amount);
      setWithdrawAmount('');
      await fetchTransactions();
      
      // Update user balance in context
      if (user) {
        updateUser({ ...user, balance: user.balance - amount });
      }
      alert('Withdrawal successful!');
    } catch (err) {
      console.error('Failed to withdraw:', err);
      alert(err.response?.data?.message || 'Failed to withdraw');
    } finally {
      setActionLoading(false);
    }
  };

  const balance = {
    available: user?.balance || 0,
    frozen: user?.frozenBalance || 0,
    total: (user?.balance || 0) + (user?.frozenBalance || 0),
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'DEPOSIT':
        return <ArrowDownCircle className="w-5 h-5 text-green-500" />;
      case 'WITHDRAWAL':
        return <ArrowUpCircle className="w-5 h-5 text-red-500" />;
      case 'PURCHASE':
      case 'ESCROW_HOLD':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'SALE_EARNING':
      case 'ESCROW_RELEASE':
      case 'REFUND':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      default:
        return <DollarSign className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTransactionColor = (amount) => {
    return amount >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    console.log('Deposit amount:', depositAmount);
    // API call would go here
    setDepositAmount('');
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Wallet</h1>
          <p className="text-gray-400">Manage your balance and view transaction history</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Available Balance */}
          <div className="card p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Available Balance</h3>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-white">${balance.available.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">Ready to spend</p>
          </div>

          {/* Frozen/Escrow Balance */}
          <div className="card p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">In Escrow</h3>
              <Lock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-white">${balance.frozen.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">Held for pending orders</p>
          </div>

          {/* Total Balance */}
          <div className="card p-6 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Total Balance</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-white">${balance.total.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">Available + Escrow</p>
          </div>
        </div>

        {/* Deposit/Withdraw Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Deposit */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Deposit Funds</h3>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Amount (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    className="input pl-10"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={actionLoading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowDownCircle className="w-4 h-4 mr-2" />
                {actionLoading ? 'Processing...' : 'Add Funds'}
              </button>
            </form>
          </div>

          {/* Withdraw */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Withdraw Funds</h3>
            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Available to withdraw:
                </label>
                <p className="text-2xl font-bold text-primary mb-4">${balance.available.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Amount (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="number"
                    step="0.01"
                    min="10"
                    max={balance.available}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="input pl-10"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={actionLoading}
                className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowUpCircle className="w-4 h-4 mr-2" />
                {actionLoading ? 'Processing...' : 'Request Withdrawal'}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Minimum withdrawal: $10.00
            </p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Transaction History</h3>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading transactions...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-dark-850 border border-dark-700 rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-dark-900 rounded-full flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{transaction.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${getTransactionColor(transaction.amount)}`}>
                      {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Balance: ${transaction.balanceAfter.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
