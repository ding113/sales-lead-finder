import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon, LocationMarkerIcon, OfficeBuildingIcon, GlobeAltIcon } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import { Distributor } from '../../types';

interface DistributorCardProps {
  distributor: Distributor;
  onAddToWishlist: (id: string) => void;
  isInWishlist?: boolean;
  onClick?: () => void;
}

const DistributorCard: React.FC<DistributorCardProps> = ({ 
  distributor, 
  onAddToWishlist,
  isInWishlist = false,
  onClick,
}) => {
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            className={`h-4 w-4 ${
              index < Math.floor(rating)
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {distributor.companyName}
            </h3>
            {renderRating(distributor.rating)}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToWishlist(distributor.id)}
            className={`p-2 rounded-full ${
              isInWishlist 
                ? 'bg-primary-50 text-primary-600' 
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
            }`}
          >
            <HeartIcon 
              className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`}
            />
          </motion.button>
        </div>

        <p className="mt-3 text-gray-600 line-clamp-2">
          {distributor.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {distributor.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600">
            <LocationMarkerIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm">{distributor.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <OfficeBuildingIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm">{distributor.companySize} employees</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <a
                href={`mailto:${distributor.contact.email}`}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Contact
              </a>
              
              <a
                href={distributor.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-600 hover:text-gray-800"
              >
                <GlobeAltIcon className="h-4 w-4 mr-1" />
                Website
              </a>
            </div>
            <span className="text-sm text-gray-500">
              Est. {distributor.establishedYear}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DistributorCard;