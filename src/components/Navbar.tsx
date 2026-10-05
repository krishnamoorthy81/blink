import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Search, MapPin, ChevronDown, User, CheckCircle2, Bike, X, History, Sparkles } from 'lucide-react';

const SEARCH_SUGGESTIONS = ['amul milk', 'bread', 'curd', 'paneer', 'chocos', 'butter', 'oats', 'dosa batter', 'eggs'];

export const Navbar: React.FC = () => {
  const {
    userAddress,
    setIsAddressModalOpen,
    searchQuery,
    setSearchQuery,
    user,
    setIsLoginModalOpen,
    setUser,
    itemsCount,
    grandTotal,
    setIsCartOpen,
    activeOrder,
    setIsOrderTrackingOpen,
  } = useCart();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Cycling search placeholder when empty
  const placeholders = [
    'Search "paneer"',
    'Search "amul milk"',
    'Search "butter"',
    'Search "bread & pav"',
    'Search "eggs"',
    'Search "curd"',
    'Search "chocos"',
  ];

  useEffect(() => {
    if (searchQuery) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [searchQuery, placeholders.length]);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e8e8e8] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-3 md:gap-8">
        
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={() => {
              setSearchQuery('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center select-none group text-left cursor-pointer"
          >
            <span className="text-3xl md:text-[34px] font-black tracking-[-1px] text-[#f8c200]">blink</span>
            <span className="text-3xl md:text-[34px] font-black tracking-[-1px] text-[#0c831f]">it</span>
          </button>

          {/* Delivery Location Button */}
          <div
            onClick={() => setIsAddressModalOpen(true)}
            className="hidden sm:flex flex-col text-left cursor-pointer group max-w-[220px] md:max-w-[270px] pl-4 border-l border-gray-200"
            title="Click to change delivery address"
          >
            <div className="flex items-center gap-1.5 text-xs font-black text-gray-900 tracking-tight">
              <span>Delivery in 8 minutes</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600 truncate font-medium group-hover:text-[#0c831f] transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#0c831f] shrink-0" />
              <span className="truncate">{userAddress}</span>
              <ChevronDown className="w-3.5 h-3.5 shrink-0 text-gray-400 group-hover:text-[#0c831f]" />
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div ref={searchContainerRef} className="flex-1 max-w-[620px] relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholders[placeholderIndex]}
              className="w-full bg-[#f8f9fa] hover:bg-[#f1f3f5] focus:bg-white text-xs md:text-sm text-gray-800 placeholder-gray-400 rounded-xl pl-10 pr-9 py-2.5 border border-[#e2e4e8] focus:border-[#0c831f] focus:ring-2 focus:ring-[#0c831f]/15 outline-none transition-all shadow-inner/5"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Search Suggestions Popover */}
          {isSearchFocused && !searchQuery && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-3.5 z-50 animate-in fade-in duration-150">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                <History className="w-3 h-3" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SEARCH_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    onMouseDown={() => {
                      setSearchQuery(sug);
                      setIsSearchFocused(false);
                    }}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-green-50 hover:text-[#0c831f] text-gray-700 transition-colors border border-gray-200/60"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Nav Actions */}
        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          {/* Active order quick tracking chip */}
          {activeOrder && (
            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="hidden lg:flex items-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <Bike className="w-4 h-4 text-amber-700" />
              <span>Track Live Delivery</span>
            </button>
          )}

          {/* Login / Profile */}
          {user.isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-sm font-bold text-gray-800 hover:text-[#0c831f] transition-colors py-1.5 px-3 rounded-xl hover:bg-gray-50">
                <div className="w-6 h-6 rounded-full bg-green-100 text-[#0c831f] flex items-center justify-center text-xs font-black">
                  {user.name.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="hidden md:inline">{user.name || 'Account'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>
              
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 hidden group-hover:block z-50">
                <div className="px-3.5 py-2 border-b border-gray-100">
                  <div className="text-xs font-extrabold text-gray-900">{user.name || 'Customer'}</div>
                  <div className="text-[11px] text-gray-500 font-medium">{user.phone}</div>
                </div>
                {activeOrder && (
                  <button
                    onClick={() => setIsOrderTrackingOpen(true)}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50 flex items-center gap-2"
                  >
                    <Bike className="w-3.5 h-3.5 text-amber-600" />
                    Track Active Order
                  </button>
                )}
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="w-full text-left px-3.5 py-2 text-xs text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Saved Addresses
                </button>
                <button
                  onClick={() => setUser({ name: '', phone: '', isLoggedIn: false })}
                  className="w-full text-left px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 font-semibold"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 text-sm font-bold text-gray-800 hover:text-[#0c831f] transition-colors px-3 py-2 rounded-xl hover:bg-gray-50 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </button>
          )}

          {/* Distinctive Blinkit Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-[#0c831f] hover:bg-[#0a721a] active:scale-[0.98] text-white px-3.5 md:px-4 py-2 rounded-xl font-bold transition-all shadow-sm hover:shadow cursor-pointer select-none"
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <div className="flex flex-col items-start leading-none gap-0.5">
              <span className="text-[11px] font-semibold opacity-95">
                {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
              </span>
              <span className="text-xs md:text-sm font-black tracking-tight">
                ₹{itemsCount > 0 ? grandTotal : 0}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Location Header Strip */}
      <div
        onClick={() => setIsAddressModalOpen(true)}
        className="sm:hidden flex items-center justify-between px-4 py-2 bg-[#f4fbf6] border-t border-[#e2f1e6] text-xs text-gray-700 cursor-pointer"
      >
        <div className="flex items-center gap-2 truncate">
          <span className="font-black text-[#0c831f] flex items-center gap-1">
            <span>⚡ 8 mins</span>
          </span>
          <span className="text-gray-300">|</span>
          <span className="truncate text-gray-600 font-medium">{userAddress}</span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-[#0c831f] shrink-0" />
      </div>
    </header>
  );
};
