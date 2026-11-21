"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { COLLECTIONS } from "@/data/collections";
import ProductCard from "@/components/ProductCard";
import ShopTheRoom from "@/components/ShopTheRoom";
import HeroCarousel from "@/components/HeroCarousel";
import { FadeIn, StaggerContainer, staggerChildVariant } from "@/components/MotionPrimitives";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [selectedWinterTab, setSelectedWinterTab] = useState("All Winter");

  // Winter Launch Products (8 items)
  const winterProducts = PRODUCTS.filter((p) => p.isWinterLaunch);

  // Filter Winter Products by Tab
  const filteredWinterProducts = winterProducts.filter((p) => {
    if (selectedWinterTab === "All Winter") return true;
    if (selectedWinterTab === "Mink Blankets") return p.subcategory.includes("Mink");
    if (selectedWinterTab === "Polar Fleece") return p.name.includes("Fleece") || p.fabric.includes("Fleece");
    if (selectedWinterTab === "Comforter Sets") return p.subcategory === "Comforters";
    if (selectedWinterTab === "Dohars") return p.subcategory === "Dohars";
    return true;
  });

  // Core Bestsellers (4 items)
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  const winterTabs = [
    "All Winter",
    "Mink Blankets",
    "Polar Fleece",
    "Comforter Sets",
    "Dohars",
  ];

  return (
    <div className="bg-[#F8F5F0] text-[#191715] overflow-hidden">
      {/* ========================================================= */}
      {/* 1. CINEMATIC FULL-BLEED HERO WITH CAROUSEL (5 SLIDES)     */}
      {/* ========================================================= */}
      <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-end overflow-hidden">
        {/* Dynamic Multi-Image Carousel Background */}
        <HeroCarousel />

        {/* Content Container (Bottom-Left) */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14 pb-12 sm:pb-16 lg:pb-24 text-left pointer-events-none">
          <div className="max-w-2xl pointer-events-auto">
            {/* Frosted Glass Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-3.5 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Winter 2026–27 Collection</span>
            </motion.div>

            {/* Playfair Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white leading-[1.08] tracking-tight mt-4 sm:mt-6"
            >
              Thoughtfully Made for Modern Homes.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-white/90 mt-3 sm:mt-4 max-w-lg font-normal leading-relaxed"
            >
              Panipat&apos;s finest loom craft, reimagined into modern essentials for living.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.65 }}
              className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Link
                href="/shop?winter=true"
                className="group px-6 sm:px-7 py-3.5 bg-white text-[#191715] hover:bg-[#F8F5F0] text-xs uppercase tracking-[0.18em] font-semibold rounded-full transition-all duration-300 shadow-xl flex items-center justify-center gap-2 hover:scale-102 text-center"
              >
                <span>Explore Winter &apos;26–27</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/shop"
                className="px-6 sm:px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md text-xs uppercase tracking-[0.18em] font-semibold rounded-full transition-all duration-300 text-center"
              >
                Shop Bestsellers
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. INFINITE EDITORIAL MARQUEE STRIP                       */}
      {/* ========================================================= */}
      <section className="py-4 sm:py-5 border-y border-[#191715]/10 bg-[#EFEAE2]/60 overflow-hidden select-none">
        <div className="flex w-max animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-8 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#5E5850] font-medium shrink-0 px-4">
              <span>Panipat Loom Heritage</span>
              <span className="text-[#8C6B4F]">✦</span>
              <span>400TC Long-Staple Cotton</span>
              <span className="text-[#8C6B4F]">✦</span>
              <span>680 GSM Super-Soft Mink</span>
              <span className="text-[#8C6B4F]">✦</span>
              <span>Accessible Premium</span>
              <span className="text-[#8C6B4F]">✦</span>
              <span>Export-Grade Craftsmanship</span>
              <span className="text-[#8C6B4F]">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. ASYMMETRIC BENTO EDITORIAL GRID (SHOP BY CATEGORY)      */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14">
        <FadeIn className="text-left mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-2">
              Curated Architecture
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#191715] font-normal tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-[15px] text-[#5E5850] mt-1.5 sm:mt-2 font-normal max-w-lg">
              Six deliberate departments designed to build an atmosphere of quiet elegance.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#191715] hover:text-[#8C6B4F] transition"
          >
            <span>All Departments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </FadeIn>

        {/* 12-Column Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
          {/* 1. Bedroom (Hero Tile, span-7) */}
          <Link
            href="/shop?category=bedroom"
            className="md:col-span-7 h-[320px] sm:h-[400px] md:h-[460px] rounded-2xl overflow-hidden relative group shadow-sm block text-left"
          >
            <Image
              src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=85&w=1400&auto=format&fit=crop"
              alt="Bedroom category sanctuary"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/80 font-medium block mb-1">
                  24 Products
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal">
                  Bedroom
                </h3>
                <p className="text-xs text-white/80 mt-1 max-w-md hidden sm:block">
                  Bedsheets, comforters, dohars, and cloud mink blankets.
                </p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#191715] transition-colors shrink-0">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* 2. Living (span-5) */}
          <Link
            href="/shop?category=living"
            className="md:col-span-5 h-[320px] sm:h-[400px] md:h-[460px] rounded-2xl overflow-hidden relative group shadow-sm block text-left"
          >
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=1200&auto=format&fit=crop"
              alt="Living category"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/80 font-medium block mb-1">
                  18 Products
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal">
                  Living
                </h3>
                <p className="text-xs text-white/80 mt-1 hidden sm:block">
                  Hand-tufted bouclé cushions and textural throws.
                </p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#191715] transition-colors shrink-0">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* 3. Bath (span-4) */}
          <Link
            href="/shop?category=bath"
            className="md:col-span-4 h-[280px] sm:h-[340px] md:h-[380px] rounded-2xl overflow-hidden relative group shadow-sm block text-left"
          >
            <Image
              src="https://images.unsplash.com/photo-1617806118233-18e1de247200?q=85&w=1200&auto=format&fit=crop"
              alt="Bath spa towels"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/80 font-medium block mb-1">
                  16 Products
                </span>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal">
                  Bath
                </h3>
                <p className="text-xs text-white/80 mt-0.5 hidden sm:block">
                  700 GSM Zero-Twist Turkish terry sheets.
                </p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#191715] transition-colors shrink-0">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* 4. Dining (span-4) */}
          <Link
            href="/shop?category=dining"
            className="md:col-span-4 h-[280px] sm:h-[340px] md:h-[380px] rounded-2xl overflow-hidden relative group shadow-sm block text-left"
          >
            <Image
              src="https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=85&w=1200&auto=format&fit=crop"
              alt="Dining table linen"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/80 font-medium block mb-1">
                  12 Products
                </span>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal">
                  Dining
                </h3>
                <p className="text-xs text-white/80 mt-0.5 hidden sm:block">
                  Washed linen runners and mitered napkins.
                </p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#191715] transition-colors shrink-0">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* 5. Soft Furnishings (span-4) */}
          <Link
            href="/shop?category=soft-furnishings"
            className="md:col-span-4 h-[280px] sm:h-[340px] md:h-[380px] rounded-2xl overflow-hidden relative group shadow-sm block text-left"
          >
            <Image
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=85&w=1200&auto=format&fit=crop"
              alt="Soft Furnishings drapes"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/80 font-medium block mb-1">
                  10 Products
                </span>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal">
                  Soft Furnishings
                </h3>
                <p className="text-xs text-white/80 mt-0.5 hidden sm:block">
                  Light-filtering Belgian flax linen curtains.
                </p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#191715] transition-colors shrink-0">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* 6. Gifting (Full-width horizontal banner, span-12) */}
          <Link
            href="/shop?category=gifting"
            className="md:col-span-12 min-h-[240px] sm:h-[260px] rounded-2xl overflow-hidden relative group shadow-sm block text-left"
          >
            <Image
              src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=85&w=1600&auto=format&fit=crop"
              alt="Gifting hampers"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 sm:to-transparent" />
            <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-center max-w-xl">
              <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-white/80 font-medium mb-1 block">
                Trousseau &amp; Celebrations
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal">
                Curated Gifting Suites
              </h3>
              <p className="text-xs sm:text-sm text-white/85 mt-2 leading-relaxed">
                Handcrafted linen-wrapped keepsake boxes for wedding trousseaus, corporate milestones, and housewarmings.
              </p>
              <div className="pt-3 sm:pt-4 flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-white">
                <span>Explore The Gift Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. INTERACTIVE "SHOP THE ROOM" HOTSPOT SECTION            */}
      {/* ========================================================= */}
      <ShopTheRoom />

      {/* ========================================================= */}
      {/* 5. FEATURED SEASONAL COLLECTION — WINTER 2026–27          */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14">
        {/* Editorial Split Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6 text-left">
          <div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-2">
              Limited Seasonal Capsule
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#191715] font-normal tracking-tight">
              Winter 2026–27 Launch
            </h2>
            <p className="text-xs sm:text-[15px] text-[#5E5850] mt-1.5 sm:mt-2 font-normal max-w-xl">
              Engineered for northern winter chill: 680 GSM high-density mink blankets, brushed cloud fleece, and 3-layer falalen dohars.
            </p>
          </div>

          {/* Interactive Sliding Filter Tabs - Mobile edge-to-edge scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {winterTabs.map((tab) => {
              const isActive = selectedWinterTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedWinterTab(tab)}
                  className={`relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition shrink-0 cursor-pointer touch-manipulation ${
                    isActive ? "text-[#191715]" : "text-[#5E5850] hover:text-[#191715]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeWinterTab"
                      className="absolute inset-0 bg-[#EFEAE2] rounded-full -z-10 shadow-xs"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span>{tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Column Product Grid (2 cols on mobile) */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 gap-y-8 sm:gap-y-10">
          {filteredWinterProducts.map((product) => (
            <motion.div key={product.id} variants={staggerChildVariant}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </StaggerContainer>
      </section>

      {/* ========================================================= */}
      {/* 6. BESTSELLERS GRID                                       */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 lg:py-28 bg-[#EFEAE2]/40 border-y border-[#191715]/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4 text-left">
            <div>
              <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-2">
                Everyday Favorites
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#191715] font-normal tracking-tight">
                Living Room &amp; Bedding Bestsellers
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#191715]/20 hover:border-[#191715] text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-[#191715] transition self-start sm:self-auto"
            >
              <span>View All Bestsellers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 gap-y-8 sm:gap-y-10">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. THREE COLLECTIONS — INTERACTIVE EXPANDING PANELS       */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14">
        <div className="text-left mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-2">
            The Three Tiers
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#191715] font-normal tracking-tight">
            Our Woven Collections
          </h2>
          <p className="text-xs sm:text-[15px] text-[#5E5850] mt-1.5 sm:mt-2 font-normal max-w-lg">
            From resilient daily cottons to limited small-batch reserve jacquards.
          </p>
        </div>

        {/* 3 Interactive Expanding Portrait Panels */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 min-h-[460px] lg:min-h-[560px]">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[400px] lg:h-auto lg:flex-1 lg:hover:flex-[1.55] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group shadow-md"
            >
              <Image
                src={col.image}
                alt={col.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-end text-left text-white">
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/80 font-medium mb-1 block">
                  {col.priceRange}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">
                  {col.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed max-w-md">
                  {col.philosophy}
                </p>

                <div className="pt-4 sm:pt-5">
                  <Link
                    href={`/shop?collection=${col.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#191715] backdrop-blur-md text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-300"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. BRAND STORY — PANIPAT HERITAGE & KT INTERNATIONAL      */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14">
        <div className="bg-[#EFEAE2] rounded-2xl sm:rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
          {/* Left Photo */}
          <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[440px] lg:min-h-full">
            <Image
              src="/images/panipat-craft.jpg"
              alt="Panipat weaving loom mastery by KT International"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#191715] text-[#F8F5F0] p-4 sm:p-6 rounded-xl sm:rounded-2xl max-w-xs text-left shadow-xl hidden sm:block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C6B4F] font-semibold block mb-1">
                Parent Heritage
              </span>
              <p className="font-serif text-base sm:text-lg font-normal leading-snug">
                KT International · Three Decades of Loom Mastery
              </p>
            </div>
          </div>

          {/* Right Copy */}
          <div className="lg:col-span-6 p-6 sm:p-12 lg:p-20 flex flex-col justify-center text-left">
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-2 sm:mb-3">
              Panipat Weaving Heritage
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#191715] font-normal leading-[1.12]">
              Rooted in Panipat. Designed for Modern Living.
            </h2>
            <p className="text-xs sm:text-[15px] text-[#5E5850] mt-3 sm:mt-5 leading-relaxed font-normal">
              For centuries, the historic hub of <strong>Panipat, Haryana</strong> has stood as the weaving capital of India. Under parent company <strong>KT International</strong>, our automated air-jet looms and circular raschel mills have produced millions of meters of premium textiles for world-class hospitality chains across 20+ countries.
            </p>
            <p className="text-xs sm:text-[15px] text-[#5E5850] mt-2 sm:mt-3 leading-relaxed font-normal">
              With AAVAAS, we deliver this honest mill mastery directly into your bedroom — omitting multi-tier markups to make genuine luxury everyday accessible.
            </p>

            {/* 3 Typographic Pillars (3 cols across all devices) */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#191715]/10 grid grid-cols-3 gap-3 sm:gap-6 text-center sm:text-left">
              <div>
                <span className="font-serif text-lg sm:text-2xl text-[#191715] block font-normal">50K+</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-[#5E5850] block mt-0.5">Loom Capacity</span>
              </div>
              <div>
                <span className="font-serif text-lg sm:text-2xl text-[#191715] block font-normal">20+</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-[#5E5850] block mt-0.5">Export Nations</span>
              </div>
              <div>
                <span className="font-serif text-lg sm:text-2xl text-[#191715] block font-normal">100%</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-[#5E5850] block mt-0.5">OEKO-TEX</span>
              </div>
            </div>

            <div className="pt-6 sm:pt-8">
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#191715] text-[#F8F5F0] hover:bg-[#8C6B4F] text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold transition"
              >
                <span>Read the Full Journal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. WHY AAVAAS (MINIMAL 4-COLUMN ARCHITECTURAL GRID)       */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14">
        <div className="text-left mb-8 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-2">
            The Standard
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#191715] font-normal tracking-tight">
            Why Discerning Homes Choose AAVAAS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-2xl bg-[#EFEAE2]/60 border border-[#191715]/8 p-6 sm:p-8 text-left space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center text-[#191715] shadow-xs">
              <Award className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl text-[#191715] font-normal">Direct Mill Lineage</h3>
            <p className="text-xs text-[#5E5850] leading-relaxed">
              Weaving mastery backed by KT International&apos;s Panipat mills, bypassing middleman markups.
            </p>
          </div>

          <div className="rounded-2xl bg-[#EFEAE2]/60 border border-[#191715]/8 p-6 sm:p-8 text-left space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center text-[#191715] shadow-xs">
              <Layers className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl text-[#191715] font-normal">108&quot; × 108&quot; Indian Tuck</h3>
            <p className="text-xs text-[#5E5850] leading-relaxed">
              Generously sized bedsheets tailored specifically to grip heavy 14-inch Indian mattresses firmly.
            </p>
          </div>

          <div className="rounded-2xl bg-[#EFEAE2]/60 border border-[#191715]/8 p-6 sm:p-8 text-left space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center text-[#191715] shadow-xs">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl text-[#191715] font-normal">OEKO-TEX Certified</h3>
            <p className="text-xs text-[#5E5850] leading-relaxed">
              AZO-free pigments and reactive dyes, gentle on sensitive skin and safe for family nurseries.
            </p>
          </div>

          <div className="rounded-2xl bg-[#EFEAE2]/60 border border-[#191715]/8 p-6 sm:p-8 text-left space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center text-[#191715] shadow-xs">
              <Clock className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl text-[#191715] font-normal">Pan-India Express</h3>
            <p className="text-xs text-[#5E5850] leading-relaxed">
              Complimentary dispatch on orders above ₹2,999 with verified courier tracking to 19,000+ pincodes.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. BULK & TRADE HOSPITALITY BANNER                       */}
      {/* ========================================================= */}
      <section className="pb-14 sm:pb-20 lg:pb-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14">
        <div className="rounded-2xl sm:rounded-3xl bg-[#191715] text-[#F8F5F0] p-6 sm:p-12 lg:p-20 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 text-left shadow-xl">
          <div className="max-w-xl space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block">
              KT International Institutional Division
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
              Direct Mill Procurement for Hospitality &amp; Design
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal pt-1">
              Equipping boutique hotels, resorts, architects, and corporate gifting with custom thread counts, bespoke dimensions, and GST input tax credit.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
            <Link
              href="/bulk-enquiries"
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-[#191715] hover:bg-[#F8F5F0] text-xs uppercase tracking-[0.18em] font-semibold rounded-full transition text-center shadow-lg"
            >
              Request Commercial RFQ
            </Link>
            <a
              href="https://wa.me/919812000000?text=Hello%20AAVAAS%20B2B%20Desk,%20I%20have%20an%20institutional%20enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs uppercase tracking-[0.18em] font-semibold rounded-full transition text-center"
            >
              WhatsApp B2B Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
