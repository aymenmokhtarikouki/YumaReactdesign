import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function NotificationSettings() {
  const navigate = useNavigate();

  // Mock initial settings state
  const [settings, setSettings] = useState({
    pushOrders: true,
    pushPromos: false,
    pushDrivers: true,
    emailReceipts: true,
    emailNewsletters: false,
    smsAlerts: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    {
      title: 'Push Notifications',
      items: [
        {
          id: 'pushOrders',
          label: 'Order Updates',
          description: 'Live status tracking and estimated arrival times.'
        },
        {
          id: 'pushDrivers',
          label: 'Driver Alerts',
          description: 'When your driver arrives or needs to contact you.'
        },
        {
          id: 'pushPromos',
          label: 'Promotions & Offers',
          description: 'Exclusive deals, discounts, and rewards.'
        }
      ]
    },
    {
      title: 'Email Notifications',
      items: [
        {
          id: 'emailReceipts',
          label: 'Digital Receipts',
          description: 'Receive a detailed receipt after every order.'
        },
        {
          id: 'emailNewsletters',
          label: 'Weekly Newsletter',
          description: 'New kitchens, seasonal menus, and local food news.'
        }
      ]
    },
    {
      title: 'SMS Alerts',
      items: [
        {
          id: 'smsAlerts',
          label: 'Critical Alerts',
          description: 'Important messages regarding active orders.'
        }
      ]
    }
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
          <h1 className="text-[24px] font-black text-gray-900 tracking-tight ml-1">Notifications</h1>
        </div>
      </header>

      <main className="pt-[100px] pb-[120px] px-6">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                {section.title}
              </h2>
              <div className="space-y-0">
                {section.items.map((item) => {
                  const isActive = settings[item.id as keyof typeof settings];
                  return (
                    <div 
                      key={item.id}
                      onClick={() => toggle(item.id as keyof typeof settings)}
                      className="flex items-center justify-between py-6 border-b border-gray-100 cursor-pointer active:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 pr-6">
                        <h3 className="text-[18px] font-bold text-gray-900 mb-1">{item.label}</h3>
                        <p className="text-[14px] text-gray-500 font-medium leading-relaxed">{item.description}</p>
                      </div>
                      
                      {/* Minimalist Toggle Switch */}
                      <div 
                        className={`relative w-[52px] h-7 rounded-2xl transition-colors duration-300 ease-in-out shrink-0 flex items-center ${
                          isActive ? 'bg-gray-900' : 'bg-gray-200'
                        }`}
                      >
                        <div 
                          className={`absolute w-6 h-6 bg-white rounded-2xl transition-transform duration-300 ease-out border border-gray-100 ${
                            isActive ? 'translate-x-[26px]' : 'translate-x-[2px]'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
