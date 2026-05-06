"use client";

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { customCakeAPI } from '@/services/api';

const bases = [
  { name: 'Vanilla Bean', icon: 'cake', bgColor: 'bg-[#fdf6e3]', iconColor: 'text-[#d4b572]' },
  { name: 'Dark Chocolate', icon: 'cake', bgColor: 'bg-[#4a3b32]', iconColor: 'text-[#8b6b5d]' },
  { name: 'Red Velvet', icon: 'cake', bgColor: 'bg-[#a32b2b]', iconColor: 'text-[#f39c9c]' },
  { name: 'Marble Swirl', icon: 'cake', bgColor: 'bg-gradient-to-r from-[#fdf6e3] to-[#4a3b32]', iconColor: 'text-white' },
];

const sizes = [
  { name: 'Petite (Serves 6-8)', label: '6"', key: '6-inch', sizeClass: 'w-10 h-10' },
  { name: 'Classic (Serves 12-15)', label: '8"', key: '8-inch', sizeClass: 'w-14 h-14' },
  { name: 'Party (Serves 20-25)', label: '10"', key: '10-inch', sizeClass: 'w-16 h-16' },
  { name: 'Two-Tier (Serves 30+)', label: null, key: 'tiered', sizeClass: 'w-16 h-16' },
];

const frostings = [
  { name: 'Vanilla Buttercream', icon: 'texture', bgColor: 'bg-[#fffcf0]', iconColor: 'text-[#f3e5ab]' },
  { name: 'Strawberry Frosting', icon: 'texture', bgColor: 'bg-[#ffe4e1]', iconColor: 'text-[#ff69b4]' },
  { name: 'Chocolate Ganache', icon: 'water_drop', bgColor: 'bg-[#3d2b1f]', iconColor: 'text-[#8b4513]' },
  { name: 'Cream Cheese', icon: 'icecream', bgColor: 'bg-white border border-bakery-pink/20', iconColor: 'text-bakery-brown' },
];

const toppings = [
  { name: 'Rainbow Sprinkles', icon: 'blur_on', bgColor: 'bg-gradient-to-tr from-pink-200 via-blue-200 to-yellow-200', iconColor: 'text-white' },
  { name: 'Fresh Strawberries', icon: 'nutrition', bgColor: 'bg-[#ffedeb]', iconColor: 'text-[#ff4d4d]' },
  { name: 'Chocolate Shavings', icon: 'grid_view', bgColor: 'bg-[#5d4037]', iconColor: 'text-[#d7ccc8]' },
  { name: 'Edible Gold Leaf', icon: 'stars', bgColor: 'bg-[#fcf4dc]', iconColor: 'text-[#ffd700]' },
];

const SIZE_PRICING: Record<string, number> = { '6-inch': 35, '8-inch': 50, '10-inch': 70, tiered: 150 };
const TOPPING_SURCHARGE = 2;

export default function CustomizePage() {
  const [selectedBase, setSelectedBase] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedFrosting, setSelectedFrosting] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { user } = useApp();

  const toggleTopping = (i: number) => {
    setSelectedToppings((prev) =>
      prev.includes(i) ? prev.filter((t) => t !== i) : [...prev, i]
    );
  };

  const estimatedPrice = (SIZE_PRICING[sizes[selectedSize].key] || 50) + selectedToppings.length * TOPPING_SURCHARGE;

  const handleSubmit = async () => {
    if (!user) {
      setError('Please sign in to place a custom order.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await customCakeAPI.submit({
        flavor: bases[selectedBase].name,
        size: sizes[selectedSize].key,
        frosting: frostings[selectedFrosting].name,
        toppings: selectedToppings.map((i) => toppings[i].name),
        message,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 bg-bakery-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-serif text-bakery-brown mb-4">Create Your Masterpiece</h1>
          <p className="text-lg text-bakery-brown/70 max-w-2xl mx-auto">
            Design the cake of your dreams. From fluffy vanilla layers to decadent chocolate ganache, build something truly special.
          </p>
        </section>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 gap-6 text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-bakery-pink rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-bakery-brown">celebration</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-bakery-brown">Order Submitted!</h2>
            <p className="text-bakery-brown/70 max-w-md">
              Your custom cake order has been received. Our team will review your design and get back to you soon.
            </p>
            <button
              onClick={() => { setSubmitted(false); setSelectedToppings([]); setMessage(''); }}
              className="mt-2 px-8 py-3 bg-bakery-brown text-white rounded-full font-bold hover:bg-bakery-gold transition-all cursor-pointer"
            >
              Create Another Cake
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <StepCard step={1} title="Pick Your Base">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bases.map((base, i) => (
                    <label key={i} className="group cursor-pointer">
                      <input
                        type="radio"
                        name="cake_base"
                        className="peer sr-only"
                        checked={selectedBase === i}
                        onChange={() => setSelectedBase(i)}
                      />
                      <div className="p-4 rounded-2xl border-2 border-transparent peer-checked:border-bakery-gold peer-checked:bg-bakery-pink/20 hover:bg-white transition-all flex flex-col items-center gap-2 shadow-sm">
                        <div className={`w-16 h-16 rounded-full ${base.bgColor} flex items-center justify-center shadow-sm`}>
                          <span className={`material-symbols-outlined text-3xl ${base.iconColor}`}>{base.icon}</span>
                        </div>
                        <span className="font-bold text-sm text-bakery-brown">{base.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </StepCard>

              <StepCard step={2} title="Choose Your Size">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {sizes.map((size, i) => (
                    <label key={i} className="group cursor-pointer">
                      <input
                        type="radio"
                        name="cake_size"
                        className="peer sr-only"
                        checked={selectedSize === i}
                        onChange={() => setSelectedSize(i)}
                      />
                      <div className="p-4 rounded-2xl border-2 border-transparent peer-checked:border-bakery-gold peer-checked:bg-bakery-pink/20 hover:bg-white transition-all flex flex-col items-center gap-2 shadow-sm">
                        {size.label ? (
                          <div className={`${size.sizeClass} rounded-full border-2 border-bakery-pink flex items-center justify-center`}>
                            <span className="font-bold text-sm text-bakery-brown">{size.label}</span>
                          </div>
                        ) : (
                          <div className="w-16 h-16 flex flex-col items-center justify-end">
                            <div className="w-8 h-4 border-2 border-b-0 border-bakery-pink rounded-t-lg" />
                            <div className="w-12 h-6 border-2 border-bakery-pink rounded-t-lg" />
                          </div>
                        )}
                        <span className="font-bold text-sm text-bakery-brown">{size.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </StepCard>

              <StepCard step={3} title="Choose Your Frosting">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {frostings.map((frost, i) => (
                    <label key={i} className="group cursor-pointer">
                      <input
                        type="radio"
                        name="cake_frosting"
                        className="peer sr-only"
                        checked={selectedFrosting === i}
                        onChange={() => setSelectedFrosting(i)}
                      />
                      <div className="p-4 rounded-2xl border-2 border-transparent peer-checked:border-bakery-gold peer-checked:bg-bakery-pink/20 hover:bg-white transition-all flex flex-col items-center gap-2 shadow-sm">
                        <div className={`w-16 h-16 rounded-full ${frost.bgColor} flex items-center justify-center shadow-sm`}>
                          <span className={`material-symbols-outlined text-3xl ${frost.iconColor}`}>{frost.icon}</span>
                        </div>
                        <span className="font-bold text-sm text-bakery-brown">{frost.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </StepCard>

              <StepCard step={4} title="Choose Your Toppings">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {toppings.map((top, i) => (
                    <label key={i} className="group cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={selectedToppings.includes(i)}
                        onChange={() => toggleTopping(i)}
                      />
                      <div className="p-4 rounded-2xl border-2 border-transparent peer-checked:border-bakery-gold peer-checked:bg-bakery-pink/20 hover:bg-white transition-all flex flex-col items-center gap-2 shadow-sm">
                        <div className={`w-16 h-16 rounded-full ${top.bgColor} flex items-center justify-center shadow-sm`}>
                          <span className={`material-symbols-outlined text-3xl ${top.iconColor}`}>{top.icon}</span>
                        </div>
                        <span className="font-bold text-sm text-bakery-brown">{top.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </StepCard>

              <StepCard step={5} title="Add a Message (Optional)">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="E.g. Happy Birthday Sarah! 🎂"
                  className="w-full bg-white rounded-2xl px-4 py-3 text-bakery-brown placeholder:text-bakery-brown/30 border border-bakery-pink/20 focus:outline-none focus:border-bakery-gold transition-all resize-none shadow-sm"
                />
              </StepCard>
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-white p-8 rounded-[40px] shadow-xl border border-bakery-pink/10 space-y-6">
                <h3 className="text-2xl font-serif font-bold text-bakery-brown border-b border-bakery-pink/20 pb-4">Summary</h3>
                <div className="space-y-3 text-sm text-bakery-brown/70">
                  <div className="flex justify-between"><span>Base:</span> <span className="font-bold text-bakery-brown">{bases[selectedBase].name}</span></div>
                  <div className="flex justify-between"><span>Size:</span> <span className="font-bold text-bakery-brown">{sizes[selectedSize].name}</span></div>
                  <div className="flex justify-between"><span>Frosting:</span> <span className="font-bold text-bakery-brown">{frostings[selectedFrosting].name}</span></div>
                  <div className="flex justify-between"><span>Toppings:</span> <span className="font-bold text-bakery-brown text-right">{selectedToppings.length > 0 ? selectedToppings.map(t => toppings[t].name).join(', ') : 'None'}</span></div>
                </div>

                <div className="border-t border-bakery-pink/20 pt-4 flex justify-between items-end">
                  <span className="text-bakery-brown/70">Total</span>
                  <span className="text-3xl font-bold text-bakery-gold">${estimatedPrice.toFixed(2)}</span>
                </div>

                {error && <div className="text-red-500 text-xs font-bold">{error}</div>}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-bakery-brown text-white py-4 rounded-2xl font-bold text-xl hover:bg-bakery-gold transition-all shadow-lg flex justify-center items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {submitting ? 'Submitting...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepCard({ step, title, children }: { step: number, title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-bakery-pink/10 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-6 border-b border-bakery-pink/10 pb-4">
        <div className="w-10 h-10 rounded-full bg-bakery-pink text-bakery-brown flex items-center justify-center text-xl font-bold">{step}</div>
        <h2 className="text-2xl font-serif font-bold text-bakery-brown">{title}</h2>
      </div>
      {children}
    </div>
  );
}
