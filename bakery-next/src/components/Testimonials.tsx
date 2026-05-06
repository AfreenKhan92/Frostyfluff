"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "The best strawberry cake I've ever had! It melts in your mouth and looks absolutely stunning.",
    author: "Emily R.",
    role: "Regular Customer",
    rating: 5,
    emoji: "🎂",
  },
  {
    id: 2,
    text: "Frosty Fluffs is my go-to for weekend pastries. The croissants are authentically French — so buttery!",
    author: "James T.",
    role: "Food Blogger",
    rating: 5,
    emoji: "🥐",
  },
  {
    id: 3,
    text: "They catered my wedding and people are still talking about the dessert table three years later!",
    author: "Sarah W.",
    role: "Bride, 2023",
    rating: 5,
    emoji: "🍰",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-28 px-4 bg-bakery-cream relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-bakery-pink/30 rounded-full
                      blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-bakery-lavender/40 rounded-full
                      blur-[70px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Heading */}
        <span className="inline-block text-[11px] text-bakery-gold font-bold uppercase
                         tracking-[0.25em] mb-4">
          ✦ What People Say ✦
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-bakery-brown mb-16">
          Loved by Thousands
        </h2>

        {/* Quote card */}
        <div className="relative h-64 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.97 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute glass-card rounded-[32px] p-10 shadow-[0_20px_60px_-15px_rgba(92,64,51,0.12)]
                         max-w-2xl mx-auto"
            >
              {/* Emoji + stars */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-3xl">{testimonials[current].emoji}</span>
                <div className="flex gap-1">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <span key={i} className="text-bakery-gold text-lg">★</span>
                  ))}
                </div>
              </div>

              <p className="text-xl md:text-2xl font-serif text-bakery-brown leading-relaxed mb-6 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              <div>
                <p className="font-bold text-bakery-brown tracking-wide">
                  — {testimonials[current].author}
                </p>
                <p className="text-xs text-bakery-brown/40 uppercase tracking-widest mt-1">
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              animate={{
                width: i === current ? 28 : 10,
                backgroundColor: i === current ? "#D4AF37" : "#F8E5E5",
              }}
              className="h-2.5 rounded-full cursor-pointer"
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
