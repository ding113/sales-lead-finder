// src/pages/SearchResults.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { mockSearchResults } from '../mockData';

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

  useEffect(() => {
    const fetchResults = async () => {
      if (import.meta.env.VITE_API_BASE_URL) {
        // 实际 API 调用会在这里实现
        console.log('Fetching from API:', import.meta.env.VITE_API_BASE_URL);
      } else {
        // 使用模拟数据
        setResults(mockSearchResults);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">搜索结果: {query}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((result, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{result.company_name}</h2>
            <p className="mt-2">{result.description}</p>
            <div className="mt-2">
              {result.core_tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <a href={result.contact_info.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                访问网站
              </a>
              <p className="mt-1">Email: {result.contact_info.email}</p>
              <p>电话: {result.contact_info.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;