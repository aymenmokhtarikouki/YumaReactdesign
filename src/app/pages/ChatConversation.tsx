import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChevronLeft, Phone, Image as ImageIcon, Send } from 'lucide-react';

export default function ChatConversation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState('');
  
  // Ref for auto-resizing textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mocking the specific chat based on the previous list
  const chatDetails = {
    id: id || '1',
    name: 'Ibrahim B.',
    kitchen: 'Spicy Wok',
    orderNumber: 'W849',
    orderSummary: 'Kung Pao Chicken + 2 more',
    avatar: 'https://images.unsplash.com/photo-1611657365907-1ca5d9799f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczNjE5OTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    messages: [
      {
        id: 'm1',
        senderId: 'cook',
        text: 'Hi there! Just saw your order come in. I am prepping the ingredients now.',
        time: '12:30 PM',
      },
      {
        id: 'm2',
        senderId: 'user',
        text: 'Awesome, thank you! Could you make the Kung Pao Chicken extra spicy?',
        time: '12:32 PM',
      },
      {
        id: 'm3',
        senderId: 'cook',
        text: "Absolutely, I'll add some extra Szechuan peppercorns and chili oil. 🔥",
        time: '12:33 PM',
      },
      {
        id: 'm4',
        senderId: 'cook',
        text: 'Your Kung Pao Chicken is ready for pickup! 🌶️',
        time: '12:45 PM',
      }
    ]
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/chat', { replace: true });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-white font-inter text-gray-900 selection:bg-gray-900 selection:text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl pt-8 pb-3 border-b border-gray-100 flex items-center justify-between px-4">
        <button 
          onClick={handleBack}
          className="w-10 h-10 -ml-2 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-5 h-5 text-gray-900" />
        </button>
        
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <h1 className="text-[15px] font-extrabold text-gray-900 tracking-tight">{chatDetails.name}</h1>
          <span className="text-[12px] font-bold text-gray-500">Order #{chatDetails.orderNumber}</span>
        </div>

        <button className="w-10 h-10 -mr-2 rounded-2xl flex items-center justify-center active:scale-95 transition-transform">
          <Phone className="w-4 h-4 text-gray-900" />
        </button>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto px-4 py-5 pb-32 flex flex-col gap-4">
        {/* Date Separator */}
        <div className="flex justify-center">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Today</span>
        </div>

        {chatDetails.messages.map((msg, index) => {
          const isUser = msg.senderId === 'user';
          const showAvatar = !isUser && (index === 0 || chatDetails.messages[index - 1].senderId === 'user');

          return (
            <div key={msg.id} className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-8 h-8 shrink-0 flex items-end">
                  {showAvatar ? (
                    <img 
                      src={chatDetails.avatar} 
                      alt={chatDetails.name} 
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8" />
                  )}
                </div>
              )}
              
              <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
                <div 
                  className={`px-3.5 py-2.5 ${
                    isUser 
                      ? 'bg-gray-900 text-white rounded-2xl rounded-br-sm' 
                      : 'bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm'
                  }`}
                >
                  <p className="text-[14px] font-medium leading-[1.4] whitespace-pre-wrap break-words">
                    {msg.text}
                  </p>
                </div>
                <span className="text-[11px] font-medium text-gray-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-40">
        <div className="flex items-end gap-2 bg-gray-50 rounded-2xl p-1.5 pr-2">
          <button className="w-9 h-9 shrink-0 rounded-2xl flex items-center justify-center bg-white border border-gray-200 active:scale-95 transition-transform mb-0.5">
            <ImageIcon className="w-4 h-4 text-gray-900" />
          </button>
          
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={handleInput}
            placeholder="Message Ibrahim..."
            rows={1}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2 text-[14px] font-medium text-gray-900 placeholder:text-gray-400 min-h-[36px] max-h-[120px]"
            style={{ outline: 'none', boxShadow: 'none' }}
          />
          
          <button 
            className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-200 mb-0.5 ${
              newMessage.trim().length > 0 
                ? 'bg-gray-900 text-white scale-100 hover:bg-black' 
                : 'bg-gray-200 text-gray-400 scale-95'
            }`}
          >
            <Send className="w-4 h-4 -ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}