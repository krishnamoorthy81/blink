import React from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Zap, Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, updateCart, setSelectedProduct } = useCart();
  const quantity = cart[product.id] || 0;

  return (
    <div className="group relative bg-white border border-[#e8eaed] hover:border-gray-300 rounded-2xl p-3 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      {/* Top Badges Row */}
      <div className="flex items-center justify-between gap-1 w-full mb-1">
        {/* Discount Badge */}
        {product.discount ? (
          <span className="bg-[#256fef] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow-2xs tracking-wider">
            {product.discount}
          </span>
        ) : (
          <span />
        )}

        {/* 8-Min Delivery Badge */}
        <div className="flex items-center gap-0.5 text-[10px] font-black text-gray-700 bg-[#f3f4f7] px-1.5 py-0.5 rounded-md ml-auto">
          <Zap className="w-2.5 h-2.5 text-[#0c831f] fill-[#0c831f]" />
          <span>{product.time}</span>
        </div>
      </div>

      {/* Image Container - Click to open product detail modal */}
      <div
        onClick={() => setSelectedProduct(product)}
        className="w-full h-[125px] sm:h-[135px] flex items-center justify-center my-1 cursor-pointer overflow-hidden p-1.5 transition-transform duration-200 group-hover:scale-105"
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain select-none"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/product-1.avif';
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between mt-1">
        <div>
          <h3
            onClick={() => setSelectedProduct(product)}
            className="text-[13px] font-bold text-gray-900 leading-[18px] h-[36px] overflow-hidden text-ellipsis line-clamp-2 cursor-pointer hover:text-[#0c831f] transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-500 mt-1 mb-2 font-semibold">
            {product.weight}
          </p>
        </div>

        {/* Footer: Price and Add / Quantity Controller */}
        <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-100 mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-black text-gray-900">
              ₹{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-[11px] text-gray-400 line-through font-medium">
                ₹{product.oldPrice}
              </span>
            )}
          </div>

          {/* ADD button or Quantity Stepper */}
          {quantity === 0 ? (
            <button
              onClick={() => updateCart(product.id, 1)}
              className="bg-[#f7fff9] hover:bg-[#0c831f] text-[#0c831f] hover:text-white border border-[#0c831f] px-4 py-1.5 rounded-lg text-xs font-black tracking-wider transition-all duration-150 active:scale-95 shadow-xs cursor-pointer select-none"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-[#0c831f] text-white rounded-lg shadow-sm select-none">
              <button
                onClick={() => updateCart(product.id, -1)}
                className="p-1 px-2 hover:bg-[#096a18] active:scale-90 transition-colors rounded-l-lg cursor-pointer"
                title="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <span className="text-xs font-black px-1.5 min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => updateCart(product.id, 1)}
                className="p-1 px-2 hover:bg-[#096a18] active:scale-90 transition-colors rounded-r-lg cursor-pointer"
                title="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
