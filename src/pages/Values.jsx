import { useState } from 'react';
import { Search, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import Badge from '../components/Badge';
import { mockValues, demandLevels, tiers } from '../data/mockValues';

const Values = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [demandFilter, setDemandFilter] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');
  const [sortBy, setSortBy] = useState('value');
  const [sortOrder, setSortOrder] = useState('desc');

  const categories = ['All', 'Dragon', 'Bird', 'Safari', 'Aussie', 'Christmas', 'Jungle', 'Unicorn', 'Egg', 'Mythic', 'Fossil', 'Halloween', 'Pet', 'Vehicle', 'Monkey'];

  const filteredValues = mockValues
    .filter(pet => {
      if (searchTerm && !pet.petName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (categoryFilter !== 'All' && pet.category !== categoryFilter) {
        return false;
      }
      if (demandFilter !== 'All' && pet.demand !== demandFilter) {
        return false;
      }
      if (tierFilter !== 'All' && pet.tier !== tierFilter) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'value') {
        comparison = a.value - b.value;
      } else if (sortBy === 'name') {
        comparison = a.petName.localeCompare(b.petName);
      } else if (sortBy === 'demand') {
        const demandOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        comparison = demandOrder[a.demand] - demandOrder[b.demand];
      } else if (sortBy === 'tier') {
        comparison = a.tier.localeCompare(b.tier);
      } else {
        comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'High':
        return 'bg-green-500/20 text-green-500';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'Low':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getTierColor = (tier) => {
    if (tier.startsWith('S')) return 'bg-purple-500/20 text-purple-400';
    if (tier.startsWith('A')) return 'bg-blue-500/20 text-blue-400';
    if (tier.startsWith('B')) return 'bg-green-500/20 text-green-400';
    if (tier.startsWith('C')) return 'bg-gray-500/20 text-gray-400';
    return 'bg-gray-500/20 text-gray-400';
  };

  const renderSortIcon = (column) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Pet Value Guide</h1>
          <p className="text-gray-400">Check current pet values and market demand</p>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Pet
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="Search by name..."
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Demand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Demand
              </label>
              <select
                value={demandFilter}
                onChange={(e) => setDemandFilter(e.target.value)}
                className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
              >
                {demandLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Tier Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tier
              </label>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
              >
                {tiers.map(tier => (
                  <option key={tier} value={tier}>{tier}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-dark-700">
            <p className="text-gray-400">
              Showing {filteredValues.length} of {mockValues.length} pets
            </p>
          </div>
        </div>

        {/* Values Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-900">
                <tr>
                  <th
                    onClick={() => toggleSort('name')}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-300 cursor-pointer hover:bg-dark-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Pet Name
                      {renderSortIcon('name')}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Category
                  </th>
                  <th
                    onClick={() => toggleSort('value')}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-300 cursor-pointer hover:bg-dark-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Value
                      {renderSortIcon('value')}
                    </div>
                  </th>
                  <th
                    onClick={() => toggleSort('demand')}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-300 cursor-pointer hover:bg-dark-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Demand
                      {renderSortIcon('demand')}
                    </div>
                  </th>
                  <th
                    onClick={() => toggleSort('tier')}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-300 cursor-pointer hover:bg-dark-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Tier
                      {renderSortIcon('tier')}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Info
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {filteredValues.map((pet) => (
                  <tr
                    key={pet.id}
                    className="hover:bg-dark-900 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{pet.petName}</span>
                        {pet.trending && (
                          <span className="text-primary" title="Trending">
                            <TrendingUp className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge type="category" value={pet.category} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-bold">{pet.value}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDemandColor(pet.demand)}`}>
                        {pet.demand}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTierColor(pet.tier)}`}>
                        {pet.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-400 max-w-xs">
                        {pet.description}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredValues.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-400">No pets found matching your filters</p>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="card p-6 mt-8">
          <h2 className="text-xl font-bold text-white mb-4">About Pet Values</h2>
          <div className="space-y-3 text-sm text-gray-400">
            <p>
              <span className="font-medium text-white">Value:</span> Represents the approximate worth of a pet in terms of other pets. Higher values indicate rarer/more valuable pets.
            </p>
            <p>
              <span className="font-medium text-white">Demand:</span> Shows how actively sought after a pet is in the trading community.
            </p>
            <p>
              <span className="font-medium text-white">Tier:</span> Overall ranking of the pet, with S+ being the highest and C being the lowest.
            </p>
            <p className="text-primary">
              Note: Values are approximate and can fluctuate based on market trends. Always do your research before trading!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Values;
