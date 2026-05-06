"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const pathname = usePathname();
  const { user, logout, cart } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force solid background on non-home pages
  const isHome = pathname === "/";
  const navBackground = !isHome || scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6";
  const textColor = !isHome || scrolled ? "text-bakery-brown" : "text-white";
  const logoColor = !isHome || scrolled ? "text-bakery-brown" : "text-bakery-rose";
  const linkColor = !isHome || scrolled ? "text-bakery-brown/70" : "text-white/90";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className={`flex items-center gap-3 tracking-tight ${logoColor} group`}>
            {/* Small icon */}
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-current/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
                {/* Frosting dome */}
                <path d="M4.5 11.5A7.5 7.5 0 0 1 19.5 11.5" />
                {/* Cup base */}
                <path d="M6 11.5l1.5 9.5h9l1.5-9.5" />
                {/* Cup ridges */}
                <path d="M9 11.5l0.5 9.5" />
                <path d="M12 11.5v9.5" />
                <path d="M15 11.5l-0.5 9.5" />
                {/* Cherry */}
                <circle cx="12" cy="3.5" r="2" />
              </svg>
            </div>

            {/* Logo Text */}
            <div className="flex items-center" style={{ fontFamily: "var(--font-caveat), cursive" }}>
              <span className="text-[32px] leading-none font-normal">Frosty Fluffs</span>
            </div>
          </Link>


          <ul className={`hidden md:flex gap-8 font-sans font-medium text-sm tracking-widest uppercase ${linkColor}`}>
            <li><Link href="/products" className="hover:text-bakery-gold transition-colors cursor-pointer">Menu</Link></li>
            <li><Link href="/customize" className="hover:text-bakery-gold transition-colors cursor-pointer">Customize</Link></li>
            <li><Link href="/about" className="hover:text-bakery-gold transition-colors cursor-pointer">Our Story</Link></li>
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCart(true)}
              className={`relative p-2 rounded-full hover:bg-black/5 transition-all cursor-pointer ${textColor}`}
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              {cart.totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-bakery-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </button>

            {user && user.role === 'admin' && (
              <Link
                href="/admin"
                className={`p-2 rounded-full hover:bg-black/5 transition-all cursor-pointer ${textColor}`}
                title="Admin Dashboard"
              >
                <span className="material-symbols-outlined">dashboard_customize</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold hidden lg:block ${textColor}`}>{user.name}</span>
                <button
                  onClick={logout}
                  className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-colors ${!isHome || scrolled ? "bg-bakery-brown text-white hover:bg-bakery-gold" : "bg-white text-bakery-brown hover:bg-bakery-pink"
                    }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-colors ${!isHome || scrolled ? "bg-bakery-brown text-white hover:bg-bakery-gold" : "bg-white text-bakery-brown hover:bg-bakery-pink"
                  }`}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Modals */}
      <AnimatePresence>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        {showCart && <CartDrawer onClose={() => setShowCart(false)} onSignIn={() => { setShowCart(false); setShowAuth(true); }} />}
      </AnimatePresence>
    </>
  );
}
