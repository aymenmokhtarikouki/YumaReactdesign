import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft,
  CreditCard,
  Plus,
  Check,
  MoreVertical,
  Smartphone,
  Trash2
} from 'lucide-react';

export default function PaymentMethods() {
  const navigate = useNavigate();
  const [activeActionSheet, setActiveActionSheet] = useState<number | null>(null);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [defaultMethod, setDefaultMethod] = useState(1);

  const methods = [
    { id: 1, type: 'Apple Pay', last4: '', icon: Smartphone },
    { id: 2, type: 'Visa', last4: '4242', icon: CreditCard },
    { id: 3, type: 'Mastercard', last4: '8888', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-white font-inter text-gray-900 selection:bg-gray-900 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl pt-12 pb-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-2xl active:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-[24px] font-black text-gray-900 tracking-tight ml-1">Payment</h1>
        </div>
      </header>

      <main className="pt-[100px] pb-[120px] px-6">
        <div className="space-y-0">
          {methods.map((method) => (
            <div 
              key={method.id}
              className="flex items-center justify-between py-6 border-b border-gray-100 group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl">
                  <method.icon className="w-6 h-6 text-gray-900" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[18px] font-bold text-gray-900">
                      {method.type} {method.last4 && <span className="tracking-widest">•••• {method.last4}</span>}
                    </h3>
                    {defaultMethod === method.id && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-[8px]">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-4">
                <button 
                  onClick={() => setActiveActionSheet(method.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-2xl active:bg-gray-100 transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add New Payment FAB */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-safe z-40 bg-gradient-to-t from-white via-white to-transparent pt-4">
        <button 
          onClick={() => setIsAddSheetOpen(true)}
          className="w-full h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-[16px] active:scale-[0.98] transition-transform hover:bg-black"
        >
          <Plus className="w-5 h-5" />
          Add Payment Method
        </button>
      </div>

      {/* Action Sheet for specific payment method */}
      {activeActionSheet !== null && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveActionSheet(null)}
          />
          <div className="relative bg-white rounded-t-2xl p-6 pb-12 border border-gray-100 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-2xl mx-auto mb-8" />
            
            {activeActionSheet !== defaultMethod && (
              <button 
                onClick={() => {
                  setDefaultMethod(activeActionSheet);
                  setActiveActionSheet(null);
                }}
                className="w-full flex items-center gap-4 py-4 border-b border-gray-100 active:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-2xl">
                  <Check className="w-5 h-5 text-gray-900" />
                </div>
                <span className="text-[18px] font-bold text-gray-900">Set as Default</span>
              </button>
            )}
            
            <button 
              onClick={() => setActiveActionSheet(null)}
              className="w-full flex items-center gap-4 py-4 border-b border-gray-100 active:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-red-50 rounded-2xl">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-[18px] font-bold text-red-500">Remove Method</span>
            </button>

            <button 
              onClick={() => setActiveActionSheet(null)}
              className="w-full py-4 mt-6 text-[16px] font-bold text-gray-400 active:text-gray-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add New Payment Sheet */}
      {isAddSheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsAddSheetOpen(false)}
          />
          <div className="relative bg-white rounded-t-2xl pt-6 pb-8 border border-gray-100 animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[90vh]">
            <div className="shrink-0 w-12 h-1.5 bg-gray-200 rounded-2xl mx-auto mb-6" />
            
            <div className="px-6 mb-6 shrink-0">
              <h2 className="text-[24px] font-black text-gray-900 tracking-tight">New Card</h2>
            </div>

            <div className="px-6 overflow-y-auto overflow-x-hidden flex-1 no-scrollbar">
              <div className="space-y-8 pb-4">
                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="relative group pt-4">
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000" 
                      className="w-full text-[18px] font-bold text-gray-900 placeholder:text-gray-300 bg-transparent border-b border-gray-200 py-3 outline-none focus:border-gray-900 transition-colors tracking-widest"
                    />
                    <label className="absolute top-0 left-0 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Card Number</label>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="relative group pt-4 flex-1">
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        className="w-full text-[18px] font-bold text-gray-900 placeholder:text-gray-300 bg-transparent border-b border-gray-200 py-3 outline-none focus:border-gray-900 transition-colors"
                      />
                      <label className="absolute top-0 left-0 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Expiry</label>
                    </div>
                    
                    <div className="relative group pt-4 flex-1">
                      <input 
                        type="text" 
                        placeholder="CVC" 
                        className="w-full text-[18px] font-bold text-gray-900 placeholder:text-gray-300 bg-transparent border-b border-gray-200 py-3 outline-none focus:border-gray-900 transition-colors"
                      />
                      <label className="absolute top-0 left-0 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Security Code</label>
                    </div>
                  </div>
                  
                  <div className="relative group pt-4">
                    <input 
                      type="text" 
                      placeholder="Name on card" 
                      className="w-full text-[18px] font-bold text-gray-900 placeholder:text-gray-300 bg-transparent border-b border-gray-200 py-3 outline-none focus:border-gray-900 transition-colors"
                    />
                    <label className="absolute top-0 left-0 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Cardholder Name</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 shrink-0 pt-6 border-t border-gray-100">
              <button 
                onClick={() => setIsAddSheetOpen(false)}
                className="w-full h-[56px] bg-gray-900 text-white rounded-2xl flex items-center justify-center font-bold text-[16px] active:scale-[0.98] transition-transform hover:bg-black"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}