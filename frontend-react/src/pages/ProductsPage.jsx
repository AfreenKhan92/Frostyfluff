import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productAPI } from '../services/api'
import { useApp } from '../context/AppContext'

const CATEGORIES = ['All', 'Cakes', 'Cupcakes', 'Cookies', 'Pastries', 'Donuts', 'Breads', 'Puffs']

// Fallback images per category for products without images
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
  if (product.image) return product.image
  return CATEGORY_FALLBACKS[product.category?.toLowerCase()] ||
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addingId, setAddingId] = useState(null)
  const [toastMsg, setToastMsg] = useState(null)
  const { addToCart, user } = useApp()

  // Fetch products (re-fetch when category changes)
  useEffect(() => {
    setLoading(true)
    setError(null)
    const params = {}
    if (activeCategory !== 'All') params.category = activeCategory.toLowerCase()
    productAPI.getAll(params)
      .then((res) => setProducts(res.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [activeCategory])

  const handleAddToCart = async (e, product) => {
    e.preventDefault() // don't navigate to detail page
    if (addingId) return
    if (!user) {
      showToast('Please sign in to add items to your cart 🔒')
      return
    }
    setAddingId(product.id)
    try {
      await addToCart(product.id, 1)
      showToast(`${product.name} added to cart! 🧁`)
    } catch (err) {
      showToast(err.message || 'Failed to add to cart')
    } finally {
      setAddingId(null)
    }
  }

  const showToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  return (
    <>
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-on-background text-background px-5 py-3 rounded-2xl shadow-2xl font-bold text-sm animate-fade-in-up flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-base">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Decorative Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-primary-container rounded-full mix-blend-multiply blur-[100px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-secondary-container rounded-full mix-blend-multiply blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-tertiary-container rounded-full mix-blend-multiply blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-heading text-5xl font-extrabold text-on-surface mb-3 tracking-tight">Our Menu</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Explore our delightful selection of artisanal baked goods, crafted with love and the finest ingredients.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up animation-delay-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary-container text-on-primary-container shadow-[0_10px_20px_-10px_rgba(255,183,197,0.5)] scale-105'
                  : 'bg-surface-container-high text-on-surface hover:bg-primary-container hover:text-on-primary-container hover:shadow-[0_10px_20px_-10px_rgba(255,183,197,0.5)] hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* States: Loading / Error / Empty */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="material-symbols-outlined text-5xl text-primary animate-spin">progress_activity</span>
            <p className="text-on-surface-variant font-medium">Loading our freshly baked menu...</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <span className="material-symbols-outlined text-5xl text-red-400">error</span>
            <p className="font-bold text-on-surface">Failed to load products</p>
            <p className="text-on-surface-variant text-sm max-w-sm">{error}</p>
            <button
              onClick={() => setActiveCategory(activeCategory)}
              className="mt-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-bold text-sm hover:scale-105 transition-all cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/40">cake</span>
            <p className="font-bold text-on-surface">No products found</p>
            <p className="text-on-surface-variant text-sm">Try a different category or check back soon.</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_20px_40px_-20px_rgba(255,183,197,0.1)] hover:shadow-[0_30px_50px_-20px_rgba(255,183,197,0.3)] hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full border border-surface-container-high animate-fade-in-up"
                style={{ animationDelay: `${(i % 12 + 1) * 60}ms` }}
              >
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-surface-container">
                  <img
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                    src={getImage(product)}
                  />
                  {product.tags?.includes('bestseller') && (
                    <div className="absolute top-2 left-2 bg-primary-container text-on-primary-container px-2 py-1 rounded-md font-bold text-[10px] uppercase tracking-wider backdrop-blur-sm">
                      Bestseller
                    </div>
                  )}
                  {!product.in_stock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded-full">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-on-surface mb-1">{product.name}</h3>
                    <p className="text-on-surface-variant line-clamp-2 mb-3">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container-high">
                    <span className="font-heading text-[20px] font-bold text-primary">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={!product.in_stock || addingId === product.id}
                      className="bg-primary text-on-primary rounded-full p-2 hover:scale-110 hover:shadow-[0_5px_15px_-5px_rgba(134,78,90,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      title={product.in_stock ? 'Add to cart' : 'Out of stock'}
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
    </>
  )
}
