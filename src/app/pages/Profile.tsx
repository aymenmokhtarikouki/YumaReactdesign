import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ChevronRight, 
  Settings, 
  MapPin, 
  CreditCard, 
  Bell, 
  Shield, 
  HelpCircle,
  LogOut,
  Camera,
  AlertTriangle,
  X,
  ChevronDown,
  Check
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showTopicSheet, setShowTopicSheet] = useState(false);
  const [reportTopic, setReportTopic] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const topics = [
    { id: 'order', label: 'An order' },
    { id: 'app', label: 'App performance' },
    { id: 'account', label: 'My account' },
    { id: 'other', label: 'Something else' }
  ];

  const handleTabChange = (tab: string) => {
    if (tab === 'home') navigate('/');
    else if (tab === 'orders') navigate('/orders');
    else if (tab === 'cart') navigate('/cart');
    else if (tab === 'chat') navigate('/chat');
    else if (tab === 'profile') navigate('/profile');
    else setActiveTab(tab);
  };

  const menuItems = [
    { icon: Camera, label: 'My Portfolio', subtitle: 'Manage your kitchen cakes', path: '/baker/portfolio' },
    { icon: MapPin, label: 'Saved Addresses', subtitle: 'Home, Work, Other', path: '/addresses' },
    { icon: CreditCard, label: 'Payment Methods', subtitle: 'Apple Pay, Cards', path: '/payment-methods' },
    { icon: Bell, label: 'Notifications', subtitle: 'Push, Email, SMS', path: '/notifications' },
    { icon: Shield, label: 'Privacy & Security', subtitle: 'Data, Permissions', path: '/privacy' },
    { icon: HelpCircle, label: 'Help & Support', subtitle: 'FAQ, Contact Us', path: '/help-support' },
    { icon: Settings, label: 'App Settings', subtitle: 'Language, Theme', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-white pb-[100px] font-inter text-gray-900 selection:bg-gray-900 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl pt-8 pb-3 px-4">
        <h1 className="text-[24px] font-black text-gray-900 tracking-tight">Profile</h1>
      </header>

      <main className="px-4">
        {/* Profile Card Section */}
        <section className="mt-2 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative group shrink-0">
              <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdHxlbnwxfHx8fDE3NzM2MjQzNDR8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-gray-900 text-white rounded-xl flex items-center justify-center border border-white active:scale-95 transition-transform hover:bg-black">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex flex-col">
              <h2 className="text-[26px] font-black leading-[1.1] text-gray-900 tracking-tight">Emma</h2>
              <span className="text-[16px] font-bold text-gray-400 mt-0.5">Richardson</span>
            </div>
          </div>
        </section>

        {/* Settings List */}
        <section className="mt-6">
          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <div key={index}>
                <button 
                  onClick={() => item.path && navigate(item.path)}
                  className="w-full flex items-center justify-between py-3.5 active:opacity-60 transition-opacity text-left group bg-transparent"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center text-gray-400 group-hover:text-gray-900 transition-colors">
                      <item.icon className="w-[20px] h-[20px]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[15px] font-bold text-gray-900">{item.label}</h3>
                      <p className="text-[12px] font-medium text-gray-400 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
                {index < menuItems.length - 1 && (
                  <div className="h-[1px] bg-gray-100 ml-11" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Actions Section */}
        <section className="mt-6 mb-10 flex flex-col items-center">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowReportModal(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-4 text-gray-900 font-bold text-[15px] active:opacity-60 transition-opacity bg-transparent"
          >
            <AlertTriangle className="w-5 h-5" />
            Report a Problem
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-4 text-red-600 font-bold text-[15px] active:opacity-60 transition-opacity bg-transparent">
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} chatBadge={9} />

      {/* Report a Problem Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
          <header className="flex items-center justify-between px-4 pt-10 pb-3 border-b border-gray-100">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowReportModal(false);
              }}
              className="w-9 h-9 flex items-center justify-center rounded-2xl active:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>
            <h2 className="text-[18px] font-bold text-gray-900">Report a Problem</h2>
            <div className="w-10" /> {/* Spacer for centering */}
          </header>
          
          <main className="flex-1 overflow-y-auto px-6 py-8 flex flex-col">
            <div className="mb-8">
              <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">
                What is the issue about?
              </label>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setShowTopicSheet(true);
                }}
                type="button"
                className="w-full flex items-center justify-between text-[18px] font-bold outline-none bg-transparent text-left border-b border-gray-200 pb-4 transition-colors focus:border-gray-900"
              >
                <span className={reportTopic ? "text-gray-900" : "text-gray-300"}>
                  {reportTopic ? topics.find(t => t.id === reportTopic)?.label : "Select a topic"}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="mb-8 flex-1">
              <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">
                Description
              </label>
              <textarea 
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Please provide as much detail as possible..."
                className="w-full text-[16px] font-medium outline-none placeholder:text-gray-300 bg-transparent text-gray-900 min-h-[150px] resize-none border-b border-gray-200 pb-4 focus:border-gray-900 transition-colors"
              />
            </div>
            
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowReportModal(false);
              }}
              className="w-full h-[56px] bg-gray-900 text-white rounded-2xl flex items-center justify-center font-bold text-[16px] active:scale-[0.98] transition-transform mt-auto mb-8 disabled:opacity-50 disabled:active:scale-100 hover:bg-black"
              disabled={!reportTopic || !reportDescription.trim()}
            >
              Submit Report
            </button>
          </main>
        </div>
      )}

      {/* Topic Selection Bottom Sheet */}
      {showTopicSheet && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setShowTopicSheet(false)}
          />
          <div className="relative bg-white rounded-t-2xl p-6 pb-12 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-2xl mx-auto mb-8" />
            <h2 className="text-[24px] font-black text-gray-900 tracking-tight mb-6">Select a Topic</h2>
            
            <div className="flex flex-col space-y-2">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setReportTopic(topic.id);
                    setShowTopicSheet(false);
                  }}
                  className="flex items-center justify-between py-5 px-4 rounded-2xl active:bg-gray-50 transition-colors text-left w-full"
                >
                  <span className={`text-[18px] font-bold ${reportTopic === topic.id ? 'text-gray-900' : 'text-gray-500'}`}>
                    {topic.label}
                  </span>
                  {reportTopic === topic.id && <Check className="w-6 h-6 text-gray-900" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
