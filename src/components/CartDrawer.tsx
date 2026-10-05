import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import {
  ArrowLeft,
  Share2,
  Zap,
  FileText,
  Truck,
  ShoppingBag,
  Moon,
  HelpCircle,
  Plus,
  Minus,
  ChevronRight,
  Info,
  Gift,
  Check,
  PackageOpen,
  Sparkles,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    itemsTotal,
    deliveryCharge,
    handlingCharge,
    nightCharge,
    smallCartCharge,
    donationChecked,
    setDonationChecked,
    selectedTip,
    setSelectedTip,
    grandTotal,
    updateCart,
    setIsPaymentOpen,
    showToast,
  } = useCart();

  const [customTipModal, setCustomTipModal] = useState(false);
  const [customTipInput, setCustomTipInput] = useState('40');
  const [copiedShare, setCopiedShare] = useState(false);

  if (!isCartOpen) return null;

  // Free delivery threshold: ₹199
  const freeDeliveryThreshold = 199;
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - itemsTotal);
  const progressPercent = Math.min(100, (itemsTotal / freeDeliveryThreshold) * 100);

  const handleShare = () => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty');
      return;
    }
    const summary = cartItems
      .map((item) => `${item.quantity}x ${item.product.name} (₹${item.product.price})`)
      .join(', ');
    const text = `Hey, check out my Blinkit cart (₹${grandTotal}): ${summary}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      showToast('Cart summary copied to clipboard!');
      setTimeout(() => setCopiedShare(false), 2500);
    } else {
      showToast('Sharing not supported on this browser');
    }
  };

  const handleProceed = () => {
    if (cartItems.length === 0) {
      showToast('Please add items to your cart before proceeding');
      return;
    }
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300"
      />

      {/* Slide-Over Drawer */}
      <aside className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-[#f4f6fb] flex flex-col shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        {/* Cart Header */}
        <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-[#eee] shrink-0">
          <button
            onClick={() => setIsCartOpen(false)}
            className="flex items-center gap-2.5 text-gray-900 hover:text-black font-black text-base cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
            <span>My Cart</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0c831f] hover:bg-[#f0fbf2] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0c831f]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Free Delivery / 8-min banner */}
        <div className="bg-white mx-3 mt-3 p-3.5 rounded-2xl shadow-xs border border-green-100 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f0fbf2] flex items-center justify-center shrink-0 border border-green-200">
              <Zap className="w-5 h-5 text-[#0c831f] fill-[#0c831f]" />
            </div>
            <div>
              <div className="text-[13px] font-black text-gray-900 leading-tight">
                Delivery in 8 minutes
              </div>
              <div className="text-xs text-gray-500 font-semibold mt-0.5">
                Shipment of 1 package
              </div>
            </div>
          </div>

          {/* Progress towards free delivery */}
          {itemsTotal > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span className="text-gray-700">
                  {amountNeededForFree === 0
                    ? '🎉 You unlocked FREE Delivery!'
                    : `Add ₹${amountNeededForFree} more for FREE Delivery`}
                </span>
                <span className="text-[#0c831f]">Goal: ₹199</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0c831f] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
          {/* Cart Items List */}
          <div className="space-y-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-xs">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3 text-[#0c831f]">
                  <PackageOpen className="w-7 h-7 stroke-[1.8]" />
                </div>
                <h4 className="text-sm font-black text-gray-800">Your cart is empty</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-[220px] mx-auto font-medium">
                  Add fresh milk, bread, eggs or snacks to get them delivered in 8 minutes!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 bg-[#0c831f] hover:bg-[#096a18] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-3 rounded-2xl flex items-center justify-between gap-3 shadow-xs border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain shrink-0 rounded-xl p-1 bg-gray-50 border border-gray-100"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/product-1.avif';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-gray-900 truncate">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium">
                        {item.product.weight}
                      </div>
                      <div className="text-xs font-black text-gray-900 mt-0.5">
                        ₹{item.product.price}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-[#0c831f] text-white rounded-lg shadow-xs shrink-0 select-none">
                    <button
                      onClick={() => updateCart(item.product.id, -1)}
                      className="p-1 px-2.5 hover:bg-[#096a18] active:scale-90 transition-colors rounded-l-lg cursor-pointer"
                    >
                      <Minus className="w-3 h-3 stroke-[3]" />
                    </button>
                    <span className="text-xs font-black px-1 min-w-[18px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCart(item.product.id, 1)}
                      className="p-1 px-2.5 hover:bg-[#096a18] active:scale-90 transition-colors rounded-r-lg cursor-pointer"
                    >
                      <Plus className="w-3 h-3 stroke-[3]" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bill Details Card */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-3">
              Bill details
            </h4>

            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-gray-400" />
                  <span>Items total</span>
                </span>
                <span className="font-bold text-gray-900">₹{itemsTotal}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 group relative">
                  <Truck className="w-3.5 h-3.5 text-gray-400" />
                  <span>Delivery charge</span>
                  <HelpCircle className="w-3 h-3 text-gray-400" />
                </span>
                <span className="font-bold text-gray-900">
                  {itemsTotal >= 199 ? (
                    <span className="text-[#0c831f]">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5 text-gray-400" />
                  <span>Handling charge</span>
                </span>
                <span className="font-bold text-gray-900">₹{handlingCharge}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Moon className="w-3.5 h-3.5 text-gray-400" />
                  <span>Late night convenience charge</span>
                </span>
                <span className="font-bold text-gray-900">₹{nightCharge}</span>
              </div>

              {smallCartCharge > 0 && (
                <div className="flex items-center justify-between text-amber-800 bg-amber-50/60 p-1.5 rounded-lg">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                    <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Small cart charge (Orders &lt; ₹100)</span>
                  </span>
                  <span className="font-black text-xs">₹{smallCartCharge}</span>
                </div>
              )}

              {donationChecked && itemsTotal > 0 && (
                <div className="flex items-center justify-between text-gray-700">
                  <span className="flex items-center gap-2">
                    <Gift className="w-3.5 h-3.5 text-pink-500" />
                    <span>Feeding India donation</span>
                  </span>
                  <span className="font-bold text-gray-900">₹1</span>
                </div>
              )}

              {selectedTip > 0 && itemsTotal > 0 && (
                <div className="flex items-center justify-between text-[#0c831f]">
                  <span className="flex items-center gap-2 font-bold">
                    <span>Delivery tip</span>
                  </span>
                  <span className="font-black">₹{selectedTip}</span>
                </div>
              )}

              <div className="border-t border-dashed border-gray-200 pt-3 mt-2.5 flex items-center justify-between text-sm font-black text-gray-900">
                <span>Grand total</span>
                <span className="text-base text-gray-900">₹{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Feeding India Donation Card */}
          <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-gray-100 flex items-center gap-3">
            <div className="text-2xl p-1 bg-pink-50 rounded-xl">🎁</div>
            <div className="flex-1 min-w-0">
              <strong className="text-xs font-black text-gray-900 block leading-tight">
                Feeding India donation
              </strong>
              <p className="text-[11px] text-gray-500 font-medium">
                Working towards a malnutrition free India.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-black text-gray-900">₹1</span>
              <input
                type="checkbox"
                checked={donationChecked}
                onChange={(e) => setDonationChecked(e.target.checked)}
                className="w-4 h-4 text-[#0c831f] rounded accent-[#0c831f] cursor-pointer"
              />
            </div>
          </div>

          {/* Tip Your Delivery Partner Card */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100">
            <h4 className="text-xs font-black text-gray-900">Tip your delivery partner</h4>
            <p className="text-[11px] text-gray-500 mt-0.5 mb-3 font-medium">
              100% of your tip goes directly to your delivery partner.
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '🖐️ ₹20', value: 20 },
                { label: '✉️ ₹30', value: 30 },
                { label: '❤️ ₹50', value: 50 },
              ].map((tip) => {
                const isSelected = selectedTip === tip.value;
                return (
                  <button
                    key={tip.value}
                    onClick={() => setSelectedTip(isSelected ? 0 : tip.value)}
                    className={`py-2 px-1 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0c831f] bg-[#f0fbf2] text-[#0c831f] shadow-xs'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tip.label}
                  </button>
                );
              })}

              <button
                onClick={() => setCustomTipModal(true)}
                className={`py-2 px-1 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                  selectedTip > 0 && ![20, 30, 50].includes(selectedTip)
                    ? 'border-[#0c831f] bg-[#f0fbf2] text-[#0c831f] shadow-xs'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {selectedTip > 0 && ![20, 30, 50].includes(selectedTip)
                  ? `👏 ₹${selectedTip}`
                  : '👏 Custom'}
              </button>
            </div>

            {/* Custom tip quick input */}
            {customTipModal && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                <span className="text-xs text-gray-600 font-bold">Custom tip: ₹</span>
                <input
                  type="number"
                  value={customTipInput}
                  onChange={(e) => setCustomTipInput(e.target.value)}
                  className="w-20 px-2.5 py-1 text-xs border border-gray-300 rounded-lg font-black"
                  placeholder="Amount"
                  min="5"
                  max="1000"
                />
                <button
                  onClick={() => {
                    const parsed = parseInt(customTipInput, 10);
                    if (!isNaN(parsed) && parsed > 0) {
                      setSelectedTip(parsed);
                    }
                    setCustomTipModal(false);
                  }}
                  className="text-xs bg-[#0c831f] text-white px-3 py-1 rounded-lg font-bold hover:bg-[#096a18]"
                >
                  Apply
                </button>
                <button
                  onClick={() => setCustomTipModal(false)}
                  className="text-xs text-gray-400 hover:text-gray-600 px-1"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Cancellation Policy */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100">
            <h4 className="text-xs font-black text-gray-900 mb-1">Cancellation Policy</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
              Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a
              refund will be provided, if applicable.
            </p>
          </div>
        </div>

        {/* Sticky Cart Footer */}
        <div className="bg-[#0c831f] text-white px-5 py-3.5 flex items-center justify-between shrink-0 shadow-xl">
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-black tracking-tight">₹{grandTotal}</span>
            <small className="text-[10px] font-black opacity-85 uppercase tracking-wider">
              TOTAL AMOUNT
            </small>
          </div>

          <button
            onClick={handleProceed}
            className="flex items-center gap-2 bg-white text-[#0c831f] hover:bg-gray-100 active:scale-95 px-6 py-2.5 rounded-xl font-black text-sm tracking-wide transition-all shadow-md cursor-pointer"
          >
            <span>Proceed</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </aside>
    </div>
  );
};
