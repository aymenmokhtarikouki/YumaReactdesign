import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Star, MapPin, Clock, Flame, ChevronRight, Share2, Plus, Minus } from 'lucide-react';

interface FoodPageProps {
  onBack: () => void;
  onCookClick: () => void;
}

export function FoodPage({ onBack, onCookClick }: FoodPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Animated Sticky Header */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 transition-all duration-300 ${
          isScrolled ? 'bg-white border-b border-gray-100' : 'bg-transparent'
        }`}
      >
        <button 
          onClick={onBack}
          className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
            isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-white/30 backdrop-blur-md text-white'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className={`font-bold text-[16px] transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
          Kung Pao Chicken
        </div>

        <div className="flex gap-2">
          <button className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
            isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-white/30 backdrop-blur-md text-white'
          }`}>
            <Share2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
              isScrolled ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/30 backdrop-blur-md hover:bg-white/40'
            }`}
          >
            <Heart className={`w-5 h-5 transition-colors ${
              isFavorite 
                ? 'fill-rose-500 text-rose-500' 
                : (isScrolled ? 'text-gray-900' : 'text-white')
            }`} />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[320px] w-full">
        <img 
          src="https://images.unsplash.com/photo-1605704922285-e82455dba38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdW5nJTIwcGFvJTIwY2hpY2tlbnxlbnwxfHx8fDE3NzM2MTE5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Kung Pao Chicken" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content Body */}
      <div className="px-4 pt-5 pb-5 bg-white relative -mt-8 rounded-t-[32px]">
        <div className="flex justify-between items-start mb-2.5">
          <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">Kung Pao Chicken</h1>
          <div className="text-right">
            <span className="text-xl font-bold text-gray-900">€10.31</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[12px] text-gray-500 font-medium mb-5">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
            <span className="text-gray-900 font-bold">4.8</span>
            <span>(120 reviews)</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>25-35 min</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Spicy</span>
          </div>
        </div>

        {/* Cook Profile Strip */}
        <button 
          onClick={onCookClick}
          className="w-full flex items-center justify-between p-3 mb-6 bg-gray-50 rounded-2xl active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1611657366409-55549160be82?auto=format&fit=crop&q=80&w=150&h=150" 
              alt="Ibrahim B." 
              className="w-10 h-10 rounded-2xl object-cover border-2 border-white"
            />
            <div className="text-left">
              <div className="text-[14px] font-bold text-gray-900">Ibrahim B.</div>
              <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> Strasbourg, 1.2km away
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* Sticky Tabs relative to content */}
        <div className="sticky top-[72px] bg-white z-40 flex border-b border-gray-100 mb-6">
          {['Details', 'Ingredients', 'Reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`flex-1 pb-3 text-[14px] font-bold transition-colors relative ${
                activeTab === tab.toLowerCase() ? 'text-teal-600' : 'text-gray-400'
              }`}
            >
              {tab}
              {activeTab === tab.toLowerCase() && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-600 rounded-t-2xl" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {activeTab === 'details' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
              <p className="text-[15px] text-gray-600 leading-relaxed">
                A classic Sichuan dish featuring tender chicken cubes, roasted peanuts, and vibrant vegetables, all stir-fried in our signature spicy, sweet, and savory sauce. Prepared fresh with authentic ingredients imported directly from Sichuan province.
              </p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-right-2 duration-300">
              {['Free-range Chicken breast', 'Roasted Peanuts', 'Sichuan Peppercorns', 'Dried Red Chilies', 'Green Bell Peppers', 'Scallions'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span className="text-[14px] font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="flex flex-col items-center justify-center p-2 bg-white rounded-xl min-w-[70px]">
                  <span className="text-xl font-extrabold text-gray-900">4.8</span>
                  <div className="flex text-orange-400 mt-1">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-2.5 h-2.5 fill-current" />)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[14px]">Outstanding!</h4>
                  <p className="text-[12px] text-gray-600 mt-0.5">Based on 120 verified orders from Ibrahim's kitchen.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe-offset-4 z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-2xl p-1 h-[48px]">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center active:scale-95 text-gray-600"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-[15px]">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center active:scale-95 text-gray-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button className="flex-1 h-[48px] bg-teal-600 text-white rounded-2xl font-bold text-[15px] active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-teal-700">
            <span>Add to Cart</span>
            <span className="text-teal-200 text-sm font-normal">•</span>
            <span>€{(10.31 * quantity).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}