import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import WishlistDrawer from './components/Wishlist/WishlistDrawer';
import { Distributor } from './types';
import { mockDistributors } from './mocks/distributors';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/outline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const queryClient = new QueryClient();

const App = () => {
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<Distributor[]>([]);

  const handleAddToWishlist = (id: string) => {
    const item = mockDistributors.find((d) => d.id === id);
    if (item) {
      setWishlistItems((prev) =>
        prev.some((i) => i.id === id)
          ? prev.filter((i) => i.id !== id)
          : [...prev, item]
      );
    }
  };

  const handleSearch = (query: string) => {
    // Implement search logic here
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="relative">
          <Routes>
            <Route path="/" element={<Home onSearch={handleSearch} />} />
            <Route 
              path="/search" 
              element={
                <SearchResults 
                  onAddToWishlist={handleAddToWishlist}
                  wishlistItems={wishlistItems}
                />
              } 
            />
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
              Wishlist ({wishlistItems.length})
            </span>
          </motion.button>

          <WishlistDrawer
            isOpen={showWishlist}
            onClose={() => setShowWishlist(false)}
            items={wishlistItems}
            onRemove={(id) => handleAddToWishlist(id)}
          />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;