import React from 'react';
import { Badge } from '../../../app/components/ui/badge';
import { Button } from '../../../app/components/ui/button';
import { Star, ChevronRight, CheckCircle2, Award, Sparkles, MapPin, Truck, Cake, CreditCard, Info } from 'lucide-react';
import { motion } from 'motion/react';

const QuoteView = ({ id, quote }: { id?: string; quote: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="space-y-6 pb-32 font-inter"
  >
    {/* Subscription DNA: Status Banner */}
    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
        <CheckCircle2 className="text-white w-6 h-6" />
      </div>
      <div>
        <h3 className="text-[14px] font-black text-gray-900 leading-none mb-1">Offer Received</h3>
        <p className="text-[12px] font-bold text-emerald-700">Kitchen responded 2 hours ago.</p>
      </div>
    </div>

    {/* Hero Price & DNA Container */}
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-[15px] font-extrabold text-gray-900">Total Investment</h4>
        {quote.isBestValue && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100/50">
                <Sparkles className="w-2.5 h-2.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Recommended</span>
            </div>
        )}
      </div>
      
      <div className="flex items-baseline justify-center gap-1 mb-6">
        <span className="text-[20px] font-black text-gray-400 mt-2">€</span>
        <span className="text-[56px] font-black text-gray-900 leading-[0.8] tracking-tighter">
          {quote.amount.toFixed(0)}
        </span>
        <span className="text-[20px] font-black text-gray-400 mt-2">.{(quote.amount % 1).toFixed(2).substring(2)}</span>
      </div>

      <button className="w-full h-12 bg-gray-900 text-white rounded-2xl font-bold text-[15px] flex items-center justify-center active:scale-[0.98] transition-transform">
        Accept Offer
      </button>
    </div>

    {/* Baker Profile - Subscription DNA Card */}
    <section>
      <h4 className="text-[15px] font-extrabold text-gray-900 mb-3 px-1">Baker Profile</h4>
      <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 font-black text-gray-900">
             {quote.bakerName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-[15px] font-extrabold text-gray-900 leading-none">{quote.bakerName}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[12px] font-bold text-gray-900">{quote.rating}</span>
              <span className="text-[12px] font-medium text-gray-500">({quote.reviews} reviews)</span>
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </div>
    </section>

    {/* Inclusions - Subscription List Style */}
    <section className="space-y-3">
      <h4 className="text-[15px] font-extrabold text-gray-900 mb-3 px-1">Inclusions</h4>
      {[
        { icon: <Cake />, label: 'Masterpiece Cake' },
        { icon: <Truck />, label: 'White-Glove Delivery' },
        { icon: <MapPin />, label: 'Locally Sourced' },
        { icon: <CreditCard />, label: 'Secure Booking' }
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl">
          <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900">
            {React.cloneElement(item.icon as React.ReactElement, { className: 'w-4 h-4' })}
          </div>
          <p className="text-[14px] font-bold text-gray-900">{item.label}</p>
        </div>
      ))}
    </section>

    {/* Note */}
    <section>
      <h4 className="text-[15px] font-extrabold text-gray-900 mb-3 px-1">Note</h4>
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <p className="text-[14px] font-medium text-gray-600 leading-relaxed italic">
          "I've visualized your requirements and will use only the finest ingredients to create a truly premium experience."
        </p>
      </div>
    </section>
  </motion.div>
);

export default QuoteView;
