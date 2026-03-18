import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Truck, RefreshCw, ChefHat, PauseCircle, Settings2, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function ManageSubscription() {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);

  const subData = {
    planName: "5 Meals Plan",
    cook: "Chef Leo",
    price: 24.90,
    status: isPaused ? "Paused" : "Active",
    nextDelivery: "Tuesday, Feb 16",
    heroImage: "https://images.unsplash.com/photo-1663003259497-acaef31e0e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZnJlc2glMjBtZWRpdGVycmFuZWFuJTIwbWVhbHMlMjBtZWFsJTIwcHJlcHxlbnwxfHx8fDE3NzM2MjUzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    deliveries: [
      {
        day: "Tuesday",
        meals: [
          { name: "Jerk Chicken Bowl", quantity: 2, image: "https://images.unsplash.com/photo-1720941001847-91df17e67458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXJrJTIwY2hpY2tlbiUyMHdpdGglMjByaWNlfGVufDF8fHx8MTc3MzYyNTQwMnww&ixlib=rb-4.1.0&q=80&w=1080" },
          { name: "Pad Thai Noodles", quantity: 1, image: "https://images.unsplash.com/photo-1757845301698-da07924946a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWQlMjB0aGFpJTIwbm9vZGxlc3xlbnwxfHx8fDE3NzM1NTk0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080" }
        ]
      },
      {
        day: "Friday",
        meals: [
          { name: "Healthy Wrap", quantity: 2, image: "https://images.unsplash.com/photo-1666819615040-eff5e52c778a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwd3JhcCUyMHNhbmR3aWNofGVufDF8fHx8MTc3MzYyNTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080" }
        ]
      }
    ]
  };

  return (
    <div className="min-h-[100dvh] bg-white pb-safe font-inter selection:bg-gray-900 selection:text-white">
      {/* 1. Static/Parallax Header Image */}
      <div className="relative h-[280px] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={subData.heroImage} 
          alt="Plan Header" 
          className="w-full h-full object-cover grayscale-[0.2]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-11 h-11 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white z-20 [-webkit-tap-highlight-color:transparent]"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
      </div>

      {/* 2. Overlapping "Bottom Sheet" Content Area */}
      <div className="px-6 -mt-10 relative z-10 bg-white rounded-t-[32px] pt-4 pb-24">
        {/* Visual Grabber */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />

        {/* Header Info */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-tight">
              {subData.planName}
            </h1>
            <div className={`px-3 py-1.5 rounded-xl border-2 flex items-center gap-2 shrink-0 ml-4 ${isPaused ? 'border-gray-200' : 'border-gray-900'}`}>
              <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-gray-400' : 'bg-gray-900'}`} />
              <span className={`text-[13px] font-bold ${isPaused ? 'text-gray-500' : 'text-gray-900'}`}>
                {subData.status}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-900">
              <ChefHat className="w-4 h-4" />
            </div>
            <span className="text-[15px] font-bold text-gray-900">by {subData.cook}</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-gray-400" />
                <span className="text-[16px] font-bold text-gray-900">Weekly Total</span>
              </div>
              <span className="text-[16px] font-black text-gray-900">€{subData.price.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-400" />
                <span className="text-[16px] font-bold text-gray-900">Next Delivery</span>
              </div>
              <span className="text-[16px] font-bold text-gray-500">{subData.nextDelivery}</span>
            </div>
          </div>
        </div>

        {/* Full Width Divider */}
        <div className="h-2 w-[calc(100%+3rem)] -mx-6 bg-gray-50 mb-8" />

        {/* This Week's Menu */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[20px] font-black text-gray-900 tracking-tight">This Week's Menu</h3>
            <button 
              onClick={() => navigate('/subscription/edit-meals')}
              className="text-[14px] font-bold text-gray-900 underline underline-offset-2 active:text-gray-500 [-webkit-tap-highlight-color:transparent]"
            >
              Edit Meals
            </button>
          </div>

          <div className="space-y-8">
            {subData.deliveries.map(delivery => (
              <div key={delivery.day}>
                <h4 className="text-[13px] font-black text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-3">
                  <span className="bg-gray-100 text-gray-900 px-2.5 py-1 rounded-[8px] text-[11px] uppercase tracking-wide font-black">Delivery</span>
                  {delivery.day}
                </h4>
                <div className="space-y-4">
                  {delivery.meals.map((meal, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <img src={meal.image} alt={meal.name} className="w-16 h-16 rounded-2xl object-cover bg-gray-100 grayscale-[0.2]" />
                      <div className="flex-1">
                        <h5 className="text-[16px] font-bold text-gray-900 leading-tight mb-1">{meal.name}</h5>
                        <span className="text-[14px] font-bold text-gray-500">Qty: {meal.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Width Divider */}
        <div className="h-2 w-[calc(100%+3rem)] -mx-6 bg-gray-50 mb-8" />

        {/* Actions */}
        <div className="space-y-3">
          <h3 className="text-[20px] font-black text-gray-900 tracking-tight mb-6">Manage</h3>
          
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="w-full h-14 bg-gray-50 text-gray-900 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-3 active:scale-[0.98] transition-transform [-webkit-tap-highlight-color:transparent]"
          >
            {isPaused ? <RefreshCw className="w-5 h-5" /> : <PauseCircle className="w-5 h-5" />}
            {isPaused ? 'Resume Subscription' : 'Pause Deliveries'}
          </button>

          <button className="w-full h-14 bg-gray-50 text-gray-900 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-3 active:scale-[0.98] transition-transform [-webkit-tap-highlight-color:transparent]">
            <Settings2 className="w-5 h-5" />
            Change Plan Size
          </button>

          <button className="w-full h-14 bg-white border-2 border-gray-100 text-gray-500 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-3 active:bg-gray-50 active:scale-[0.98] transition-all mt-4 [-webkit-tap-highlight-color:transparent]">
            <Trash2 className="w-5 h-5" />
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
}