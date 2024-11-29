import React, { useState, KeyboardEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, AdjustmentsIcon } from "@heroicons/react/outline";
import {
  getRandomSuggestions,
  filterSuggestions,
} from "../../mocks/searchSuggestions";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterToggle: () => void;
  initialQuery?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterToggle,
  initialQuery = "",
  className = "",
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    // 当输入框为空时，显示随机建议
    if (!query) {
      setSuggestions(getRandomSuggestions(3));
    } else {
      // 当有输入时，根据输入内容过滤建议
      setSuggestions(filterSuggestions(query));
    }
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div
          className={`
          relative flex items-center h-14 rounded-2xl
          ${
            isFocused
              ? "ring-2 ring-primary-500 bg-white shadow-lg"
              : "bg-white/90 shadow-md hover:shadow-lg transition-shadow"
          }
        `}
        >
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              // 延迟隐藏建议，以便可以点击建议
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder="Search for distributors, industries, or locations..."
            className="flex-1 h-full pl-4 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400"
          />

          <div className="flex items-center h-full pr-2">
            <button
              onClick={handleSearch}
              className="flex items-center justify-center h-10 w-12 rounded-xl bg-primary-500 hover:bg-primary-600 transition-colors text-white"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            <button
              onClick={onFilterToggle}
              className="flex items-center justify-center h-10 w-12 ml-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <AdjustmentsIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* 搜索建议下拉框 */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute w-full mt-2 py-2 bg-white rounded-xl shadow-lg z-50 border border-gray-100"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center group"
                >
                  <SearchIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-500 mr-3" />
                  <div className="flex-1">
                    <span className="text-gray-700 group-hover:text-gray-900">
                      {suggestion}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchBar;
