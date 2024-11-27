import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SearchBar from '../components/Search/SearchBar';
import FilterPanel from '../components/Filter/FilterPanel';
import DistributorCard from '../components/Distributor/DistributorCard';
import { SummaryModal } from '../components/AI/SummaryModal';
import { Distributor, SearchFilters } from '../types';
import { mockDistributors } from '../mocks/distributors';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchService from '../services/search';
import { useWishlist } from '../contexts/WishlistContext';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isInWishlist, addToWishlist } = useWishlist();
  const query = searchParams.get('q') || '';
  
  const [showFilters, setShowFilters] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [results, setResults] = useState<Distributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    industry: [],
    location: [],
    companySize: [],
    establishedYear: { min: 1900, max: 2024 },
    rating: 0,
  });

  const [searchService] = useState(() => SearchService.getInstance(mockDistributors));

  const handleSearch = useCallback((newQuery: string) => {
    setIsLoading(true);
    
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('q', newQuery);
    navigate(`/search?${newSearchParams.toString()}`, { replace: true });

    const searchResults = searchService.search(newQuery);
    setResults(searchResults);
    setIsLoading(false);
  }, [searchService, navigate, searchParams]);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const industry = searchParams.get('industry')?.split(',') || [];
    const location = searchParams.get('location')?.split(',') || [];
    const size = searchParams.get('size')?.split(',') || [];

    setFilters(prev => ({
      ...prev,
      industry,
      location,
      companySize: size
    }));

    handleSearch(query);
  }, [searchParams, handleSearch]);

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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto py-4">
            <SearchBar
              key={query} // 添加key属性以强制重新挂载
              onSearch={handleSearch}
              onFilterToggle={() => setShowFilters(!showFilters)}
              initialQuery={query}
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
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                        </svg>
                        Filters
                      </button>
                      {results.length > 0 && (
                        <button
                          onClick={() => setShowSummary(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                          </svg>
                          AI Summary
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {results.length} results found
                    </p>
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
                        onAddToWishlist={() => addToWishlist(distributor)}
                        isInWishlist={isInWishlist(distributor.id)}
                      />
                    ))}
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <SummaryModal isOpen={showSummary} onClose={() => setShowSummary(false)} />
    </Layout>
  );
};

export default SearchResults;