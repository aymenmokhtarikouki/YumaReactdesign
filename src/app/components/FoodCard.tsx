import { Heart, ChefHat, MapPin, Star, Plus } from 'lucide-react';
import { useState } from 'react';

interface FoodCardProps {
  image: string;
  name: string;
  cook: string;
  location: string;
  price: string;
  rating?: number;
  status?: 'SOLD OUT' | 'LOW STOCK' | 'AVAILABLE NOW';
  isFavorite?: boolean;
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
}: FoodCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-white w-[280px] flex-shrink-0">
      {/* Image Container */}
      <div className="relative h-[160px] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        {status && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white ${
            status === 'SOLD OUT' ? 'bg-gray-700' : 'bg-gray-800'
          }`}>
            {status}
          </div>
        )}

        {/* Unavailable Overlay */}
        {status === 'SOLD OUT' && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
            <div className="w-6 h-0.5 bg-gray-600 rotate-45"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base">{name}</h3>
          <button
            onClick={() => setFavorite(!favorite)}
            className="flex-shrink-0 mt-0.5"
          >
            <Heart
              className={`w-5 h-5 ${
                favorite ? 'fill-teal-500 text-teal-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Cook Info */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
          <ChefHat className="w-3.5 h-3.5" />
          <span>{cook}</span>
          <span className="mx-0.5">•</span>
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{location}</span>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-teal-600">{price}</span>
            {rating && (
              <>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
                  <span className="text-sm font-medium">{rating}</span>
                </div>
              </>
            )}
          </div>

          {/* Add Button */}
          {status === 'AVAILABLE NOW' && (
            <button className="w-8 h-8 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center hover:bg-teal-50 transition-colors">
              <Plus className="w-5 h-5 text-teal-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
