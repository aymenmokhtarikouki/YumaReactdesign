import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, ChevronLeft, CheckCheck, ShoppingBag } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function Chat() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat');

  // Chats are now unique per order, meaning one cook/kitchen can have multiple active chats
  const chats = [
    {
      id: '1',
      name: 'Ibrahim B.',
      kitchen: 'Spicy Wok',
      orderNumber: 'W849',
      orderSummary: 'Kung Pao Chicken + 2 more',
      avatar: 'https://images.unsplash.com/photo-1611657365907-1ca5d9799f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczNjE5OTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      lastMessage: 'Your Kung Pao Chicken is ready for pickup! 🌶️',
      time: '12:45 PM',
      unreadCount: 2,
    },
    {
      id: '2',
      name: 'Mai T.',
      kitchen: 'Pho Haven',
      orderNumber: 'P210',
      orderSummary: 'Steamed Dim Sum',
      avatar: 'https://images.unsplash.com/photo-1526470498-9ae73c665de8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGNvb2slMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM2MTk5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      lastMessage: 'Yes, I can absolutely make it without cilantro. See you soon.',
      time: 'Yesterday',
      unreadCount: 1,
    },
    {
      id: '3',
      name: 'Ibrahim B.',
      kitchen: 'Spicy Wok',
      orderNumber: 'W842',
      orderSummary: 'Szechuan Beef + 1 more',
      avatar: 'https://images.unsplash.com/photo-1611657365907-1ca5d9799f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczNjE5OTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      lastMessage: 'Hope you enjoyed the meal! Please leave a review.',
      time: 'Monday',
      unreadCount: 0,
      isRead: true,
    }
  ];

  const handleTabChange = (tab: string) => {
    if (tab === 'home') navigate('/');
    else if (tab === 'orders') navigate('/orders');
    else if (tab === 'cart') navigate('/cart');
    else if (tab === 'chat') navigate('/chat');
    else setActiveTab(tab);
  };

  const totalUnread = chats.reduce((sum, chat) => sum + (chat.unreadCount || 0), 0);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32 font-inter text-gray-900 selection:bg-gray-900 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl pt-8 pb-2 border-b border-gray-100">
        <div className="px-4 flex items-center justify-between mb-2">
          <button 
            onClick={handleBack}
            className="w-10 h-10 -ml-2 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5 text-gray-900" />
          </button>
          <h1 className="text-[15px] font-extrabold text-gray-900 tracking-tight">Messages</h1>
          <button className="w-10 h-10 -mr-2 rounded-2xl flex items-center justify-center active:scale-95 transition-transform">
            <Search className="w-4 h-4 text-gray-900" />
          </button>
        </div>
      </header>

      <main className="pt-2">
        {chats.length === 0 ? (
          <div className="text-center py-16 px-4">
            <p className="text-[14px] font-medium text-gray-500">No messages yet.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {chats.map((chat) => (
              <button 
                key={chat.id} 
                onClick={() => navigate(`/chat/${chat.id}`)}
                className="w-full flex gap-3 items-start px-4 py-4 active:bg-gray-50 transition-colors text-left group border-b border-gray-50 last:border-0"
              >
                {/* Avatar with 16px corners per design system */}
                <div className="w-12 h-12 shrink-0 relative mt-0.5">
                  <img 
                    src={chat.avatar} 
                    alt={chat.name} 
                    className="w-full h-full rounded-2xl object-cover" 
                  />
                </div>
                
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  {/* Name and Order Number */}
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="flex items-baseline gap-1.5 overflow-hidden pr-2">
                      <h3 className="text-[15px] font-extrabold text-gray-900 truncate">
                        {chat.name}
                      </h3>
                      <span className="text-[12px] font-bold text-gray-400 shrink-0">
                        #{chat.orderNumber}
                      </span>
                    </div>
                    <span className={`text-[12px] shrink-0 font-medium ${chat.unreadCount > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                      {chat.time}
                    </span>
                  </div>
                  
                  {/* Order Items Summary */}
                  <div className="flex items-center gap-1 mb-1">
                    <ShoppingBag className="w-3.5 h-3.5 text-gray-400 shrink-0" strokeWidth={2.5} />
                    <p className="text-[12px] font-bold text-gray-600 truncate">
                      {chat.orderSummary}
                    </p>
                  </div>
                  
                  {/* Last Message and Status */}
                  <div className="flex justify-between items-center gap-3">
                    <p className={`text-[13px] truncate leading-snug ${chat.unreadCount > 0 ? 'font-bold text-gray-900' : 'font-medium text-gray-500'}`}>
                      {chat.lastMessage}
                    </p>
                    
                    {/* Status/Badge Area */}
                    <div className="shrink-0 flex items-center justify-end w-5">
                      {chat.unreadCount > 0 ? (
                        <span className="bg-gray-900 text-white font-extrabold text-[10px] min-w-5 h-5 flex items-center justify-center rounded-2xl px-1.5">
                          {chat.unreadCount}
                        </span>
                      ) : chat.isRead ? (
                        <CheckCheck className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
                      ) : null}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} chatBadge={totalUnread > 0 ? totalUnread : undefined} />
    </div>
  );
}