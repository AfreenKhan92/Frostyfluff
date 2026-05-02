import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { customCakeAPI } from '../services/api'

const bases = [
  { name: 'Vanilla Bean', icon: 'cake', bgColor: 'bg-[#fdf6e3]', iconColor: 'text-[#d4b572]' },
  { name: 'Dark Chocolate', icon: 'cake', bgColor: 'bg-[#4a3b32]', iconColor: 'text-[#8b6b5d]' },
  { name: 'Red Velvet', icon: 'cake', bgColor: 'bg-[#a32b2b]', iconColor: 'text-[#f39c9c]' },
  { name: 'Marble Swirl', icon: 'cake', bgColor: 'bg-gradient-to-r from-[#fdf6e3] to-[#4a3b32]', iconColor: 'text-white' },
]

const sizes = [
  { name: 'Petite (Serves 6-8)', label: '6"', key: '6-inch', sizeClass: 'w-10 h-10' },
  { name: 'Classic (Serves 12-15)', label: '8"', key: '8-inch', sizeClass: 'w-14 h-14' },
  { name: 'Party (Serves 20-25)', label: '10"', key: '10-inch', sizeClass: 'w-16 h-16' },
  { name: 'Two-Tier (Serves 30+)', label: null, key: 'tiered', sizeClass: 'w-16 h-16' },
]

const frostings = [
  { name: 'Vanilla Buttercream', icon: 'texture', bgColor: 'bg-[#fffcf0]', iconColor: 'text-[#f3e5ab]' },
  { name: 'Strawberry Frosting', icon: 'texture', bgColor: 'bg-[#ffe4e1]', iconColor: 'text-[#ff69b4]' },
  { name: 'Chocolate Ganache', icon: 'water_drop', bgColor: 'bg-[#3d2b1f]', iconColor: 'text-[#8b4513]' },
  { name: 'Cream Cheese', icon: 'icecream', bgColor: 'bg-white border border-surface-variant', iconColor: 'text-primary' },
]

const toppings = [
  { name: 'Rainbow Sprinkles', icon: 'blur_on', bgColor: 'bg-gradient-to-tr from-pink-200 via-blue-200 to-yellow-200', iconColor: 'text-white' },
  { name: 'Fresh Strawberries', icon: 'nutrition', bgColor: 'bg-[#ffedeb]', iconColor: 'text-[#ff4d4d]' },
  { name: 'Chocolate Shavings', icon: 'grid_view', bgColor: 'bg-[#5d4037]', iconColor: 'text-[#d7ccc8]' },
  { name: 'Edible Gold Leaf', icon: 'stars', bgColor: 'bg-[#fcf4dc]', iconColor: 'text-[#ffd700]' },
]

// Price map (mirrors backend)
const SIZE_PRICING = { '6-inch': 35, '8-inch': 50, '10-inch': 70, tiered: 150 }
const TOPPING_SURCHARGE = 2

export default function CustomizePage() {
  const [selectedBase, setSelectedBase] = useState(0)
  const [selectedSize, setSelectedSize] = useState(1)
  const [selectedFrosting, setSelectedFrosting] = useState(1)
  const [selectedToppings, setSelectedToppings] = useState([])
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const { user } = useApp()

  const toggleTopping = (i) => {
    setSelectedToppings((prev) =>
      prev.includes(i) ? prev.filter((t) => t !== i) : [...prev, i]
    )
  }

  const estimatedPrice =
    (SIZE_PRICING[sizes[selectedSize].key] || 50) + selectedToppings.length * TOPPING_SURCHARGE

  const handleSubmit = async () => {
    if (!user) {
      setError('Please sign in to place a custom order.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await customCakeAPI.submit({
        flavor: bases[selectedBase].name,
        size: sizes[selectedSize].key,
        frosting: frostings[selectedFrosting].name,
        toppings: selectedToppings.map((i) => toppings[i].name),
        message,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Failed to submit order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Decorative Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary-container rounded-full mix-blend-multiply blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-secondary-container rounded-full mix-blend-multiply blur-[150px]" />
      </div>

      <div className="relative z-10 flex-grow flex flex-col pt-16 pb-16 gap-14 w-full max-w-[1280px] mx-auto px-6">
        {/* Hero Section */}
        <section className="text-center space-y-3 flex flex-col items-center animate-fade-in-up">
          <h1 className="font-heading text-5xl font-extrabold text-primary max-w-3xl leading-tight tracking-tight">
            Create Your Masterpiece
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            Design the cake of your dreams. From fluffy vanilla layers to decadent chocolate ganache, mix and match your favorite flavors and toppings to build something truly special.
          </p>
        </section>

        {/* Success State */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 gap-6 text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-primary">celebration</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-on-background">Order Submitted!</h2>
            <p className="text-on-surface-variant max-w-md">
              Your custom cake order has been received. Our team will review your design and get back to you with a confirmation.
            </p>
            <button
              onClick={() => { setSubmitted(false); setSelectedToppings([]); setMessage('') }}
              className="mt-2 px-8 py-3 bg-primary text-on-primary rounded-full font-bold hover:scale-105 transition-all shadow-md cursor-pointer"
            >
              Create Another Cake
            </button>
          </div>
        ) : (
          /* Builder Grid */
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative">
            {/* Steps Area */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step 1: Base */}
              <StepCard step={1} title="Pick Your Base">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {bases.map((base, i) => (
                    <label key={i} className="group cursor-pointer">
                      <input
                        type="radio"
                        name="cake_base"
                        className="peer sr-only"
                        checked={selectedBase === i}
                        onChange={() => setSelectedBase(i)}
                      />
                      <div className="p-4 rounded-xl border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary-container/20 hover:bg-surface-container transition-all flex flex-col items-center gap-2">
                        <div className={`w-16 h-16 rounded-full ${base.bgColor} flex items-center justify-center shadow-sm`}>
                          <span className={`material-symbols-outlined text-3xl ${base.iconColor}`}>{base.icon}</span>
                        </div>
                        <span className="font-bold text-sm text-on-surface text-center">{base.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </StepCard>

              {/* Step 2: Size */}
              <StepCard step={2} title="Choose Your Size">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {sizes.map((size, i) => (
                    <label key={i} className="group cursor-pointer">
                      <input
                        type="radio"
                        name="cake_size"
                        className="peer sr-only"
                        checked={selectedSize === i}
                        onChange={() => setSelectedSize(i)}
                      />
                      <div className="p-4 rounded-xl border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary-container/20 hover:bg-surface-container transition-all flex flex-col items-center gap-2">
                        {size.label ? (
                          <div className={`${size.sizeClass} rounded-full border-2 border-outline-variant flex items-center justify-center`}>
                            <span className="font-bold text-sm">{size.label}</span>
                          </div>
                        ) : (
                          <div className="w-16 h-16 flex flex-col items-center justify-end">
                            <div className="w-8 h-4 border-2 border-b-0 border-outline-variant rounded-t-lg" />
                            <div className="w-12 h-6 border-2 border-outline-variant rounded-t-lg" />
                          </div>
                        )}
                        <span className="font-bold text-sm text-on-surface text-center">{size.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </StepCard>

              {/* Step 3: Frosting */}
              <StepCard step={3} title="Choose Your Frosting">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {frostings.map((frost, i) => (
                    <label key={i} className="group cursor-pointer">
                      <input
                        type="radio"
                        name="cake_frosting"
                        className="peer sr-only"
                        checked={selectedFrosting === i}
                        onChange={() => setSelectedFrosting(i)}
                      />
                      <div className="p-4 rounded-xl border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary-container/20 hover:bg-surface-container transition-all flex flex-col items-center gap-2">
                        <div className={`w-16 h-16 rounded-full ${frost.bgColor} flex items-center justify-center shadow-sm`}>
                          <span className={`material-symbols-outlined text-3xl ${frost.iconColor}`}>{frost.icon}</span>
                        </div>
                        <span className="font-bold text-sm text-on-surface text-center">{frost.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </StepCard>

              {/* Step 4: Toppings */}
              <StepCard step={4} title="Choose Your Toppings">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {toppings.map((top, i) => (
                    <label key={i} className="group cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={selectedToppings.includes(i)}
                        onChange={() => toggleTopping(i)}
                      />
                      <div className="p-4 rounded-xl border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary-container/20 hover:bg-surface-container transition-all flex flex-col items-center gap-2">
                        <div className={`w-16 h-16 rounded-full ${top.bgColor} flex items-center justify-center shadow-sm`}>
                          <span className={`material-symbols-outlined text-3xl ${top.iconColor}`}>{top.icon}</span>
                        </div>
                        <span className="font-bold text-sm text-on-surface text-center">{top.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </StepCard>

              {/* Step 5: Message */}
              <StepCard step={5} title="Add a Message (Optional)">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="E.g. Happy Birthday Sarah! 🎂  or any special instructions..."
                  className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 border border-surface-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </StepCard>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4 sticky top-32 space-y-3">
              <div className="bg-surface-container-lowest p-6 rounded-[32px] shadow-[0_20px_60px_-15px_rgba(251,179,193,0.3)] border border-primary/10 flex flex-col gap-3 animate-fade-in-up animation-delay-300">
                <h3 className="font-heading text-3xl font-bold text-primary border-b border-surface-variant pb-4">
                  Cake Summary
                </h3>
                <div className="aspect-square rounded-2xl bg-surface-container flex items-center justify-center relative overflow-hidden group">
                  <img
                    alt="Cake Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="space-y-2 text-on-surface-variant">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-on-surface">Base:</span> {bases[selectedBase].name}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-on-surface">Size:</span> {sizes[selectedSize].name}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-on-surface">Frosting:</span> {frostings[selectedFrosting].name}
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-sm text-on-surface">Toppings:</span>
                    <span className="text-right text-sm">
                      {selectedToppings.length > 0
                        ? selectedToppings.map((t) => toppings[t].name).join(', ')
                        : 'None selected'}
                    </span>
                  </div>
                  {message && (
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-sm text-on-surface">Message:</span>
                      <span className="text-right text-sm italic max-w-[150px] truncate">&ldquo;{message}&rdquo;</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-surface-variant pt-4 mt-2 flex justify-between items-end">
                  <span className="text-lg text-on-surface-variant">Total Estimated</span>
                  <span className="font-heading text-3xl font-bold text-primary">${estimatedPrice.toFixed(2)}</span>
                </div>

                {error && (
                  <div className="px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm flex-shrink-0 mt-0.5">error</span>
                    {error}
                  </div>
                )}

                {!user && (
                  <p className="text-xs text-on-surface-variant text-center">
                    You&apos;ll need to <strong>sign in</strong> to place your order.
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-heading text-2xl font-bold hover:bg-primary/90 shadow-[0_8px_20px_rgba(134,78,90,0.4)] hover:shadow-[0_12px_24px_rgba(134,78,90,0.5)] hover:-translate-y-1 transition-all active:scale-95 flex justify-center items-center gap-2 mt-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? <><span className="material-symbols-outlined animate-spin text-xl">progress_activity</span> Submitting...</>
                    : <><span className="material-symbols-outlined">shopping_bag</span> Place Order</>
                  }
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}

function StepCard({ step, title, children }) {
  return (
    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[40px] shadow-[0_20px_40px_-20px_rgba(251,179,193,0.3)] border border-white/80 animate-fade-in-up hover:shadow-[0_30px_60px_-20px_rgba(251,179,193,0.4)] transition-all duration-500" style={{ animationDelay: `${step * 100}ms` }}>
      <div className="flex items-center gap-5 mb-6 pb-4 border-b border-surface-variant/30">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-container to-primary-fixed text-on-primary-container flex items-center justify-center font-heading text-2xl font-bold shadow-md border border-white/50">
          {step}
        </div>
        <h2 className="font-heading text-3xl font-extrabold text-on-surface tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  )
}
