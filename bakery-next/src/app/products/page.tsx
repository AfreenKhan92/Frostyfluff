"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { productAPI } from '@/services/api';
import { useApp } from '@/context/AppContext';

const CATEGORIES = ['All', 'Cakes', 'Cupcakes', 'Cookies', 'Pastries', 'Donuts', 'Breads', 'Puffs'];

const CATEGORY_FALLBACKS: Record<string, string> = {
  cakes: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
  cupcakes: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&q=80&w=800',
  cookies: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800',
  pastries: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=800',
  donuts: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
  breads: 'https://images.unsplash.com/photo-1589367920969-ab8e050eb0e9?auto=format&fit=crop&q=80&w=800',
  puffs: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
};

function getImage(product: any) {
  if (product.image) return product.image;
  return CATEGORY_FALLBACKS[product.category?.toLowerCase()] ||
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800';
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const { addToCart, user } = useApp();

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params: any = {};
    if (activeCategory !== 'All') params.category = activeCategory.toLowerCase();
    productAPI.getAll(params)
      .then((res) => setProducts(res.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleAddToCart = async (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    if (addingId) return;
    if (!user) {
      showToast('Please sign in to add items to your cart 🔒');
      return;
    }
    setAddingId(product.id);
    try {
      await addToCart(product.id, 1);
      showToast(`${product.name} added to cart! 🧁`);
    } catch (err: any) {
      showToast(err.message || 'Failed to add to cart');
    } finally {
      setAddingId(null);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="pt-24 pb-12 bg-bakery-cream min-h-screen">
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-bakery-dark text-white px-5 py-3 rounded-2xl shadow-2xl font-bold text-sm animate-fade-in-up flex items-center gap-2">
          <span className="material-symbols-outlined text-bakery-gold text-base">check_circle</span>
          {toastMsg}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-serif text-bakery-brown mb-4">Our Menu</h1>
          <p className="text-lg text-bakery-brown/70 max-w-2xl mx-auto">
            Explore our delightful selection of artisanal baked goods, crafted with love and the finest ingredients.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-bakery-pink text-bakery-brown shadow-md scale-105'
                  : 'bg-white text-bakery-brown/70 hover:bg-bakery-pink/50 hover:text-bakery-brown hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="material-symbols-outlined text-5xl text-bakery-gold animate-spin">progress_activity</span>
            <p className="text-bakery-brown/60 font-medium">Loading our freshly baked menu...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <span className="material-symbols-outlined text-5xl text-red-400">error</span>
            <p className="font-bold text-bakery-brown">Failed to load products</p>
            <button
              onClick={() => setActiveCategory(activeCategory)}
              className="mt-2 px-6 py-2 bg-bakery-brown text-white rounded-full font-bold text-sm hover:scale-105 transition-all cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <span className="material-symbols-outlined text-5xl text-bakery-brown/30">cake</span>
            <p className="font-bold text-bakery-brown">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full border border-bakery-pink/20"
              >
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-bakery-cream">
                  <img
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                    src={getImage(product)}
                  />
                  {!product.in_stock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded-full">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-bakery-brown mb-1">{product.name}</h3>
                    <p className="text-bakery-brown/60 text-sm line-clamp-2 mb-3">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-bakery-pink/20">
                    <span className="font-bold text-lg text-bakery-gold">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={!product.in_stock || addingId === product.id}
                      className="bg-bakery-pink text-bakery-brown rounded-full p-2 hover:scale-110 hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {addingId === product.id
                        ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                        : <span className="material-symbols-outlined">add</span>
                      }
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
