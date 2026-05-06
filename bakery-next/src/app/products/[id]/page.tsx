"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { productAPI } from '@/services/api';
import { useApp } from '@/context/AppContext';

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
  if (product?.image) return product.image;
  return CATEGORY_FALLBACKS[product?.category?.toLowerCase()] ||
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800';
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const { addToCart, user } = useApp();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    productAPI.getById(id)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddToCart = async () => {
    if (!user) {
      showToast('Please sign in to add items to your cart 🔒');
      return;
    }
    setAdding(true);
    try {
      await addToCart(product.id, quantity);
      showToast(`${product.name} ×${quantity} added to cart! 🧁`);
    } catch (err: any) {
      showToast(err.message || 'Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-bakery-cream">
      <span className="material-symbols-outlined text-5xl text-bakery-gold animate-spin">progress_activity</span>
      <p className="text-bakery-brown/60 font-medium">Loading product details...</p>
    </div>
  );

  if (error || !product) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4 bg-bakery-cream">
      <span className="material-symbols-outlined text-5xl text-red-400">error</span>
      <h2 className="text-2xl font-serif font-bold text-bakery-brown">Product not found</h2>
      <Link href="/products" className="mt-2 px-6 py-2 bg-bakery-brown text-white rounded-full font-bold text-sm hover:scale-105 transition-all">
        ← Back to Menu
      </Link>
    </div>
  );

  return (
    <div className="bg-bakery-cream min-h-screen pt-24 pb-12">
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-bakery-dark text-white px-5 py-3 rounded-2xl shadow-2xl font-bold text-sm animate-fade-in-up flex items-center gap-2">
          <span className="material-symbols-outlined text-bakery-gold text-base">check_circle</span>
          {toastMsg}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <nav className="mb-8 text-sm text-bakery-brown/60 flex items-center gap-1">
          <Link href="/" className="hover:text-bakery-brown transition-colors">Home</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link href="/products" className="hover:text-bakery-brown transition-colors">Menu</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-bakery-brown font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          <div className="flex flex-col gap-4 relative">
            <div className="rounded-[40px] overflow-hidden shadow-xl aspect-[4/5] bg-white">
              <img
                alt={product.name}
                className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-700 ease-in-out"
                src={getImage(product)}
              />
            </div>
            {product.category && (
              <div className="self-start px-4 py-1.5 bg-bakery-pink text-bakery-brown rounded-full font-bold text-xs uppercase tracking-wider">
                {product.category}
              </div>
            )}
          </div>

          <div className="flex flex-col pt-8">
            <h1 className="text-4xl font-serif font-bold text-bakery-brown mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-bakery-gold mb-6">
              ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
            </p>
            <p className="text-bakery-brown/70 mb-8 leading-relaxed text-lg">{product.description}</p>

            {!product.in_stock && (
              <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">inventory</span>
                Currently Out of Stock
              </div>
            )}

            <div className="bg-white rounded-[32px] p-6 mb-8 shadow-sm border border-bakery-pink/20">
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-bakery-brown">Quantity</span>
                <div className="flex items-center bg-bakery-cream rounded-full p-1 border border-bakery-pink/30">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-bakery-brown hover:bg-bakery-pink/30 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="w-12 text-center text-2xl font-bold text-bakery-brown">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-bakery-gold hover:bg-bakery-pink/30 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock || adding}
                className="w-full bg-bakery-brown text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:bg-bakery-gold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {adding
                  ? <><span className="material-symbols-outlined animate-spin text-xl">progress_activity</span> Adding...</>
                  : <><span className="material-symbols-outlined">shopping_bag</span> Add to Cart</>
                }
              </button>
            </div>

            <div className="border-t border-bakery-pink/20 pt-4">
              <details className="group mb-4" open>
                <summary className="flex justify-between items-center text-xl font-serif font-bold text-bakery-brown cursor-pointer list-none py-2">
                  Allergen Info
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-bakery-gold">expand_more</span>
                </summary>
                <div className="text-bakery-brown/60 pt-2 pb-4">
                  May contain <strong>Wheat</strong>, <strong>Dairy</strong>, and <strong>Eggs</strong>. Produced in a facility that also processes tree nuts and peanuts.
                </div>
              </details>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-bakery-pink/20">
          <Link href="/products" className="inline-flex items-center gap-2 text-bakery-gold font-bold hover:underline">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
