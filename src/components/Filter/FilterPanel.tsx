// 建议用户安装 @heroicons/react 类型声明
// 如果没有可用的类型声明，可以在项目中添加以下声明文件 (例如: src/types/heroicons-react.d.ts):
/*
declare module '@heroicons/react/outline' {
  import React from 'react';
  export const XIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  // 添加其他需要的图标声明
}
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from '@heroicons/react/outline';
import { SearchFilters } from '../../types';
import { industryCategories, locationCategories } from '../../mocks/categories';
import { mockCompanySizes } from '../../mocks/distributors';
import CategoryFilter from './CategoryFilter';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const FilterSection: React.FC<{
    title: string;
    children: React.ReactNode;
  }> = ({ title, children }) => (
    <div className="py-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Filter Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 lg:relative lg:inset-auto lg:shadow-none"
          >
            <div className="h-full overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={onClose}
                  className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                >
                  <XIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                {/* Industry Filter */}
                <CategoryFilter
                  title="Industry"
                  categories={industryCategories}
                  selectedValues={localFilters.industry}
                  onChange={(values) => handleFilterChange('industry', values)}
                />

                {/* Location Filter */}
                <CategoryFilter
                  title="Location"
                  categories={locationCategories}
                  selectedValues={localFilters.location}
                  onChange={(values) => handleFilterChange('location', values)}
                />

                {/* Company Size Filter */}
                <FilterSection title="Company Size">
                  <div className="space-y-2">
                    {mockCompanySizes.map((size) => (
                      <label key={size} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={localFilters.companySize.includes(size)}
                          onChange={(e) => {
                            const newSizes = e.target.checked
                              ? [...localFilters.companySize, size]
                              : localFilters.companySize.filter((s) => s !== size);
                            handleFilterChange('companySize', newSizes);
                          }}
                          className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{size}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Establishment Year Range */}
                <FilterSection title="Establishment Year">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600">From</label>
                      <input
                        type="number"
                        value={localFilters.establishedYear.min}
                        onChange={(e) => {
                          handleFilterChange('establishedYear', {
                            ...localFilters.establishedYear,
                            min: parseInt(e.target.value) || 0,
                          });
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">To</label>
                      <input
                        type="number"
                        value={localFilters.establishedYear.max}
                        onChange={(e) => {
                          handleFilterChange('establishedYear', {
                            ...localFilters.establishedYear,
                            max: parseInt(e.target.value) || 0,
                          });
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </FilterSection>

                {/* Rating Filter */}
                <FilterSection title="Minimum Rating">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={localFilters.rating}
                    onChange={(e) => {
                      handleFilterChange('rating', parseFloat(e.target.value));
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="mt-2 text-sm text-gray-600">
                    {localFilters.rating} stars and above
                  </div>
                </FilterSection>
              </div>
            </div>

            {/* Mobile backdrop */}
            {isOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={onClose}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;