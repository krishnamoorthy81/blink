import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, MapPin, CreditCard, Building2, Banknote, ShieldCheck, Loader2 } from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const {
    isPaymentOpen,
    setIsPaymentOpen,
    userAddress,
    setIsAddressModalOpen,
    grandTotal,
    placeOrder,
    cartItems,
  } = useCart();

  const [selectedMethod, setSelectedMethod] = useState<'gpay' | 'razorpay' | 'netbanking' | 'cod'>('gpay');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isPaymentOpen) return null;

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      placeOrder(selectedMethod);
    }, 900);
  };

  const handleEditAddress = () => {
    setIsPaymentOpen(false);
    setIsAddressModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => !isProcessing && setIsPaymentOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-[440px] rounded-2xl p-5 md:p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => !isProcessing && setIsPaymentOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-black text-gray-900 mb-3">Select Payment Method</h3>

        {/* Address banner */}
        <div className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-3 flex items-center justify-between gap-3 mb-4">
          <div className="flex items-start gap-2.5 min-w-0">
            <MapPin className="w-4 h-4 text-[#0c831f] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <strong className="text-xs font-bold text-gray-900 block truncate">
                {userAddress}
              </strong>
              <span className="text-[11px] text-[#0c831f] font-semibold">
                Delivering in 8 minutes
              </span>
            </div>
          </div>
          <button
            onClick={handleEditAddress}
            className="text-xs font-bold text-[#0c831f] hover:underline shrink-0 px-2 py-1"
          >
            Change
          </button>
        </div>

        {/* Payment Methods */}
        <div className="space-y-2.5 mb-5">
          {/* Google Pay / UPI */}
          <label
            onClick={() => setSelectedMethod('gpay')}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              selectedMethod === 'gpay'
                ? 'border-[#0c831f] bg-[#f0fbf2] shadow-xs'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="gpay"
              checked={selectedMethod === 'gpay'}
              onChange={() => setSelectedMethod('gpay')}
              className="w-4 h-4 text-[#0c831f] accent-[#0c831f]"
            />
            <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
              <span className="text-xs font-black text-blue-600">G</span>
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-gray-900 block">Google Pay / UPI</span>
              <span className="text-[10px] text-gray-500 font-medium">Fastest checkout via any UPI app</span>
            </div>
          </label>

          {/* Razorpay / Cards */}
          <label
            onClick={() => setSelectedMethod('razorpay')}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              selectedMethod === 'razorpay'
                ? 'border-[#0c831f] bg-[#f0fbf2] shadow-xs'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="razorpay"
              checked={selectedMethod === 'razorpay'}
              onChange={() => setSelectedMethod('razorpay')}
              className="w-4 h-4 text-[#0c831f] accent-[#0c831f]"
            />
            <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-gray-900 block">Cards (Credit / Debit)</span>
              <span className="text-[10px] text-gray-500 font-medium">Visa, Mastercard, RuPay</span>
            </div>
          </label>

          {/* Net Banking */}
          <label
            onClick={() => setSelectedMethod('netbanking')}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              selectedMethod === 'netbanking'
                ? 'border-[#0c831f] bg-[#f0fbf2] shadow-xs'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="netbanking"
              checked={selectedMethod === 'netbanking'}
              onChange={() => setSelectedMethod('netbanking')}
              className="w-4 h-4 text-[#0c831f] accent-[#0c831f]"
            />
            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-gray-900 block">Net Banking</span>
              <span className="text-[10px] text-gray-500 font-medium">All major Indian banks</span>
            </div>
          </label>

          {/* Cash on Delivery */}
          <label
            onClick={() => setSelectedMethod('cod')}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              selectedMethod === 'cod'
                ? 'border-[#0c831f] bg-[#f0fbf2] shadow-xs'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={selectedMethod === 'cod'}
              onChange={() => setSelectedMethod('cod')}
              className="w-4 h-4 text-[#0c831f] accent-[#0c831f]"
            />
            <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <Banknote className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-gray-900 block">Cash on Delivery (COD)</span>
              <span className="text-[10px] text-gray-500 font-medium">Pay via Cash / UPI at doorstep</span>
            </div>
          </label>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0c831f]" />
          <span>100% Safe & Secure Payments</span>
        </div>

        {/* Complete Order Button */}
        <button
          onClick={handleCompleteOrder}
          disabled={isProcessing || cartItems.length === 0}
          className="w-full bg-[#0c831f] hover:bg-[#096a18] active:scale-[0.98] text-white py-3 rounded-xl font-black text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Confirming Order...</span>
            </>
          ) : (
            <span>Pay ₹{grandTotal} & Place Order</span>
          )}
        </button>
      </div>
    </div>
  );
};
