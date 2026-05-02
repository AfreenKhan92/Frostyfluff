import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import AuthModal from './AuthModal'
import CartDrawer from './CartDrawer'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Cakes' },
  { to: '/customize', label: 'Custom Orders' },
  { to: '/about', label: 'Our Story' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { user, logout, cart } = useApp()

  return (
    <>
      <header className="w-full bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-pink-100/50 shadow-sm">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-14 h-14 bg-gradient-to-br from-white to-pink-50 rounded-full flex items-center justify-center p-1 group-hover:scale-105 group-hover:rotate-[8deg] transition-all duration-500 shadow-[0_5px_15px_-5px_rgba(134,78,90,0.3)] border border-primary-container/30 overflow-hidden">
                  <img src="/premium_logo.png" alt="Frosty Fluff Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-elegant font-bold text-primary tracking-tight leading-none italic">
                    Frosty Fluff
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-extrabold leading-none mt-1 pl-1">
                    Artisanal Bakery
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'text-primary bg-primary/5'
                        : 'text-on-surface-variant hover:text-primary hover:bg-pink-50/50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Trailing Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <button
                onClick={() => setShowCart(true)}
                className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-pink-50 transition-colors relative cursor-pointer"
                aria-label="Open cart"
              >
                <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
                {cart.totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cart.totalItems > 9 ? '9+' : cart.totalItems}
                  </span>
                )}
              </button>

              <div className="w-px h-6 bg-pink-100 mx-2 hidden sm:block" />

              {/* Auth */}
              {user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm font-bold text-on-surface-variant truncate max-w-[100px]">
                    Hi, {user.name.split(' ')[0]}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm font-bold text-primary hover:underline cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="hidden sm:flex bg-primary text-on-primary font-bold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Sign In
                </button>
              )}

              <Link
                to="/products"
                className="hidden lg:flex bg-primary text-on-primary font-bold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all ml-2"
              >
                Order Online
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant hover:bg-pink-50 transition-colors ml-1 cursor-pointer"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileOpen && (
            <nav className="md:hidden pb-4 border-t border-pink-100/50 animate-fade-in">
              <div className="flex flex-col gap-1 pt-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                        isActive
                          ? 'text-primary bg-primary/5'
                          : 'text-on-surface-variant hover:text-primary hover:bg-pink-50/50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                {/* Mobile auth */}
                {user ? (
                  <button
                    onClick={() => { logout(); setMobileOpen(false) }}
                    className="px-4 py-3 rounded-xl text-sm font-bold text-primary text-left cursor-pointer"
                  >
                    Sign out ({user.name.split(' ')[0]})
                  </button>
                ) : (
                  <button
                    onClick={() => { setShowAuth(true); setMobileOpen(false) }}
                    className="mx-4 mt-2 bg-primary text-on-primary font-bold text-sm px-5 py-3 rounded-xl text-center cursor-pointer"
                  >
                    Sign In / Register
                  </button>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      {/* Cart Drawer */}
      {showCart && <CartDrawer onClose={() => setShowCart(false)} onSignIn={() => { setShowCart(false); setShowAuth(true) }} />}
    </>
  )
}
