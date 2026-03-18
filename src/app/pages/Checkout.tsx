import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, MapPin, Clock, CreditCard, ChevronRight, CheckCircle2, Banknote } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState<'asap' | 'scheduled'>('asap');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'card' | 'cash'>('apple_pay');

  // Using mock summary data derived from previous states
  const orderSummary = {
    subtotal: 47.00,
    deliveryFees: 4.00,
    serviceFee: 1.50,
    total: 52.50,
    kitchenCount: 2
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/cart', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32 font-inter text-gray-900 selection:bg-gray-900 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl pt-12 pb-3 border-b border-gray-100/60">
        <div className="px-5 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="w-10 h-10 -ml-2 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-[24px] h-[24px] text-gray-900" />
          </button>
          
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <h1 className="text-[17px] font-extrabold text-gray-900 tracking-tight">Checkout</h1>
            <span className="text-[12px] font-bold text-gray-500">
              {orderSummary.kitchenCount} Kitchens
            </span>
          </div>

          <div className="w-10 h-10 -mr-2" /> {/* Spacer */}
        </div>
      </header>

      <main className="pt-6 px-5">
        {/* Delivery Address Section */}
        <section className="mb-10">
          <h2 className="text-[18px] font-extrabold text-gray-900 mb-4">Delivery Details</h2>
          <button className="w-full flex items-center justify-between bg-gray-50 rounded-2xl p-5 active:scale-[0.98] transition-transform text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-gray-100">
                <MapPin className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-gray-900">42 High Street, Floor 3</p>
                <p className="text-[13px] font-medium text-gray-500 mt-0.5">Note: Ring the bell twice</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
          </button>
        </section>

        {/* Delivery Time Section */}
        <section className="mb-10">
          <h2 className="text-[18px] font-extrabold text-gray-900 mb-4">Delivery Time</h2>
          <div className="flex gap-3">
            <button 
              onClick={() => setDeliveryMethod('asap')}
              className={`flex-1 p-4 rounded-2xl border transition-all ${
                deliveryMethod === 'asap' 
                  ? 'border-gray-900 bg-gray-900 text-white' 
                  : 'border-gray-200 bg-white text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock className={`w-4 h-4 ${deliveryMethod === 'asap' ? 'text-white' : 'text-gray-400'}`} />
                <span className="text-[15px] font-bold">ASAP</span>
              </div>
              <p className={`text-[12px] font-medium text-left ${deliveryMethod === 'asap' ? 'text-gray-300' : 'text-gray-500'}`}>
                15 - 25 min
              </p>
            </button>
            <button 
              onClick={() => setDeliveryMethod('scheduled')}
              className={`flex-1 p-4 rounded-2xl border transition-all ${
                deliveryMethod === 'scheduled' 
                  ? 'border-gray-900 bg-gray-900 text-white' 
                  : 'border-gray-200 bg-white text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock className={`w-4 h-4 ${deliveryMethod === 'scheduled' ? 'text-white' : 'text-gray-400'}`} />
                <span className="text-[15px] font-bold">Schedule</span>
              </div>
              <p className={`text-[12px] font-medium text-left ${deliveryMethod === 'scheduled' ? 'text-gray-300' : 'text-gray-500'}`}>
                Select time
              </p>
            </button>
          </div>
        </section>

        {/* Payment Method Section */}
        <section className="mb-10">
          <h2 className="text-[18px] font-extrabold text-gray-900 mb-4">Payment Method</h2>
          <div className="space-y-3">
            <button 
              onClick={() => setPaymentMethod('apple_pay')}
              className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
                paymentMethod === 'apple_pay'
                  ? 'border-gray-900 bg-gray-50/50'
                  : 'border-transparent bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shrink-0">
                  {/* Simple Apple Pay icon replacement */}
                  <span className="text-white font-bold text-[18px]">Pay</span>
                </div>
                <span className="text-[15px] font-bold text-gray-900">Apple Pay</span>
              </div>
              {paymentMethod === 'apple_pay' && <CheckCircle2 className="w-6 h-6 text-gray-900" />}
            </button>

            <button 
              onClick={() => setPaymentMethod('card')}
              className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
                paymentMethod === 'card'
                  ? 'border-gray-900 bg-gray-50/50'
                  : 'border-transparent bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-gray-900" />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-gray-900">•••• 4242</p>
                  <p className="text-[13px] font-medium text-gray-500">Expires 12/26</p>
                </div>
              </div>
              {paymentMethod === 'card' && <CheckCircle2 className="w-6 h-6 text-gray-900" />}
            </button>

            <button 
              onClick={() => setPaymentMethod('cash')}
              className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
                paymentMethod === 'cash'
                  ? 'border-gray-900 bg-gray-50/50'
                  : 'border-transparent bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Banknote className="w-5 h-5 text-gray-900" />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-gray-900">Pay cash on site</p>
                  <p className="text-[13px] font-medium text-gray-500">Pay when you pick up or receive</p>
                </div>
              </div>
              {paymentMethod === 'cash' && <CheckCircle2 className="w-6 h-6 text-gray-900" />}
            </button>
          </div>
        </section>

        {/* Order Summary */}
        <section className="mb-8">
          <h2 className="text-[18px] font-extrabold text-gray-900 mb-4">Summary</h2>
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="space-y-4 mb-4">
              <div className="flex justify-between text-[14px]">
                <span className="font-medium text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">€{orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="font-medium text-gray-500">Delivery Fees ({orderSummary.kitchenCount} Kitchens)</span>
                <span className="font-bold text-gray-900">€{orderSummary.deliveryFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="font-medium text-gray-500">Service Fee</span>
                <span className="font-bold text-gray-900">€{orderSummary.serviceFee.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200/60 border-dashed flex justify-between items-center">
              <span className="text-[16px] font-extrabold text-gray-900">Total</span>
              <span className="text-[20px] font-black text-gray-900">€{orderSummary.total.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Checkout Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100/80 p-4 px-5 pb-safe z-40">
        <button 
          onClick={() => {
            // In a real app, handle payment processing here
            // Redirecting to orders tab for simulation
            navigate('/orders');
          }}
          className="w-full h-[52px] bg-gray-900 text-white rounded-2xl font-bold text-[16px] flex items-center justify-center active:scale-[0.98] transition-transform gap-2 hover:bg-black"
        >
          Place Order • €{orderSummary.total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
