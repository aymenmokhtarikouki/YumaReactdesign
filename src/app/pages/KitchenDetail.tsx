import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { ArrowLeft, Share2, MapPin, Star, ChevronRight, Clock, Award, Users, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { FoodCard } from '../components/FoodCard';

export default function KitchenDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');

  const menuRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Mock data for the cook/kitchen
  const kitchenData = {
    name: "Ibrahim's Kitchen",
    cookName: "Ibrahim B.",
    coverImage: "https://images.unsplash.com/photo-1762922425168-616c0d654a75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBraXRjaGVuJTIwaW50ZXJpb3IlMjByZXN0YXVyYW50JTIwY29va2luZ3xlbnwxfHx8fDE3NzM2NTc1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    avatar: "https://images.unsplash.com/photo-1763685805275-1845419c01a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXQlMjBjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NzM2NTc1NDd8MA&ixlib=rb-4.1.0&q=80&w=200",
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
    </div>
  );
}