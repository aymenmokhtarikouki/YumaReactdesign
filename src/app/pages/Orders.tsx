import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function Orders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orderFilter, setOrderFilter] = useState<'active' | 'past' | 'subscriptions'>('active');

  const subscriptions = [
    {
      id: "sub-1",
      planName: "5 Meals Plan",
      cook: "Chef Leo",
      image: "https://images.unsplash.com/photo-1663003259497-acaef31e0e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZnJlc2glMjBtZWRpdGVycmFuZWFuJTIwbWVhbHMlMjBtZWFsJTIwcHJlcHxlbnwxfHx8fDE3NzM2MjUzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "€24.90",
      status: "Active",
      nextDelivery: "Tomorrow",
      mealsRemaining: 5,
    }
  ];

  const activeOrders = [
    {
      id: "ord-123",
      cook: "Ibrahim B.",
      items: [
        { name: "Kung Pao Chicken", quantity: 1 },
        { name: "Steamed Dim Sum", quantity: 2 },
        { name: "Jasmine Tea", quantity: 2 }
      ],
      image: "https://images.unsplash.com/photo-1605704922285-e82455dba38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdW5nJTIwcGFvJTIwY2hpY2tlbnxlbnwxfHx8fDE3NzM2MTE5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: "Preparing",
      eta: "15 min",
      price: "€28.81",
      date: "Today, 19:45"
    }
  ];

  const pastOrders = [
    {
      id: "ord-102",
      cook: "Giulia R.",
      items: [
        { name: "Caprese Salad", quantity: 1 }
      ],
      image: "https://images.unsplash.com/photo-1769458313937-b5ad8f84942e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXByZXNlJTIwc2FsYWQlMjB0b21hdG9lcyUyMG1venphcmVsbGElMjBiYXNpbHxlbnwxfHx8fDE3NzM2MDk4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: "Delivered",
      price: "€6.50",
      date: "Mar 12, 13:20"
    },
    {
      id: "ord-098",
      cook: "Marco V.",
      items: [
        { name: "Truffle Pasta", quantity: 2 },
        { name: "Garlic Bread", quantity: 1 }
      ],
      image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYXxlbnwxfHx8fDE3NzM1NjIwMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: "Delivered",
      price: "€42.00",
      date: "Mar 10, 20:15"
    }
  ];

  const handleTabChange = (tab: string) => {
    if (tab === 'home') navigate('/');
    else if (tab === 'cart') navigate('/cart');
    else if (tab === 'chat') navigate('/chat');
    else setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-white pb-24 font-inter text-gray-900 selection:bg-gray-900 selection:text-white">
      {/* Premium Solid Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl pt-8 pb-3 border-b border-gray-100">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-baseline gap-4 overflow-x-auto scrollbar-hide pb-1">
            <button 
              onClick={() => setOrderFilter('active')}
              className={`text-[20px] tracking-tight whitespace-nowrap transition-colors ${
                orderFilter === 'active' ? 'font-extrabold text-gray-900' : 'font-bold text-gray-300 hover:text-gray-500'
              }`}
            >
              Active
            </button>
            <button 
              onClick={() => setOrderFilter('past')}
              className={`text-[20px] tracking-tight whitespace-nowrap transition-colors ${
                orderFilter === 'past' ? 'font-extrabold text-gray-900' : 'font-bold text-gray-300 hover:text-gray-500'
              }`}
            >
              Past
            </button>
            <button 
              onClick={() => setOrderFilter('subscriptions')}
              className={`text-[20px] tracking-tight whitespace-nowrap transition-colors ${
                orderFilter === 'subscriptions' ? 'font-extrabold text-gray-900' : 'font-bold text-gray-300 hover:text-gray-500'
              }`}
            >
              Subscriptions
            </button>
          </div>
          <button className="w-9 h-9 rounded-2xl bg-gray-50 flex items-center justify-center active:scale-95 transition-transform shrink-0 ml-2">
            <Search className="w-4 h-4 text-gray-900" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-5 space-y-3">
        {orderFilter === 'active' && activeOrders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl p-4 border border-gray-100 relative group cursor-pointer" onClick={() => navigate(`/order/${order.id}`)}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[15px] font-extrabold text-gray-900">{order.cook}</p>
                <p className="text-[12px] font-medium text-gray-500">{order.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/chat/${order.id}`);
                  }}
                  className="w-8 h-8 rounded-2xl bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
                >
                  <MessageSquare className="w-4 h-4 text-gray-900" />
                </button>
                <div className="px-2.5 py-1 bg-gray-100 rounded-2xl flex items-center gap-1.5 h-8">
                  <Clock className="w-3 h-3 text-gray-900" />
                  <span className="text-[12px] font-bold text-gray-900">{order.eta}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start mb-5">
              <div className="w-16 h-16 shrink-0">
                <img src={order.image} alt="Order item" className="w-full h-full rounded-2xl object-cover" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="space-y-1 mb-2">
                  {order.items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start text-[13px] leading-tight">
                      <span className="font-bold text-gray-900 mr-1.5">{item.quantity}x</span>
                      <span className="font-medium text-gray-700 leading-snug">{item.name}</span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="text-[12px] font-medium text-gray-500 pt-0.5">
                      + {order.items.length - 2} more items
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-black text-gray-900">{order.price}</span>
                  <div className="w-1 h-1 rounded-sm bg-gray-300" />
                  <span className="text-[12px] font-semibold text-gray-500">
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)} Items
                  </span>
                </div>
              </div>
            </div>

            {/* Tracking Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-[12px] font-bold text-gray-900 mb-2">
                <span>Status</span>
                <span className="text-gray-500">{order.status}</span>
              </div>
              <div className="flex gap-2 h-1.5">
                <div className="flex-1 bg-gray-900 rounded-2xl" />
                <div className="flex-1 bg-gray-900 rounded-2xl" />
                <div className="flex-1 bg-gray-200 rounded-2xl" />
                <div className="flex-1 bg-gray-200 rounded-2xl" />
              </div>
            </div>

            <button className="w-full h-12 bg-gray-900 text-white rounded-2xl font-bold text-[15px] flex items-center justify-center active:scale-[0.98] transition-transform">
              Track Order
            </button>
          </div>
        ))}

        {orderFilter === 'past' && pastOrders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl p-4 border border-gray-100 active:opacity-70 transition-opacity cursor-pointer" onClick={() => navigate(`/order/${order.id}`)}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[15px] font-bold text-gray-900">{order.cook}</p>
                <p className="text-[12px] font-medium text-gray-500">{order.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/chat/${order.id}`);
                  }}
                  className="w-8 h-8 rounded-2xl bg-gray-50 flex items-center justify-center active:scale-95 transition-transform"
                >
                  <MessageSquare className="w-4 h-4 text-gray-900" />
                </button>
                <div className="flex items-center gap-1 text-gray-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gray-900" />
                  <span className="text-[12px] font-bold text-gray-900">Delivered</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start mb-5">
              <div className="w-16 h-16 shrink-0">
                <img src={order.image} alt="Order item" className="w-full h-full rounded-2xl object-cover grayscale-[0.2]" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="space-y-1 mb-2">
                  {order.items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start text-[13px] leading-tight">
                      <span className="font-bold text-gray-900 mr-1.5">{item.quantity}x</span>
                      <span className="font-medium text-gray-700 leading-snug">{item.name}</span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="text-[12px] font-medium text-gray-500 pt-0.5">
                      + {order.items.length - 2} more items
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-black text-gray-900">{order.price}</span>
                  <div className="w-1 h-1 rounded-sm bg-gray-300" />
                  <span className="text-[12px] font-semibold text-gray-500">
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)} Items
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button className="flex-1 h-10 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold text-[13px] flex items-center justify-center active:bg-gray-50 transition-colors">
                Rate Cook
              </button>
              <button className="flex-1 h-11 bg-gray-900 text-white rounded-2xl font-bold text-[14px] flex items-center justify-center active:scale-[0.98] transition-transform">
                Reorder
              </button>
            </div>
          </div>
        ))}

        {orderFilter === 'subscriptions' && subscriptions.map(sub => (
          <div key={sub.id} className="bg-white rounded-2xl p-4 border border-gray-100 relative group cursor-pointer" onClick={() => navigate('/subscription/manage')}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[15px] font-extrabold text-gray-900">{sub.cook}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[12px] font-bold text-gray-900">{sub.status}</span>
                </div>
              </div>
              <div className="px-2.5 py-1 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Next Delivery</span>
                <span className="text-[13px] font-black text-gray-900">{sub.nextDelivery}</span>
              </div>
            </div>

            <div className="flex gap-3 items-center mb-5">
              <div className="w-16 h-16 shrink-0">
                <img src={sub.image} alt={sub.planName} className="w-full h-full rounded-2xl object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[16px] font-bold text-gray-900 leading-tight mb-1">{sub.planName}</h4>
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-black text-gray-900">{sub.price}</span>
                  <span className="text-[12px] font-medium text-gray-500">/week</span>
                </div>
              </div>
            </div>

            <button className="w-full h-12 bg-gray-100 text-gray-900 rounded-2xl font-bold text-[15px] flex items-center justify-center active:bg-gray-200 transition-colors">
              Manage Subscription
            </button>
          </div>
        ))}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} chatBadge={9} />
    </div>
  );
}
