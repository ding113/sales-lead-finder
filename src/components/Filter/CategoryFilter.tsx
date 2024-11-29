import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/outline";
import { Category } from "../../types";

interface CategoryFilterProps {
  title: string;
  categories: Category[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  title,
  categories,
  selectedValues,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryValue: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryValue)
        ? prev.filter((v) => v !== categoryValue)
        : [...prev, categoryValue],
    );
  };

  const handleSelectSubCategory = (value: string) => {
    onChange(
      selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value],
    );
  };

  const handleSelectAllInCategory = (category: Category) => {
    const subCategoryValues =
      category.subCategories?.map((sub) => sub.value) || [];
    const allSelected = subCategoryValues.every((value) =>
      selectedValues.includes(value),
    );

    if (allSelected) {
      onChange(
        selectedValues.filter((value) => !subCategoryValues.includes(value)),
      );
    } else {
      const newSelected = new Set([...selectedValues, ...subCategoryValues]);
      onChange(Array.from(newSelected));
    }
  };

  const filterCategories = (
    categories: Category[],
    searchTerm: string,
  ): Category[] => {
    if (!searchTerm) return categories;

    return categories
      .map((category) => ({
        ...category,
        subCategories: category.subCategories?.filter((sub) =>
          sub.label.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      }))
      .filter(
        (category) =>
          category.subCategories && category.subCategories.length > 0,
      );
  };

  const filteredCategories = filterCategories(categories, searchTerm);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>

      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {/* Categories list */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {filteredCategories.map((category) => (
          <div
            key={category.value}
            className="border border-gray-200 rounded-md"
          >
            <button
              onClick={() => toggleCategory(category.value)}
              className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50"
            >
              <span className="font-medium text-gray-700">
                {category.label}
              </span>
              <ChevronDownIcon
                className={`h-5 w-5 text-gray-400 transform transition-transform ${
                  expandedCategories.includes(category.value)
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {expandedCategories.includes(category.value) &&
                category.subCategories && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-2 bg-gray-50">
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={category.subCategories.every((sub) =>
                            selectedValues.includes(sub.value),
                          )}
                          onChange={() => handleSelectAllInCategory(category)}
                        />
                        <span className="ml-2 text-gray-600">Select All</span>
                      </label>
                    </div>
                    <div className="px-4 py-2 space-y-2">
                      {category.subCategories.map((subCategory) => (
                        <label
                          key={subCategory.value}
                          className="flex items-center text-sm"
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            checked={selectedValues.includes(subCategory.value)}
                            onChange={() =>
                              handleSelectSubCategory(subCategory.value)
                            }
                          />
                          <span className="ml-2 text-gray-600">
                            {subCategory.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
