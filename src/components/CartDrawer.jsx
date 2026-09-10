import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Check, ShoppingBag, Zap, ShieldCheck } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  currency,
  onRemove,
  onUpdateQty,
  onClear,
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPct, setDiscountPct] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const formatPrice = (usd) => {
    if (currency === 'EUR') return `${(usd * 0.92).toFixed(0)} €`;
    if (currency === 'MAD') return `${(usd * 10.2).toFixed(0)} MAD`;
    return `$${usd.toFixed(0)}`;
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const discountAmount = subtotal * discountPct;
  const total = Math.max(0, subtotal - discountAmount);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CYBER10' || promoCode.trim().toUpperCase() === 'VIBE10') {
      setDiscountPct(0.1);
    } else {
      alert('Invalid promo code. Try "VIBE10" for 10% off.');
    }
  };

  const handleCheckout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onClear();
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md bg-[#0b0e14] border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-cyan-400" size={18} />
              <h2 className="text-base font-bold text-white font-mono">Your Cart ({cart.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-slate-500">
              <ShoppingBag size={40} className="mx-auto text-slate-600" />
              <p className="text-sm">Your hardware loadout is currently empty.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{item.name}</h4>
                      <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
                        {formatPrice(item.price)} × {item.quantity || 1}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            <form onSubmit={applyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder='Promo code (ex: VIBE10)'
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white uppercase font-mono"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white cursor-pointer"
              >
                Apply
              </button>
            </form>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(subtotal)}</span>
              </div>
              {discountPct > 0 && (
                <div className="flex justify-between text-cyan-400 font-semibold">
                  <span>Cyber Discount (10%)</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Global Express Shipping</span>
                <span className="text-cyan-400 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/5">
                <span>Total</span>
                <span className="font-mono text-cyan-400">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isSuccess}
              className="w-full py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 cursor-pointer"
            >
              {isSuccess ? (
                <>
                  <Check size={16} />
                  <span>Deployment Dispatched!</span>
                </>
              ) : (
                <>
                  <span>Deploy Order ({formatPrice(total)})</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
