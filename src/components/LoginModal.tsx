import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Phone, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, setUser, showToast } = useCart();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('1234');

  if (!isLoginModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number');
      return;
    }
    setStep('otp');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = name.trim() || 'Valued Customer';
    setUser({
      name: displayName,
      phone: `+91 ${phone}`,
      isLoggedIn: true,
    });
    showToast(`Welcome to Blinkit, ${displayName}!`);
    setIsLoginModalOpen(false);
    setStep('phone');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsLoginModalOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-[370px] rounded-2xl p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand visual header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1 mb-2">
            <span className="text-2xl font-black text-[#f8c200]">blink</span>
            <span className="text-2xl font-black text-[#0c831f]">it</span>
          </div>
          <h3 className="text-base font-extrabold text-gray-900">
            {step === 'phone' ? 'India’s Last Minute App' : 'Enter Verification Code'}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {step === 'phone'
              ? 'Log in or sign up to access orders & saved addresses'
              : `Enter the 4-digit OTP sent to +91 ${phone}`}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-3.5">
            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">Your Name (Optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Siddharth"
                className="w-full text-xs md:text-sm px-3.5 py-2.5 border border-gray-200 rounded-xl focus:border-[#0c831f] focus:ring-1 focus:ring-[#0c831f] outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-700 block mb-1">Mobile Number</label>
              <div className="flex border border-gray-200 rounded-xl focus-within:border-[#0c831f] focus-within:ring-1 focus-within:ring-[#0c831f] overflow-hidden">
                <span className="bg-gray-50 text-xs font-bold text-gray-600 px-3 py-2.5 flex items-center border-r border-gray-200">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className="w-full text-xs md:text-sm px-3 py-2.5 outline-none font-semibold text-gray-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0c831f] hover:bg-[#096a18] active:scale-[0.98] text-white py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer mt-2"
            >
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-3.5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold text-gray-700">OTP</label>
                <span className="text-[11px] text-[#0c831f] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Auto-filled for demo
                </span>
              </div>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-[12px] text-lg font-black py-2 border border-gray-200 rounded-xl focus:border-[#0c831f] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0c831f] hover:bg-[#096a18] active:scale-[0.98] text-white py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer"
            >
              Verify & Proceed
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-xs text-gray-500 hover:text-gray-800 py-1"
            >
              Edit Phone Number
            </button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
          <span>By continuing, you agree to our Terms & Privacy</span>
        </div>
      </div>
    </div>
  );
};
