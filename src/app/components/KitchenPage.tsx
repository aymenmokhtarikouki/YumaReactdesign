import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, MapPin, Share2, Award, Clock, Users, ShieldCheck, ChevronRight } from 'lucide-react';
import { FoodCard } from './FoodCard';

interface KitchenPageProps {
  onBack: () => void;
  onFoodClick: () => void;
}

export function KitchenPage({ onBack, onFoodClick }: KitchenPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const kungPaoImage = "https://images.unsplash.com/photo-1605704922285-e82455dba38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdW5nJTIwcGFvJTIwY2hpY2tlbnxlbnwxfHx8fDE3NzM2MTE5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080";
  const dumplingImage = "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=1080";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Animated Sticky Header */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 transition-all duration-300 ${
          isScrolled ? 'bg-white border-b border-gray-100' : 'bg-transparent'
        }`}
      >
        <button 
          onClick={onBack}
          className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
            isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-black/20 backdrop-blur-md text-white'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className={`font-bold text-[16px] transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
          Ibrahim's Kitchen
        </div>

        <button className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
          isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-black/20 backdrop-blur-md text-white'
        }`}>
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Cover Image & Profile Overlay */}
      <div className="relative">
        <div className="h-[240px] w-full">
          <img 
            src="https://images.unsplash.com/photo-1643034738686-d69e7bc047e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczNTg2Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Kitchen Cover" 
            className="w-full h-full object-cover brightness-[0.85]"
          />
        </div>

        <div className="px-4 absolute -bottom-12 w-full flex justify-between items-end">
          <div className="relative">
            <div className="w-[84px] h-[84px] rounded-2xl p-1 bg-white overflow-hidden border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1611657366409-55549160be82?auto=format&fit=crop&q=80&w=150&h=150" 
                alt="Ibrahim B." 
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-teal-500 rounded-2xl p-0.5 border-2 border-white">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <button 
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-5 py-2 rounded-2xl font-bold text-[13px] active:scale-95 transition-all mb-3 ${
              isFollowing 
                ? 'bg-gray-100 text-gray-700 border border-gray-200' 
                : 'bg-gray-900 text-white hover:bg-black'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-16 px-4 bg-white pb-5 rounded-b-2xl relative z-10 border-b border-gray-100">
        <h1 className="text-[24px] font-extrabold text-gray-900 leading-tight">Ibrahim B.</h1>
        <p className="text-gray-500 font-medium text-[14px] mt-1 mb-4 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-teal-600" /> Strasbourg, France • 1.2km
        </p>

        {/* Stats Strip */}
        <div className="flex items-center divide-x divide-gray-100 border border-gray-100 rounded-2xl bg-gray-50 p-3 mb-5">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 font-bold text-[15px] text-gray-900">
              4.9 <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
            </div>
            <span className="text-[11px] text-gray-500 font-medium mt-0.5">3.2k reviews</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 font-bold text-[15px] text-gray-900">
              14k <Users className="w-3.5 h-3.5 text-teal-600" />
            </div>
            <span className="text-[11px] text-gray-500 font-medium mt-0.5">Followers</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 font-bold text-[15px] text-gray-900">
              Top 1% <Award className="w-3.5 h-3.5 text-orange-500" />
            </div>
            <span className="text-[12px] text-gray-500 font-medium mt-0.5">Super Cook</span>
          </div>
        </div>

        <p className="text-[13px] text-gray-600 leading-relaxed mb-5 line-clamp-3">
          Specializing in authentic Sichuan cuisine. Every dish is crafted from scratch using generational family recipes and spices sourced directly from Chengdu. Bringing the real taste of spice to your table.
        </p>

        <button className="flex items-center gap-1.5 text-teal-600 font-bold text-[13px]">
          Read full bio <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Specialties Section */}
      <div className="mt-6 px-4">
        <h2 className="text-[20px] font-extrabold text-gray-900 mb-1.5">Signature Dishes</h2>
        <p className="text-[13px] text-gray-500 font-medium mb-5">Ibrahim's most ordered meals</p>

        <div className="grid grid-cols-2 gap-4">
          <FoodCard
            image={kungPaoImage}
            name="Kung Pao Chicken"
            cook="Ibrahim B."
            location="1.2km"
            price="€10.31"
            rating={4.8}
            status="AVAILABLE NOW"
            isFavorite={true}
            layout="grid"
            onClick={onFoodClick}
          />
          <FoodCard
            image={dumplingImage}
            name="Pork Dumplings (8)"
            cook="Ibrahim B."
            location="1.2km"
            price="€8.50"
            rating={4.9}
            status="LOW STOCK"
            isFavorite={false}
            layout="grid"
            onClick={onFoodClick}
          />
        </div>
      </div>
    </div>
  );
}