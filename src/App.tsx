import React, { useState, useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { CategorySidebar } from './components/CategorySidebar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { PaymentModal } from './components/PaymentModal';
import { AddressModal } from './components/AddressModal';
import { LoginModal } from './components/LoginModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { Toast } from './components/Toast';
import { PRODUCTS, CATEGORY_INFO, CategoryName, CATEGORIES } from './data/products';
import {
  ArrowUpDown,
  Sparkles,
  ShoppingBag,
  Zap,
  Tag,
  ShieldCheck,
  ChevronRight,
  Filter,
} from 'lucide-react';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'discount';

const MainContent: React.FC = () => {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useCart();
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  // Extract unique brands for the active category
  const availableBrands = useMemo(() => {
    const prods = PRODUCTS.filter((p) => p.category === activeCategory);
    const brandsSet = new Set<string>();
    prods.forEach((p) => {
      const firstWord = p.name.split(' ')[0];
      if (firstWord && firstWord.length > 2) {
        brandsSet.add(firstWord);
      }
    });
    return ['All', ...Array.from(brandsSet)];
  }, [activeCategory]);

  // Filter products by category, search, discount, and brand
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PRODUCTS.filter((p) => {
      const matchesSearch =
        query === '' ||
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);

      const matchesCategory = query !== '' ? true : p.category === activeCategory;
      const matchesDiscount = !onlyDiscounted || Boolean(p.discount || p.oldPrice);
      const matchesBrand =
        selectedBrand === 'All' || p.name.toLowerCase().startsWith(selectedBrand.toLowerCase());

      return matchesSearch && matchesCategory && matchesDiscount && matchesBrand;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') {
        const discA = a.discount ? parseInt(a.discount) : 0;
        const discB = b.discount ? parseInt(b.discount) : 0;
        return discB - discA;
      }
      return 0;
    });
  }, [activeCategory, searchQuery, onlyDiscounted, selectedBrand, sortBy]);

  const activeCategoryInfo = CATEGORY_INFO[activeCategory];

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fb]">
      <Navbar />

      <main className="flex-1 flex max-w-[1440px] w-full mx-auto">
        {/* Left Category Sidebar */}
        <CategorySidebar />

        {/* Main Products Area */}
        <section className="flex-1 min-w-0 p-4 md:p-6 lg:p-7 bg-white md:m-3 md:rounded-3xl md:shadow-xs border-x md:border border-gray-100">
          
          {/* Top Promotional Banners (when not searching) */}
          {!searchQuery && (
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Banner 1 */}
              <div
                onClick={() => {
                  setActiveCategory('Milk');
                  setSelectedBrand('All');
                }}
                className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl p-4 text-white flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">
                    ⚡ 8 MIN DELIVERY
                  </span>
                  <h3 className="text-sm md:text-base font-black leading-tight">
                    Dairy, Bread & Eggs
                  </h3>
                  <p className="text-xs text-green-100 mt-0.5 font-medium">Farm fresh & chilled</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center p-1.5 shrink-0 group-hover:scale-110 transition-transform">
                  <img src="/images/product-1.avif" alt="Milk" className="max-h-full object-contain" />
                </div>
              </div>

              {/* Banner 2 */}
              <div
                onClick={() => {
                  setActiveCategory('Flakes & Kids Cereals');
                  setSelectedBrand('All');
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-4 text-white flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">
                    BREAKFAST SPECIAL
                  </span>
                  <h3 className="text-sm md:text-base font-black leading-tight">
                    Cereals, Oats & Mixes
                  </h3>
                  <p className="text-xs text-amber-100 mt-0.5 font-medium">Quick & wholesome mornings</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center p-1.5 shrink-0 group-hover:scale-110 transition-transform">
                  <img src="/images/product-31.avif" alt="Cereal" className="max-h-full object-contain" />
                </div>
              </div>

              {/* Banner 3 */}
              <div
                onClick={() => {
                  setOnlyDiscounted(true);
                }}
                className="hidden lg:flex bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-4 text-white items-center justify-between cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">
                    VALUE CORNER
                  </span>
                  <h3 className="text-sm md:text-base font-black leading-tight">
                    Up to 40% OFF
                  </h3>
                  <p className="text-xs text-blue-100 mt-0.5 font-medium">Extra savings on combos</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center p-1.5 shrink-0 group-hover:scale-110 transition-transform">
                  <img src="/images/product-55.avif" alt="Paneer" className="max-h-full object-contain" />
                </div>
              </div>
            </div>
          )}

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                  {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory}
                </h2>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                  {filteredProducts.length} items
                </span>
              </div>
              {!searchQuery && activeCategoryInfo && (
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  {activeCategoryInfo.description}
                </p>
              )}
            </div>

            {/* Filter & Sort Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Only discounted toggle */}
              <button
                onClick={() => setOnlyDiscounted((prev) => !prev)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  onlyDiscounted
                    ? 'border-[#0c831f] bg-[#f0fbf2] text-[#0c831f] shadow-xs'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Offers Only</span>
              </button>

              {/* Sort selector */}
              <div className="relative flex items-center">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-xs pl-8 pr-7 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-800 font-bold focus:border-[#0c831f] outline-none cursor-pointer appearance-none shadow-2xs"
                >
                  <option value="default">Sort: Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>
            </div>
          </div>

          {/* Brand Quick-Filter Chips */}
          {!searchQuery && availableBrands.length > 2 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-5 pb-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Brand:
              </span>
              {availableBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`text-xs px-3 py-1 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                    selectedBrand === brand
                      ? 'bg-[#0c831f] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-3 text-[#0c831f]">
                <ShoppingBag className="w-8 h-8 stroke-[1.6]" />
              </div>
              <h3 className="text-base font-black text-gray-900">No products matched</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto font-medium">
                {searchQuery
                  ? `No matching items found for "${searchQuery}". Try searching for milk, bread, oats, or batter.`
                  : 'No items currently available in this specific filter.'}
              </p>
              {(searchQuery || selectedBrand !== 'All' || onlyDiscounted) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBrand('All');
                    setOnlyDiscounted(false);
                  }}
                  className="mt-4 text-xs font-bold text-white bg-[#0c831f] hover:bg-[#096a18] px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Modals and Drawers */}
      <CartDrawer />
      <PaymentModal />
      <AddressModal />
      <LoginModal />
      <ProductDetailModal />
      <OrderTrackingModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
