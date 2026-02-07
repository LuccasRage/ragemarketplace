import { useState } from 'react';
import { Grid3x3, List } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import FilterSidebar from '../components/FilterSidebar';
import { mockListings } from '../data/mockListings';

const Listings = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: 'All',
    age: 'All',
    potion: 'All',
    rarity: 'All',
    search: ''
  });

  const itemsPerPage = 12;

  const filteredListings = mockListings.filter(listing => {
    if (filters.category !== 'All' && listing.category !== filters.category) return false;
    if (filters.age !== 'All' && listing.age !== filters.age) return false;
    if (filters.potion !== 'All' && listing.potion !== filters.potion) return false;
    if (filters.rarity !== 'All' && listing.rarity !== filters.rarity) return false;
    if (filters.search && !listing.petName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedListings = filteredListings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Pet Listings</h1>
                <p className="text-gray-400">
                  Showing {displayedListings.length} of {filteredListings.length} results
                </p>
              </div>
              
              {/* View Toggle */}
              <div className="flex gap-2 bg-dark-900 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white'
                      : 'text-gray-400 hover:text-white'
                  } transition-colors`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-primary text-white'
                      : 'text-gray-400 hover:text-white'
                  } transition-colors`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Listings Grid/List */}
            {displayedListings.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-gray-400 text-lg">No listings found matching your filters</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'flex flex-col gap-4'
              }>
                {displayedListings.map(listing => (
                  <ItemCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-dark-900 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-800 transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'bg-primary text-white'
                          : 'bg-dark-900 text-gray-400 hover:bg-dark-800 hover:text-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-dark-900 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-800 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Listings;
