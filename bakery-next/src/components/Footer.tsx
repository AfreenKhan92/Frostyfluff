export default function Footer() {
  return (
    <footer className="bg-bakery-dark text-bakery-cream/70 py-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <h3 className="font-serif text-2xl text-white mb-4">Frosty Fluffs</h3>
          <p className="text-sm">Freshly baked happiness, delivered to you.</p>
        </div>
        <div>
          <h4 className="text-white uppercase tracking-widest text-sm mb-4 font-bold">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-bakery-gold cursor-pointer transition-colors">Menu</li>
            <li className="hover:text-bakery-gold cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-bakery-gold cursor-pointer transition-colors">Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white uppercase tracking-widest text-sm mb-4 font-bold">Follow Us</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-bakery-gold hover:text-bakery-gold cursor-pointer transition-all">IG</div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-bakery-gold hover:text-bakery-gold cursor-pointer transition-all">FB</div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-xs">
        &copy; {new Date().getFullYear()} Frosty Fluffs Bakery. All rights reserved.
      </div>
    </footer>
  );
}
