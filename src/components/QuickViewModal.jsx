import React from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Zap } from 'lucide-react';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart, currency }) {
  if (!isOpen || !product) return null;

  const formatPrice = (usd) => {
    if (currency === 'EUR') return `${(usd * 0.92).toFixed(0)} €`;
    if (currency === 'MAD') return `${(usd * 10.2).toFixed(0)} MAD`;
    return `$${usd}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">{product.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden bg-black/50 border border-white/5 h-64 md:h-full min-h-[220px]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">{product.name}</h2>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                <Star size={13} fill="currentColor" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal font-mono">({product.reviewsCount} customer reviews)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                {product.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-mono text-slate-400 uppercase font-bold">Technical Specifications</div>
              <ul className="space-y-1 text-xs text-slate-300">
                {product.specs.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Zap size={11} className="text-cyan-400 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-2xl font-black text-cyan-400 font-mono">{formatPrice(product.price)}</div>
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <ShoppingBag size={15} />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
