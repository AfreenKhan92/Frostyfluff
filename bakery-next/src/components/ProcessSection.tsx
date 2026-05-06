"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { Wheat, UtensilsCrossed, CakeSlice, Truck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Wheat,
    title: "Premium Ingredients",
    desc: "Locally sourced, organic produce selected fresh every morning.",
    color: "bg-amber-50 text-amber-600",
    ring: "ring-amber-200",
    num: "01",
  },
  {
    icon: UtensilsCrossed,
    title: "Baked Fresh",
    desc: "Small-batch artisan baking starts at 4 AM — every single day.",
    color: "bg-rose-50 text-rose-500",
    ring: "ring-rose-200",
    num: "02",
  },
  {
    icon: CakeSlice,
    title: "Artisan Decoration",
    desc: "Each piece is hand-finished with precise, loving attention to detail.",
    color: "bg-purple-50 text-purple-500",
    ring: "ring-purple-200",
    num: "03",
  },
  {
    icon: Truck,
    title: "Swift Delivery",
    desc: "From our warm ovens straight to your door — still fresh.",
    color: "bg-emerald-50 text-emerald-500",
    ring: "ring-emerald-200",
    num: "04",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef   = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate the connector line
    gsap.from(lineRef.current, {
      scaleX: 0,
      transformOrigin: "left",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
    });

    // Steps stagger
    gsap.from(stepsRef.current, {
      y: 60, opacity: 0, duration: 0.85, stagger: 0.18, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-28 px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fdf0f3 0%, #fff9f5 50%, #f5ecff 100%)",
      }}
    >
      {/* BG texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #5c4033 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="inline-block text-[11px] text-bakery-gold font-bold uppercase
                           tracking-[0.25em] mb-4">
            ✦ Our Process ✦
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-bakery-brown">
            How We Bake Magic
          </h2>
        </div>

        {/* Connector line (desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-[48%] w-[70%]">
          <div ref={lineRef} className="w-full h-0.5 bg-gradient-to-r from-bakery-rose via-bakery-gold to-bakery-rose" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => { if (el) stepsRef.current[index] = el; }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="glass-card rounded-[28px] p-8 flex flex-col items-center text-center
                           shadow-[0_8px_30px_-8px_rgba(92,64,51,0.12)] hover:shadow-xl
                           transition-shadow duration-400 relative"
              >
                {/* Step number */}
                <span className="absolute top-4 right-5 text-[11px] font-bold tracking-widest
                                 text-bakery-brown/20">
                  {step.num}
                </span>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-20 h-20 ${step.color} ring-4 ${step.ring} rounded-full
                              flex items-center justify-center shadow-md mb-6`}
                >
                  <step.icon size={36} />
                </motion.div>

                <h3 className="text-lg font-serif font-bold text-bakery-brown mb-2">{step.title}</h3>
                <p className="text-bakery-brown/60 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
