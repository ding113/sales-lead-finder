// 建议用户安装 lodash 类型声明
// 运行命令: npm install --save-dev @types/lodash

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, AdjustmentsIcon } from '@heroicons/react/outline';
import { debounce } from 'lodash';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterToggle: () => void;
  suggestions?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterToggle, suggestions = [] }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery);
    }, 300),
    [onSearch]
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
    setShowSuggestions(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className={`
          relative flex items-center h-14 rounded-2xl
          ${isFocused 
            ? 'ring-2 ring-primary-500 bg-white shadow-lg' 
            : 'bg-white/90 shadow-md hover:shadow-lg transition-shadow'}
        `}>
          <SearchIcon className="w-5 h-5 text-gray-400 ml-4" />
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder="Search for distributors, industries, or locations..."
            className="flex-1 h-full px-4 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400"
          />
          <button
            onClick={onFilterToggle}
            className="flex items-center justify-center h-10 px-4 mr-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <AdjustmentsIcon className="w-5 h-5 text-gray-500" />
            <span className="ml-2 text-sm text-gray-600">Filters</span>
          </button>
        </div>

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute w-full mt-2 py-2 bg-white rounded-xl shadow-xl z-50"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(suggestion);
                    onSearch(suggestion);
                    setShowSuggestions(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 flex items-center space-x-2"
                >
                  <SearchIcon className="w-4 h-4 text-gray-400" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchBar;