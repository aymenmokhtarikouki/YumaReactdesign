import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  ChevronRight, 
  Search,
  MessageSquare,
  Mail,
  PhoneCall,
  FileText,
  Clock,
  CreditCard,
  PackageX
} from 'lucide-react';

export default function HelpSupport() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    { icon: Clock, title: 'Where is my order?' },
    { icon: PackageX, title: 'Missing items in my order' },
    { icon: FileText, title: 'Refund status' },
    { icon: CreditCard, title: 'Payment issues' }
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
          <h1 className="text-[24px] font-black text-gray-900 tracking-tight ml-1">Help & Support</h1>
        </div>
      </header>

      <main className="pt-[100px] pb-[120px] px-6">
        {/* Search Input - Minimalist, no background/borders */}
        <section className="mb-10 relative">
          <div className="flex items-center gap-3 py-4 border-b border-gray-900">
            <Search className="w-6 h-6 text-gray-400" strokeWidth={2} />
            <input 
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-[18px] font-bold outline-none placeholder:text-gray-300 bg-transparent text-gray-900"
            />
          </div>
        </section>

        {/* Quick Help Topics */}
        <section className="mb-12">
          <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Frequent Topics
          </h2>
          <div className="flex flex-col">
            {faqs.map((faq, index) => (
              <button 
                key={index}
                className="flex items-center justify-between py-6 border-b border-gray-100 group active:opacity-60 transition-opacity bg-transparent text-left w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center text-gray-400 group-hover:text-gray-900 transition-colors">
                    <faq.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-[18px] font-bold text-gray-900">{faq.title}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
              </button>
            ))}
          </div>
        </section>

        {/* Contact Support Options */}
        <section>
          <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Contact Support
          </h2>
          <div className="flex flex-col">
            <button className="flex items-center justify-between py-6 border-b border-gray-100 group active:opacity-60 transition-opacity bg-transparent text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center text-gray-900">
                  <MessageSquare className="w-6 h-6" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-gray-900">Live Chat</h3>
                  <p className="text-[14px] font-medium text-gray-400 mt-0.5">Typically replies in 2 minutes</p>
                </div>
              </div>
            </button>
            
            <button className="flex items-center justify-between py-6 border-b border-gray-100 group active:opacity-60 transition-opacity bg-transparent text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center text-gray-900">
                  <PhoneCall className="w-6 h-6" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-gray-900">Call Us</h3>
                  <p className="text-[14px] font-medium text-gray-400 mt-0.5">Available 24/7 for urgent issues</p>
                </div>
              </div>
            </button>

            <button className="flex items-center justify-between py-6 border-b border-gray-100 group active:opacity-60 transition-opacity bg-transparent text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center text-gray-900">
                  <Mail className="w-6 h-6" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-gray-900">Email Support</h3>
                  <p className="text-[14px] font-medium text-gray-400 mt-0.5">Expect a reply within 24 hours</p>
                </div>
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
