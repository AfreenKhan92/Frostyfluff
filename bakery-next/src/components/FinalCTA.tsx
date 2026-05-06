"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative py-36 px-4 overflow-hidden flex items-center justify-center text-center"
      style={{
        background: "linear-gradient(135deg, #2C1E16 0%, #5C4033 50%, #2C1E16 100%)",
      }}
    >
      {/* Animated floating bakery emojis */}
      {["🎂", "🧁", "🍩", "🍪", "🥐", "🥯", "🥧", "🥞", "🥨", "🧇"].map((e, i) => (
        <motion.span
          key={i}
          className="absolute text-4xl select-none pointer-events-none"
          style={{
            left: `${10 + i * 18}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.4, 0.15],
            rotate: [0, i % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
        >
          {e}
        </motion.span>
      ))}

      {/* Soft glow blob */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] max-w-[700px] rounded-full
                   bg-bakery-gold/10 blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-block text-[11px] text-bakery-gold font-bold uppercase
                         tracking-[0.25em] mb-6 border border-bakery-gold/30 px-4 py-1.5 rounded-full">
          ✦ Ready to Order? ✦
        </span>

        <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-[1.1]">
          Order your favourite{" "}
          <span className="text-shimmer">treats</span> today
        </h2>

        <p className="text-xl text-white/55 font-sans max-w-xl mx-auto mb-14 leading-relaxed">
          Life is short. Make it sweet. Experience the taste of authentic artisanal baking
          delivered fresh to your door.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
          {/* Primary CTA — pulsing glow */}
          <Link href="/products">
            <motion.span
              whileHover={{ scale: 1.07, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="btn-glow inline-flex items-center gap-2 bg-bakery-gold text-white
                         px-12 py-5 rounded-full font-bold text-base uppercase tracking-wider
                         shadow-[0_0_40px_rgba(212,175,55,0.35)]
                         hover:shadow-[0_0_60px_rgba(212,175,55,0.55)]
                         transition-shadow duration-300 cursor-pointer"
            >
              Explore Menu
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </motion.span>
          </Link>

          <Link href="/customize">
            <motion.span
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 border-2 border-white/25 text-white
                         px-10 py-4 rounded-full font-bold text-sm
                         hover:bg-white/10 transition-colors duration-300 cursor-pointer backdrop-blur-sm"
            >
              Design a Cake
              <span className="material-symbols-outlined text-sm">cake</span>
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
