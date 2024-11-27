// src/components/Search/HomeFilterPanel.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from '@heroicons/react/outline';
import { SearchFilters } from '../../types';
import { mockIndustries, mockLocations, mockCompanySizes } from '../../mocks/distributors';

interface HomeFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onApply: () => void;
}

const HomeFilterPanel: React.FC<HomeFilterPanelProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onApply,
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      industry: [],
      location: [],
      companySize: [],
      establishedYear: { min: 1900, max: 2024 },
      rating: 0,
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const getSelectedCount = () => {
    return (
      localFilters.industry.length +
      localFilters.location.length +
      localFilters.companySize.length +
      (localFilters.rating > 0 ? 1 : 0)
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-25 z-[100]" />
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-10 w-96 bg-white rounded-xl shadow-xl z-[101] overflow-hidden" 
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Filters
                {getSelectedCount() > 0 && (
                  <span className="ml-2 text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    {getSelectedCount()} selected
                  </span>
                )}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              <div className="p-4 space-y-6">
                {/* Industry Filter */}
                <FilterSection
                  title="Industry"
                  items={mockIndustries}
                  selectedItems={localFilters.industry}
                  onChange={(items) =>
                    setLocalFilters({ ...localFilters, industry: items })
                  }
                />

                {/* Location Filter */}
                <FilterSection
                  title="Location"
                  items={mockLocations}
                  selectedItems={localFilters.location}
                  onChange={(items) =>
                    setLocalFilters({ ...localFilters, location: items })
                  }
                />

                {/* Company Size Filter */}
                <FilterSection
                  title="Company Size"
                  items={mockCompanySizes}
                  selectedItems={localFilters.companySize}
                  onChange={(items) =>
                    setLocalFilters({ ...localFilters, companySize: items })
                  }
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-between">
              <button
                onClick={handleReset}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Reset all
              </button>
              <div className="space-x-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onFilterChange(localFilters);
                    onApply();
                    onClose();
                  }}
                  className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface FilterSectionProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onChange: (items: string[]) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  selectedItems,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-900">{title}</h4>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <label
            key={item}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={(e) => {
                const newItems = e.target.checked
                  ? [...selectedItems, item]
                  : selectedItems.filter((i) => i !== item);
                onChange(newItems);
              }}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HomeFilterPanel;