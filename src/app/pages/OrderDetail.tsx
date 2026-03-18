import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChevronLeft, MessageCircle, Phone, Clock, FileText, CheckCircle2 } from 'lucide-react';

export default function OrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mocking order data based on the ID or just a generic one
  const orderDetails = {
    id: id || 'ord-123',
    cook: 'Ibrahim B.',
    kitchen: 'Spicy Wok',
    status: 'Preparing',
    eta: '15 min',
    price: 28.81,
    subtotal: 25.00,
    deliveryFee: 3.81,
    date: 'Today, 19:45',
    address: '42 High Street, Floor 3',
    items: [
      {
        id: 1,
        name: 'Kung Pao Chicken',
        description: 'Extra spicy, less peanuts',
        price: 18.50,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1605704922285-e82455dba38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdW5nJTIwcGFvJTIwY2hpY2tlbnxlbnwxfHx8fDE3NzM2MTE5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        id: 2,
        name: 'Steamed Dim Sum',
        description: 'Pork and shrimp filling',
        price: 12.00,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1691995989456-6a77273f9f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW0lMjBzdW18ZW58MXx8fHwxNzczNjE5NTM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        id: 3,
        name: 'Jasmine Tea',
        description: 'Hot, no sugar',
        price: 4.50,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1630558206910-de9c9958d6ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXNtaW5lJTIwdGVhfGVufDF8fHx8MTc3MzU1OTEwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      }
    ],
    timeline: [
      { step: 'Order Placed', time: '19:45', completed: true },
      { step: 'Preparing', time: '19:50', completed: true },
      { step: 'On the way', time: '--:--', completed: false },
      { step: 'Delivered', time: '--:--', completed: false },
    ]
  };

  const isDelivered = orderDetails.status === 'Delivered';

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/orders', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32 font-inter text-gray-900 selection:bg-gray-900 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl pt-8 pb-3 border-b border-gray-100">
        <div className="px-4 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="w-10 h-10 -ml-2 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5 text-gray-900" />
          </button>
          
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <h1 className="text-[15px] font-extrabold text-gray-900 tracking-tight">Order Details</h1>
            <span className="text-[12px] font-bold text-gray-500">#{orderDetails.id.toUpperCase()}</span>
          </div>

          <button className="w-10 h-10 -mr-2 rounded-2xl flex items-center justify-center active:scale-95 transition-transform">
            <FileText className="w-4 h-4 text-gray-900" />
          </button>
        </div>
      </header>

      <main className="pt-5 px-4">
        {/* Status Section */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-5">
            <div>
              <h2 className="text-[24px] font-black text-gray-900 leading-tight mb-1">
                {orderDetails.status}
              </h2>
              <p className="text-[13px] font-medium text-gray-500">
                Estimated arrival {orderDetails.eta}
              </p>
            </div>
            {!isDelivered && (
              <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center">
                <Clock className="w-4 h-4 text-gray-900" />
              </div>
            )}
          </div>

          {/* Clean minimalist timeline tracker */}
          <div className="flex gap-1.5 h-1.5 mb-3">
            {orderDetails.timeline.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex-1 rounded-2xl ${step.completed ? 'bg-gray-900' : 'bg-gray-100'}`} 
              />
            ))}
          </div>
          
          <div className="flex justify-between text-[11px] font-bold text-gray-400">
            {orderDetails.timeline.map((step, idx) => (
              <span key={idx} className={step.completed ? 'text-gray-900' : ''}>
                {step.step}
              </span>
            ))}
          </div>
        </div>

        {/* Cook & Actions */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-1">Prepared by</p>
              <p className="text-[16px] font-extrabold text-gray-900">{orderDetails.cook}</p>
              <p className="text-[13px] font-medium text-gray-500">{orderDetails.kitchen}</p>
            </div>
          </div>
          <div className="flex gap-2.5">
            <button 
              onClick={() => navigate('/chat/1')} 
              className="flex-1 h-10 bg-white border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-900 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-gray-50"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Message
            </button>
            <button className="flex-1 h-10 bg-white border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-900 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-gray-50">
              <Phone className="w-3.5 h-3.5" />
              Call Cook
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="mb-8">
          <h3 className="text-[16px] font-extrabold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-5">
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex gap-3 items-start">
                <div className="w-16 h-16 shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full rounded-2xl object-cover" 
                  />
                </div>
                
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex gap-1.5 items-baseline pr-3">
                      <span className="text-[13px] font-black text-gray-900">{item.quantity}x</span>
                      <h4 className="text-[14px] font-extrabold text-gray-900 leading-snug">{item.name}</h4>
                    </div>
                    <span className="text-[13px] font-black text-gray-900 shrink-0">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-[12px] font-medium text-gray-500 mt-1 truncate pl-[22px]">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Receipt / Summary */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="space-y-3 mb-3">
            <div className="flex justify-between text-[13px]">
              <span className="font-medium text-gray-500">Subtotal</span>
              <span className="font-bold text-gray-900">€{orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="font-medium text-gray-500">Delivery</span>
              <span className="font-bold text-gray-900">€{orderDetails.deliveryFee.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="pt-3 border-t border-gray-200 border-dashed flex justify-between items-center">
            <span className="text-[15px] font-extrabold text-gray-900">Total</span>
            <span className="text-[18px] font-black text-gray-900">€{orderDetails.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Address Details */}
        <div className="mb-6">
          <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">Delivering to</p>
          <p className="text-[14px] font-bold text-gray-900">{orderDetails.address}</p>
        </div>
      </main>
    </div>
  );
}
