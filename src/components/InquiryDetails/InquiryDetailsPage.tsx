import React, { useState } from 'react';
import { Tabs } from './Tabs';
import QuoteView from './views/QuoteView';
import OriginalRequestView from './views/OriginalRequestView';
import OffersListView from './views/OffersListView';
import { AnimatePresence, motion } from 'motion/react';

export const InquiryDetailsPage = ({ id }: { id?: string }) => {
  const [activeTab, setActiveTab] = useState('Quote');
  const [selectedQuote, setSelectedQuote] = useState<any>(null);

  const handleSelectQuote = (quote: any) => {
    setSelectedQuote(quote);
  };

  const handleBackToOffers = () => {
    setSelectedQuote(null);
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden font-sans antialiased">
      {/* Premium Navigation & Tabs Header */}
      <Tabs 
        activeTab={activeTab} 
        onChange={setActiveTab} 
        id={id} 
        onBack={handleBackToOffers}
        isDetailView={!!selectedQuote}
      />
      
      {/* Smooth Scrolling Content Area with AnimatePresence for transitions */}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-screen-md mx-auto px-4 pt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'Quote' && (
              selectedQuote ? (
                <motion.div
                  key="quote-detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <QuoteView id={id} quote={selectedQuote} />
                </motion.div>
              ) : (
                <motion.div
                  key="offers-list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <OffersListView onSelectQuote={handleSelectQuote} />
                </motion.div>
              )
            )}
            {activeTab === 'Request' && (
              <motion.div
                key="request-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <OriginalRequestView id={id} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
