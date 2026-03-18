import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  ChevronRight, 
  Moon,
  Globe,
  Type,
  Info,
  Check,
  Zap,
  HardDrive
} from 'lucide-react';

export default function AppSettings() {
  const navigate = useNavigate();
  
  const [activeTheme, setActiveTheme] = useState('System');
  const [activeLanguage, setActiveLanguage] = useState('English');
  
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const sections = [
    {
      title: 'Appearance',
      items: [
        { 
          icon: Moon, 
          label: 'Theme', 
          value: activeTheme,
          action: () => setShowThemeModal(true)
        },
        { icon: Type, label: 'Text Size', value: 'Default' },
        { icon: Zap, label: 'Animations', value: 'Reduced' }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { 
          icon: Globe, 
          label: 'Language', 
          value: activeLanguage,
          action: () => setShowLanguageModal(true)
        },
        { icon: Globe, label: 'Region', value: 'United States' }
      ]
    },
    {
      title: 'Data & Storage',
      items: [
        { icon: HardDrive, label: 'Clear Cache', value: '124 MB' }
      ]
    },
    {
      title: 'About',
      items: [
        { icon: Info, label: 'App Version', value: 'v2.4.1 (build 4092)' },
        { icon: Info, label: 'Terms of Service', value: '' },
        { icon: Info, label: 'Open Source Libraries', value: '' }
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
          <h1 className="text-[24px] font-black text-gray-900 tracking-tight ml-1">App Settings</h1>
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
                    onClick={item.action ? item.action : undefined}
                    className={`flex items-center justify-between py-6 border-b border-gray-100 group transition-colors bg-transparent text-left w-full ${item.action ? 'active:bg-gray-50 cursor-pointer' : 'opacity-80 cursor-default'}`}
                    disabled={!item.action}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center text-gray-400 group-hover:text-gray-900 transition-colors">
                        <item.icon className="w-6 h-6 text-gray-900" strokeWidth={1.5} />
                      </div>
                      <span className="text-[18px] font-bold text-gray-900">{item.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {item.value && (
                        <span className="text-[14px] font-medium text-gray-400">
                          {item.value}
                        </span>
                      )}
                      {item.action && (
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Theme Selection Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setShowThemeModal(false)}
          />
          <div className="relative bg-white rounded-t-2xl p-6 pb-12 border border-gray-100 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-2xl mx-auto mb-8" />
            <h2 className="text-[24px] font-black text-gray-900 tracking-tight mb-6">Select Theme</h2>
            
            <div className="flex flex-col space-y-2">
              {['Light', 'Dark', 'System'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => {
                    setActiveTheme(theme);
                    setShowThemeModal(false);
                  }}
                  className="flex items-center justify-between py-5 px-4 rounded-2xl active:bg-gray-50 transition-colors"
                >
                  <span className={`text-[18px] font-bold ${activeTheme === theme ? 'text-gray-900' : 'text-gray-500'}`}>
                    {theme}
                  </span>
                  {activeTheme === theme && <Check className="w-6 h-6 text-gray-900" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLanguageModal(false)}
          />
          <div className="relative bg-white rounded-t-2xl p-6 pb-12 border border-gray-100 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-2xl mx-auto mb-8" />
            <h2 className="text-[24px] font-black text-gray-900 tracking-tight mb-6">Language</h2>
            
            <div className="flex flex-col space-y-2">
              {['English', 'Spanish', 'French', 'Japanese', 'Korean'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setActiveLanguage(lang);
                    setShowLanguageModal(false);
                  }}
                  className="flex items-center justify-between py-5 px-4 rounded-2xl active:bg-gray-50 transition-colors"
                >
                  <span className={`text-[18px] font-bold ${activeLanguage === lang ? 'text-gray-900' : 'text-gray-500'}`}>
                    {lang}
                  </span>
                  {activeLanguage === lang && <Check className="w-6 h-6 text-gray-900" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
