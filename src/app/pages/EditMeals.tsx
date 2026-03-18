import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function EditMeals() {
  const navigate = useNavigate();
  const totalMealsAllowed = 5;

  const [activeDeliveryDay, setActiveDeliveryDay] = useState<'tuesday' | 'friday'>('tuesday');
  const [selectedMeals, setSelectedMeals] = useState<{ tuesday: Record<string, number>, friday: Record<string, number> }>({
    tuesday: { m1: 2, m2: 1 },
    friday: { m4: 2 }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    } catch (e) {
      // Ignore iframe scroll errors
    }
  }, []);

  const mealsList = [
    { id: 'm1', name: 'Jerk Chicken Bowl', image: 'https://images.unsplash.com/photo-1720941001847-91df17e67458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXJrJTIwY2hpY2tlbiUyMHdpdGglMjByaWNlfGVufDF8fHx8MTc3MzYyNTQwMnww&ixlib=rb-4.1.0&q=80&w=1080', description: 'With rice & beans' },
    { id: 'm2', name: 'Pad Thai Noodles', image: 'https://images.unsplash.com/photo-1757845301698-da07924946a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWQlMjB0aGFpJTIwbm9vZGxlc3xlbnwxfHx8fDE3NzM1NTk0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080', description: 'Chicken and crushed peanuts' },
    { id: 'm3', name: 'Spaghetti Bolognese', image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBib2xvZ25lc2V8ZW58MXx8fHwxNzczNjEzMDM5fDA&ixlib=rb-4.1.0&q=80&w=1080', description: 'Classic beef ragu' },
    { id: 'm4', name: 'Healthy Wrap', image: 'https://images.unsplash.com/photo-1666819615040-eff5e52c778a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwd3JhcCUyMHNhbmR3aWNofGVufDF8fHx8MTc3MzYyNTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080', description: 'Hummus & roasted veggies' },
  ];

  const getMealsCount = (day: 'tuesday' | 'friday') => {
    return Object.values(selectedMeals[day]).reduce((sum, count) => sum + count, 0);
  };

  const totalMealsSelected = getMealsCount('tuesday') + getMealsCount('friday');
  const isSelectionComplete = totalMealsSelected === totalMealsAllowed;

  const handleUpdateMeal = (mealId: string, delta: number) => {
    if (delta > 0 && totalMealsSelected >= totalMealsAllowed) return;

    setSelectedMeals(prev => {
      const currentCount = prev[activeDeliveryDay][mealId] || 0;
      const newCount = Math.max(0, currentCount + delta);
      
      const newDaySelection = { ...prev[activeDeliveryDay] };
      if (newCount === 0) {
        delete newDaySelection[mealId];
      } else {
        newDaySelection[mealId] = newCount;
      }

      return {
        ...prev,
        [activeDeliveryDay]: newDaySelection
      };
    });
  };

  const closePage = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate('/subscription/manage', { replace: true });
      }
    }, 300);
  };

  const handleSave = () => {
    if (!isSelectionComplete) return;
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      closePage();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col font-inter selection:bg-gray-900 selection:text-white">
      {/* Background Dimmer */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" 
            onClick={closePage}
          />
        )}
      </AnimatePresence>

      {/* Slide-Up Main Content */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 bg-white rounded-t-[32px] flex flex-col h-[92dvh] mt-auto shadow-2xl"
          >
            {/* Sticky Header inside bottom sheet */}
            <div className="shrink-0 pt-4 pb-2 px-6 bg-white/90 backdrop-blur-xl rounded-t-[32px] relative z-20 border-b border-gray-100">
              {/* Grabber */}
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              
              <div className="flex items-center justify-between mb-4">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={closePage}
                  className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-2xl flex items-center justify-center text-gray-900 [-webkit-tap-highlight-color:transparent] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
                <span className="text-[16px] font-bold text-gray-900">Edit Plan</span>
                <div className="w-10" /> {/* Spacer */}
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto overscroll-y-contain px-6 pb-[calc(120px+env(safe-area-inset-bottom))] pt-6">
              {/* Title & Progress Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-tight">Pick Meals</h1>
                  <p className="text-[15px] font-bold text-gray-500 mt-1">For Feb 16 - Feb 22</p>
                </div>
                
                {/* Circular Progress Indicator */}
                <div className="relative w-14 h-14 shrink-0">
                  <svg className="w-14 h-14 transform -rotate-90">
                    <circle cx="28" cy="28" r="24" className="stroke-gray-100" strokeWidth="4" fill="none" />
                    <motion.circle 
                      cx="28" cy="28" r="24" 
                      className="stroke-gray-900" 
                      strokeWidth="4" fill="none" 
                      strokeDasharray={2 * Math.PI * 24} 
                      initial={false}
                      animate={{ strokeDashoffset: 2 * Math.PI * 24 * (1 - totalMealsSelected / totalMealsAllowed) }}
                      transition={{ type: "spring", bounce: 0, duration: 0.8 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[14px] font-black text-gray-900 leading-none">
                      {totalMealsAllowed - totalMealsSelected}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-0.5">Left</span>
                  </div>
                </div>
              </div>

              {/* Day Selection Tabs */}
              <div className="flex mb-2 relative">
                {(['tuesday', 'friday'] as const).map(day => (
                  <button 
                    key={day}
                    onClick={() => setActiveDeliveryDay(day)}
                    className={`flex-1 pb-4 relative text-[15px] font-bold transition-colors [-webkit-tap-highlight-color:transparent] ${activeDeliveryDay === day ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <span className="capitalize">{day}</span>
                    {getMealsCount(day) > 0 && (
                      <span className={`ml-2 text-[12px] px-2 py-0.5 rounded-2xl transition-colors ${activeDeliveryDay === day ? 'bg-gray-100 text-gray-900' : 'bg-gray-100 text-gray-500'}`}>
                        {getMealsCount(day)}
                      </span>
                    )}
                    {activeDeliveryDay === day && (
                      <motion.div 
                        layoutId="editTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="h-px bg-gray-100 w-full mb-6 -mt-2" />

              {/* Meal List */}
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {mealsList.map(meal => {
                    const count = selectedMeals[activeDeliveryDay][meal.id] || 0;
                    return (
                      <motion.div 
                        layout
                        key={meal.id} 
                        className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <img src={meal.image} alt={meal.name} className="w-24 h-24 rounded-2xl object-cover bg-gray-100 grayscale-[0.2]" />
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="text-[16px] font-bold text-gray-900 leading-tight mb-1">{meal.name}</h4>
                          <p className="text-[14px] font-medium text-gray-500 mb-3">{meal.description}</p>
                          
                          {count === 0 ? (
                            <motion.button 
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleUpdateMeal(meal.id, 1)}
                              disabled={totalMealsSelected >= totalMealsAllowed}
                              className="h-[36px] px-5 bg-gray-100 text-gray-900 rounded-2xl text-[14px] font-bold transition-colors disabled:opacity-50 w-fit active:bg-gray-200 [-webkit-tap-highlight-color:transparent]"
                            >
                              Add to plan
                            </motion.button>
                          ) : (
                            <div className="flex items-center bg-gray-900 rounded-2xl p-1 w-[104px] justify-between h-[36px]">
                              <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateMeal(meal.id, -1)}
                                className="w-8 h-8 flex items-center justify-center text-white [-webkit-tap-highlight-color:transparent]"
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              
                              <AnimatePresence mode="popLayout">
                                <motion.span 
                                  key={count}
                                  initial={{ y: 10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -10, opacity: 0 }}
                                  className="font-bold text-[14px] text-white w-4 text-center"
                                >
                                  {count}
                                </motion.span>
                              </AnimatePresence>

                              <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateMeal(meal.id, 1)}
                                disabled={totalMealsSelected >= totalMealsAllowed}
                                className="w-8 h-8 flex items-center justify-center text-white disabled:opacity-50 [-webkit-tap-highlight-color:transparent]"
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Fixed Bottom Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6 z-50 pb-[calc(1.5rem+env(safe-area-inset-bottom))] rounded-b-[32px]">
              <motion.button 
                whileTap={isSelectionComplete ? { scale: 0.98 } : {}}
                onClick={handleSave}
                className={`w-full h-14 rounded-2xl font-bold text-[16px] flex items-center justify-center transition-all [-webkit-tap-highlight-color:transparent] ${
                  isSelectionComplete 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-400 pointer-events-none'
                }`}
              >
                {isSaving ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  isSelectionComplete ? 'Save Changes' : `Select ${totalMealsAllowed - totalMealsSelected} more meals`
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}