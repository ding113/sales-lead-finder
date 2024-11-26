import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, HeartIcon } from '@heroicons/react/outline';
import { Distributor } from '../../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Distributor[];
  onRemove: (id: string) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-25 z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-50"
          >
            <div className="h-full flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <HeartIcon className="h-5 w-5 text-primary-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Wishlist</h2>
                  <span className="bg-primary-100 text-primary-600 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <XIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <HeartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Your wishlist is empty</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-base font-semibold text-gray-900">
                              {item.companyName}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <XIcon className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center space-x-4 text-sm">
                          <span className="text-gray-500">{item.location}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-gray-500">
                            {item.companySize} employees
                          </span>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <a
                            href={`mailto:${item.contact.email}`}
                            className="text-sm text-primary-600 hover:text-primary-700"
                          >
                            Contact
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;