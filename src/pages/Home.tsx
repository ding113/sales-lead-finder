import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SearchBar from '../components/Search/SearchBar';
import { SearchFilters } from '../types';
// import { mockIndustries, mockLocations, mockCompanySizes } from '../mocks/distributors';
import HomeFilterPanel from '../components/Search/HomeFilterPanel';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    industry: [],
    location: [],
    companySize: [],
    establishedYear: { min: 1900, max: 2024 },
    rating: 0
  });
  
  // 添加显示筛选器的状态管理
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (query: string) => {
    const queryParams = new URLSearchParams();
    queryParams.set('q', query);
    
    if (searchFilters.industry.length) {
      queryParams.set('industry', searchFilters.industry.join(','));
    }
    if (searchFilters.location.length) {
      queryParams.set('location', searchFilters.location.join(','));
    }
    if (searchFilters.companySize.length) {
      queryParams.set('size', searchFilters.companySize.join(','));
    }
    
    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <section className="relative h-[70vh] flex items-center justify-center">
          {/* 移除 overflow-hidden */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-primary-400/5 to-primary-500/10 animate-gradient" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Find Your Perfect
              <span className="text-primary-600"> Distributor</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center text-xl text-gray-600 mb-12"
            >
              Connect with trusted distributors worldwide using AI-powered matching
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative text-left"
            >
              <SearchBar 
                onSearch={handleSearch}
                onFilterToggle={() => setShowFilters(!showFilters)}
              />
              
              <HomeFilterPanel
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                filters={searchFilters}
                onFilterChange={setSearchFilters}
                onApply={() => {
                  // 可以在这里添加额外的处理逻辑
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose SalesLeadFinder
              </h2>
              <p className="text-xl text-gray-600">
                Advanced features to streamline your distributor search
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'AI-Powered Matching',
                  description: 'Our intelligent algorithm finds the perfect distributors based on your specific needs',
                  icon: '🤖'
                },
                {
                  title: 'Verified Partners',
                  description: 'All distributors are thoroughly vetted to ensure reliability and quality',
                  icon: '✓'
                },
                {
                  title: 'Global Network',
                  description: 'Access to distributors across all major markets worldwide',
                  icon: '🌍'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;