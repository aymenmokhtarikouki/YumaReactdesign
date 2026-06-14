import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Star, 
  ChevronRight, 
  Clock, 
  Award, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  CalendarDays,
  X,
  Check,
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Info,
  RotateCcw,
  LayoutGrid,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { FoodCard } from '../components/FoodCard';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Drawer } from 'vaul';

export default function KitchenDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subStep, setSubStep] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDay, setActiveDay] = useState('Monday');

  const menuRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Subscription State
  const [subData, setSubData] = useState({
    planType: 'Weekly',
    startDate: 'Monday, June 15',
    mealsPerDay: 1,
    selectedMeals: {
      Monday: 'Kung Pao Chicken',
      Tuesday: 'Special Fried Rice',
      Wednesday: 'Steamed Dim Sum',
      Thursday: 'Kung Pao Chicken',
      Friday: 'Special Fried Rice',
      Saturday: 'Steamed Dim Sum',
      Sunday: 'Kung Pao Chicken'
    }
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Mock data for the cook/kitchen
  const kitchenData = {
    name: "Ibrahim's Kitchen",
    cookName: "Ibrahim B.",
    coverImage: "https://images.unsplash.com/photo-1762922425168-616c0d654a75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBraXRjaGVuJTIwaW50ZXJpb3IlMjByZXN0YXVyYW50JTIwY29va2luZ3xlbnwxfHx8fDE3NzM2NTc1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    avatar: "https://images.unsplash.com/photo-1763685805275-1845419c01a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXQlMjBjb29raW5nJTIwaW50ZXJpb3IlMjByZXN0YXVyYW50JTIwY29va2luZ3xlbnwxfHx8fDE3NzM2NTc1NDd8MA&ixlib=rb-4.1.0&q=80&w=200",
    location: "Strasbourg, 1.2km",
    rating: 4.9,
    reviews: 342,
    specialty: "Authentic Asian Fusion",
    bio: "Passionate about bringing authentic Asian street food to your neighborhood. I use traditional recipes passed down through generations, made with fresh local ingredients.",
    dishes: [
      {
        id: "1",
        image: "https://images.unsplash.com/photo-1605704922285-e82455dba38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdW5nJTIwcGFvJTIwY2hpY2tlbnxlbnwxfHx8fDE3NzM2MTE5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        name: "Kung Pao Chicken",
        price: "€10.31",
        rating: 4.8,
        status: "AVAILABLE NOW" as const,
      },
      {
        id: "8",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW0lMjBzdW18ZW58MHx8fHwxNzczNjI1MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        name: "Steamed Dim Sum",
        price: "€8.50",
        rating: 4.9,
        status: "LOW STOCK" as const,
      },
      {
        id: "9",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMHJpY2V8ZW58MHx8fHwxNzczNjI1MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        name: "Special Fried Rice",
        price: "€9.20",
        rating: 4.7,
        status: "AVAILABLE NOW" as const,
      }
    ],
    cakes: [
      {
        id: "c1",
        image: "https://images.unsplash.com/photo-1582052342644-d3269d382186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBjdXN0b20lMjBiaXJ0aGRheSUyMGNha2V8ZW58MXx8fHwxNzczNjkzNDc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        name: "Floral Buttercream Dream",
        price: "From €65.00",
        rating: 5.0,
        status: "AVAILABLE NOW" as const,
      },
      {
        id: "c2",
        image: "https://images.unsplash.com/photo-1697320846048-43f9631634c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW5jeSUyMG1pbmltYWwlMjBhZXN0aGV0aWMlMjBiaXJ0aGRheSUyMGNha2UlMjBjdXN0b218ZW58MXx8fHwxNzczNjkzNTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        name: "Minimalist Gold Leaf",
        price: "From €85.00",
        rating: 4.9,
        status: "AVAILABLE NOW" as const,
      },
      {
        id: "c3",
        image: "https://images.unsplash.com/photo-1693060236785-206a880f8573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjB3ZWRkaW5nJTIwY2FrZXxlbnwxfHx8fDE3NzM2OTM0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        name: "Classic Wedding Tier",
        price: "From €120.00",
        rating: 4.8,
        status: "AVAILABLE NOW" as const,
      }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 200);

      const offset = 140; 
      const menuTop = menuRef.current?.offsetTop ?? 0;
      const portfolioTop = portfolioRef.current?.offsetTop ?? 0;
      const aboutTop = aboutRef.current?.offsetTop ?? 0;
      const reviewsTop = reviewsRef.current?.offsetTop ?? 0;

      if (scrollY >= reviewsTop - offset) {
        setActiveTab('reviews');
      } else if (scrollY >= aboutTop - offset) {
        setActiveTab('about');
      } else if (scrollY >= portfolioTop - offset) {
        setActiveTab('portfolio');
      } else {
        setActiveTab('menu');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    let ref;
    if (sectionId === 'menu') ref = menuRef;
    if (sectionId === 'portfolio') ref = portfolioRef;
    if (sectionId === 'about') ref = aboutRef;
    if (sectionId === 'reviews') ref = reviewsRef;
    
    if (ref && ref.current) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = ref.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      try {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } catch (e) {
        // Ignore iframe sandbox error
      }
    }
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  const updateSubField = (field: string, value: any) => {
    setSubData(prev => ({ ...prev, [field]: value }));
  };

  const updateDayMeal = (day: string, meal: string) => {
    setSubData(prev => ({
      ...prev,
      selectedMeals: { ...prev.selectedMeals, [day]: meal }
    }));
    setIsDrawerOpen(false);
    toast.success(`Updated ${day}'s meal`);
  };

  const renderSubStep1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Select Plan Duration</h3>
          <Badge variant="secondary" className="bg-gray-100 text-gray-500 border-none px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide">Required</Badge>
        </div>
        <RadioGroup value={subData.planType} onValueChange={(val) => updateSubField('planType', val)} className="gap-3">
          {[
            { id: 'Weekly', price: '€45/week', desc: '7 days of fresh home-cooked meals' },
            { id: 'Monthly', price: '€160/month', desc: 'Full month of daily nutrition (Save €20)' }
          ].map((plan) => (
            <label 
              key={plan.id}
              className={`flex items-start justify-between p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                subData.planType === plan.id ? 'border-gray-900 bg-gray-50' : 'border-gray-100 bg-white'
              }`}
            >
              <div className="flex gap-4">
                <RadioGroupItem value={plan.id} className="border-2 border-gray-300 text-gray-900 focus-visible:ring-gray-900 mt-1" />
                <div className="flex flex-col">
                  <span className={`text-[17px] font-extrabold ${subData.planType === plan.id ? 'text-gray-900' : 'text-gray-600'}`}>
                    {plan.id} Plan
                  </span>
                  <p className="text-[13px] font-medium text-gray-500 mt-0.5 leading-tight">{plan.desc}</p>
                </div>
              </div>
              <span className="text-[16px] font-black text-gray-900 shrink-0">
                {plan.price}
              </span>
            </label>
          ))}
        </RadioGroup>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Meals per Day</h3>
        </div>
        <div className="flex items-center justify-between border-2 border-gray-100 rounded-3xl overflow-hidden bg-white">
          <button 
            onClick={() => updateSubField('mealsPerDay', Math.max(1, subData.mealsPerDay - 1))}
            className="w-16 h-16 flex items-center justify-center text-gray-900 border-r-2 border-gray-100 active:bg-gray-50 transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center py-2">
            <span className="text-[24px] font-black text-gray-900 leading-none">{subData.mealsPerDay}</span>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">meals</p>
          </div>
          <button 
            onClick={() => updateSubField('mealsPerDay', subData.mealsPerDay + 1)}
            className="w-16 h-16 flex items-center justify-center text-gray-900 border-l-2 border-gray-100 active:bg-gray-50 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Starting From</h3>
        </div>
        <button className="w-full flex items-center justify-between bg-white border-2 border-gray-100 rounded-2xl px-5 py-5 text-[15px] font-bold text-gray-900 active:bg-gray-50 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span>{subData.startDate}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </section>
    </div>
  );

  const renderSubStep2 = () => {
    return (
      <div className="space-y-7 animate-in fade-in slide-in-from-right-4 duration-300">
        {/* Ultra Premium Overview Header */}
        <div className="bg-gray-900 rounded-[32px] p-6 text-white overflow-hidden relative border-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-white/50">
                {days.length} meals planned
              </span>
            </div>
            <h4 className="text-[22px] font-black tracking-tight leading-tight mb-1.5">Plan Your Week</h4>
            <p className="text-[14px] font-medium text-white/60 leading-relaxed">
              Tap any day to swap in one of {kitchenData.cookName.split(' ')[0]}'s signature dishes.
            </p>
          </div>
        </div>

        {/* Weekly Schedule List — whole week at a glance, DNA-aligned rows */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-[18px] font-extrabold text-gray-900 tracking-tight">Your Schedule</h3>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Mon–Sun</span>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
            className="bg-white border-2 border-gray-100 rounded-[28px] overflow-hidden divide-y divide-gray-50"
          >
            {days.map((day) => {
              const mealName = (subData.selectedMeals as any)[day];
              const meal = kitchenData.dishes.find(d => d.name === mealName);
              return (
                <motion.button
                  key={day}
                  variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                  onClick={() => { setActiveDay(day); setIsDrawerOpen(true); }}
                  className="w-full flex items-center gap-4 p-3 text-left active:bg-gray-50 transition-colors group [-webkit-tap-highlight-color:transparent]"
                >
                  <img
                    src={meal?.image}
                    alt={mealName}
                    className="w-[60px] h-[60px] rounded-2xl object-cover bg-gray-100 grayscale-[0.2] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{day}</p>
                    <p className="text-[16px] font-bold text-gray-900 leading-tight truncate">{mealName}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
                      <span className="text-[12px] font-bold text-gray-500">{meal?.rating}</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-gray-500 group-active:bg-gray-900 group-active:text-white group-active:border-gray-900 transition-colors">
                    <RotateCcw className="w-[18px] h-[18px]" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    );
  };

  const renderSubStep3 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <section>
        <h3 className="text-[18px] font-extrabold text-gray-900 mb-6 tracking-tight">Review Subscription</h3>
        
        <div className="bg-white border-2 border-gray-100 rounded-3xl overflow-hidden divide-y divide-gray-50">
          <div className="p-5 flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Plan Selected</p>
              <p className="text-[17px] font-extrabold text-gray-900">{subData.planType} Plan</p>
              <p className="text-[14px] font-medium text-gray-500">{subData.mealsPerDay} meal per day</p>
            </div>
            <div className="text-right">
              <p className="text-[17px] font-black text-gray-900">{subData.planType === 'Weekly' ? '€45.00' : '€160.00'}</p>
            </div>
          </div>

          <div className="p-5 flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
              <CalendarDays className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Subscription Schedule</p>
              <p className="text-[15px] font-bold text-gray-900">Starts {subData.startDate}</p>
              <p className="text-[13px] font-medium text-gray-500 mt-1">Free daily delivery included</p>
            </div>
          </div>

          <div className="p-5">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Meal Selections</p>
            <div className="grid grid-cols-1 gap-3">
              {days.map((day) => (
                <div key={day} className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3 border border-transparent">
                  <span className="text-[13px] font-black text-gray-400 uppercase tracking-tighter w-12">{day.substring(0, 3)}</span>
                  <span className="text-[14px] font-bold text-gray-900 flex-1 ml-4">{(subData.selectedMeals as any)[day]}</span>
                  <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center border border-gray-100">
                    <Check className="w-3.5 h-3.5 text-gray-900" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 rounded-[32px] p-6 flex items-center gap-5 border-2 border-dashed border-gray-200">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shrink-0">
          <Info className="w-7 h-7 text-blue-600" />
        </div>
        <div>
          <p className="text-[15px] font-extrabold text-gray-900 mb-0.5">Flexible Planning</p>
          <p className="text-[13px] font-medium text-gray-500">You can pause or change meals up to 24h before delivery.</p>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <Button 
          onClick={() => {
            toast.success('Successfully subscribed to Meal Plan!');
            setShowSubscriptionModal(false);
            setSubStep(1);
          }}
          className="w-full h-16 bg-gray-900 text-white rounded-3xl font-bold text-[17px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-black border-none"
        >
          <Check className="w-5 h-5" />
          Confirm & Pay
        </Button>
        <p className="text-[12px] font-bold text-gray-400 text-center uppercase tracking-[0.1em]">
          Secure payment via Yuma Pay
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-inter pb-12 selection:bg-gray-900 selection:text-white">
      {/* Dynamic Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-12 pb-4">
          <button 
            onClick={handleBack}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              isScrolled 
                ? 'bg-gray-100/80 text-gray-900 hover:bg-gray-200' 
                : 'bg-black/20 backdrop-blur-md text-white hover:bg-black/30'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h1 className={`text-[17px] font-bold tracking-tight transition-opacity duration-300 ${
            isScrolled ? 'opacity-100 text-gray-900' : 'opacity-0'
          }`}>
            {kitchenData.name}
          </h1>

          <button 
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              isScrolled 
                ? 'bg-gray-100/80 text-gray-900 hover:bg-gray-200' 
                : 'bg-black/20 backdrop-blur-md text-white hover:bg-black/30'
            }`}
          >
            <Share2 className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Section Tabs (Visible only when scrolled past image) */}
        <div className={`px-6 flex gap-6 transition-all duration-300 overflow-x-auto scrollbar-hide ${
          isScrolled ? 'opacity-100 h-12 pb-0' : 'opacity-0 h-0 overflow-hidden pb-0'
        }`}>
          {['menu', 'portfolio', 'about', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => scrollToSection(tab)}
              className={`relative pb-3 text-[14px] font-bold capitalize whitespace-nowrap transition-colors ${
                activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-900 rounded-t-2xl" />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* PATTERN: Static/Parallax Header Image */}
      {/* Edge to Edge Header */}
      <div className="relative w-full h-[360px]">
        <img 
          src={kitchenData.coverImage} 
          alt="Kitchen Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
      </div>

      {/* PATTERN: Overlapping "Bottom Sheet" Content Area */}
      <main className="px-6 pt-8 rounded-t-[32px] bg-white -mt-8 relative z-10">
        {/* Sleek Profile Info */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={kitchenData.avatar} 
                alt={kitchenData.cookName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white bg-gray-100"
              />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-2xl p-0.5">
                <div className="w-5 h-5 bg-gray-900 rounded-2xl flex items-center justify-center">
                  <Star className="w-2.5 h-2.5 fill-white text-white" />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-[26px] font-extrabold text-gray-900 tracking-tight leading-none mb-1">
                {kitchenData.name}
              </h1>
              <p className="text-[15px] font-medium text-gray-500">By {kitchenData.cookName}</p>
            </div>
          </div>
          <button className="px-5 py-2 bg-gray-900 text-white rounded-2xl text-[14px] font-bold active:scale-95 transition-transform hover:bg-black mt-1">
            Follow
          </button>
        </div>

        {/* Core Stats - High Contrast, 1px Separators */}
        <div className="flex items-center justify-between border-y border-gray-100 py-4 mb-6">
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
              <span className="text-[16px] font-extrabold text-gray-900 leading-none">{kitchenData.rating}</span>
            </div>
            <span className="text-[12px] font-medium text-gray-500">{kitchenData.reviews} reviews</span>
          </div>
          
          <div className="w-[1px] h-8 bg-gray-100" />
          
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="w-4 h-4 text-gray-900" />
              <span className="text-[16px] font-extrabold text-gray-900 leading-none">{kitchenData.location.split(',')[1]?.trim() || kitchenData.location}</span>
            </div>
            <span className="text-[12px] font-medium text-gray-500">{kitchenData.location.split(',')[0]}</span>
          </div>

          <div className="w-[1px] h-8 bg-gray-100" />
          
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4 text-gray-900" />
              <span className="text-[16px] font-extrabold text-gray-900 leading-none">Top</span>
            </div>
            <span className="text-[12px] font-medium text-gray-500 truncate max-w-[90px] text-center">{kitchenData.specialty}</span>
          </div>
        </div>

        {/* Verification Levels */}
        <div className="mb-8 border border-gray-100 rounded-2xl overflow-hidden bg-white">
          <div className="flex items-center gap-4 px-4 py-3.5">
            <div className="w-8 h-8 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-gray-900" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-gray-900 leading-tight">Identity Verified</p>
              <p className="text-[13px] font-medium text-gray-500 mt-0.5">Cook profile & location confirmed</p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gray-100 ml-16" />
          <div className="flex items-center gap-4 px-4 py-3.5">
            <div className="w-8 h-8 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-gray-900" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-gray-900 leading-tight">Hygiene Excellence</p>
              <p className="text-[13px] font-medium text-gray-500 mt-0.5">Passed local safety inspections</p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gray-100 ml-16" />
          <div className="flex items-center gap-4 px-4 py-3.5">
            <div className="w-8 h-8 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-gray-900" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-gray-900 leading-tight">Quality Certified</p>
              <p className="text-[13px] font-medium text-gray-500 mt-0.5">Consistently high community ratings</p>
            </div>
          </div>
        </div>

        {/* Daily Fresh Meal Plan Subscription Section */}
        <section className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex flex-col">
              <h3 className="text-[20px] font-extrabold text-gray-900 tracking-tight leading-none">Daily Fresh Meal Plan</h3>
              <p className="text-[13px] font-medium text-gray-500 mt-1.5">Fresh nutrition, delivered daily.</p>
            </div>
            <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-100 border px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest">Premium</Badge>
          </div>
          
          <button 
            onClick={() => setShowSubscriptionModal(true)}
            className="w-full bg-gray-900 rounded-[32px] p-6 text-left relative overflow-hidden group active:scale-[0.98] transition-all"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-3xl group-hover:bg-white/10 transition-colors" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10">
                  <Sparkles className="w-6 h-6" />
                </div>
                <ChevronRight className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
              </div>
              
              <div>
                <p className="text-[20px] font-black text-white leading-tight mb-1">
                  Start Your Plan
                </p>
                <p className="text-[14px] font-medium text-white/60">Choose your favorite daily meals from €45/wk</p>
              </div>
            </div>
          </button>
        </section>

        {/* Menu Section */}
        <div ref={menuRef} className="scroll-mt-32 pt-2 mb-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[20px] font-extrabold text-gray-900 tracking-tight">Signature Menu</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kitchenData.dishes.map((dish) => (
              <div key={dish.id} onClick={() => navigate(`/food/${dish.id}`)} className="cursor-pointer">
                <FoodCard
                  id={dish.id}
                  image={dish.image}
                  name={dish.name}
                  cook={kitchenData.cookName}
                  location={kitchenData.location}
                  price={dish.price}
                  rating={dish.rating}
                  status={dish.status}
                  layout="grid"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio / Cakes Section */}
        <div ref={portfolioRef} className="scroll-mt-32 pt-2 mb-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[20px] font-extrabold text-gray-900 tracking-tight">Cake Portfolio</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kitchenData.cakes.map((cake) => (
              <div key={cake.id} onClick={() => navigate(`/cake/${cake.id}`)} className="cursor-pointer">
                <FoodCard
                  id={cake.id}
                  image={cake.image}
                  name={cake.name}
                  cook={kitchenData.cookName}
                  location={kitchenData.location}
                  price={cake.price}
                  rating={cake.rating}
                  status={cake.status}
                  layout="grid"
                />
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div ref={aboutRef} className="scroll-mt-32 pt-4 mb-10">
          <h3 className="text-[20px] font-bold text-gray-900 mb-4 tracking-tight">About the Kitchen</h3>
          <p className="text-[16px] leading-relaxed text-gray-600 font-medium bg-gray-50 p-6 rounded-2xl">
            {kitchenData.bio}
          </p>
        </div>

        {/* Reviews Section */}
        <div ref={reviewsRef} className="scroll-mt-32 pt-4 mb-12">
          <h3 className="text-[20px] font-bold text-gray-900 mb-5 tracking-tight">Community Reviews</h3>
          <div className="p-6 bg-gray-50 rounded-2xl flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-[40px] font-black text-gray-900 leading-none">{kitchenData.rating}</span>
              <div className="flex items-center gap-0.5 mt-2">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-4 h-4 fill-gray-900 text-gray-900" />
                ))}
              </div>
              <span className="text-[13px] font-bold text-gray-500 mt-2">{kitchenData.reviews} ratings</span>
            </div>
            <div className="flex-1 space-y-2">
              {[5,4,3].map((star, i) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-[12px] font-bold w-2">{star}</span>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-2xl overflow-hidden">
                    <div 
                      className="h-full bg-gray-900 rounded-2xl" 
                      style={{ width: i === 0 ? '75%' : i === 1 ? '20%' : '5%' }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Subscription Modal / Full Screen Flow */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-white animate-in slide-in-from-bottom duration-400">
          <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl pt-12 pb-4 px-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <button 
                onClick={subStep === 1 ? () => setShowSubscriptionModal(false) : () => setSubStep(s => s - 1)}
                className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
              >
                {subStep === 1 ? <X className="w-5 h-5 text-gray-900" /> : <ChevronLeft className="w-5 h-5 text-gray-900" />}
              </button>
              
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-[16px] font-extrabold text-gray-900 tracking-tight">Daily Fresh Plan</h1>
                <Badge variant="secondary" className="bg-transparent text-gray-500 font-bold uppercase tracking-widest border-none p-0 text-[11px]">
                  {subStep === 1 ? 'Plan Details' : subStep === 2 ? 'Customize Meals' : 'Review & Pay'}
                </Badge>
              </div>

              <div className="w-11 h-11 flex items-center justify-center">
                <span className="text-[15px] font-black text-gray-900">{subStep}/3</span>
              </div>
            </div>

            {/* Progress Segmented */}
            <div className="flex gap-1.5 h-1.5 mt-6 px-1">
              {[1, 2, 3].map(s => (
                <div 
                  key={s} 
                  className={`flex-1 rounded-full transition-all duration-500 ${
                    s <= subStep ? 'bg-gray-900' : 'bg-gray-100'
                  }`} 
                />
              ))}
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-6 py-8 pb-[140px] bg-white">
            {subStep === 1 && renderSubStep1()}
            {subStep === 2 && renderSubStep2()}
            {subStep === 3 && renderSubStep3()}
          </main>

          {/* Footer Navigation */}
          {subStep < 3 && (
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-xl border-t border-gray-100 z-[110] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
              <Button 
                onClick={() => setSubStep(s => s + 1)}
                className="w-full h-16 bg-gray-900 text-white rounded-3xl font-bold text-[17px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-black border-none"
              >
                {subStep === 2 ? 'Confirm Your Week' : 'Next Step'}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Immersive Meal Selection Drawer */}
          <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]" />
              <Drawer.Content className="bg-white flex flex-col rounded-t-[40px] h-[85vh] mt-24 fixed bottom-0 left-0 right-0 z-[210] outline-none border-t-4 border-gray-900/5">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-200 my-4" />
                
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[24px] font-black text-gray-900 tracking-tight">Select Meal for {activeDay}</h3>
                    <button onClick={() => setIsDrawerOpen(false)} className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  <p className="text-[14px] font-medium text-gray-500 mb-6">Choose from Ibrahim's Signature Menu</p>

                  <div className="grid grid-cols-1 gap-5 overflow-y-auto max-h-[calc(85vh-160px)] pb-20 scrollbar-hide">
                    {kitchenData.dishes.map((dish) => (
                      <button
                        key={dish.id}
                        onClick={() => updateDayMeal(activeDay, dish.name)}
                        className={`group relative flex flex-col rounded-[32px] overflow-hidden border-2 transition-all text-left ${
                          (subData.selectedMeals as any)[activeDay] === dish.name 
                            ? 'border-gray-900 bg-gray-50' 
                            : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-4 right-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                              (subData.selectedMeals as any)[activeDay] === dish.name 
                                ? 'bg-gray-900 border-gray-900 text-white' 
                                : 'bg-white/80 backdrop-blur-md border-white text-transparent'
                            }`}>
                              <Check className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                        <div className="p-5 flex justify-between items-center">
                          <div>
                            <p className="text-[16px] font-black text-gray-900 leading-tight mb-1">{dish.name}</p>
                            <div className="flex items-center gap-1.5">
                              <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
                              <span className="text-[12px] font-black text-gray-900">{dish.rating}</span>
                              <span className="text-gray-300 mx-1">•</span>
                              <Badge variant="secondary" className="bg-transparent p-0 text-gray-400 font-bold uppercase tracking-widest text-[10px] border-none">Selected Often</Badge>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      )}
    </div>
  );
}
