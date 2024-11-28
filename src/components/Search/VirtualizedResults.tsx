import React, { useCallback, useState, useEffect, useRef } from 'react';
import { FixedSizeList } from 'react-window';
import { Distributor } from '../../types';
import DistributorCard from '../Distributor/DistributorCard';

interface VirtualizedResultsProps {
  items: Distributor[];
  onDistributorClick: (distributor: Distributor) => void;
  onAddToWishlist: (distributor: Distributor) => void;
  isInWishlist: (id: string) => boolean;
  pageSize?: number;
  currentPage?: number;
}

const VirtualizedResults: React.FC<VirtualizedResultsProps> = ({
  items,
  onDistributorClick,
  onAddToWishlist,
  isInWishlist,
  pageSize = 20,
  currentPage = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 200
  });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: window.innerHeight - 200
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  const getItemsPerRow = () => {
    const width = dimensions.width;
    if (width >= 768) return 2;
    return 1;
  };

  const itemsPerRow = getItemsPerRow();
  const rowCount = Math.ceil(items.length / itemsPerRow);
  const rowHeight = 320; // Approximate height of DistributorCard

  const Row = useCallback(({ index, style }: any) => {
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, items.length);

    return (
      <div style={{ ...style, display: 'flex', gap: '1.5rem', paddingBottom: '1.5rem' }}>
        {Array.from({ length: itemsPerRow }).map((_, columnIndex) => {
          const itemIndex = fromIndex + columnIndex;
          if (itemIndex >= items.length) return null;

          const distributor = items[itemIndex];
          return (
            <div key={distributor.id} style={{ flex: 1, minWidth: 0 }}>
              <DistributorCard
                distributor={distributor}
                onAddToWishlist={() => onAddToWishlist(distributor)}
                isInWishlist={isInWishlist(distributor.id)}
                onClick={() => onDistributorClick(distributor)}
              />
            </div>
          );
        })}
      </div>
    );
  }, [items, onDistributorClick, onAddToWishlist, isInWishlist, itemsPerRow]);

  return (
    <div ref={containerRef} className="w-full h-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <FixedSizeList
        height={dimensions.height}
        width="100%"
        itemCount={rowCount}
        itemSize={rowHeight}
        overscanCount={2}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default React.memo(VirtualizedResults);
