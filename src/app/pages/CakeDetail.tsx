import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { ArrowLeft, Heart, Share2, ChevronRight, Image as ImageIcon, Info, Camera, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

export default function CakeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  // Customization state
  const [size, setSize] = useState('6 inch (Serves 8-10)');
  const [tierConfigs, setTierConfigs] = useState([
    { sponge: 'Vanilla', filling: 'Strawberry Jam & Buttercream' },
    { sponge: 'Vanilla', filling: 'Strawberry Jam & Buttercream' },
    { sponge: 'Vanilla', filling: 'Strawberry Jam & Buttercream' },
  ]);
  const [cakeText, setCakeText] = useState('');
  const [notes, setNotes] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);

  // Mock data based on id
  const cakeData = {
    image: "https://images.unsplash.com/photo-1582052342644-d3269d382186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBjdXN0b20lMjBiaXJ0aGRheSUyMGNha2V8ZW58MXx8fHwxNzczNjkzNDc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Floral Buttercream Dream",
    basePrice: 65.00,
    description: "A beautiful custom-designed cake featuring hand-piped buttercream florals, delicate gold leaf accents, and a smooth watercolor finish. Perfect for birthdays, anniversaries, or intimate celebrations.",
    cook: {
      id: "cook2",
      name: "Sarah's Bakehouse",
      avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlciUyMHdvbWFufGVufDF8fHx8MTc3MzY5MzUxMnww&ixlib=rb-4.1.0&q=80&w=200",
      rating: 5.0,
      location: "Paris, 3.5km"
    }
  };

  const sizes = [
    { label: '6 inch (Serves 8-10)', price: 0, tiers: 1 },
    { label: '8 inch (Serves 15-20)', price: 25, tiers: 1 },
    { label: '10 inch (Serves 25-30)', price: 45, tiers: 1 },
    { label: '2-Tier (Serves 35-40)', price: 85, tiers: 2 },
    { label: '3-Tier Wedding (Serves 60-70)', price: 150, tiers: 3 }
  ];

  const sponges = ['Vanilla', 'Rich Chocolate', 'Red Velvet', 'Lemon', 'Carrot'];
  const fillings = ['Strawberry Jam & Buttercream', 'Chocolate Ganache', 'Cream Cheese', 'Salted Caramel', 'Fresh Berries & Cream'];

  const selectedSizeOption = sizes.find(s => s.label === size) || sizes[0];
  const totalPrice = (cakeData.basePrice + selectedSizeOption.price) * quantity;

  const updateTier = (index: number, field: 'sponge' | 'filling', value: string) => {
    const newConfigs = [...tierConfigs];
    newConfigs[index] = { ...newConfigs[index], [field]: value };
    setTierConfigs(newConfigs);
  };

  const tierNames: Record<number, string[]> = {
    1: ['Cake Flavor'],
    2: ['Top Tier', 'Bottom Tier'],
    3: ['Top Tier', 'Middle Tier', 'Bottom Tier']
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter pb-[120px] selection:bg-gray-900 selection:text-white">
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
            Customize Cake
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
      </header>

      {/* Hero Image */}
      <div className="relative w-full h-[400px]">
        <img 
          src={cakeData.image} 
          alt={cakeData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
      </div>

      {/* Content Area */}
      <main className="px-5 pt-8 rounded-t-[32px] bg-white -mt-8 relative z-10">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h1 className="text-[28px] font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-2">
              {cakeData.name}
            </h1>
            <p className="text-[15px] font-medium text-gray-500 leading-relaxed">
              {cakeData.description}
            </p>
          </div>
        </div>

        {/* Cook Profile Link */}
        <Link 
          to={`/kitchen/${cakeData.cook.id}`}
          className="flex items-center justify-between py-4 mb-8 mt-4 border-y border-gray-100 active:opacity-70 transition-opacity"
        >
          <div className="flex items-center gap-4">
            <img 
              src={cakeData.cook.avatar} 
              alt={cakeData.cook.name}
              className="w-12 h-12 rounded-2xl object-cover bg-gray-100"
            />
            <div>
              <p className="text-[15px] font-bold text-gray-900 mb-0.5">{cakeData.cook.name}</p>
              <div className="text-[13px] font-medium text-gray-500">
                View Portfolio & Reviews
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        {/* Customization Builder */}
        <div className="space-y-10">
          
          {/* Size Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Cake Size & Tiers</h3>
              <span className="text-[13px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full uppercase tracking-wide">Required</span>
            </div>
            <div className="space-y-3">
              {sizes.map((s) => (
                <label 
                  key={s.label}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    size === s.label ? 'border-gray-900 bg-gray-50' : 'border-gray-100 bg-white'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="size" 
                    value={s.label} 
                    checked={size === s.label} 
                    onChange={(e) => setSize(e.target.value)} 
                    className="hidden" 
                  />
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      size === s.label ? 'border-gray-900' : 'border-gray-300'
                    }`}>
                      {size === s.label && <div className="w-2.5 h-2.5 bg-gray-900 rounded-full" />}
                    </div>
                    <span className={`text-[15px] font-bold ${size === s.label ? 'text-gray-900' : 'text-gray-600'}`}>
                      {s.label}
                    </span>
                  </div>
                  <span className="text-[15px] font-semibold text-gray-900">
                    {s.price === 0 ? 'Included' : `+€${s.price.toFixed(2)}`}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Flavor and Filling Selection per Tier */}
          {Array.from({ length: selectedSizeOption.tiers }).map((_, index) => (
            <div key={index} className="space-y-10 pt-4 border-t border-gray-100 first:border-0 first:pt-0">
              {selectedSizeOption.tiers > 1 && (
                <div className="flex items-center gap-3">
                  <h4 className="text-[14px] font-black text-white bg-gray-900 px-3 py-1.5 rounded-xl uppercase tracking-wide">
                    {tierNames[selectedSizeOption.tiers][index]}
                  </h4>
                  <div className="flex-1 h-[1px] bg-gray-100"></div>
                </div>
              )}
              
              {/* Flavor Selection */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Sponge Flavor</h3>
                  <span className="text-[13px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full uppercase tracking-wide">Required</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sponges.map(s => (
                    <button
                      key={s}
                      onClick={() => updateTier(index, 'sponge', s)}
                      className={`px-4 py-2.5 rounded-2xl text-[14px] font-bold transition-all border-2 ${
                        tierConfigs[index].sponge === s 
                          ? 'border-gray-900 bg-gray-900 text-white' 
                          : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </section>

              {/* Filling Selection */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Filling</h3>
                  <span className="text-[13px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full uppercase tracking-wide">Required</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {fillings.map(f => (
                    <button
                      key={f}
                      onClick={() => updateTier(index, 'filling', f)}
                      className={`px-4 py-2.5 rounded-2xl text-[14px] font-bold transition-all border-2 ${
                        tierConfigs[index].filling === f 
                          ? 'border-gray-900 bg-gray-900 text-white' 
                          : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          ))}

          {/* Text Customization */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Message on Cake</h3>
              <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wide">Optional</span>
            </div>
            <div className="relative">
              <input 
                type="text" 
                value={cakeText}
                onChange={(e) => setCakeText(e.target.value)}
                placeholder="e.g., Happy 30th Birthday Sarah!"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-[15px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
                maxLength={40}
              />
              <span className="absolute right-4 top-4 text-[12px] font-bold text-gray-400">
                {cakeText.length}/40
              </span>
            </div>
          </section>

          {/* Inspiration Photo */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Inspiration Photo</h3>
              <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wide">Optional</span>
            </div>
            <p className="text-[14px] text-gray-500 font-medium mb-4">
              Upload a photo to show us the color palette, style, or specific details you'd like us to incorporate into your design.
            </p>
            
            {!hasPhoto ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-[14px] font-bold text-gray-600">Tap to upload a photo</p>
                  <p className="text-[12px] font-medium text-gray-400 mt-1">JPEG, PNG up to 5MB</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setHasPhoto(true);
                    }
                  }}
                />
              </label>
            ) : (
              <div className="relative w-[120px] h-[120px] rounded-2xl overflow-hidden border border-gray-200">
                <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=200" alt="Inspiration" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setHasPhoto(false)}
                  className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 font-bold text-[12px]"
                >
                  ✕
                </button>
              </div>
            )}
          </section>

          {/* Additional Notes */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">Special Instructions</h3>
              <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wide">Optional</span>
            </div>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any allergy requests, specific color shades, or dietary notes..."
              className="w-full h-32 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-[15px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow resize-none"
            />
          </section>
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
            toast.success(`Custom cake added to cart!`);
            setTimeout(() => handleBack(), 1000);
          }}
          className="flex-1 h-[52px] bg-gray-900 text-white rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-black [-webkit-tap-highlight-color:transparent]"
        >
          <span>Add Custom Cake</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span>€{totalPrice.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}