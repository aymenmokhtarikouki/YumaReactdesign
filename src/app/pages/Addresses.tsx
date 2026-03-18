import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft,
  Home,
  Briefcase,
  MapPin,
  MoreVertical,
  Plus,
  Check
} from 'lucide-react';

export default function Addresses() {
  const navigate = useNavigate();
  const [activeActionSheet, setActiveActionSheet] = useState<number | null>(null);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Home');

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      icon: Home,
      address: '123 Main Street, Apt 4B',
      details: 'New York, NY 10001',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Work',
      icon: Briefcase,
      address: 'Tech Hub Building, Floor 12',
      details: '456 Innovation Blvd, New York, NY 10002',
      isDefault: false,
    },
    {
      id: 3,
      type: 'Other',
      icon: MapPin,
      address: '789 Park Avenue, Suite 2',
      details: 'Brooklyn, NY 11201',
      isDefault: false,
    }
  ]);

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    setActiveActionSheet(null);
  };

  return (
    <div className="min-h-screen bg-white font-inter text-gray-900 selection:bg-gray-900 selection:text-white pb-[100px]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl pt-12 pb-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-2xl active:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-[24px] font-black text-gray-900 tracking-tight ml-1">Addresses</h1>
        </div>
      </header>

      <main className="px-6 pt-4">
        {/* Addresses List */}
        <section className="flex flex-col">
          {addresses.map((addr, index) => (
            <div key={addr.id}>
              <div className="w-full flex items-start justify-between py-5 group bg-transparent">
                <div className="flex items-start gap-4 flex-1 pr-4">
                  <div className="w-10 h-10 shrink-0 flex items-start justify-center text-gray-400 group-hover:text-gray-900 transition-colors">
                    <addr.icon className="w-[22px] h-[22px] mt-0.5" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[16px] font-bold text-gray-900">{addr.type}</h3>
                      {addr.isDefault && (
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-[14px] font-medium text-gray-900 leading-snug">{addr.address}</p>
                    <p className="text-[13px] font-medium text-gray-400 mt-0.5 leading-snug">{addr.details}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveActionSheet(addr.id)}
                  className="w-10 h-10 shrink-0 flex items-center justify-center text-gray-300 hover:text-gray-900 active:text-gray-900 transition-colors -mr-2"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              {index < addresses.length - 1 && (
                <div className="h-[1px] bg-gray-100 ml-14" />
              )}
            </div>
          ))}
        </section>
      </main>

      {/* Add New Address FAB */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-safe z-40 bg-gradient-to-t from-white via-white to-transparent pt-4">
        <button 
          onClick={() => setIsAddSheetOpen(true)}
          className="w-full h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-[16px] active:scale-[0.98] transition-transform hover:bg-black"
        >
          <Plus className="w-5 h-5" />
          Add New Address
        </button>
      </div>

      {/* Bottom Action Sheet for Address Options */}
      {activeActionSheet !== null && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveActionSheet(null)}
          />
          <div className="relative bg-white rounded-t-[24px] px-6 pb-12 pt-6 border border-gray-100 animate-in slide-in-from-bottom duration-200">
            <div className="w-12 h-1.5 bg-gray-200 rounded-2xl mx-auto mb-8" />
            
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => handleSetDefault(activeActionSheet)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 active:scale-[0.98] transition-transform"
              >
                <span className="text-[16px] font-bold text-gray-900">Set as Default</span>
                {addresses.find(a => a.id === activeActionSheet)?.isDefault && (
                  <Check className="w-5 h-5 text-gray-900" />
                )}
              </button>
              
              <button className="w-full flex items-center justify-between p-4 rounded-2xl active:bg-gray-50 transition-colors">
                <span className="text-[16px] font-bold text-gray-900">Edit Address</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 rounded-2xl active:bg-red-50 transition-colors group">
                <span className="text-[16px] font-bold text-red-600">Delete Address</span>
              </button>
            </div>
            
            <button 
              onClick={() => setActiveActionSheet(null)}
              className="w-full py-4 mt-6 text-[16px] font-bold text-gray-400 active:text-gray-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add New Address Sheet */}
      {isAddSheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsAddSheetOpen(false)}
          />
          <div className="relative bg-white rounded-t-2xl pt-6 pb-8 border border-gray-100 animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[90vh]">
            <div className="shrink-0 w-12 h-1.5 bg-gray-200 rounded-2xl mx-auto mb-6" />
            
            <div className="px-6 mb-6 shrink-0">
              <h2 className="text-[24px] font-black text-gray-900 tracking-tight">New Address</h2>
            </div>

            <div className="px-6 overflow-y-auto overflow-x-hidden flex-1 no-scrollbar">
              <div className="space-y-8 pb-4">
                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="relative group pt-4">
                    <input 
                      type="text" 
                      placeholder="123 Main Street" 
                      className="w-full text-[18px] font-bold text-gray-900 placeholder:text-gray-300 bg-transparent border-b border-gray-200 py-3 outline-none focus:border-gray-900 transition-colors"
                    />
                    <label className="absolute top-0 left-0 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Street Address</label>
                  </div>
                  
                  <div className="relative group pt-4">
                    <input 
                      type="text" 
                      placeholder="Apt 4B" 
                      className="w-full text-[18px] font-bold text-gray-900 placeholder:text-gray-300 bg-transparent border-b border-gray-200 py-3 outline-none focus:border-gray-900 transition-colors"
                    />
                    <label className="absolute top-0 left-0 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Apartment, Suite (Optional)</label>
                  </div>
                  
                  <div className="relative group pt-4">
                    <input 
                      type="text" 
                      placeholder="Door code, instructions for driver..." 
                      className="w-full text-[16px] font-medium text-gray-900 placeholder:text-gray-300 bg-transparent border-b border-gray-200 py-3 outline-none focus:border-gray-900 transition-colors"
                    />
                    <label className="absolute top-0 left-0 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Delivery Instructions</label>
                  </div>
                </div>

                {/* Label Selector */}
                <div className="pt-2 pb-6">
                  <label className="text-[12px] font-bold text-gray-400 uppercase tracking-wider block mb-4">Save As</label>
                  <div className="flex items-center gap-3">
                    {[
                      { id: 'Home', icon: Home },
                      { id: 'Work', icon: Briefcase },
                      { id: 'Other', icon: MapPin },
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`flex-1 flex flex-col items-center justify-center py-4 rounded-2xl transition-colors gap-2
                          ${selectedType === type.id 
                            ? 'bg-gray-900 text-white border border-gray-900' 
                            : 'bg-gray-50 text-gray-400 hover:text-gray-900 active:bg-gray-100 border border-transparent'
                          }`}
                      >
                        <type.icon className="w-[20px] h-[20px]" />
                        <span className="text-[14px] font-bold">{type.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 shrink-0 pt-2 border-t border-gray-100">
              <button 
                onClick={() => setIsAddSheetOpen(false)}
                className="w-full h-[56px] bg-gray-900 text-white rounded-2xl flex items-center justify-center font-bold text-[16px] active:scale-[0.98] transition-transform hover:bg-black"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}