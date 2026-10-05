import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, MapPin, Home, Briefcase, Building, Check } from 'lucide-react';

const PRESET_ADDRESSES = [
  'TOWER-C, Nirvana Country, Sec 50',
  'Flat 402, Oakwood Heights, Sector 45',
  'DLF Cyber City, Building 10-A, 4th Floor',
  'Villa 18, Palm Grove Residency, Golf Course Road',
];

export const AddressModal: React.FC = () => {
  const { isAddressModalOpen, setIsAddressModalOpen, userAddress, setUserAddress, showToast } =
    useCart();

  const [inputAddress, setInputAddress] = useState(userAddress);
  const [selectedTag, setSelectedTag] = useState<'Home' | 'Work' | 'Other'>('Home');

  if (!isAddressModalOpen) return null;

  const handleSave = () => {
    if (inputAddress.trim()) {
      setUserAddress(inputAddress.trim());
      showToast('Delivery address updated!');
      setIsAddressModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsAddressModalOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-[400px] rounded-2xl p-5 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsAddressModalOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#0c831f]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-gray-900 leading-tight">
              Update Delivery Address
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">
              We deliver to your door in 8 minutes
            </p>
          </div>
        </div>

        {/* Address Type Tags */}
        <div className="flex gap-2 my-3">
          {[
            { tag: 'Home', icon: Home },
            { tag: 'Work', icon: Briefcase },
            { tag: 'Other', icon: Building },
          ].map(({ tag, icon: Icon }) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag as 'Home' | 'Work' | 'Other')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                selectedTag === tag
                  ? 'border-[#0c831f] bg-[#f0fbf2] text-[#0c831f]'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tag}</span>
            </button>
          ))}
        </div>

        {/* Address Input */}
        <div className="space-y-2 mb-4">
          <label className="text-xs font-semibold text-gray-700 block">
            Complete Delivery Address
          </label>
          <textarea
            rows={2}
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            placeholder="House / Flat no., Apartment, Street, Locality..."
            className="w-full text-xs md:text-sm p-3 border border-gray-200 focus:border-[#0c831f] focus:ring-1 focus:ring-[#0c831f] rounded-xl outline-none transition-all resize-none"
          />
        </div>

        {/* Quick Recent suggestions */}
        <div className="mb-4">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
            Recent Locations
          </span>
          <div className="space-y-1">
            {PRESET_ADDRESSES.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setInputAddress(preset)}
                className={`w-full text-left text-xs p-2 rounded-lg border transition-all truncate flex items-center justify-between ${
                  inputAddress === preset
                    ? 'border-green-300 bg-green-50/50 text-[#0c831f] font-semibold'
                    : 'border-gray-100 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="truncate">{preset}</span>
                {inputAddress === preset && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Save Address Button */}
        <button
          onClick={handleSave}
          className="w-full bg-[#0c831f] hover:bg-[#096a18] active:scale-[0.98] text-white py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer"
        >
          Save Address & Deliver Here
        </button>
      </div>
    </div>
  );
};
