import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import WishlistDrawer from './components/Wishlist/WishlistDrawer';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/outline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './contexts/WishlistContext'; // 添加 WishlistProvider 导入
import About from './pages/About'; // 添加 About 组件的导入

const queryClient = new QueryClient();

const App = () => {
  const [showWishlist, setShowWishlist] = useState(false);

  // const handleSearch = (query: string) => {
  //   // Implement search logic here
  // };

  return (
    <QueryClientProvider client={queryClient}>
      <WishlistProvider> {/* 使用 WishlistProvider 包裹应用 */}
        <BrowserRouter>
          <div className="relative">
            <Routes>
              <Route path="/" element={<Home />} /> {/* 移除 onSearch 属性 */}
              <Route 
                path="/search" 
                element={
                  <SearchResults />
                } 
              />
              <Route path="/about" element={<About />} /> {/* 添加 About 路由 */}
            </Routes>

            {/* Wishlist FAB */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowWishlist(true)}
              className="fixed bottom-8 right-8 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 flex items-center space-x-2 z-50"
            >
              <HeartIcon className="h-6 w-6" />
              <span className="text-sm font-medium">
                Wishlist
              </span>
            </motion.button>

            <WishlistDrawer
              isOpen={showWishlist}
              onClose={() => setShowWishlist(false)}
              // 移除 items 和 onRemove 属性
            />
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </QueryClientProvider>
  );
};

export default App;