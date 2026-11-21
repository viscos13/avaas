"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  tagline: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/images/hero-gen-1.jpg",
    title: "The Sanctuary Bedscape",
    tagline: "400TC Supima Sateen & 680 GSM Cloud Mink",
  },
  {
    id: "slide-2",
    image: "/images/hero-1.jpg",
    title: "Nordic Minimalist Repose",
    tagline: "Architectural Linen & Reversible Polar Sherpa",
  },
  {
    id: "slide-3",
    image: "/images/hero-2.jpg",
    title: "Sunlit Morning Warmth",
    tagline: "Long-Staple Oatmeal Combed Cotton Sets",
  },
  {
    id: "slide-4",
    image: "/images/hero-3.jpg",
    title: "Winter '26–27 Capsule",
    tagline: "High-Density Raschel Weave & Thermal Dohars",
  },
  {
    id: "slide-5",
    image: "/images/hero-4.jpg",
    title: "Panipat Master Loom Suite",
    tagline: "Heirloom Belgian Flax & Brushed Falalen",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic seamless progression every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {/* Animated Image Slides - Automatic Smooth Transition */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{
            opacity: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 5.5, ease: "linear" },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={HERO_SLIDES[currentIndex].image}
            alt={HERO_SLIDES[currentIndex].title}
            fill
            sizes="100vw"
            priority={currentIndex === 0 || currentIndex === 1}
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Luxury Cinematic Scrim & Color Grading */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#191715]/90 via-[#191715]/40 to-black/30 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[#3A2E25]/10 pointer-events-none z-10" />
    </div>
  );
}
