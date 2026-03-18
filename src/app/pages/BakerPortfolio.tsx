import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Image as ImageIcon, Camera, X, ChevronRight, Check } from 'lucide-react';
import { FoodCard } from '../components/FoodCard';
import { toast } from 'sonner';

export default function BakerPortfolio() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New item form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);

  // Mock baker's existing portfolio
  const [portfolio, setPortfolio] = useState([
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
    }
  ]);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/profile', { replace: true });
    }
  };

  const handleSave = () => {
    if (!name || !price || !hasPhoto) {
      toast.error("Please fill in all required fields and upload a photo.");
      return;
    }

    const newItem = {
      id: `new-${Date.now()}`,
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=1080", // placeholder for new upload
      name: name,
      price: `From €${parseFloat(price).toFixed(2)}`,
      rating: 0,
      status: "AVAILABLE NOW" as const,
    };

    setPortfolio([newItem, ...portfolio]);
    setShowAddModal(false);
    
    // Reset form
    setName('');
    setDescription('');
    setPrice('');
    setHasPhoto(false);
    
    toast.success("Cake added to portfolio!");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter pb-[100px] selection:bg-gray-900 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <button 
            onClick={handleBack}
            className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center active:scale-95 transition-transform text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">My Portfolio</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[24px] font-black text-gray-900 tracking-tight leading-none mb-1">Your Cakes</h2>
            <p className="text-[14px] font-medium text-gray-500">Manage what customers can order</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {portfolio.map((cake) => (
            <div key={cake.id} className="relative group">
              <FoodCard
                image={cake.image}
                name={cake.name}
                cook="My Kitchen"
                location=""
                price={cake.price}
                rating={cake.rating > 0 ? cake.rating : undefined}
                status={cake.status}
                layout="grid"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-gray-900 uppercase tracking-widest shadow-sm">
                Live
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Add Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pb-[calc(1.25rem+env(safe-area-inset-bottom))] z-40">
        <button 
          onClick={() => setShowAddModal(true)}
          className="w-full h-[56px] bg-gray-900 text-white rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-black shadow-xl shadow-gray-900/20"
        >
          <Plus className="w-5 h-5" />
          Add to Portfolio
        </button>
      </div>

      {/* Full Screen "Add Item" Modal - Bottom Sheet Pattern */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
          <header className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100 bg-white">
            <button 
              onClick={() => setShowAddModal(false)}
              className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center active:scale-95 transition-transform text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">New Cake Design</h2>
            <button 
              onClick={handleSave}
              className="text-[15px] font-bold text-teal-600 active:opacity-70 transition-opacity"
            >
              Save
            </button>
          </header>

          <div className="flex-1 overflow-y-auto pb-[100px]">
            {/* Photo Upload Area */}
            <div className="p-4">
              {!hasPhoto ? (
                <label className="flex flex-col items-center justify-center w-full h-[240px] border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50 cursor-pointer active:bg-gray-100 transition-colors group">
                  <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Camera className="w-6 h-6 text-gray-900" />
                  </div>
                  <p className="text-[15px] font-bold text-gray-900">Upload Cake Photo</p>
                  <p className="text-[13px] font-medium text-gray-500 mt-1">High quality JPEG or PNG</p>
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
                <div className="relative w-full h-[300px] rounded-3xl overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=1080" 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <button 
                    onClick={() => setHasPhoto(false)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 active:scale-95 transition-transform shadow-sm"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="px-4 space-y-6 mt-2">
              <div>
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-widest mb-2.5 block">
                  Cake Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Rustic Berry Tier"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-[16px] font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-widest mb-2.5 block">
                  Starting Price (€)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-bold text-gray-900">€</span>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-8 pr-4 py-4 text-[16px] font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-widest mb-2.5 block">
                  Description
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the layers, style, and perfect occasions..."
                  className="w-full h-32 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-[15px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Toggles for custom options */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-[16px] font-bold text-gray-900">Customization Options</h3>
                <label className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 bg-white">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-gray-900">Allow Custom Message</span>
                    <span className="text-[13px] font-medium text-gray-500">Customers can add text to the cake</span>
                  </div>
                  <div className="w-12 h-7 bg-gray-900 rounded-full flex items-center px-1 justify-end">
                    <div className="w-5 h-5 bg-white rounded-full" />
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 bg-white">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-gray-900">Size Variations</span>
                    <span className="text-[13px] font-medium text-gray-500">Offer multiple tier/size options</span>
                  </div>
                  <div className="w-12 h-7 bg-gray-900 rounded-full flex items-center px-1 justify-end">
                    <div className="w-5 h-5 bg-white rounded-full" />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}