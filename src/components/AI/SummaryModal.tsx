import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSummary } from '../../services/summary';
import { Distributor } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  distributors: Distributor[];
}

interface Message {
  type: 'assistant' | 'data';
  content: string | React.ReactNode;
}

export const SummaryModal: React.FC<Props> = ({ isOpen, onClose, distributors }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (isOpen && distributors.length > 0) {
      setLoading(true);
      setMessages([]);
      setCurrentMessageIndex(0);
      
      generateSummary(distributors)
        .then(summaryResult => {
          const newMessages: Message[] = [
            {
              type: 'assistant',
              content: '👋 Hi! I\'ve analyzed your search results. Here\'s what I found:'
            },
            {
              type: 'data',
              content: (
                <div className="space-y-2">
                  <p className="font-medium">🎯 Quick Overview:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>{distributors.length} companies found</li>
                    <li>Average rating: {summaryResult.averageRating}⭐</li>
                    <li>{Object.keys(summaryResult.industryDistribution).length} different industries</li>
                  </ul>
                </div>
              )
            },
            {
              type: 'assistant',
              content: '🏢 Let me highlight the top companies for you:'
            },
            {
              type: 'data',
              content: (
                <div className="space-y-3">
                  {summaryResult.topDistributors.slice(0, 3).map((dist, idx) => (
                    <div key={dist.id} className="flex items-center space-x-3 p-2 rounded-lg bg-indigo-50/50">
                      <span className="text-lg">{['🥇', '🥈', '🥉'][idx]}</span>
                      <div>
                        <p className="font-medium">{dist.companyName}</p>
                        <p className="text-sm text-gray-600">{dist.industry.join(', ')} • {dist.rating}⭐</p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            },
            {
              type: 'assistant',
              content: '💡 Based on the data, here are some insights:'
            },
            {
              type: 'data',
              content: (
                <div className="space-y-2">
                  {summaryResult.insights.map((insight, idx) => (
                    <p key={idx} className="text-gray-600">• {insight}</p>
                  ))}
                </div>
              )
            }
          ];
          setMessages(newMessages);
          setLoading(false);
        });
    }
  }, [isOpen, distributors]);

  useEffect(() => {
    if (!loading && currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading, currentMessageIndex, messages.length]);

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
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80"></div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    AI Analysis
                  </h2>
                  {loading && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full"
                    />
                  )}
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 relative">
                {loading && distributors.length === 0 ? (
                  <div className="text-center py-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="mx-auto h-12 w-12 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </motion.div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No search results</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
                  </div>
                ) : (
                  messages.slice(0, currentMessageIndex).map((message, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`p-4 rounded-xl ${
                        message.type === 'assistant' 
                          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-700'
                          : 'bg-white shadow-sm border border-gray-100'
                      }`}
                    >
                      {message.content}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
