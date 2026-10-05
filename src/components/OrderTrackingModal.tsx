import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import {
  X,
  CheckCircle2,
  Clock,
  Bike,
  Package,
  MapPin,
  Phone,
  ShieldCheck,
  ChevronRight,
  Store,
  Navigation,
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen, activeOrder } = useCart();
  const [secondsRemaining, setSecondsRemaining] = useState(480); // 8 minutes = 480 seconds

  useEffect(() => {
    if (!isOrderTrackingOpen || !activeOrder) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOrderTrackingOpen, activeOrder]);

  if (!isOrderTrackingOpen || !activeOrder) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  // Calculate status step based on elapsed time
  const elapsed = 480 - secondsRemaining;
  let currentStep = 1;
  let stepText = 'Order received & confirmed';
  if (elapsed > 30 && elapsed <= 120) {
    currentStep = 2;
    stepText = 'Packed with care at nearest dark store';
  } else if (elapsed > 120 && elapsed <= 420) {
    currentStep = 3;
    stepText = 'Delivery partner on the way to your door';
  } else if (elapsed > 420) {
    currentStep = 4;
    stepText = 'Arriving at your doorstep right now';
  }

  const riderProgressPercent = Math.min(100, Math.max(5, (elapsed / 480) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsOrderTrackingOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#f4f6fb] w-full max-w-[500px] rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with live timer */}
        <div className="bg-[#0c831f] text-white p-6 relative shrink-0">
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-black/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 text-[11px] font-black px-2.5 py-0.5 rounded-full">
              ORDER #{activeOrder.orderId}
            </span>
            <span className="text-xs opacity-85 font-semibold">
              Placed at {new Date(activeOrder.placedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <div>
              <div className="text-xs uppercase font-extrabold text-green-200 tracking-wider">
                ESTIMATED ARRIVAL
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2 mt-0.5">
                <span>{secondsRemaining === 0 ? 'Arriving now!' : formattedTime}</span>
                <span className="text-sm font-bold opacity-80">mins</span>
              </h2>
            </div>
            
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Bike className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <p className="text-xs opacity-90 mt-2 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping inline-block" />
            <span>{stepText}</span>
          </p>
        </div>

        {/* Live Delivery Map Mockup */}
        <div className="relative bg-[#e6edee] h-36 border-y border-gray-200 overflow-hidden shrink-0">
          {/* Subtle grid pattern for map simulation */}
          <div className="absolute inset-0 bg-[radial-gradient(#b0bec5_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          {/* Simulated Road route */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path
              d="M 40,70 Q 150,30 250,75 T 460,70"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 40,70 Q 150,30 250,75 T 460,70"
              fill="none"
              stroke="#0c831f"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 6"
            />
          </svg>

          {/* Dark Store Icon Pin */}
          <div className="absolute left-6 top-[48px] -translate-y-1/2 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white shadow-md border-2 border-emerald-600 flex items-center justify-center text-emerald-700">
              <Store className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-black text-gray-700 bg-white/90 px-1 rounded shadow-2xs mt-1">
              Blinkit Store
            </span>
          </div>

          {/* Delivery Rider on Route */}
          <div
            className="absolute top-[48px] -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-linear flex flex-col items-center z-10"
            style={{ left: `${Math.max(15, Math.min(85, riderProgressPercent))}%` }}
          >
            <div className="w-9 h-9 rounded-full bg-[#0c831f] text-white shadow-lg border-2 border-white flex items-center justify-center animate-bounce">
              <Bike className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-black text-[#0c831f] bg-white px-1.5 py-0.5 rounded shadow-xs mt-1 whitespace-nowrap">
              Ramesh (Rider)
            </span>
          </div>

          {/* Customer Destination Pin */}
          <div className="absolute right-6 top-[48px] -translate-y-1/2 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-red-500 shadow-md border-2 border-white flex items-center justify-center text-white">
              <MapPin className="w-4 h-4 fill-white" />
            </div>
            <span className="text-[9px] font-black text-gray-700 bg-white/90 px-1 rounded shadow-2xs mt-1">
              Your Door
            </span>
          </div>
        </div>

        {/* Scrollable Details */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          
          {/* Tracking Step Cards */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 space-y-3">
            {[
              { step: 1, title: 'Order Confirmed', sub: 'Dark store accepted your order' },
              { step: 2, title: 'Items Packed', sub: 'Chilled items packed in cold thermal bag' },
              { step: 3, title: 'Out for Delivery', sub: 'Rider on electric bike moving towards your location' },
              { step: 4, title: 'Delivered', sub: 'Ring bell & hand over' },
            ].map((s) => {
              const isDone = currentStep >= s.step;
              const isCurrent = currentStep === s.step;
              return (
                <div key={s.step} className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-[#0c831f] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-xs font-black leading-tight ${
                        isCurrent
                          ? 'text-[#0c831f]'
                          : isDone
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {s.title}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5 font-medium">{s.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Partner Profile Card */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0c831f] font-black text-sm">
                RK
              </div>
              <div>
                <strong className="text-xs font-black text-gray-900 block leading-tight">
                  Ramesh Kumar
                </strong>
                <span className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-0.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0c831f]" />
                  <span>Vaccinated • 4.9 ★ (1,240+ deliveries)</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => alert('Calling delivery partner (demo): +91 98765 43210')}
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#0c831f] hover:text-white flex items-center justify-center transition-colors text-gray-700 cursor-pointer"
              title="Call Delivery Partner"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-gray-100 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#0c831f] shrink-0 mt-0.5" />
            <div className="min-w-0 text-xs">
              <span className="font-black text-gray-900 block">Delivering to</span>
              <p className="text-gray-600 text-[11px] mt-0.5 font-medium">{activeOrder.address}</p>
            </div>
          </div>

          {/* Order Items Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100">
            <h4 className="text-xs font-black text-gray-900 mb-2.5">
              Items in this shipment ({activeOrder.items.length})
            </h4>
            <div className="space-y-2 max-h-[140px] overflow-y-auto no-scrollbar">
              {activeOrder.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between text-xs text-gray-700"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-black text-[#0c831f]">{item.quantity}x</span>
                    <span className="truncate font-medium">{item.product.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 shrink-0">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-gray-200 pt-2.5 mt-3 flex items-center justify-between text-xs font-black text-gray-900">
              <span>Paid via {activeOrder.paymentMethod.toUpperCase()}</span>
              <span className="text-sm">₹{activeOrder.grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white p-3.5 border-t border-gray-200 shrink-0">
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="w-full bg-[#0c831f] hover:bg-[#096a18] text-white py-3 rounded-xl font-bold text-xs tracking-wider transition-colors cursor-pointer"
          >
            Back to Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
