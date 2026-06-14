import React from 'react';
import { Badge } from '../../../app/components/ui/badge';
import { Star, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface Quote {
  id: string;
  bakerName: string;
  amount: number;
  rating: number;
  reviews: number;
  isBestValue?: boolean;
  isTopRated?: boolean;
}

const quotes: Quote[] = [
  { 
    id: 'Q-001', 
    bakerName: 'Sweet Creations', 
    amount: 275.00, 
    rating: 4.9, 
    reviews: 124,
    isBestValue: true,
    isTopRated: true,
  },
  { 
    id: 'Q-002', 
    bakerName: 'The Cake Art', 
    amount: 310.00, 
    rating: 4.7, 
    reviews: 89,
  },
  { 
    id: 'Q-003', 
    bakerName: 'Glaze & Grace', 
    amount: 250.00, 
    rating: 4.5, 
    reviews: 56,
  },
];

const OffersListView = ({ onSelectQuote }: { onSelectQuote: (quote: Quote) => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-4 pb-20 bg-white font-inter"
  >
    {/* Tesla-Style Header with Black Badge */}
    <div className="flex items-center justify-between px-1.5 pt-4 mb-2">
      <h3 className="text-[22px] font-extrabold text-gray-900 tracking-tight leading-none">Received Offer</h3>
      <div className="px-3 py-1.5 bg-gray-100 rounded-[12px] flex items-center">
        <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest leading-none">
          {quotes.length} Offer
        </span>
      </div>

    </div>

    <div className="space-y-3">
      {quotes.map((quote, index) => (
        <motion.div 
          key={quote.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelectQuote(quote)}
          className="bg-white rounded-2xl p-4 border border-gray-100 relative group cursor-pointer active:opacity-70 transition-opacity"
        >
          {/* Main Info Row - Clean Essentials */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[15px] font-extrabold text-gray-900 flex items-center gap-1.5 leading-none">
                {quote.bakerName}
                {quote.isTopRated && <CheckCircle2 className="w-3.5 h-3.5 text-gray-900 stroke-[2.5px]" />}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[12px] font-bold text-gray-900">{quote.rating}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">{quote.reviews} reviews</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-0.5">
                <span className="text-[13px] font-bold text-gray-400 mr-0.5">€</span>
                <span className="text-[22px] font-black text-gray-900 leading-none tracking-tighter">
                  {quote.amount.toFixed(0)}
                </span>
              </div>
              {quote.isBestValue && (
                <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-emerald-50 rounded-lg border border-emerald-100/30">
                   <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                   <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Recommended</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button - Exact Subscription DNA */}
          <button className="w-full h-12 bg-gray-100 text-gray-900 rounded-2xl font-bold text-[15px] flex items-center justify-center active:bg-gray-200 transition-colors">
            View Offer Details
          </button>

        </motion.div>
      ))}
    </div>

    {/* Security Section in App DNA */}
    <div className="mt-8 p-5 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4 items-center">
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-gray-100 shrink-0 shadow-sm">
        <Award className="w-5 h-5 text-gray-900" />
      </div>
      <div className="flex-1">
        <p className="text-[13px] font-extrabold text-gray-900 leading-tight">Secure Booking</p>
        <p className="text-[12px] font-medium text-gray-500 leading-snug">All offers are protected by our payment guarantee.</p>
      </div>
    </div>
  </motion.div>
);

export default OffersListView;
