// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (searchTerm: string) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="text-center w-full px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-bold text-blue-600 mb-4">销售易</h1>
        <p className="text-xl sm:text-2xl mb-8 text-gray-600">找到您的理想客户</p>
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Home;