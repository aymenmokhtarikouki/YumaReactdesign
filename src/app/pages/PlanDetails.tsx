import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Check, Calendar, Truck, RefreshCw, ChefHat, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

// Create a local instance without web workers to avoid IframeMessageAbortError
const fireConfetti = confetti.create(undefined, { useWorker: false });

export default function PlanDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const contentRef = useRef<HTMLDivElement>(null);

  const [expandedStep, setExpandedStep] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [activeDeliveryDay, setActiveDeliveryDay] = useState<'tuesday' | 'friday'>('tuesday');
  const [selectedMeals, setSelectedMeals] = useState<{ tuesday: Record<string, number>, friday: Record<string, number> }>({
    tuesday: {},
    friday: {}
  });
  const [isSuccess, setIsSuccess] = useState(false);

  // Scroll to top when step changes to ensure user sees the step content
  useEffect(() => {
    if (contentRef.current) {
      try {
        const topOffset = contentRef.current.offsetTop;
        window.scrollTo({ top: Math.max(0, topOffset - 20), behavior: 'smooth' });
      } catch (e) {
        // ignore iframe error
      }
    }
  }, [expandedStep]);

  useEffect(() => {
    let interval: any;
    if (isSuccess) {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        // ignore iframe error
      }
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        try {
            fireConfetti(Object.assign({}, defaults, { particleCount, origin: { x: 0.1, y: 0.6 }, colors: ['#111827', '#4b5563', '#9ca3af', '#d1d5db', '#10b981'] }));
            fireConfetti(Object.assign({}, defaults, { particleCount, origin: { x: 0.9, y: 0.6 }, colors: ['#111827', '#4b5563', '#9ca3af', '#d1d5db', '#10b981'] }));
        } catch (e) {}
      }, 250);
    }
    
    return () => {
        if (interval) clearInterval(interval);
    }
  }, [isSuccess]);

  // Mock data
  const heroImage = "https://images.unsplash.com/photo-1663003259497-acaef31e0e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZnJlc2glMjBtZWRpdGVycmFuZWFuJTIwbWVhbHMlMjBtZWFsJTIwcHJlcHxlbnwxfHx8fDE3NzM2MjUzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  const plans = [
    { id: 'plan-5', name: '5 Meals Plan', price: 24.90, pricePerMeal: 4.98, meals: 5, popular: true },
    { id: 'plan-10', name: '10 Meals Plan', price: 44.90, pricePerMeal: 4.49, meals: 10, popular: false },
    { id: 'plan-15', name: 'Family Box (15 Meals)', price: 59.90, pricePerMeal: 3.99, meals: 15, popular: false }
  ];

  const mealsList = [
    { id: 'm1', name: 'Jerk Chicken Bowl', image: 'https://images.unsplash.com/photo-1720941001847-91df17e67458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXJrJTIwY2hpY2tlbiUyMHdpdGglMjByaWNlfGVufDF8fHx8MTc3MzYyNTQwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', description: 'With rice & beans' },
    { id: 'm2', name: 'Pad Thai Noodles', image: 'https://images.unsplash.com/photo-1757845301698-da07924946a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWQlMjB0aGFpJTIwbm9vZGxlc3xlbnwxfHx8fDE3NzM1NTk0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', description: 'Chicken and crushed peanuts' },
    { id: 'm3', name: 'Spaghetti Bolognese', image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBib2xvZ25lc2V8ZW58MXx8fHwxNzczNjEzMDM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', description: 'Classic beef ragu' },
    { id: 'm4', name: 'Healthy Wrap', image: 'https://images.unsplash.com/photo-1666819615040-eff5e52c778a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwd3JhcCUyMHNhbmR3aWNofGVufDF8fHx8MTc3MzYyNTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', description: 'Hummus & roasted veggies' },
  ];

  const selectedPlan = plans.find(p => p.id === selectedPlanId);
  const totalMealsAllowed = selectedPlan?.meals || 0;

  const getMealsCount = (day: 'tuesday' | 'friday') => {
    return Object.values(selectedMeals[day]).reduce((sum, count) => sum + count, 0);
  };

  const totalMealsSelected = getMealsCount('tuesday') + getMealsCount('friday');
  const isMealSelectionComplete = selectedPlanId && totalMealsSelected === totalMealsAllowed;

  const handleUpdateMeal = (mealId: string, delta: number) => {
    if (!selectedPlanId) return;

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

  const handlePlanSelect = (planId: string) => {
    if (planId !== selectedPlanId) {
      setSelectedPlanId(planId);
      setSelectedMeals({ tuesday: {}, friday: {} });
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen bg-white flex flex-col font-inter selection:bg-gray-900 selection:text-white"
      >
        <div className="flex-1 flex flex-col items-center justify-center p-8 mt-12">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            className="w-24 h-24 bg-green-50 rounded-[32px] flex items-center justify-center mb-8"
          >
            <Check className="w-10 h-10 text-green-600" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-[32px] font-black text-gray-900 mb-2 text-center tracking-tight"
          >
            Subscription Confirmed!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-[16px] text-gray-500 mb-12 text-center font-medium"
          >
            Your weekly plan is all set
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="w-full space-y-6 border-y border-gray-100 py-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-500">
                <Calendar className="w-5 h-5" />
                <span className="text-[15px] font-medium">Starts</span>
              </div>
              <span className="text-[15px] font-bold text-gray-900">Feb 16, 2026</span>
            </div>
            <div className="h-px bg-gray-100 w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-500">
                <Truck className="w-5 h-5" />
                <span className="text-[15px] font-medium">Delivery</span>
              </div>
              <span className="text-[15px] font-bold text-gray-900">Tue & Fri</span>
            </div>
            <div className="h-px bg-gray-100 w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-500">
                <RefreshCw className="w-5 h-5" />
                <span className="text-[15px] font-medium">Next charge</span>
              </div>
              <span className="text-[15px] font-bold text-gray-900">Feb 23, 2026</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="p-6 pb-12 space-y-4"
        >
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/subscription/manage')}
            className="w-full h-14 bg-gray-900 text-white rounded-2xl font-bold text-[16px] flex items-center justify-center"
          >
            Manage Subscription
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="w-full h-14 bg-white text-gray-900 rounded-2xl font-bold text-[16px] flex items-center justify-center active:bg-gray-50 transition-colors"
          >
            Back to Home
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  const animationVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    // PATTERN: Full-Screen Dynamic Page (NOT a modal window)
    // We use a standalone routed page that *visually mimics* a bottom-sheet 
    // to avoid mobile scrolling/z-index issues with actual modals.
    <div className="min-h-screen bg-white pb-32 font-inter selection:bg-gray-900 selection:text-white">
      {/* 1. Static/Parallax Header Image */}
      <div className="relative h-[280px] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={heroImage} alt="Plan Header" className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (expandedStep > 1) {
              setExpandedStep(expandedStep - 1);
            } else {
              navigate(-1);
            }
          }}
          className="absolute top-12 left-4 w-11 h-11 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white z-20"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
      </div>

      {/* 2. Overlapping "Bottom Sheet" Content Area */}
      <div ref={contentRef} className="px-6 -mt-10 relative z-10 bg-white rounded-t-[32px] pt-4 pb-4 shadow-sm">
        {/* Visual Grabber (purely aesthetic, reinforces bottom-sheet look) */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

        {/* 3. Inline Stepper State Machine (Dynamic Content) */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gray-900"
                initial={{ width: "0%" }}
                animate={{ width: expandedStep >= step ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: CHOOSE PLAN */}
          {expandedStep === 1 && (
            <motion.div 
              key="step1"
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {/* Title & Info */}
              <div className="mb-8">
                <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-tight mb-4">Mediterranean Weeknight Feast</h1>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600">
                    <ChefHat className="w-4 h-4" />
                  </div>
                  <span className="text-[15px] font-bold text-gray-900">by Chef Leo</span>
                </div>

                <p className="text-[15px] text-gray-500 leading-relaxed mb-6 font-medium">
                  Fresh Mediterranean-inspired meals delivered twice a week. Enjoy a variety of homemade dishes perfectly portioned for your weeknights.
                </p>

                <div className="flex items-center gap-2 text-[14px] font-bold text-gray-900 bg-gray-50 p-3.5 rounded-2xl">
                  <Truck className="w-4 h-4" />
                  Delivered Tuesday & Friday
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-[20px] font-black text-gray-900 tracking-tight mb-6">Choose Your Plan</h2>
                <div className="space-y-4">
                  {plans.map(plan => (
                    <motion.div 
                      whileTap={{ scale: 0.98 }}
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`p-5 rounded-2xl transition-all cursor-pointer relative overflow-hidden ${
                        selectedPlanId === plan.id ? 'bg-gray-900 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlanId === plan.id ? 'border-white' : 'border-gray-300'}`}>
                            {selectedPlanId === plan.id && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                          </div>
                          <span className="text-[17px] font-bold">{plan.name}</span>
                        </div>
                        {plan.popular && (
                          <span className={`px-2.5 py-1 text-[12px] font-bold rounded-xl tracking-wide uppercase ${selectedPlanId === plan.id ? 'bg-white/20 text-white' : 'bg-white text-gray-900'}`}>
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="pl-8 flex items-baseline gap-2">
                        <span className="text-[20px] font-black">€{plan.price.toFixed(2)}</span>
                        <span className={`text-[14px] font-semibold ${selectedPlanId === plan.id ? 'text-gray-300' : 'text-gray-500'}`}>/week</span>
                        <span className={`text-[13px] font-bold ml-2 px-2 py-0.5 rounded-[8px] ${selectedPlanId === plan.id ? 'bg-white/10 text-white' : 'bg-white text-gray-500'}`}>
                          €{plan.pricePerMeal}/meal
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PICK MEALS */}
          {expandedStep === 2 && selectedPlanId && (
            <motion.div 
              key="step2"
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[28px] font-black text-gray-900 tracking-tight">Pick Your Meals</h2>
                  <p className="text-[15px] font-bold text-gray-500 mt-1">{selectedPlan?.name}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-1">Select {totalMealsAllowed} meals</h3>
                  <p className="text-[14px] font-medium text-gray-500">{totalMealsSelected} of {totalMealsAllowed} selected</p>
                </div>
                {/* Progress Circle with Spring Animation */}
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle cx="24" cy="24" r="20" className="stroke-gray-200" strokeWidth="4" fill="none" />
                    <motion.circle 
                      cx="24" cy="24" r="20" 
                      className="stroke-gray-900" 
                      strokeWidth="4" fill="none" 
                      strokeDasharray={2 * Math.PI * 20} 
                      initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - totalMealsSelected / totalMealsAllowed) }}
                      transition={{ type: "spring", bounce: 0, duration: 0.8 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[13px] font-black text-gray-900">
                    {totalMealsAllowed - totalMealsSelected}
                  </div>
                </div>
              </div>

              {/* Day Tabs */}
              <div className="flex mb-2 relative">
                {(['tuesday', 'friday'] as const).map(day => (
                  <button 
                    key={day}
                    onClick={() => setActiveDeliveryDay(day)}
                    className={`flex-1 pb-4 relative text-[15px] font-bold transition-colors ${activeDeliveryDay === day ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <span className="capitalize">{day}</span>
                    {getMealsCount(day) > 0 && (
                      <span className={`ml-2 text-[12px] px-2 py-0.5 rounded-2xl transition-colors ${activeDeliveryDay === day ? 'bg-gray-100 text-gray-900' : 'bg-gray-100 text-gray-500'}`}>
                        {getMealsCount(day)}
                      </span>
                    )}
                    {activeDeliveryDay === day && (
                      <motion.div 
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="h-px bg-gray-100 w-full mb-6 -mt-2" />

              {/* Meal List - Cardless minimal look */}
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
                        <img src={meal.image} alt={meal.name} className="w-24 h-24 rounded-2xl object-cover bg-gray-100" />
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="text-[16px] font-bold text-gray-900 leading-tight mb-1">{meal.name}</h4>
                          <p className="text-[14px] font-medium text-gray-500 mb-3">{meal.description}</p>
                          
                          {count === 0 ? (
                            <motion.button 
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleUpdateMeal(meal.id, 1)}
                              disabled={totalMealsSelected >= totalMealsAllowed}
                              className="h-[36px] px-5 bg-gray-100 text-gray-900 rounded-2xl text-[14px] font-bold transition-colors disabled:opacity-50 w-fit hover:bg-gray-200"
                            >
                              Add to plan
                            </motion.button>
                          ) : (
                            <div className="flex items-center bg-gray-900 rounded-2xl p-1 w-[104px] justify-between h-[36px]">
                              <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateMeal(meal.id, -1)}
                                className="w-8 h-8 flex items-center justify-center text-white"
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
                                className="w-8 h-8 flex items-center justify-center text-white disabled:opacity-50"
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
            </motion.div>
          )}

          {/* STEP 3: REVIEW */}
          {expandedStep === 3 && selectedPlan && (
            <motion.div 
              key="step3"
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-[28px] font-black text-gray-900 tracking-tight mb-6">Review & Subscribe</h2>
              
              <div className="bg-gray-50 rounded-2xl p-5 mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[16px] font-bold text-gray-900">Weekly Total</span>
                  <span className="text-[24px] font-black text-gray-900">€{selectedPlan.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Renews weekly • Cancel anytime
                </div>
              </div>

              <div className="space-y-8">
                {/* Delivery 1 */}
                <div>
                  <h4 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="bg-gray-100 text-gray-900 px-2.5 py-1 rounded-[8px] text-[11px] uppercase tracking-wide font-black">Delivery 1</span>
                    Tuesday
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(selectedMeals.tuesday).map(([mealId, count]) => {
                      const meal = mealsList.find(m => m.id === mealId);
                      if (!meal) return null;
                      return (
                        <div key={mealId} className="flex items-center justify-between text-[15px]">
                          <div className="flex items-center gap-4">
                            <img src={meal.image} alt={meal.name} className="w-12 h-12 rounded-2xl object-cover bg-gray-100" />
                            <span className="font-bold text-gray-900">{meal.name}</span>
                          </div>
                          <span className="font-black text-gray-400 bg-gray-50 px-3 py-1.5 rounded-[10px]">x{count}</span>
                        </div>
                      );
                    })}
                    {Object.keys(selectedMeals.tuesday).length === 0 && (
                      <p className="text-[14px] text-gray-400 italic font-medium">No meals selected for Tuesday.</p>
                    )}
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full" />

                {/* Delivery 2 */}
                <div>
                  <h4 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="bg-gray-100 text-gray-900 px-2.5 py-1 rounded-[8px] text-[11px] uppercase tracking-wide font-black">Delivery 2</span>
                    Friday
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(selectedMeals.friday).map(([mealId, count]) => {
                      const meal = mealsList.find(m => m.id === mealId);
                      if (!meal) return null;
                      return (
                        <div key={mealId} className="flex items-center justify-between text-[15px]">
                          <div className="flex items-center gap-4">
                            <img src={meal.image} alt={meal.name} className="w-12 h-12 rounded-2xl object-cover bg-gray-100" />
                            <span className="font-bold text-gray-900">{meal.name}</span>
                          </div>
                          <span className="font-black text-gray-400 bg-gray-50 px-3 py-1.5 rounded-[10px]">x{count}</span>
                        </div>
                      );
                    })}
                    {Object.keys(selectedMeals.friday).length === 0 && (
                      <p className="text-[14px] text-gray-400 italic font-medium">No meals selected for Friday.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Sticky Action Bar */}
      <AnimatePresence>
        {selectedPlanId && !isSuccess && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
            className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6 z-50 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
          >
            {expandedStep === 1 && (
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={() => setExpandedStep(2)}
                className="w-full h-14 bg-gray-900 text-white rounded-2xl font-bold text-[16px] flex items-center justify-center"
              >
                Continue with {selectedPlan?.name}
              </motion.button>
            )}
            {expandedStep === 2 && (
              <motion.button 
                whileTap={isMealSelectionComplete ? { scale: 0.98 } : {}}
                onClick={() => isMealSelectionComplete ? setExpandedStep(3) : null}
                className={`w-full h-14 rounded-2xl font-bold text-[16px] flex items-center justify-center transition-all ${
                  isMealSelectionComplete 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-400 pointer-events-none'
                }`}
              >
                {isMealSelectionComplete ? 'Review Subscription' : `Select ${totalMealsAllowed - totalMealsSelected} more meals`}
              </motion.button>
            )}
            {expandedStep === 3 && selectedPlan && (
              <div className="space-y-3">
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsSuccess(true)}
                  className="w-full h-14 bg-gray-900 text-white rounded-2xl font-bold text-[16px] flex items-center justify-center"
                >
                  Subscribe – €{selectedPlan.price.toFixed(2)}/week
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 bg-white text-gray-900 rounded-2xl font-bold text-[15px] flex items-center justify-center"
                >
                  Try once for €{(selectedPlan.price * 1.1).toFixed(2)}
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
