import { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const videoRef = useRef(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
    }
  }

  return (
    <>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-surface-container-low to-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="z-10 flex flex-col items-start gap-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full font-bold text-sm shadow-[0_4px_10px_rgba(255,183,197,0.2)]">
              <span className="material-symbols-outlined text-sm">stars</span>
              Baked Fresh Daily
            </div>
            <h1 className="font-heading text-5xl lg:text-[64px] lg:leading-[72px] font-extrabold text-on-background tracking-tight">
              Indulge in <br />
              <span className="text-primary relative inline-block">
                Sweet Cravings
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-primary-container z-[-1]" preserveAspectRatio="none" viewBox="0 0 200 20">
                  <path d="M0 10 Q 50 20, 100 10 T 200 10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="8" />
                </svg>
              </span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
              Experience the joy of artisanal baking. From squishy, pillowy breads to vibrant, Instagrammable cakes, every bite is a moment of pure bliss.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/products"
                className="bg-primary text-on-primary font-bold text-sm px-8 py-4 rounded-full shadow-[0_15px_30px_-10px_rgba(134,78,90,0.4)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 inline-block"
              >
                Explore Menu
              </Link>
              <Link
                to="/customize"
                className="bg-surface text-primary border-2 border-primary-container font-bold text-sm px-8 py-4 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 inline-block"
              >
                Custom Orders
              </Link>
            </div>
          </div>

          {/* Hero Video */}
          <div className="relative z-10 flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
            <div className="absolute w-[120%] h-[120%] bg-primary-container/30 blur-[80px] -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative w-full max-w-4xl aspect-[4/3] overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
                preload="auto"
              >
                <source src="/cakehome.mp4" type="video/mp4" />
              </video>
              <button
                onClick={toggleMute}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-sm transition-all z-20 flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">volume_off</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Specialties Bento Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-on-background mb-4">Our Specialties</h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
              Handcrafted with love, vibrant colors, and the finest ingredients to brighten your day.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
            {/* Feature 1: Cakes (Large) */}
            <div className="md:col-span-8 relative rounded-3xl overflow-hidden group shadow-[0_20px_40px_-15px_rgba(255,183,197,0.2)] bg-surface-container-high flex flex-col justify-end p-8">
              <img
                alt="Celebration Cakes"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwwsWOWE17j7PPnoOCl0e95i37j7FYLfScC8BtYiQjFBsfojomeCCeHu0iDcxgPe5wnazGJNbv00cNeWMxB-090DahOWKlJUe5H_WaR9F2BLjF8zaSq73l0QHQZPoBKpefNJ58P0Bj5_OSyxWDJXHGPxWQ8_f2anMU8L4TwwJQ_S27O8BCMIs7Od4ct1YBEvQeRtPD8ja8nE0YQsjOT6lqcr8zYKriRC0oPcMGc0nyorAyzTVtgKQeadXKKnRM4eGtmxu6ZA_QkqMC"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="inline-block px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full font-bold text-xs uppercase tracking-wider mb-3">
                  Signature
                </span>
                <h3 className="font-heading text-2xl font-bold mb-2">Celebration Cakes</h3>
                <p className="text-white/90 max-w-md">
                  Vibrant, multi-layered showstoppers perfect for any Instagrammable moment.
                </p>
              </div>
            </div>

            {/* Feature 2: Pastries (Tall) */}
            <div className="md:col-span-4 md:row-span-2 relative rounded-3xl overflow-hidden group shadow-[0_20px_40px_-15px_rgba(207,202,182,0.3)] bg-tertiary-container flex flex-col p-8">
              <img
                alt="Delicate Pastries"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb8Nktf9mwUGHtRjLu07tmfrDqgcbrp__kJHmUukx2-geebOpwOSLweKvPfIv44qknslCRYA57nRBoyJm40ub0wQINM6UjjAx0s-8-ma2qAdyPRaWQZpCGXecLCVq5Uhf9vMAG3105PrQg8utXI2YJ592GaP51skPGFyephl1ERpuRZWJ6C_Pwv8Yf5ci3SwQ80O53DkqYgubrDEWmfwT9uwWmrXPfjql52d6WHV7aYJtSrl9XDqqKu_2rpYytpJaaJ0rI5n7lhLVr"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="self-end bg-surface/90 backdrop-blur-md rounded-full p-3 text-primary shadow-sm">
                  <span className="material-symbols-outlined">bakery_dining</span>
                </div>
                <div className="text-white">
                  <h3 className="font-heading text-2xl font-bold mb-2">Delicate Pastries</h3>
                  <p className="text-white/90">Flaky, buttery perfection filled with sweet, colorful surprises.</p>
                  <Link
                    to="/products"
                    className="mt-4 flex items-center gap-2 font-bold text-sm text-white hover:text-primary-fixed-dim transition-colors"
                  >
                    View Selection <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature 3: Breads (Medium) */}
            <div className="md:col-span-4 relative rounded-3xl overflow-hidden group shadow-[0_20px_40px_-15px_rgba(241,227,169,0.4)] bg-secondary-container p-6 flex flex-col justify-between">
              <div className="relative z-10">
                <h3 className="font-heading text-2xl font-bold text-on-secondary-container mb-2">Artisan Breads</h3>
                <p className="text-on-secondary-container/80">Squishy, warm, and freshly baked daily.</p>
              </div>
              <img
                alt="Artisan Bread"
                className="absolute -bottom-10 -right-10 w-64 h-64 object-cover rounded-full shadow-lg transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA62IpDJPDu4tgDzhcFiRKBpnDyOmm3R1d-crgh7EvNzIa7KUWunJ5OhcrZxSrno1gyz21n0wqppjGw_Pr5hZ4u9JbWCrlpRs4BD4Lrn6aDwVicmUMMS2-aZTeNZhOgKg8MX5tqzvlyYHoDJpPZXihgjqqAprnZ5H8m5-K2Z3kcjogXvxE0ApRHEweH4Z0MYDxiPAO3gH3vClB_Cjm5c4_VlrDuKWePqEu9YnU3td6wC03QRkJJ3gtY6bkQzta8pf2gQXMhtqN8ghlz"
              />
            </div>

            {/* Feature 4: Custom (Medium) */}
            <div className="md:col-span-4 relative rounded-3xl overflow-hidden group shadow-[0_20px_40px_-15px_rgba(255,183,197,0.3)] bg-primary-container p-6 flex items-center justify-center text-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center text-primary mb-4 shadow-sm rotate-3 group-hover:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-3xl">cake</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-on-primary-container mb-2">Custom Orders</h3>
                <p className="text-on-primary-container/80 mb-4">Dream it, and we will bake it.</p>
                <Link
                  to="/customize"
                  className="bg-primary text-on-primary font-bold px-6 py-2 rounded-full hover:bg-on-primary-container transition-colors shadow-md"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
