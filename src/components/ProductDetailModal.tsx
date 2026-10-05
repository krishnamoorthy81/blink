import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Clock, ShieldCheck, Plus, Minus, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, cart, updateCart } = useCart();

  if (!selectedProduct) return null;

  const quantity = cart[selectedProduct.id] || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-[520px] rounded-2xl p-5 md:p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
          {/* Image */}
          <div className="w-full md:w-[200px] h-[200px] bg-[#f9fafb] rounded-xl flex items-center justify-center p-4 shrink-0 border border-gray-100 relative">
            {selectedProduct.discount && (
              <span className="absolute top-2 left-2 bg-[#256fef] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs">
                {selectedProduct.discount}
              </span>
            )}
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/product-1.avif';
              }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-[#f3f4f7] px-2 py-0.5 rounded-md w-fit mb-2">
              <Clock className="w-3.5 h-3.5 text-gray-600" />
              <span>{selectedProduct.time}</span>
            </div>

            <h2 className="text-base md:text-lg font-bold text-gray-900 leading-snug">
              {selectedProduct.name}
            </h2>
            <div className="text-xs text-gray-500 font-semibold mt-1">
              {selectedProduct.weight} • {selectedProduct.category}
            </div>

            <div className="flex items-baseline gap-2 mt-3 mb-4">
              <span className="text-xl font-extrabold text-gray-900">
                ₹{selectedProduct.price}
              </span>
              {selectedProduct.oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{selectedProduct.oldPrice}
                </span>
              )}
            </div>

            {/* Cart Controller */}
            {quantity === 0 ? (
              <button
                onClick={() => updateCart(selectedProduct.id, 1)}
                className="w-full bg-[#f7fff9] hover:bg-[#0c831f] text-[#0c831f] hover:text-white border-2 border-[#0c831f] py-2 rounded-xl text-sm font-bold tracking-wide transition-all shadow-xs cursor-pointer"
              >
                ADD TO CART
              </button>
            ) : (
              <div className="flex items-center justify-between bg-[#0c831f] text-white rounded-xl shadow-xs p-1">
                <button
                  onClick={() => updateCart(selectedProduct.id, -1)}
                  className="p-2 hover:bg-[#096a18] rounded-lg transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </button>
                <span className="text-sm font-black px-4">{quantity} in cart</span>
                <button
                  onClick={() => updateCart(selectedProduct.id, 1)}
                  className="p-2 hover:bg-[#096a18] rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-6 pt-5 border-t border-gray-100 space-y-4">
          <div>
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
              Why buy from Blinkit?
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0c831f] shrink-0" />
                <span>Superfast 8-min delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0c831f] shrink-0" />
                <span>Cold storage guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0c831f] shrink-0" />
                <span>100% Genuine product</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0c831f] shrink-0" />
                <span>No questions asked return</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 text-[11px] text-gray-500 leading-relaxed">
            <span className="font-bold text-gray-700">Storage & Usage: </span>
            Keep refrigerated at optimum temperature (below 4°C). Consume within shelf life for
            freshest taste and maximum nutritional quality.
          </div>
        </div>
      </div>
    </div>
  );
};
