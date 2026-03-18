import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  ChevronRight, 
  Key, 
  Smartphone, 
  Monitor, 
  Download, 
  MapPin, 
  Activity, 
  UserX, 
  Trash2 
} from 'lucide-react';

export default function PrivacySecurity() {
  const navigate = useNavigate();
  const [activeSheet, setActiveSheet] = useState<'deactivate' | 'delete' | null>(null);

  const sections = [
    {
      title: 'Security',
      items: [
        { icon: Key, label: 'Change Password' },
        { icon: Smartphone, label: 'Two-Factor Authentication' },
        { icon: Monitor, label: 'Active Sessions' }
      ]
    },
    {
      title: 'Data & Privacy',
      items: [
        { icon: Download, label: 'Download My Data' },
        { icon: MapPin, label: 'Location Permissions' },
        { icon: Activity, label: 'Activity Tracking' }
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
          <h1 className="text-[24px] font-black text-gray-900 tracking-tight ml-1">Privacy & Security</h1>
        </div>
      </header>

      <main className="pt-[100px] pb-[120px] px-6">
        <div className="space-y-10">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                {section.title}
              </h2>
              <div className="flex flex-col">
                {section.items.map((item, itemIndex) => (
                  <button 
                    key={itemIndex}
                    className="flex items-center justify-between py-6 border-b border-gray-100 group active:bg-gray-50 transition-colors bg-transparent text-left"
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className="w-6 h-6 text-gray-900" strokeWidth={1.5} />
                      <span className="text-[18px] font-bold text-gray-900">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Account Management */}
          <div>
            <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Account Management
            </h2>
            <div className="flex flex-col">
              <button 
                onClick={() => setActiveSheet('deactivate')}
                className="flex items-center justify-between py-6 border-b border-gray-100 group active:bg-gray-50 transition-colors bg-transparent text-left"
              >
                <div className="flex items-center gap-4">
                  <UserX className="w-6 h-6 text-yellow-600" strokeWidth={1.5} />
                  <span className="text-[18px] font-bold text-yellow-600">Deactivate Account</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
              
              <button 
                onClick={() => setActiveSheet('delete')}
                className="flex items-center justify-between py-6 border-b border-gray-100 group active:bg-red-50 transition-colors bg-transparent text-left"
              >
                <div className="flex items-center gap-4">
                  <Trash2 className="w-6 h-6 text-red-500" strokeWidth={1.5} />
                  <span className="text-[18px] font-bold text-red-500">Delete Account</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Action Sheets */}
      {activeSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveSheet(null)}
          />
          <div className="relative bg-white rounded-t-2xl p-6 pb-12 border border-gray-100 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-2xl mx-auto mb-8" />
            
            <div className="text-center mb-8">
              <h2 className="text-[24px] font-black text-gray-900 tracking-tight mb-2">
                {activeSheet === 'delete' ? 'Delete Account?' : 'Deactivate Account?'}
              </h2>
              <p className="text-[16px] font-medium text-gray-500 leading-relaxed px-4">
                {activeSheet === 'delete' 
                  ? 'This action is permanent and cannot be undone. All your data, orders, and saved information will be lost forever.'
                  : 'Your profile and data will be hidden. You can reactivate your account at any time by logging back in.'}
              </p>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => setActiveSheet(null)}
                className={`w-full h-14 rounded-2xl flex items-center justify-center font-bold text-[16px] active:scale-[0.98] transition-transform ${
                  activeSheet === 'delete' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-yellow-600 text-white'
                }`}
              >
                {activeSheet === 'delete' ? 'Yes, Delete Account' : 'Yes, Deactivate'}
              </button>
              
              <button 
                onClick={() => setActiveSheet(null)}
                className="w-full h-14 bg-gray-100 text-gray-900 rounded-2xl flex items-center justify-center font-bold text-[16px] active:scale-[0.98] transition-transform"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
