"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ICONS = ["🧁", "🎂", "🍩", "🍪", "🥐", "🍰"];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 22;
      });
    }, 120);

    const timer = setTimeout(() => setVisible(false), 2200);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center
                     bg-gradient-to-br from-[#fdf0f3] via-[#fff8f2] to-[#fce8ff]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background blobs */}
          <div className="absolute w-[50vw] h-[50vw] max-w-[500px] rounded-full
                          bg-[#f9c6d0]/50 blur-[80px] top-[-10%] left-[-5%] hero-blob-1 pointer-events-none" />
          <div className="absolute w-[40vw] h-[40vw] max-w-[400px] rounded-full
                          bg-[#fde8c8]/60 blur-[70px] bottom-[-10%] right-[-5%] hero-blob-2 pointer-events-none" />

          {/* Bouncing icons */}
          <div className="flex items-end gap-3 mb-10">
            {ICONS.map((icon, i) => (
              <motion.span
                key={i}
                className="text-4xl"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "easeInOut",
                }}
              >
                {icon}
              </motion.span>
            ))}
          </div>

          {/* Brand name */}
          <motion.h1
            className="text-shimmer text-5xl md:text-6xl font-normal mb-3 tracking-tight"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Frosty Fluffs
          </motion.h1>

          <motion.p
            className="text-bakery-brown/50 text-sm font-sans tracking-[0.25em] uppercase mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Freshly Baked Happiness
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-1.5 bg-bakery-pink rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-bakery-gold to-bakery-rose rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
