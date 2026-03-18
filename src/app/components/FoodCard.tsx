import { Heart, ChefHat, Star, Plus } from 'lucide-react';
import { useState } from 'react';

interface FoodCardProps {
  id?: string;
  image: string;
  name: string;
  cook: string;
  location: string;
  price: string;
  rating?: number;
  status?: 'SOLD OUT' | 'LOW STOCK' | 'AVAILABLE NOW';
  isFavorite?: boolean;
  layout?: 'horizontal' | 'grid';
  onClick?: () => void;
}

export function FoodCard({
  image,
  name,
  cook,
  location,
  price,
  rating,
  status,
  isFavorite = false,
  layout = 'horizontal',
  onClick
}: FoodCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const isSoldOut = status === 'SOLD OUT';

  return (
    <div 
      onClick={onClick}
      className={`${layout === 'horizontal' ? 'w-[200px] flex-shrink-0' : 'w-full'} flex flex-col group cursor-pointer ${isSoldOut ? 'opacity-50 grayscale-[50%]' : ''}`}
    >
      {/* Seamless Image Area (Cardless) */}
      <div className="relative mb-2.5 overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] h-[130px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 group-active:scale-95 transition-transform duration-500 ease-out"
        />
        {isSoldOut && (
          <div className="absolute inset-0 bg-white/40" />
        )}

        {/* High-Contrast Status Badge */}
        {status && status !== 'AVAILABLE NOW' && (
          <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-2xl text-[8px] font-bold tracking-widest text-white uppercase ${
            status === 'SOLD OUT' ? 'bg-gray-900' : 'bg-gray-900'
          }`}>
            {status}
          </div>
        )}

        {/* Minimalist Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setFavorite(!favorite);
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors duration-300 ${
              favorite ? 'fill-rose-500 text-rose-500' : 'text-gray-900 stroke-[2]'
            }`}
          />
        </button>

        {/* overlapping Add Button - Stark Black */}
        {!isSoldOut && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute bottom-2 right-2 w-8 h-8 rounded-2xl bg-gray-900 flex items-center justify-center hover:bg-black active:scale-95 transition-all duration-300 z-10"
          >
            <Plus className="w-4 h-4 text-white stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Stark Typography Content directly on background */}
      <div className="flex flex-col pl-0.5 pr-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-[14px] leading-tight text-black tracking-tight truncate group-hover:text-black/70 transition-colors">
            {name}
          </h3>
          <span className="text-[14px] tracking-tight font-semibold text-black flex-shrink-0">
            {price}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 mb-1">
          <ChefHat className="w-3 h-3 text-gray-400" />
          <span className="truncate text-gray-600">{cook}</span>
          <span className="text-gray-300 mx-0.5">•</span>
          <span className="truncate">{location}</span>
        </div>

        {rating && (
          <div className="flex items-center gap-1 mt-auto">
            <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
            <span className="text-[11px] font-bold text-gray-900">{rating}</span>
          </div>
        )}
      </div>
    </div>
  );
}