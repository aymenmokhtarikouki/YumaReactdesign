import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Minus, Plus, ChevronRight, CreditCard, ChevronLeft, Store } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function Cart() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cart');

  // Items are now structured by kitchen to allow placing orders per kitchen
  const [cartGroups, setCartGroups] = useState([
    {
      kitchenId: 'k1',
      cookName: 'Ibrahim B.',
      deliveryFee: 2.50,
      items: [
        {
          id: 1,
          name: 'Kung Pao Chicken',
          description: 'Extra spicy, less peanuts',
          price: 18.50,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1605704922285-e82455dba38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdW5nJTIwcGFvJTIwY2hpY2tlbnxlbnwxfHx8fDE3NzM2MTE5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          id: 3,
          name: 'Jasmine Tea',
          description: 'Hot, no sugar',
          price: 4.50,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1630558206910-de9c9958d6ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXNtaW5lJTIwdGVhfGVufDF8fHx8MTc3MzU1OTEwOXww&ixlib=rb-4.1.0&q=80&w=1080',
        }
      ]
    },
    {
      kitchenId: 'k2',
      cookName: 'Mai T.',
      deliveryFee: 1.50,
      items: [
        {
          id: 2,
          name: 'Steamed Dim Sum',
          description: 'Pork and shrimp filling',
          price: 12.00,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1691995989456-6a77273f9f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW0lMjBzdW18ZW58MXx8fHwxNzczNjE5NTM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        }
      ]
    }
  ]);

  const updateQuantity = (kitchenId: string, itemId: number, delta: number) => {
    setCartGroups(groups =>
      groups.map(group => {
        if (group.kitchenId === kitchenId) {
          const newItems = group.items.map(item => {
            if (item.id === itemId) {
              return { ...item, quantity: Math.max(0, item.quantity + delta) };
            }
            return item;
          }).filter(item => item.quantity > 0);
          return { ...group, items: newItems };
        }
        return group;
      }).filter(group => group.items.length > 0)
    );
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'home') navigate('/');
    else if (tab === 'orders') navigate('/orders');
    else if (tab === 'chat') navigate('/chat');
    else if (tab === 'profile') navigate('/profile');
    else setActiveTab(tab);
  };

  const grandTotal = cartGroups.reduce((acc, group) => {
    const groupSubtotal = group.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return acc + groupSubtotal + group.deliveryFee;
  }, 0) + 1.50; // Add standard €1.50 service fee

  const totalItems = cartGroups.reduce((acc, group) => 
    acc + group.items.reduce((sum, item) => sum + item.quantity, 0)
  , 0);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-[220px] font-inter text-gray-900 selection:bg-gray-900 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl pt-12 pb-4 border-b border-gray-100">
        <div className="px-5 flex items-center justify-between mb-2">
          <button 
            onClick={handleBack}
            className="w-10 h-10 -ml-2 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-[24px] h-[24px] text-gray-900" />
          </button>
          <h1 className="text-[17px] font-extrabold text-gray-900 tracking-tight">Your Order</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="pt-2">
        {/* Delivery Details (Minimal, no map pin clutter) */}
        <div className="px-5 py-4 border-b border-gray-100/60 active:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[13px] font-bold text-gray-500 uppercase tracking-wide mb-1">Delivering to</p>
              <p className="text-[16px] font-extrabold text-gray-900">42 High Street, Floor 3</p>
              <p className="text-[14px] font-medium text-gray-500 mt-0.5">Estimated time: 25-35 min</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Cart Groups */}
        {cartGroups.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 font-medium">Your cart is empty.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {cartGroups.map((group, index) => {
              const groupSubtotal = group.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
              
              return (
                <div key={group.kitchenId} className={`px-5 py-6 ${index !== 0 ? 'border-t border-gray-100' : ''}`}>
                  {/* Kitchen Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Store className="w-5 h-5 text-gray-900" />
                      <h2 className="text-[18px] font-extrabold text-gray-900 tracking-tight">{group.cookName}</h2>
                    </div>
                  </div>
                  
                  {/* Kitchen Items */}
                  <div className="space-y-6">
                    {group.items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-start">
                        <div className="w-20 h-20 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full rounded-2xl object-cover" />
                        </div>
                        
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-[15px] font-extrabold text-gray-900 leading-snug pr-4">{item.name}</h3>
                            <span className="text-[15px] font-black text-gray-900 shrink-0">€{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                          {item.description && (
                            <p className="text-[13px] font-medium text-gray-500 mb-3 truncate">{item.description}</p>
                          )}
                          
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateQuantity(group.kitchenId, item.id, -1)}
                              className="w-8 h-8 rounded-2xl bg-gray-50 flex items-center justify-center active:scale-95 transition-transform"
                            >
                              <Minus className="w-4 h-4 text-gray-900" />
                            </button>
                            <span className="text-[15px] font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(group.kitchenId, item.id, 1)}
                              className="w-8 h-8 rounded-2xl bg-gray-50 flex items-center justify-center active:scale-95 transition-transform"
                            >
                              <Plus className="w-4 h-4 text-gray-900" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Kitchen Subtotal */}
                  <div className="mt-6 pt-5 border-t border-gray-100 border-dashed space-y-3">
                    <div className="flex justify-between text-[14px]">
                      <span className="font-medium text-gray-500">Items subtotal</span>
                      <span className="font-bold text-gray-900">€{groupSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="font-medium text-gray-500">Delivery from kitchen</span>
                      <span className="font-bold text-gray-900">€{group.deliveryFee.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Global Fees applied after all kitchen subtotals */}
            <div className="px-5 py-6 border-t border-gray-100">
              <div className="flex justify-between text-[14px]">
                <span className="font-medium text-gray-500">Service fee</span>
                <span className="font-bold text-gray-900">€1.50</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Method */}
        {cartGroups.length > 0 && (
          <div className="px-5 py-5 border-t border-gray-100/60 mt-4 active:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gray-900 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-900">Apple Pay</p>
                  <p className="text-[13px] font-medium text-gray-500">Default payment method</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}
      </main>

      {/* Solid Integrated Checkout Bar */}
      {cartGroups.length > 0 && (
        <div 
          className="fixed left-0 right-0 bg-white border-t border-gray-100 p-4 z-40"
          style={{ bottom: 'calc(58px + max(env(safe-area-inset-bottom), 1.5rem))' }}
        >
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full h-[64px] bg-gray-900 text-white rounded-2xl flex items-center justify-between px-6 active:scale-[0.98] transition-transform hover:bg-black"
          >
            <div className="flex flex-col items-start">
              <span className="font-bold text-[18px] leading-tight mb-0.5">
                Checkout {cartGroups.length > 1 ? `(${cartGroups.length} Orders)` : ''}
              </span>
              <span className="text-[13px] font-medium text-gray-300">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
            <span className="font-black text-[20px]">€{grandTotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} chatBadge={9} />
    </div>
  );
}
