import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Search,
  Filter,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
} from 'lucide-react';
import { PRODUCTS } from './data/products';
import ProductCard from './components/ProductCard';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('aurastore_cart') || '[]');
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem('aurastore_cart', JSON.stringify(cart));
  }, [cart]);

  const categories = [
    'All',
    'Cyberdecks & Displays',
    'Keyboards & Switches',
    'Optics & Audio',
    'Desk Setup',
    'Cyber Accessories',
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.specs.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 glass-panel border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu size={22} />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>AuraStore</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono">
                  v2.0
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Autonomous Cyber Hardware & Kinetic Peripherals</p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 text-xs font-mono">
              {['USD', 'EUR', 'MAD'].map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    currency === cur ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-cyan-500/20"
            >
              <ShoppingBag size={15} />
              <span>Cart ({cart.reduce((acc, i) => acc + (i.quantity || 1), 0)})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto w-full pt-10 pb-8 text-center sm:text-left">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
              <Sparkles size={12} />
              <span>NEXT-GEN HIGH-THROUGHPUT HARDWARE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Engineered for Speed. <br />
              <span className="gradient-text-cyan">Crafted for Builders.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Precision cyberdecks, magnetic rapid-trigger keyboards, and low-latency acoustic gear curated for high-velocity software engineers.
            </p>
          </div>

          <div className="flex flex-row md:flex-col gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-center min-w-[130px]">
              <div className="text-2xl font-mono font-black text-cyan-400">0.1ms</div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Input Latency</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-center min-w-[130px]">
              <div className="text-2xl font-mono font-black text-emerald-400">100%</div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Lossless Audio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <main className="px-4 sm:px-8 max-w-7xl mx-auto w-full pb-16 flex-1 space-y-6">
        {/* Search and Categories */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hardware, rapid-trigger switches, cyberdecks..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-black font-black shadow-md shadow-cyan-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              currency={currency}
              onAddToCart={handleAddToCart}
              onQuickView={(prod) => setQuickViewProduct(prod)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-white/5 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} AuraStore • High-Throughput Commerce Engine</div>
          <div className="font-mono text-[11px]">Architected by Amine Errachdi</div>
        </div>
      </footer>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onRemove={handleRemoveFromCart}
        onClear={() => setCart([])}
      />
    </div>
  );
}
