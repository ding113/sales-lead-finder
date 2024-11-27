import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSummary, formatSummary } from '../../services/summary';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SummaryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [distributors] = useLocalStorage('distributors', []);
  const [copied, setCopied] = useState(false);
  const summary = distributors.length > 0 ? formatSummary(generateSummary(distributors)) : '';

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
        title: 'Distributor Network Analysis',
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
          >
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto pointer-events-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">AI Summary</h2>
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

              {distributors.length === 0 ? (
                <p className="text-gray-500">No distributors data available.</p>
              ) : (
                <>
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
                    {summary}
                  </pre>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button
                      onClick={handleShare}
                      className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Share
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
