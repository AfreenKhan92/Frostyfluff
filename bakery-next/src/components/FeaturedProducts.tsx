"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Strawberry Bliss",
    desc: "Vanilla sponge with fresh strawberries & cream",
    price: "$45",
    tag: "Fan Favourite",
    img: "/images/cake.png",
  },
  {
    id: 2,
    name: "Chocolate Hazelnut",
    desc: "Rich dark chocolate with Piedmont praline",
    price: "$52",
    tag: "Chef's Pick",
    img: "/images/hero.png",
  },
  {
    id: 3,
    name: "Lemon Meringue",
    desc: "Zesty lemon curd with toasted Italian meringue",
    price: "$38",
    tag: "New",
    img: "/images/baker.png",
  },
];

/* ── Single tilt card ────────────────────────────────── */
function TiltCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rx = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const ry = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      className="gradient-border group cursor-pointer"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      {/* Image */}
      <div className="relative h-72 w-full overflow-hidden rounded-t-[22px]">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bakery-dark/50 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tag badge */}
        <span className="absolute top-4 left-4 bg-bakery-gold/90 text-white text-[10px]
                         font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
          {product.tag}
        </span>

        {/* Hover CTA */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0
                     group-hover:opacity-100 transition-opacity duration-400"
        >
          <Link href="/products">
            <span className="bg-white text-bakery-brown px-6 py-3 rounded-full font-bold
                             text-sm shadow-lg hover:bg-bakery-gold hover:text-white transition-colors">
              View Details →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-7 bg-white rounded-b-[22px]">
        <h3 className="text-xl font-serif text-bakery-brown mb-1">{product.name}</h3>
        <p className="text-bakery-brown/55 font-sans text-sm mb-4 leading-relaxed">{product.desc}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-bakery-gold">{product.price}</span>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-bakery-pink flex items-center justify-center
                       text-bakery-brown hover:bg-bakery-brown hover:text-white transition-colors
                       shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">shopping_bag</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Heading slide-in
    gsap.from(headingRef.current, {
      y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
    });

    // Cards stagger
    gsap.from(cardsRef.current, {
      y: 90, opacity: 0, duration: 1, stagger: 0.18, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-28 px-4 bg-bakery-cream relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-bakery-lavender/40 rounded-full
                      blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-bakery-pink/40 rounded-full
                      blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block text-[11px] text-bakery-gold font-bold uppercase
                           tracking-[0.25em] mb-4">
            ✦ From Our Ovens ✦
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-bakery-brown mb-5">
            Our Signature Delights
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-bakery-rose/70" />
            <div className="w-2 h-2 rounded-full bg-bakery-gold" />
            <div className="w-16 h-px bg-bakery-rose/70" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
            >
              <TiltCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-16">
          <Link href="/products">
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 border-2 border-bakery-brown
                         text-bakery-brown px-8 py-3 rounded-full font-bold text-sm
                         hover:bg-bakery-brown hover:text-white transition-all duration-300 cursor-pointer"
            >
              View Full Menu
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
}
