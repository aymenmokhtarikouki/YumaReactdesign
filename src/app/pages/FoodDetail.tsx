import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { ArrowLeft, Heart, Star, Clock, Flame, Share2, ChevronRight, Info, WheatOff, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function FoodDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeSection, setActiveSection] = useState('details');
  const [nutritionTab, setNutritionTab] = useState<'portion' | '100g'>('portion');
  const [quantity, setQuantity] = useState(1);

  const detailsRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Mock data based on id
  const foodData = {
    image: "https://images.unsplash.com/photo-1605704922285-e82455dba38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdW5nJTIwcGFvJTIwY2hpY2tlbnxlbnwxfHx8fDE3NzM2MTE5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    name: "Kung Pao Chicken",
    price: 10.31,
    rating: 4.8,
    reviews: 124,
    description: "Authentic Sichuan style Kung Pao Chicken made with free-range chicken breast, roasted peanuts, and our signature homemade chili oil. Perfectly balanced sweet, sour, and spicy flavors.",
    ingredients: ["Chicken breast", "Peanuts", "Sichuan peppercorns", "Dried chili", "Scallions", "Soy sauce", "Rice vinegar"],
    prepTime: "20-30 min",
    calories: "540 kcal",
    dietary: ["Dairy Free", "Gluten Free"],
    allergens: ["Peanuts", "Soy"],
    nutrition: {
      portion: { calories: "540", protein: "42g", carbs: "35g", fat: "24g" },
      '100g': { calories: "135", protein: "10.5g", carbs: "8.7g", fat: "6g" }
    },
    cook: {
      id: "cook1",
      name: "Ibrahim B.",
      avatar: "https://images.unsplash.com/photo-1763685805275-1845419c01a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXQlMjBjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NzM2NTc1NDd8MA&ixlib=rb-4.1.0&q=80&w=200",
      rating: 4.9,
      location: "Strasbourg, 1.2km"
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 250);

      const offset = 140; // Adjust for sticky header height
      
      const detailsTop = detailsRef.current?.offsetTop ?? 0;
      const ingredientsTop = ingredientsRef.current?.offsetTop ?? 0;
      const reviewsTop = reviewsRef.current?.offsetTop ?? 0;

      if (scrollY >= reviewsTop - offset) {
        setActiveSection('reviews');
      } else if (scrollY >= ingredientsTop - offset) {
        setActiveSection('ingredients');
      } else {
        setActiveSection('details');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    let ref;
    if (sectionId === 'details') ref = detailsRef;
    if (sectionId === 'ingredients') ref = ingredientsRef;
    if (sectionId === 'reviews') ref = reviewsRef;
    
    if (ref && ref.current) {
      const offset = 120; // sticky header height
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

  return (
    <div className="min-h-screen bg-white font-inter pb-12 selection:bg-gray-900 selection:text-white">
      {/* Dynamic Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-12 pb-4">
          <button 
            onClick={handleBack}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
              isScrolled 
                ? 'bg-gray-100/80 text-gray-900 hover:bg-gray-200' 
                : 'bg-black/20 backdrop-blur-md text-white hover:bg-black/30'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h1 className={`text-[16px] font-bold tracking-tight transition-opacity duration-300 ${
            isScrolled ? 'opacity-100 text-gray-900' : 'opacity-0'
          }`}>
            {foodData.name}
          </h1>

          <div className="flex items-center gap-2">
            <button 
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                isScrolled 
                  ? 'bg-gray-100/80 text-gray-900 hover:bg-gray-200' 
                  : 'bg-black/20 backdrop-blur-md text-white hover:bg-black/30'
              }`}
            >
              <Share2 className="w-[18px] h-[18px]" />
            </button>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                isScrolled 
                  ? 'bg-gray-100/80 hover:bg-gray-200' 
                  : 'bg-black/20 backdrop-blur-md hover:bg-black/30'
              }`}
            >
              <Heart className={`w-[18px] h-[18px] transition-colors ${
                isFavorite 
                  ? 'fill-rose-500 text-rose-500' 
                  : (isScrolled ? 'text-gray-900' : 'text-white')
              }`} />
            </button>
          </div>
        </div>

        {/* Section Tabs (Visible only when scrolled past image) */}
        <div className={`px-5 flex gap-5 transition-all duration-300 overflow-x-auto scrollbar-hide ${
          isScrolled ? 'opacity-100 h-12 pb-0' : 'opacity-0 h-0 overflow-hidden pb-0'
        }`}>
          {['details', 'ingredients', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => scrollToSection(tab)}
              className={`relative pb-3 text-[14px] font-bold capitalize whitespace-nowrap transition-colors ${
                activeSection === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeSection === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-900 rounded-t-2xl" />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* PATTERN: Static/Parallax Header Image */}
      <div className="relative w-full h-[400px]">
        <img 
          src={foodData.image} 
          alt={foodData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
      </div>

      {/* PATTERN: Overlapping "Bottom Sheet" Content Area */}
      <main className="px-5 pt-8 rounded-t-[32px] bg-white -mt-8 relative z-10 pb-[calc(100px+env(safe-area-inset-bottom))]">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h1 className="text-[28px] font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            {foodData.name}
          </h1>
          <span className="text-[24px] font-black text-gray-900 flex-shrink-0 pt-1">
            €{foodData.price}
          </span>
        </div>

        {/* Dietary Labels */}
        <div className="flex flex-wrap gap-2 mb-5">
          {foodData.dietary.map(label => (
            <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-100 rounded-2xl bg-white">
              {label === 'Dairy Free' && <Info className="w-3.5 h-3.5 text-gray-900" />}
              {label === 'Gluten Free' && <WheatOff className="w-3.5 h-3.5 text-gray-900" />}
              <span className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">{label}</span>
            </div>
          ))}
        </div>

        {/* Quick Info Badges */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-2xl border border-gray-100 whitespace-nowrap">
            <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
            <span className="text-[13px] font-bold text-gray-900">{foodData.rating}</span>
            <span className="text-[13px] text-gray-500 font-medium">({foodData.reviews})</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-2xl border border-gray-100 whitespace-nowrap">
            <Clock className="w-4 h-4 text-gray-900" />
            <span className="text-[13px] font-bold text-gray-900">{foodData.prepTime}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-2xl border border-gray-100 whitespace-nowrap">
            <Flame className="w-4 h-4 text-rose-500" />
            <span className="text-[13px] font-bold text-gray-900">{foodData.calories}</span>
          </div>
        </div>

        {/* Cook Profile Link - Premium Minimal */}
        <Link 
          to={`/kitchen/${foodData.cook.id}`}
          className="flex items-center justify-between py-4 mb-8 border-y border-gray-100 active:opacity-70 transition-opacity"
        >
          <div className="flex items-center gap-4">
            <img 
              src={foodData.cook.avatar} 
              alt={foodData.cook.name}
              className="w-14 h-14 rounded-2xl object-cover bg-gray-100"
            />
            <div>
              <p className="text-[16px] font-bold text-gray-900 mb-0.5">By {foodData.cook.name}</p>
              <div className="text-[14px] font-medium text-gray-500">
                {foodData.cook.location}
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        {/* Details Section */}
        <div ref={detailsRef} className="scroll-mt-32 pt-2 mb-10">
          <p className="text-[16px] leading-relaxed text-gray-600 font-medium">
            {foodData.description}
          </p>
        </div>

        {/* Nutrition Section */}
        <div className="mb-10 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[20px] font-bold text-gray-900 tracking-tight">Nutrition</h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setNutritionTab('portion')}
                className={`text-[14px] font-bold pb-1 border-b-[2px] transition-colors ${
                  nutritionTab === 'portion' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                Per portion
              </button>
              <button 
                onClick={() => setNutritionTab('100g')}
                className={`text-[14px] font-bold pb-1 border-b-[2px] transition-colors ${
                  nutritionTab === '100g' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                Per 100g
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-y border-gray-100 py-5">
            <div className="flex flex-col items-center flex-1">
              <span className="text-[18px] font-extrabold text-gray-900 leading-none mb-1">
                {foodData.nutrition[nutritionTab].calories}
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Kcal</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-100" />
            <div className="flex flex-col items-center flex-1">
              <span className="text-[18px] font-extrabold text-gray-900 leading-none mb-1">
                {foodData.nutrition[nutritionTab].protein}
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Protein</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-100" />
            <div className="flex flex-col items-center flex-1">
              <span className="text-[18px] font-extrabold text-gray-900 leading-none mb-1">
                {foodData.nutrition[nutritionTab].carbs}
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Carbs</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-100" />
            <div className="flex flex-col items-center flex-1">
              <span className="text-[18px] font-extrabold text-gray-900 leading-none mb-1">
                {foodData.nutrition[nutritionTab].fat}
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Fat</span>
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div ref={ingredientsRef} className="scroll-mt-32 pt-4 mb-10">
          <h3 className="text-[20px] font-bold text-gray-900 mb-5 tracking-tight">Ingredients</h3>
          
          <p className="text-[16px] leading-relaxed text-gray-600 font-medium mb-6">
            {foodData.ingredients.join(', ')}.
          </p>

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
            <div>
              <span className="text-[14px] font-bold text-gray-900 block mb-1.5 leading-tight">Allergen Warning</span>
              <p className="text-[13px] text-gray-600 font-medium mb-3 leading-relaxed">
                This meal is prepared in a kitchen that handles these ingredients. Please be aware if you have severe allergies.
              </p>
              <div className="flex flex-wrap gap-2">
                {foodData.allergens.map(allergen => (
                  <span key={allergen} className="px-3 py-1 bg-white border border-gray-100 text-gray-900 text-[13px] font-bold rounded-2xl tracking-wide">
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div ref={reviewsRef} className="scroll-mt-32 pt-4 mb-4">
          <h3 className="text-[20px] font-bold text-gray-900 mb-5 tracking-tight">Reviews</h3>
          <div className="p-6 bg-gray-50 rounded-2xl flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-[40px] font-black text-gray-900 leading-none">{foodData.rating}</span>
              <div className="flex items-center gap-0.5 mt-2">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-4 h-4 fill-gray-900 text-gray-900" />
                ))}
              </div>
              <span className="text-[13px] font-bold text-gray-500 mt-2">{foodData.reviews} ratings</span>
            </div>
            <div className="flex-1 space-y-2">
              {[5,4,3].map((star, i) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-[12px] font-bold w-2">{star}</span>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-2xl overflow-hidden">
                    <div 
                      className="h-full bg-gray-900 rounded-2xl" 
                      style={{ width: i === 0 ? '80%' : i === 1 ? '15%' : '5%' }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-5 z-50 pb-[calc(1.25rem+env(safe-area-inset-bottom))] flex gap-4 items-center">
        {/* Compact Quantity Selector */}
        <div className="flex items-center bg-gray-100 rounded-2xl p-1 h-[52px] shrink-0">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-full flex items-center justify-center text-gray-900 font-medium text-2xl active:scale-90 transition-transform [-webkit-tap-highlight-color:transparent]"
          >
            -
          </button>
          <span className="font-bold text-[16px] text-gray-900 w-5 text-center">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-full flex items-center justify-center text-gray-900 font-medium text-xl active:scale-90 transition-transform [-webkit-tap-highlight-color:transparent]"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={() => {
            toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
          }}
          className="flex-1 h-[52px] bg-gray-900 text-white rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-black [-webkit-tap-highlight-color:transparent]"
        >
          <span>Add {quantity} to cart</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span>€{(foodData.price * quantity).toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}