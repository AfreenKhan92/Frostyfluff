"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ── Floating bakery items ─────────────────────────────── */
const FLOATERS = [
  { emoji: "🎂", size: "text-5xl", x: "8%", y: "12%", dur: 8, delay: 0 },
  { emoji: "🍩", size: "text-4xl", x: "82%", y: "8%", dur: 10, delay: 1.2 },
  { emoji: "🧁", size: "text-6xl", x: "70%", y: "68%", dur: 9, delay: 0.6 },
  { emoji: "🍪", size: "text-3xl", x: "15%", y: "78%", dur: 11, delay: 2.1 },
  { emoji: "🥐", size: "text-5xl", x: "90%", y: "45%", dur: 7, delay: 0.3 },
  { emoji: "🍰", size: "text-4xl", x: "4%", y: "48%", dur: 12, delay: 3 },
  { emoji: "🍩", size: "text-5xl", x: "50%", y: "85%", dur: 9, delay: 1 },
  { emoji: "🧁", size: "text-3xl", x: "38%", y: "6%", dur: 10, delay: 2.5 },
  { emoji: "🍰", size: "text-3xl", x: "58%", y: "18%", dur: 13, delay: 1.8 },
  { emoji: "🍪", size: "text-5xl", x: "24%", y: "32%", dur: 11, delay: 0.9 },
  { emoji: "🥯", size: "text-4xl", x: "78%", y: "25%", dur: 14, delay: 1.5 },
  { emoji: "🥐", size: "text-6xl", x: "12%", y: "35%", dur: 10, delay: 0.5 },
  { emoji: "🧁", size: "text-5xl", x: "85%", y: "80%", dur: 8, delay: 1.8 },
  { emoji: "🥧", size: "text-4xl", x: "45%", y: "40%", dur: 12, delay: 2.2 },
  { emoji: "🥞", size: "text-5xl", x: "28%", y: "65%", dur: 9, delay: 1.1 },
  { emoji: "🥯", size: "text-4xl", x: "65%", y: "45%", dur: 11, delay: 0.8 },
  { emoji: "🥨", size: "text-5xl", x: "32%", y: "85%", dur: 10, delay: 1.7 },
  { emoji: "🧇", size: "text-3xl", x: "55%", y: "60%", dur: 13, delay: 2.6 },
];

/* ── Count-up hook ─────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, trigger = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(pct * pct * target)); // ease-in-quad
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return val;
}

/* ── Stagger variants ──────────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ── Stat item ─────────────────────────────────────────── */
function Stat({ value, suffix, label, triggered }: { value: number; suffix: string; label: string; triggered: boolean }) {
  const count = useCountUp(value, 1600, triggered);
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-4xl font-serif font-bold text-bakery-brown">
        {count}{suffix}
      </span>
      <span className="text-[11px] text-bakery-brown/45 uppercase tracking-[0.2em] font-semibold mt-1">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);

  /* ── Mouse-based 3D tilt ────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  /* ── GSAP parallax on section scroll ───────────────── */
  useGSAP(() => {
    gsap.to(".hero-floater", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, { scope: sectionRef });

  /* ── Stats intersection observer ───────────────────── */
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsTriggered(true); },
      { threshold: 0.5 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── BG Layer 0: Animated gradient blobs ──────── */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#fdf0f3] via-[#fff9f5] to-[#f5ecff]">
        <div className="hero-blob-1 absolute w-[55vw] h-[55vw] max-w-[640px] max-h-[640px]
                        bg-[#f9c6d0]/55 blur-[90px] top-[-12%] left-[-8%] pointer-events-none" />
        <div className="hero-blob-2 absolute w-[45vw] h-[45vw] max-w-[550px] max-h-[550px]
                        bg-[#fde8c8]/65 blur-[80px] bottom-[-8%] right-[-6%] pointer-events-none" />
        <div className="hero-blob-3 absolute w-[38vw] h-[38vw] max-w-[480px] max-h-[480px]
                        bg-[#e8d5f8]/50 blur-[100px] top-[30%] left-[38%] pointer-events-none" />

        {/* Fine dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #5c4033 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ── BG Layer 1: Floating bakery emojis ───────── */}
      <div className="hero-floater absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {FLOATERS.map((f, i) => (
          <motion.span
            key={i}
            className={`absolute select-none drop-shadow-sm ${f.size}`}
            style={{ left: f.x, top: f.y }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.85,
              y: [0, i % 2 === 0 ? -30 : 30, 0],
              x: [0, i % 3 === 0 ? 25 : -25, 0],
              rotate: [0, i % 2 === 0 ? 15 : -15, 0],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              opacity: { duration: 2, delay: f.delay },
              y: { duration: f.dur, delay: f.delay, repeat: Infinity, ease: "easeInOut" },
              x: { duration: f.dur * 1.1, delay: f.delay, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: f.dur * 1.2, delay: f.delay, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: f.dur, delay: f.delay, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {f.emoji}
          </motion.span>
        ))}
      </div>

      {/* ── BG Layer 2: Soft readability overlay ─────── */}
      <div className="absolute inset-0 z-[2] bg-white/25 backdrop-blur-[3px]" />

      {/* ── FG Layer 3: Content with 3D tilt ─────────── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Pill badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md
                             text-bakery-brown text-[11px] font-bold uppercase tracking-[0.22em]
                             px-5 py-2 rounded-full shadow-sm mb-8 border border-bakery-rose/40">
              🍞 Baked Fresh Every Morning
            </span>
          </motion.div>

          {/* Main heading with shimmer on "Fluffs" */}
          <motion.h1
            variants={fadeUp}
            className="text-bakery-dark font-normal leading-[1.05] tracking-tight mb-12"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8.5rem)", fontFamily: "var(--font-playfair), serif" }}
          >
            <span className="text-shimmer">Frosty Fluffs</span>
          </motion.h1>

          {/* Subheading */}
              <motion.p
                variants={fadeUp}
                className="text-bakery-brown/65 text-lg md:text-xl font-sans
                       max-w-lg mx-auto leading-relaxed mb-10"
              >
                Freshly Baked{" "}
                <span className="text-bakery-gold font-semibold">Happiness</span> — artisanal
                pastries, cakes & breads crafted with love every single morning.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link href="/products">
                  <motion.span
                    whileHover={{ scale: 1.07, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-glow inline-flex items-center gap-2 bg-bakery-brown text-white
                           px-10 py-4 rounded-full font-bold tracking-wide text-sm
                           shadow-[0_12px_32px_-8px_rgba(92,64,51,0.45)]
                           hover:bg-bakery-gold transition-colors duration-300 cursor-pointer"
                  >
                    Explore Menu
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </motion.span>
                </Link>

                <Link href="/customize">
                  <motion.span
                    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 16px 40px -10px rgba(248,229,229,0.8)" }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 bg-white/75 backdrop-blur-md
                           text-bakery-brown border-2 border-bakery-rose/60 px-10 py-4 rounded-full
                           font-bold tracking-wide text-sm
                           hover:bg-bakery-pink/50 transition-all duration-300 cursor-pointer"
                  >
                    Customize Cake
                    <span className="material-symbols-outlined text-sm">cake</span>
                  </motion.span>
                </Link>
              </motion.div>

              {/* Count-up stats */}
              <motion.div
                ref={statsRef}
                variants={fadeUp}
                className="flex items-center gap-10 md:gap-16 flex-wrap justify-center"
              >
                {/* Dividers */}
                <Stat value={50} suffix="+" label="Menu Items" triggered={statsTriggered} />
                <div className="w-px h-10 bg-bakery-rose/60 hidden sm:block" />
                <Stat value={10000} suffix="+" label="Happy Customers" triggered={statsTriggered} />
                <div className="w-px h-10 bg-bakery-rose/60 hidden sm:block" />
                <Stat value={30} suffix="yr" label="Of Baking Love" triggered={statsTriggered} />
              </motion.div>
            </motion.div>
        </motion.div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-28 z-10
                      bg-gradient-to-t from-bakery-cream to-transparent pointer-events-none" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <span className="text-[10px] text-bakery-brown/40 tracking-[0.25em] uppercase">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-bakery-rose/40 flex items-start justify-center p-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-bakery-gold rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
    </section>
  );
}
