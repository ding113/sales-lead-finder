import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSummary, formatSummary } from '../../services/summary';
import { Distributor } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  distributors: Distributor[];
}

export const SummaryModal: React.FC<Props> = ({ isOpen, onClose, distributors }) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [displayedSummary, setDisplayedSummary] = useState('');
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (isOpen && distributors.length > 0) {
      setLoading(true);
      generateSummary(distributors)
        .then(summaryResult => {
          const formattedSummary = formatSummary(summaryResult);
          setSummary(formattedSummary);
          setDisplayedSummary('');
          setCurrentChar(0);
          setLoading(false);
        });
    }
  }, [isOpen, distributors]);

  useEffect(() => {
    if (!loading && currentChar < summary.length) {
      const timer = setTimeout(() => {
        setDisplayedSummary(prev => prev + summary[currentChar]);
        setCurrentChar(prev => prev + 1);
      }, 20); // Adjust speed of typing animation
      return () => clearTimeout(timer);
    }
  }, [loading, currentChar, summary]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Search Results Analysis',
        text: summary
      });
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
            style={{ marginTop: '4rem' }} // 添加顶部边距以避免被顶栏遮挡
          >
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full h-[70vh] pointer-events-auto flex flex-col">
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold">AI Analysis</h2>
                  {loading && (
                    <div className="ml-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full"
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {distributors.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No search results</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
                    {displayedSummary}
                    {!loading && currentChar < summary.length && (
                      <motion.span
                        animate={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >|</motion.span>
                    )}
                  </pre>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-4 flex-shrink-0">
                <button
                  onClick={handleCopy}
                  disabled={loading || currentChar < summary.length}
                  className={`px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium ${
                    loading || currentChar < summary.length
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-50'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
                <button
                  onClick={handleShare}
                  disabled={loading || currentChar < summary.length}
                  className={`px-4 py-2 border border-transparent rounded-md text-sm font-medium ${
                    loading || currentChar < summary.length
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
