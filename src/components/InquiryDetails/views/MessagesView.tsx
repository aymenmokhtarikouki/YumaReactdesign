import React from 'react';
import { Badge } from '../../../app/components/ui/badge';
import { MessageSquare, Send, Paperclip, MoreVertical, Search, CheckCheck } from 'lucide-react';

const MessageBubble = ({ sender, text, time, isMe }: { sender: string; text: string; time: string; isMe: boolean }) => (
  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-2`}>
    <div className={`max-w-[85%] px-5 py-4 rounded-[28px] ${
      isMe 
        ? 'bg-gray-900 text-white rounded-tr-none shadow-lg' 
        : 'bg-white text-gray-900 border border-gray-100 rounded-tl-none'
    }`}>
      <p className="text-[15px] font-medium leading-relaxed">{text}</p>
    </div>
    <div className="flex items-center gap-2 px-2">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{time}</span>
      {isMe && <CheckCheck className="w-3 h-3 text-emerald-500" />}
    </div>
  </div>
);

const MessagesView = ({ id }: { id?: string }) => (
  <div className="flex flex-col h-full -mx-4 -mt-6">
    {/* Chat Header Info */}
    <div className="px-6 py-4 bg-gray-50/50 flex items-center justify-between border-b border-gray-100 mb-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
        </div>
        <div>
          <h4 className="text-[15px] font-extrabold text-gray-900">Sweet Creations</h4>
          <p className="text-[12px] font-bold text-emerald-500 uppercase tracking-widest">Online Now</p>
        </div>
      </div>
      <div className="flex gap-1">
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 active:scale-95 transition-transform">
          <Search size={20} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 active:scale-95 transition-transform">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>

    {/* Message Area */}
    <div className="flex-1 px-6 space-y-8 overflow-y-auto pb-32">
      <div className="text-center">
        <Badge variant="outline" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white border-gray-100 rounded-full px-4 py-1">
          Tuesday, Oct 7
        </Badge>
      </div>

      <MessageBubble 
        sender="Baker" 
        text="Hi! Thank you for the inquiry. I love the Spider-Man theme choice! I've just sent over the quote details." 
        time="10:42 AM" 
        isMe={false} 
      />

      <MessageBubble 
        sender="Customer" 
        text="Awesome, thank you! I just saw it. Quick question: is it possible to add a small 'Happy Birthday' topper as well?" 
        time="10:45 AM" 
        isMe={true} 
      />

      <MessageBubble 
        sender="Baker" 
        text="Absolutely! I can include a custom 3D printed topper in red and blue. It usually costs €15 but I can include it for free if you accept the quote today." 
        time="10:48 AM" 
        isMe={false} 
      />

      <div className="text-center pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
          <MessageSquare className="w-3 h-3 text-emerald-500" />
          <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-wider">New offer sent</span>
        </div>
      </div>
    </div>

    {/* Input Bar */}
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50">
      <div className="max-w-screen-md mx-auto flex items-center gap-3">
        <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 active:scale-95 transition-transform">
          <Paperclip size={20} />
        </button>
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="w-full h-12 pl-5 pr-12 rounded-2xl bg-gray-50 border-none text-[15px] font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900 transition-all"
          />
          <button className="absolute right-2 top-1.5 w-9 h-9 flex items-center justify-center rounded-xl bg-gray-900 text-white shadow-lg active:scale-90 transition-transform">
            <Send size={16} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default MessagesView;
