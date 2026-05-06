"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 62%",
      },
    });
    tl.from(imgRef.current, {
      x: -80, opacity: 0, duration: 1.1, ease: "power3.out",
    }).from(textRef.current, {
      x: 80, opacity: 0, duration: 1.1, ease: "power3.out",
    }, "-=0.85");

    // Scroll-linked zoom on image
    gsap.to(imgRef.current, {
      scale: 1.06, ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-28 px-4 bg-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-16 right-10 text-6xl float-slow opacity-40 pointer-events-none select-none">🥐</div>
      <div className="absolute bottom-16 left-6 text-5xl float-medium opacity-30 pointer-events-none select-none">🍰</div>
      <div className="absolute top-1/3 left-12 text-5xl float-fast opacity-25 pointer-events-none select-none">🧁</div>
      <div className="absolute bottom-1/4 right-8 text-4xl float-slow opacity-40 pointer-events-none select-none">🥯</div>
      <div className="absolute top-1/2 left-1/2 text-4xl float-medium opacity-20 pointer-events-none select-none">🥞</div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        {/* Image side */}
        <div ref={imgRef} className="w-full md:w-1/2">
          <div className="relative h-[580px] rounded-[48px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(92,64,51,0.2)]">
            <Image
              src="/images/baker.png"
              alt="Baker kneading dough"
              fill
              className="object-cover"
            />
            {/* Floating label */}
            <motion.div
              className="absolute bottom-8 left-8 glass-card rounded-2xl px-5 py-4 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-xs text-bakery-brown/60 uppercase tracking-widest font-bold mb-1">Est.</p>
              <p className="text-2xl font-serif font-bold text-bakery-brown">Since 1995</p>
            </motion.div>
          </div>
        </div>

        {/* Text side */}
        <div ref={textRef} className="w-full md:w-1/2 space-y-8">
          <span className="inline-block text-[11px] text-bakery-gold font-bold uppercase
                           tracking-[0.25em] border border-bakery-gold/40 px-4 py-1.5 rounded-full">
            Our Story
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-bakery-brown leading-tight">
            Baked with Love,<br />
            <span className="text-shimmer">Served with Joy</span>
          </h2>
          <p className="text-lg text-bakery-brown/65 font-sans leading-relaxed">
            Since 1995, Frosty Fluffs has been the warm heart of the neighbourhood. We believe in
            the magic of waking up early, kneading dough by hand, and using only the finest
            organic ingredients.
          </p>
          <p className="text-lg text-bakery-brown/65 font-sans leading-relaxed">
            Every pastry is a piece of art, made to bring a smile to your face and warmth
            to your soul — one bite at a time.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 pt-2">
            {["100% Organic", "Hand-Kneaded Daily", "No Preservatives", "Family Recipe"].map((t) => (
              <span key={t} className="bg-bakery-cream text-bakery-brown text-xs font-bold
                                       uppercase tracking-wider px-4 py-2 rounded-full border border-bakery-pink">
                {t}
              </span>
            ))}
          </div>

          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-bakery-brown font-bold border-b-2
                       border-bakery-gold pb-1 hover:text-bakery-gold transition-colors group"
          >
            Read Our Full Story
            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
