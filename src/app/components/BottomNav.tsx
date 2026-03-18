import { Home, Receipt, MessageCircle, ShoppingBag, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  chatBadge?: number;
}

export function BottomNav({ activeTab, onTabChange, chatBadge = 0 }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'orders', icon: Receipt, label: 'Orders' },
    { id: 'chat', icon: MessageCircle, label: 'Chat', badge: chatBadge },
    { id: 'cart', icon: ShoppingBag, label: 'Cart' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100/50 pt-2 pb-safe z-50">
      <div className="flex items-center justify-around max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 relative active:scale-95 transition-transform duration-300 w-14 group"
            >
              <div className="relative">
                <Icon 
                  className={`w-[22px] h-[22px] transition-colors duration-300 ${
                    isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'
                  }`} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
                
                {/* Chat Badge */}
                {tab.badge && tab.badge > 0 && (
                  <div className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[9px] font-bold rounded-2xl min-w-[14px] h-[14px] flex items-center justify-center px-1 border-2 border-white">
                    {tab.badge}
                  </div>
                )}
              </div>
              <span 
                className={`text-[10px] font-semibold tracking-tight transition-colors duration-300 ${
                  isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
