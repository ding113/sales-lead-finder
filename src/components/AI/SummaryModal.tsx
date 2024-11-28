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
            style={{ marginTop: '4rem' }}
          >
            <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-2xl shadow-[0_0_50px_0_rgba(0,0,0,0.1)] p-8 max-w-2xl w-full h-[70vh] pointer-events-auto flex flex-col border border-indigo-100 relative overflow-hidden">
              {/* 背景装饰 */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80"></div>
                <div className="absolute -top-[500px] -right-[500px] w-[1000px] h-[1000px] bg-gradient-to-br from-indigo-100 via-purple-50 to-transparent rounded-full opacity-30 blur-3xl"></div>
                <div className="absolute -bottom-[500px] -left-[500px] w-[1000px] h-[1000px] bg-gradient-to-tr from-pink-50 via-indigo-50 to-transparent rounded-full opacity-30 blur-3xl"></div>
              </div>

              <div className="flex justify-between items-center mb-6 flex-shrink-0 relative">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute -inset-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-20"></div>
                    <h2 className="relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">AI Analysis</h2>
                  </div>
                  {loading && (
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-30"></div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="relative w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full"
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto relative">
                {distributors.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No search results</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    <pre className="relative whitespace-pre-wrap font-mono text-sm bg-white/80 backdrop-blur-sm p-6 rounded-xl text-gray-700 border border-indigo-100/50 shadow-sm">
                      <div className="absolute top-4 right-4 flex space-x-1">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      {displayedSummary}
                      {!loading && currentChar < summary.length && (
                        <motion.span
                          animate={{ opacity: [0, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="text-indigo-500"
                        >|</motion.span>
                      )}
                    </pre>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-4 flex-shrink-0 relative">
                <button
                  onClick={handleCopy}
                  disabled={loading || currentChar < summary.length}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium border backdrop-blur-sm transition-all duration-300 ${
                    loading || currentChar < summary.length
                      ? 'text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed'
                      : 'text-indigo-600 border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/50 hover:border-indigo-300'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {copied ? (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy
                    </span>
                  )}
                </button>
                <button
                  onClick={handleShare}
                  disabled={loading || currentChar < summary.length}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    loading || currentChar < summary.length
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
