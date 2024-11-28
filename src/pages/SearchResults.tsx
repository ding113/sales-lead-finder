import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SearchBar from '../components/Search/SearchBar';
import FilterPanel from '../components/Filter/FilterPanel';
import DistributorCard from '../components/Distributor/DistributorCard';
import DistributorDetailsModal from '../components/Distributor/DistributorDetailsModal';
import { SummaryModal } from '../components/AI/SummaryModal';
import { SearchFilters, Distributor } from '../types';
import { mockDistributors } from '../mocks/distributors';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchService from '../services/search';
import { useWishlist } from '../contexts/WishlistContext';
import { debounce } from 'lodash';
import VirtualizedResults from '../components/Search/VirtualizedResults';
import { AdjustmentsIcon } from '@heroicons/react/solid';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isInWishlist, addToWishlist } = useWishlist();
  const query = searchParams.get('q') || '';

  const [showFilters, setShowFilters] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [results, setResults] = useState<Distributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [filters, setFilters] = useState<SearchFilters>({
    industry: [],
    location: [],
    companySize: [],
    establishedYear: { min: 1900, max: 2024 },
    rating: 0,
  });

  const [searchService] = useState(() => SearchService.getInstance(mockDistributors));
  const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setIsLoading(true);
        const searchResults = searchService.search(query);
        setResults(searchResults);
        setCurrentPage(1);
        setIsLoading(false);
      }, 300),
    [searchService]
  );

  const handleSearch = useCallback((newQuery: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('q', newQuery);
    navigate(`/search?${newSearchParams.toString()}`, { replace: true });
    debouncedSearch(newQuery);
  }, [searchParams, navigate, debouncedSearch]);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return results.slice(startIndex, endIndex);
  }, [results, currentPage, pageSize]);

  const totalPages = Math.ceil(results.length / pageSize);

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

  const handleFilterChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    setIsLoading(true);

    const filtered = mockDistributors.filter((d: Distributor) => {
      const matchesIndustry =
        newFilters.industry.length === 0 ||
        d.industry.some((i: string) => newFilters.industry.includes(i));
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
    setCurrentPage(1);
    setIsLoading(false);
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToWishlist = useCallback((distributor: Distributor) => {
    addToWishlist(distributor);
  }, [addToWishlist]);

  const handleDistributorClick = useCallback((distributor: Distributor) => {
    setSelectedDistributor(distributor);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto py-4">
            <SearchBar
              key={query}
              onSearch={handleSearch}
              onFilterToggle={() => setShowFilters(!showFilters)}
              initialQuery={query}
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <FilterPanel
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <div className="flex-1 overflow-hidden">
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
                <div className="flex flex-col flex-1 min-w-0 h-[calc(100vh-12rem)] overflow-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <AdjustmentsIcon className="h-5 w-5 text-gray-400 mr-2" />
                        Filters
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Showing {(currentPage - 1) * pageSize + 1} to{' '}
                      {Math.min(currentPage * pageSize, results.length)} of{' '}
                      {results.length} results
                    </p>
                  </div>

                  <VirtualizedResults
                    items={paginatedResults}
                    onDistributorClick={handleDistributorClick}
                    onAddToWishlist={handleAddToWishlist}
                    isInWishlist={isInWishlist}
                    currentPage={currentPage}
                  />

                  {results.length > pageSize && (
                    <div className="mt-6 flex justify-center">
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                          let pageNumber: number;
                          if (totalPages <= 5) {
                            pageNumber = index + 1;
                          } else if (currentPage <= 3) {
                            pageNumber = index + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + index;
                          } else {
                            pageNumber = currentPage - 2 + index;
                          }

                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === pageNumber
                                  ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DistributorDetailsModal
        distributor={selectedDistributor}
        isOpen={!!selectedDistributor}
        onClose={() => setSelectedDistributor(null)}
      />
    </Layout>
  );
};

export default SearchResults;