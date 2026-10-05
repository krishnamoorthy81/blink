import React from 'react';
import { CATEGORIES, CATEGORY_INFO, CategoryName, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export const CategorySidebar: React.FC = () => {
  const { activeCategory, setActiveCategory, setSearchQuery } = useCart();

  const handleSelect = (category: CategoryName) => {
    setActiveCategory(category);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex flex-col w-[130px] lg:w-[150px] shrink-0 bg-white border-r border-[#e8e8e8] sticky top-[69px] h-[calc(100vh-69px)] overflow-y-auto no-scrollbar select-none z-10">
        <div className="py-2 flex flex-col">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const info = CATEGORY_INFO[cat];
            const count = PRODUCTS.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => handleSelect(cat)}
                className={`w-full py-3.5 px-2 flex flex-col items-center gap-1.5 text-center transition-all border-l-[3px] group relative ${
                  isActive
                    ? 'border-l-[#0c831f] bg-[#f2f9f4]'
                    : 'border-l-transparent hover:bg-gray-50'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl overflow-hidden p-1 transition-all duration-200 border ${
                    isActive
                      ? 'scale-105 border-green-200 bg-white shadow-xs'
                      : 'border-gray-100 bg-[#f9fafb] group-hover:border-gray-200'
                  }`}
                >
                  <img
                    src={info.image}
                    alt={cat}
                    className="w-full h-full object-contain rounded-lg"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/product-1.avif';
                    }}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span
                    className={`text-[11px] leading-tight tracking-tight transition-colors line-clamp-2 max-w-[120px] ${
                      isActive ? 'text-[#0c831f] font-black' : 'text-gray-700 font-bold'
                    }`}
                  >
                    {cat}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium mt-0.5">
                    {count} items
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Horizontal Category Scroller */}
      <div className="md:hidden sticky top-[95px] z-20 bg-white border-b border-gray-200 py-2.5 px-3 shadow-xs">
        <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const info = CATEGORY_INFO[cat];
            return (
              <button
                key={cat}
                onClick={() => handleSelect(cat)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full shrink-0 text-xs font-bold border transition-all ${
                  isActive
                    ? 'bg-[#0c831f] text-white border-[#0c831f] shadow-xs'
                    : 'bg-[#f8f9fa] text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <img
                  src={info.image}
                  alt={cat}
                  className="w-5 h-5 rounded-full object-contain shrink-0 bg-white p-0.5"
                />
                <span className="whitespace-nowrap">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
