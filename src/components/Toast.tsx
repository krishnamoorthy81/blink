import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[3000] pointer-events-auto">
      <div className="bg-[#0c831f] text-white px-6 py-3.5 rounded-full shadow-[0_6px_20px_rgba(12,131,31,0.35)] flex items-center gap-3.5 border border-green-600 animate-in slide-in-from-bottom-5 fade-in duration-300">
        <CheckCircle2 className="w-5 h-5 text-white shrink-0 fill-white/20" />
        <div className="text-xs md:text-sm font-semibold tracking-wide">
          {toastMessage}
        </div>
        <button
          onClick={() => showToast('')}
          className="p-1 -mr-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
