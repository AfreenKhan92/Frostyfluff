import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/products', label: 'Menu' },
  { to: '/about', label: 'Allergens' },
  { to: '/about', label: 'Delivery Info' },
  { to: '/about', label: 'Privacy Policy' },
]

export default function Footer() {
  return (
    <footer className="w-full bg-yellow-50 mt-20 rounded-t-[40px] border-t-4 border-yellow-100 shadow-[0_-20px_40px_-20px_rgba(255,230,150,0.4)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-12 w-full max-w-[1280px] mx-auto text-center md:text-left">
        {/* Brand Column */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-white to-pink-50 rounded-full flex items-center justify-center p-0.5 group-hover:scale-105 group-hover:rotate-[8deg] transition-all duration-500 shadow-sm border border-primary-container/30 overflow-hidden">
              <img src="/premium_logo.png" alt="Frosty Fluff Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl md:text-2xl font-elegant font-bold text-yellow-800 tracking-tight leading-none italic">
                Frosty Fluff
              </span>
            </div>
          </Link>
          <p className="text-xs font-medium uppercase tracking-widest text-pink-500 font-heading">
            © 2026 Frosty Fluff. Baked with love and sprinkles.
          </p>
        </div>

        {/* Links Column */}
        <div className="flex flex-col items-center md:items-start gap-3">
          {footerLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className="text-stone-500 text-xs font-medium uppercase tracking-widest hover:text-pink-500 hover:-translate-y-0.5 transition-all font-heading"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Column */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <p className="text-xs font-medium uppercase tracking-widest text-stone-500 font-heading">
            Follow the sweetness
          </p>
          <div className="flex gap-3">
            <a href="#" className="text-stone-500 hover:text-pink-500 transition-colors p-2 bg-white rounded-full shadow-sm hover:shadow-md">
              <span className="material-symbols-outlined">photo_camera</span>
            </a>
            <a href="#" className="text-stone-500 hover:text-pink-500 transition-colors p-2 bg-white rounded-full shadow-sm hover:shadow-md">
              <span className="material-symbols-outlined">mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
