import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filterType, value) => {
    onFilterChange({ ...filters, [filterType]: value });
  };

  const FilterSection = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-300 mb-3">{title}</h3>
      {children}
    </div>
  );

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Search */}
      <FilterSection title="Search">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search pet name..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="input pl-10"
          />
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category">
        <select
          value={filters.category || 'All'}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="input"
        >
          <option value="All">All Categories</option>
          <option value="Dragon">Dragon</option>
          <option value="Bird">Bird</option>
          <option value="Safari">Safari</option>
          <option value="Aussie">Aussie</option>
          <option value="Christmas">Christmas</option>
          <option value="Jungle">Jungle</option>
          <option value="Unicorn">Unicorn</option>
          <option value="Egg">Egg</option>
          <option value="Mythic">Mythic</option>
        </select>
      </FilterSection>

      {/* Age */}
      <FilterSection title="Age">
        <select
          value={filters.age || 'All'}
          onChange={(e) => handleFilterChange('age', e.target.value)}
          className="input"
        >
          <option value="All">All Ages</option>
          <option value="Newborn">Newborn</option>
          <option value="Junior">Junior</option>
          <option value="Pre-Teen">Pre-Teen</option>
          <option value="Teen">Teen</option>
          <option value="Post-Teen">Post-Teen</option>
          <option value="Full Grown">Full Grown</option>
        </select>
      </FilterSection>

      {/* Potion */}
      <FilterSection title="Potion">
        <select
          value={filters.potion || 'All'}
          onChange={(e) => handleFilterChange('potion', e.target.value)}
          className="input"
        >
          <option value="All">All Potions</option>
          <option value="None">None</option>
          <option value="Fly">Fly</option>
          <option value="Ride">Ride</option>
          <option value="Fly Ride">Fly Ride</option>
        </select>
      </FilterSection>

      {/* Rarity */}
      <FilterSection title="Rarity">
        <select
          value={filters.rarity || 'All'}
          onChange={(e) => handleFilterChange('rarity', e.target.value)}
          className="input"
        >
          <option value="All">All Rarities</option>
          <option value="Normal">Normal</option>
          <option value="Neon">Neon</option>
          <option value="Mega Neon">Mega Neon</option>
        </select>
      </FilterSection>

      {/* Sort */}
      <FilterSection title="Sort By">
        <select
          value={filters.sort || 'newest'}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className="input"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">Most Popular</option>
          <option value="views">Most Views</option>
        </select>
      </FilterSection>

      {/* Reset Button */}
      <button
        onClick={() => onFilterChange({
          search: '',
          category: 'All',
          age: 'All',
          potion: 'All',
          rarity: 'All',
          sort: 'newest'
        })}
        className="w-full btn-secondary"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full btn-secondary flex items-center justify-center space-x-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-80 bg-dark-900 border-r border-dark-700 p-6 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between mb-6 lg:mb-0">
          <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>
        
        <FilterContent />
      </div>
    </>
  );
};

export default FilterSidebar;
