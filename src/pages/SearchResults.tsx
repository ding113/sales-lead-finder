import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SearchBar from '../components/Search/SearchBar';
import FilterPanel from '../components/Filter/FilterPanel';
import DistributorCard from '../components/Distributor/DistributorCard';
import { Distributor, SearchFilters } from '../types';
import { mockDistributors } from '../mocks/distributors';
import { useSearchParams } from 'react-router-dom';

interface SearchResultsProps {
  onAddToWishlist: (id: string) => void;
  wishlistItems: Distributor[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  onAddToWishlist, 
  wishlistItems 
}) => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<Distributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    industry: [],
    location: [],
    companySize: [],
    establishedYear: { min: 1900, max: 2024 },
    rating: 0,
  });
  
  const [wishlist, setWishlist] = useState<string[]>([]); // 添加 wishlist 状态

  useEffect(() => {
    const query = searchParams.get('q') || '';
    handleSearch(query);
  }, [searchParams]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = mockDistributors.filter(
        (d) =>
          d.companyName.toLowerCase().includes(query.toLowerCase()) ||
          d.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsLoading(false);
    }, 500);
  };

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    const filtered = mockDistributors.filter((d) => {
      const matchesIndustry =
        newFilters.industry.length === 0 ||
        d.industry.some((i) => newFilters.industry.includes(i));
      const matchesLocation =
        newFilters.location.length === 0 ||
        newFilters.location.includes(d.location);
      const matchesSize =
        newFilters.companySize.length === 0 ||
        newFilters.companySize.includes(d.companySize);
      const matchesYear =
        d.establishedYear >= newFilters.establishedYear.min &&
        d.establishedYear <= newFilters.establishedYear.max;
      const matchesRating = d.rating >= newFilters.rating;

      return (
        matchesIndustry &&
        matchesLocation &&
        matchesSize &&
        matchesYear &&
        matchesRating
      );
    });
    setResults(filtered);
  };

  const handleWishlist = (id: string) => {
    setWishlist((prev: string[]) =>
      prev.includes(id) ? prev.filter((i: string) => i !== id) : [...prev, id]
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto py-4">
            <SearchBar
              onSearch={handleSearch}
              onFilterToggle={() => setShowFilters(!showFilters)}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <FilterPanel
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl shadow-md p-6 animate-pulse"
                    >
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {results.length} distributors found
                    </h2>
                    <div className="flex items-center space-x-4">
                      <select
                        className="rounded-md border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500"
                        onChange={(e) => {
                          const sorted = [...results].sort((a, b) => {
                            switch (e.target.value) {
                              case 'rating':
                                return b.rating - a.rating;
                              case 'year':
                                return b.establishedYear - a.establishedYear;
                              default:
                                return 0;
                            }
                          });
                          setResults(sorted);
                        }}
                      >
                        <option value="">Sort by</option>
                        <option value="rating">Rating</option>
                        <option value="year">Year Established</option>
                      </select>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {results.map((distributor) => (
                      <DistributorCard
                        key={distributor.id}
                        distributor={distributor}
                        onAddToWishlist={handleWishlist}
                        isInWishlist={wishlist.includes(distributor.id)}
                      />
                    ))}
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;