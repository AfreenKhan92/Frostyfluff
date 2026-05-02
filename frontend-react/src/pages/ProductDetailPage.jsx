import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { productAPI } from '../services/api'
import { useApp } from '../context/AppContext'

const CATEGORY_FALLBACKS = {
  cakes: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
  cupcakes: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&q=80&w=800',
  cookies: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800',
  pastries: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=800',
  donuts: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
  breads: 'https://images.unsplash.com/photo-1589367920969-ab8e050eb0e9?auto=format&fit=crop&q=80&w=800',
  puffs: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
}

function getImage(product) {
  if (product?.image) return product.image
  return CATEGORY_FALLBACKS[product?.category?.toLowerCase()] ||
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)
  const { addToCart, user } = useApp()

  useEffect(() => {
    setLoading(true)
    setError(null)
    productAPI.getById(id)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const showToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleAddToCart = async () => {
    if (!user) {
      showToast('Please sign in to add items to your cart 🔒')
      return
    }
    setAdding(true)
    try {
      await addToCart(product.id, quantity)
      showToast(`${product.name} ×${quantity} added to cart! 🧁`)
    } catch (err) {
      showToast(err.message || 'Failed to add to cart')
    } finally {
      setAdding(false)
    }
  }

  // ── Loading ──────────────────────────────────────────────
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <span className="material-symbols-outlined text-5xl text-primary animate-spin">progress_activity</span>
      <p className="text-on-surface-variant font-medium">Loading product details...</p>
    </div>
  )

  // ── Error ────────────────────────────────────────────────
  if (error || !product) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <span className="material-symbols-outlined text-5xl text-red-400">error</span>
      <h2 className="font-heading text-2xl font-bold text-on-background">Product not found</h2>
      <p className="text-on-surface-variant text-sm max-w-sm">{error || 'This product does not exist.'}</p>
      <Link to="/products" className="mt-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-bold text-sm hover:scale-105 transition-all">
        ← Back to Menu
      </Link>
    </div>
  )

  const displayPrice = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price

  return (
    <>
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-on-background text-background px-5 py-3 rounded-2xl shadow-2xl font-bold text-sm animate-fade-in-up flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-base">check_circle</span>
          {toastMsg}
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-on-surface-variant flex items-center gap-1">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link to="/products" className="hover:text-primary transition-colors">Menu</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-on-surface font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Image */}
          <div className="flex flex-col gap-4 relative animate-fade-in-up">
            <div className="rounded-[32px] overflow-hidden shadow-[0_20px_40px_-10px_rgba(255,183,197,0.4)] aspect-[4/5] bg-surface-container-low">
              <img
                alt={product.name}
                className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-700 ease-in-out"
                src={getImage(product)}
              />
            </div>
            {/* Category badge */}
            {product.category && (
              <div className="self-start px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full font-bold text-xs uppercase tracking-wider">
                {product.category}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col pt-8 lg:sticky lg:top-32 animate-fade-in-up animation-delay-200">
            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-bold text-xs uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-heading text-3xl font-bold text-on-background mb-2">{product.name}</h1>
            <p className="font-heading text-2xl font-bold text-primary mb-6">{displayPrice}</p>
            <p className="text-on-surface-variant mb-8 leading-relaxed">{product.description}</p>

            {/* Out of Stock badge */}
            {!product.in_stock && (
              <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">inventory</span>
                Currently Out of Stock
              </div>
            )}

            {/* Configuration Box */}
            <div className="bg-surface-container rounded-3xl p-6 mb-8 shadow-[0_10px_20px_-10px_rgba(255,183,197,0.2)] border border-surface-variant">
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-sm text-on-background">Quantity</span>
                <div className="flex items-center bg-surface rounded-full p-1 border border-surface-variant shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="w-12 text-center font-heading text-2xl font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary-fixed transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock || adding}
                className="w-full bg-primary text-on-primary py-4 rounded-2xl font-heading text-2xl font-bold shadow-[0_8px_20px_-8px_rgba(134,78,90,0.6)] hover:shadow-[0_12px_24px_-8px_rgba(134,78,90,0.8)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {adding
                  ? <><span className="material-symbols-outlined animate-spin text-xl">progress_activity</span> Adding...</>
                  : <><span className="material-symbols-outlined">shopping_bag</span> Add to Cart</>
                }
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-surface-variant pt-4">
              {product.description && (
                <details className="group mb-4" open>
                  <summary className="flex justify-between items-center font-heading text-xl font-bold text-on-background cursor-pointer list-none py-2">
                    About this Item
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
                  </summary>
                  <div className="text-on-surface-variant pt-2 pb-4">{product.description}</div>
                </details>
              )}
              <details className="group mb-4 border-t border-surface-variant pt-4">
                <summary className="flex justify-between items-center font-heading text-xl font-bold text-on-background cursor-pointer list-none py-2">
                  Allergen Info
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
                </summary>
                <div className="text-on-surface-variant pt-2 pb-4">
                  May contain <strong className="text-on-background">Wheat</strong>,{' '}
                  <strong className="text-on-background">Dairy</strong>, and{' '}
                  <strong className="text-on-background">Eggs</strong>. Produced in a facility that also processes tree nuts and peanuts.
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Back to Menu */}
        <div className="mt-12 pt-8 border-t border-surface-variant">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Menu
          </Link>
        </div>
      </div>
    </>
  )
}
