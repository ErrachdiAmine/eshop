import React from 'react';
import { ShoppingBag, Eye, Star, Sparkles, Check } from 'lucide-react';

export default function ProductCard({ product, currency, currencyRate, onAddToCart, onQuickView }) {
  const formatPrice = (usd) => {
    if (currency === 'EUR') return `${(usd * 0.92).toFixed(0)} €`;
    if (currency === 'MAD') return `${(usd * 10.2).toFixed(0)} MAD`;
    return `$${usd}`;
  };

  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20">
      <div>
        {/* Product Image Box */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-4 bg-black/40 border border-white/5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-cyan-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-[10px] font-bold">
              {product.badge}
            </div>
          )}
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white/80 hover:text-white border border-white/10 hover:bg-black/80 transition-all cursor-pointer"
            title="Aperçu Rapide"
          >
            <Eye size={15} />
          </button>
        </div>

        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
          <span>{product.category}</span>
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star size={12} fill="currentColor" />
            <span>{product.rating}</span>
            <span className="text-slate-500">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
          {product.name}
        </h3>

        {/* Bullet Specs */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {product.specs.slice(0, 2).map((spec, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-400 border border-white/5"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Price & Add to Cart CTA */}
      <div className="pt-4 border-t border-white/5 mt-5 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-slate-500 uppercase font-mono">Price</div>
          <div className="text-xl font-black text-white font-mono">{formatPrice(product.price)}</div>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <ShoppingBag size={14} />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}
