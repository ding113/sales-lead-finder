// src/pages/SearchResults.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { mockSearchResults } from '../mockData';
import SearchBar from '../components/SearchBar';
import GoogleIcon from '../assets/google.svg';

interface SearchResult {
  company_name: string;
  description: string;
  core_tags: string[];
  contact_info: {
    website: string;
    email: string;
    phone: string;
  };
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (import.meta.env.VITE_API_BASE_URL) {
        // 实际 API 调用会在这里实现
        console.log('Fetching from API:', import.meta.env.VITE_API_BASE_URL);
      } else {
        // 使用模拟数据
        setTimeout(() => {
          setResults(mockSearchResults);
          setLoading(false);
        }, 1000); // 模拟加载时间
      }
    };

    fetchResults();
  }, [query]);

  const handleSearch = (searchTerm: string) => {
    window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out">
            <img src="/vite.svg" alt="销售易" className="h-8" />
          </Link>
          <div className="w-full">
            <SearchBar onSearch={handleSearch} initialValue={query} />
          </div>
        </div>
        <div className="mb-4 flex items-center space-x-4 text-sm">
          <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">所有</button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">公司</button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">产品</button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">地区</button>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">"{query}" 的搜索结果</h1>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {results.map((result, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <h2 className="text-xl font-semibold mb-2">
                  <a href={result.contact_info.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {result.company_name}
                  </a>
                </h2>
                <p className="text-sm text-green-700 dark:text-green-500 mb-2">{result.contact_info.website}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{result.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <a href={`mailto:${result.contact_info.email}`} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {result.contact_info.email}
                  </a>
                  <a href={`tel:${result.contact_info.phone}`} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {result.contact_info.phone}
                  </a>
                </div>
                <div className="mt-2 flex flex-wrap items-center">
                  {result.core_tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                      {tag}
                    </span>
                  ))}
                  <button 
                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(result.company_name)}`, '_blank')}
                    className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full p-2 hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-300 ease-in-out"
                    title="Google搜索"
                  >
                    <img src={GoogleIcon} alt="Google" className="h-5 w-5" /> 
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
