import React from 'react';
import { Badge } from '../../../app/components/ui/badge';
import { Button } from '../../../app/components/ui/button';
import { Cake, Clock, Truck, ShieldCheck, Check, Star, ChevronRight, MapPin, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

const QuoteView = ({ id, quote }: { id?: string; quote: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="space-y-8 pb-32"
  >
    {/* Elite Status Header */}
    <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-[32px] p-6 flex items-start gap-5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[80px] -mr-16 -mt-16" />
      <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
        <ShieldCheck className="text-white w-7 h-7" />
      </div>
      <div>
        <h3 className="text-[18px] font-black text-gray-900 leading-tight">Exclusive Offer from {quote.bakerName}</h3>
        <p className="text-[13px] font-bold text-emerald-700/70 mt-1.5 leading-relaxed">
          Your custom cake quote is ready for review. This price is locked and guaranteed for the next 48 hours.
        </p>
      </div>
    </div>

    {/* Hero Price & Baker DNA */}
    <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-[28px] flex items-center justify-center mb-6 border border-gray-100 shadow-inner">
          <img src={quote.image} alt={quote.bakerName} className="w-full h-full object-cover rounded-[28px]" />
        </div>
        
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Total Investment</p>
        <div className="flex items-start gap-1 mb-6">
          <span className="text-[20px] font-black text-gray-900 mt-2">€</span>
          <span className="text-[64px] font-black text-gray-900 leading-[0.8] tracking-tighter">
            {quote.amount.toFixed(0)}
          </span>
          <span className="text-[20px] font-black text-gray-400 mt-2">.{(quote.amount % 1).toFixed(2).substring(2)}</span>
        </div>

        <div className="flex gap-2 justify-center">
           <Badge variant="secondary" className="bg-gray-50 text-gray-900 border-gray-100 font-bold px-4 py-2 rounded-2xl text-[12px]">
             Secure Payment
           </Badge>
           <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100/50 font-bold px-4 py-2 rounded-2xl text-[12px]">
             Free Delivery
           </Badge>
        </div>
      </div>
    </div>

    {/* Baker Dossier */}
    <section className="space-y-5">
      <div className="flex items-center justify-between px-2">
        <h4 className="text-[17px] font-black text-gray-900 tracking-tight">Baker Expertise</h4>
        <button className="text-[12px] font-black text-emerald-600 uppercase tracking-widest">Full Profile</button>
      </div>
      <div className="bg-white border border-gray-100 rounded-[32px] p-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-[22px] bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
             <img src={quote.image} className="w-full h-full object-cover" alt="" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-[16px] font-black text-gray-900">{quote.bakerName}</h4>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" />
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center gap-0.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-[13px] font-black text-gray-900">{quote.rating}</span>
              </div>
              <span className="text-gray-200">•</span>
              <span className="text-[12px] font-bold text-gray-400 uppercase">{quote.reviews} Reviews</span>
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </div>
    </section>

    {/* Offer Breakdown */}
    <section className="space-y-5">
      <h4 className="text-[17px] font-black text-gray-900 tracking-tight px-2">Premium Inclusions</h4>
      <div className="grid gap-3">
        {[
          { icon: <Cake />, label: 'Masterpiece Cake', desc: 'Custom 3-tier design with handcrafted details' },
          { icon: <Truck />, label: 'White-Glove Delivery', desc: 'Direct Venure delivery with professional setup' },
          { icon: <MapPin />, label: 'Local Sourcing', desc: 'All ingredients are locally sourced & organic' },
          { icon: <CreditCard />, label: 'Yuma Protection', desc: 'Money-back guarantee until final approval' }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-5 p-5 bg-white border border-gray-100 rounded-[28px] hover:border-emerald-500/20 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
              {React.cloneElement(item.icon as React.ReactElement, { className: 'w-6 h-6 stroke-[2.2px]' })}
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-black text-gray-900 leading-none mb-1.5">{item.label}</p>
              <p className="text-[12px] font-bold text-gray-400 leading-tight">{item.desc}</p>
            </div>
            <Check className="w-5 h-5 text-emerald-500 stroke-[3px]" />
          </div>
        ))}
      </div>
    </section>

    {/* Personal Note */}
    <section className="space-y-4">
      <h4 className="text-[17px] font-black text-gray-900 tracking-tight px-2">Baker's Note</h4>
      <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100/50 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/30" />
        <p className="text-[15px] text-gray-600 font-bold leading-relaxed italic">
          "I've visualized your Spider-Man theme using a deep midnight blue velvet for the tiers. Every web detail will be hand-painted with silver edible dust to give it that 'ultra-premium' shimmer. Looking forward to making this special!"
        </p>
      </div>
    </section>

    {/* Bottom Sticky Action Bar */}
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-2xl border-t border-gray-100 flex gap-4 z-50">
      <Button variant="ghost" className="flex-1 h-[60px] rounded-[22px] font-black text-gray-400 active:bg-gray-50 uppercase tracking-widest text-[13px]">
        Decline
      </Button>
      <Button className="flex-[2] h-[60px] rounded-[22px] font-black bg-gray-900 text-white shadow-[0_15px_30px_rgba(0,0,0,0.2)] active:scale-[0.98] transition-all uppercase tracking-widest text-[13px]">
        Accept Quote
      </Button>
    </div>
  </motion.div>
);

export default QuoteView;
