"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

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
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Image Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{
            opacity: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 6, ease: "linear" },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={HERO_SLIDES[currentIndex].image}
            alt={HERO_SLIDES[currentIndex].title}
            fill
            priority={currentIndex === 0}
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Luxury Cinematic Scrim & Color Grading */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#191715]/90 via-[#191715]/40 to-black/30 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[#3A2E25]/10 pointer-events-none z-10" />

      {/* Floating Carousel Navigation Bar (Bottom-Right) */}
      <div className="absolute bottom-8 right-6 lg:right-14 z-20 flex items-center gap-3">
        {/* Slide Counter */}
        <div className="bg-black/30 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-white text-xs font-mono tracking-wider shadow-md">
          <span className="font-semibold text-white">0{currentIndex + 1}</span>
          <span className="text-white/50 mx-1">/</span>
          <span className="text-white/60">0{HERO_SLIDES.length}</span>
        </div>

        {/* 5 Indicator Dots with active pill expansion */}
        <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md border border-white/15 px-3 py-2 rounded-full shadow-md">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isActive ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              />
            );
          })}
        </div>

        {/* Left & Right Arrows */}
        <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md border border-white/15 p-1 rounded-full shadow-md text-white">
          <button
            onClick={prevSlide}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
