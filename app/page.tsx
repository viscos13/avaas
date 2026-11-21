"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Check,
  Compass,
  Layers,
  HeartHandshake,
  Feather,
  SlidersHorizontal,
} from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { COLLECTIONS } from "@/data/collections";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const [winterFilter, setWinterFilter] = useState<string>("all");

  // Winter '26-27 launch items
  const winterLaunchProducts = PRODUCTS.filter((p) => p.isWinterLaunch);

  // Filtered winter items for showcase
  const displayedWinterItems =
    winterFilter === "all"
      ? winterLaunchProducts
      : winterLaunchProducts.filter((p) => {
          if (winterFilter === "mink") return p.subcategory.includes("Blankets & Mink");
          if (winterFilter === "comforter") return p.subcategory.includes("Comforters");
          if (winterFilter === "dohar") return p.subcategory.includes("Dohars");
          return true;
        });

  // Bestsellers: Core bedsheets + key winter pieces
  const bestsellerProducts = PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. FULL-BLEED LIFESTYLE HERO BANNER */}
      <section className="relative min-h-[90vh] md:min-h-[94vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with warm grading */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=85&w=2000&auto=format&fit=crop"
            alt="AAVAAS Master Bedroom Interior — Panipat Crafted Linen"
            fill
            priority
            className="object-cover object-center brightness-[0.88] contrast-[1.03]"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/75 via-transparent to-[#1C1917]/30" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-[#FAF8F5] pt-12">
          {/* Micro pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/15 backdrop-blur-md border border-[#FAF8F5]/30 mb-6 text-xs uppercase tracking-[0.25em] font-medium text-stone-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Winter 2026–27 Launch Now Live</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.08] text-white">
            Thoughtfully Made for Modern Homes.
          </h1>

          {/* Subheadline */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-stone-200 font-light max-w-2xl mx-auto tracking-wide italic font-serif">
            Crafted in Panipat. Designed for contemporary living.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#winter-collection"
              className="w-full sm:w-auto px-8 py-4 bg-[#FAF8F5] hover:bg-white text-[#1C1917] text-xs uppercase tracking-[0.2em] font-medium rounded-xs transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group"
            >
              <span>Explore Winter 2026–27</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#bestsellers"
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-[#FAF8F5] border border-white/60 hover:border-white text-xs uppercase tracking-[0.2em] font-medium rounded-xs transition-all backdrop-blur-xs flex items-center justify-center"
            >
              Shop Bestsellers
            </Link>
          </div>

          {/* Micro trust cues */}
          <div className="mt-14 pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-[11px] uppercase tracking-[0.15em] text-stone-300">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Authentic Panipat Mills
            </span>
            <span>•</span>
            <span>Extra Long-Staple Cotton</span>
            <span>•</span>
            <span>Free Pan-India Delivery Above ₹1,999</span>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY (Scalable Architecture - 6 Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E5DFD5]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B95D41] font-semibold">
              Curated Spaces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] mt-1 font-normal">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-md mt-2 md:mt-0 leading-relaxed">
            From Panipat&apos;s renowned spinning and raschel looms to your sanctuary. Six dedicated wings engineered for modern home aesthetics.
          </p>
        </div>

        {/* 6 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative block bg-[#EDE8E0]/40 border border-[#E5DFD5] hover:border-stone-800 transition-all duration-300 overflow-hidden rounded-xs"
            >
              {/* Category Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-200">
                <Image
                  src={category.image}
                  alt={`${category.name} collection`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.96]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 text-stone-800">
                  {category.itemCount} Designs
                </span>
              </div>

              {/* Category Details */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-stone-900 group-hover:underline">
                    {category.name}
                  </h3>
                  <div className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center group-hover:bg-[#1C1917] group-hover:text-white transition">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-xs text-stone-600 mt-1 line-clamp-1 italic font-serif">
                  {category.tagline}
                </p>

                {/* Subcategory Pills */}
                <div className="mt-4 pt-3 border-t border-stone-200 flex flex-wrap gap-1.5">
                  {category.subcategories.slice(0, 4).map((sub) => (
                    <span
                      key={sub}
                      className="text-[10px] bg-white border border-[#E5DFD5] text-stone-700 px-2 py-0.5 rounded-xs"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 4 && (
                    <span className="text-[10px] text-stone-500 self-center pl-1">
                      +{category.subcategories.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED SEASONAL COLLECTION — WINTER 2026–27 */}
      <section id="winter-collection" className="bg-[#EDE8E0]/60 py-16 md:py-24 border-y border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Split Editorial Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-[#B95D41] font-semibold bg-[#B95D41]/10 px-3 py-1 rounded-xs">
                Seasonal Debut • Launch Lineup
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] leading-tight">
                Winter 2026–27: The Thermal Capsule
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Panipat is globally celebrated as India&apos;s blanket capital. For Winter &apos;26–27, AAVAAS unites traditional raschel warp-knitting with modern featherweight micro-mink, reversible sherpa fleece, and 3-layer falalen dohars.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setWinterFilter("all")}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-xs border transition ${
                    winterFilter === "all"
                      ? "bg-[#1C1917] text-white border-[#1C1917]"
                      : "bg-white text-stone-700 border-stone-300 hover:border-stone-500"
                  }`}
                >
                  All Launch ({winterLaunchProducts.length})
                </button>
                <button
                  onClick={() => setWinterFilter("mink")}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-xs border transition ${
                    winterFilter === "mink"
                      ? "bg-[#1C1917] text-white border-[#1C1917]"
                      : "bg-white text-stone-700 border-stone-300 hover:border-stone-500"
                  }`}
                >
                  Mink &amp; Polar Fleece
                </button>
                <button
                  onClick={() => setWinterFilter("comforter")}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-xs border transition ${
                    winterFilter === "comforter"
                      ? "bg-[#1C1917] text-white border-[#1C1917]"
                      : "bg-white text-stone-700 border-stone-300 hover:border-stone-500"
                  }`}
                >
                  Comforters &amp; Duvets
                </button>
                <button
                  onClick={() => setWinterFilter("dohar")}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-xs border transition ${
                    winterFilter === "dohar"
                      ? "bg-[#1C1917] text-white border-[#1C1917]"
                      : "bg-white text-stone-700 border-stone-300 hover:border-stone-500"
                  }`}
                >
                  Layered Dohars
                </button>
              </div>
            </div>

            {/* Editorial Showcase Hero Card */}
            <div className="lg:col-span-7">
              <div className="relative aspect-16/9 sm:aspect-2/1 w-full bg-stone-200 overflow-hidden rounded-xs border border-stone-300 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1400&auto=format&fit=crop"
                  alt="Winter 2026-27 Mink Blankets Collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/30 to-transparent flex items-center p-6 sm:p-10">
                  <div className="max-w-xs text-white">
                    <span className="text-[10px] uppercase tracking-widest text-amber-300 font-mono">
                      680 GSM Cloud Pile
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mt-1">
                      Nordic Ultra-Plush Mink
                    </h3>
                    <p className="text-xs text-stone-200 mt-2">
                      Zero shedding. Featherweight heavy loft. Starting at ₹2,499.
                    </p>
                    <Link
                      href="/products/nordic-luxury-ultra-plush-mink-blanket"
                      className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-white underline underline-offset-4 hover:text-amber-300 transition"
                    >
                      <span>Inspect Piece</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Winter Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedWinterItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. BESTSELLERS GRID */}
      <section id="bestsellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E5DFD5]">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#B95D41] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Timeless Staples</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] mt-1 font-normal">
              AAVAAS Bestsellers
            </h2>
          </div>
          <div className="mt-3 sm:mt-0 flex items-center gap-4">
            <span className="text-xs text-stone-500">
              Core Bedsheets (₹1,500–₹2,500) &amp; Winter Releases
            </span>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest font-semibold text-stone-900 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4-column desktop / 2-column mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. THE THREE COLLECTIONS (Essential, Signature, Reserve) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-semibold">
            Architectural Grading
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] mt-1 font-normal">
            The Three Collections
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
            Every home maintains its own cadence. We structure our craftsmanship across three deliberate tiers to offer accessible luxury for every room.
          </p>
        </div>

        {/* 3-Column Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              className="group border border-[#E5DFD5] hover:border-stone-900 bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 rounded-xs shadow-xs"
            >
              <div>
                <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden mb-6 rounded-xs">
                  <Image
                    src={col.image}
                    alt={`${col.name} Collection`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-stone-900">
                    {col.priceRange}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B95D41] font-semibold">
                    Tier {col.id === "essential" ? "01" : col.id === "signature" ? "02" : "03"}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-stone-900">
                    {col.name}
                  </h3>
                  <p className="text-xs italic font-serif text-stone-700 pt-1">
                    &ldquo;{col.tagline}&rdquo;
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed pt-2">
                    {col.philosophy}
                  </p>
                </div>

                {/* Materials preview */}
                <div className="mt-6 pt-4 border-t border-stone-200">
                  <p className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold mb-2">
                    Key Fabrics &amp; Weaves:
                  </p>
                  <ul className="space-y-1 text-xs text-stone-700">
                    {col.materials.map((m) => (
                      <li key={m} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-stone-400"></span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100">
                <Link
                  href={`/shop?collection=${col.id}`}
                  className="w-full py-2.5 px-4 bg-[#EDE8E0] hover:bg-[#1C1917] hover:text-white text-stone-900 text-xs uppercase tracking-widest font-medium transition rounded-xs flex items-center justify-center gap-2"
                >
                  <span>Explore {col.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LIFESTYLE & BRAND STORY (Asymmetric Editorial Layout) */}
      <section className="bg-[#1C1917] text-[#FAF8F5] py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Visual with Asymmetric Layout */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/5 w-full max-w-md mx-auto bg-stone-800 rounded-xs overflow-hidden border border-stone-700 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                  alt="AAVAAS Loom Finishing and Weaving at Panipat"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Overlapping small accent card */}
              <div className="absolute -bottom-6 -right-2 sm:right-6 bg-[#FAF8F5] text-stone-900 p-5 max-w-[240px] rounded-xs shadow-2xl border border-stone-300 hidden sm:block">
                <p className="text-[10px] uppercase tracking-widest text-[#B95D41] font-semibold">
                  Heritage Mill
                </p>
                <p className="font-serif text-lg leading-tight mt-1">
                  35+ Years of Panipat Textile Legacy
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  Under parent entity KT International.
                </p>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.28em] text-amber-300 font-semibold">
                  The Panipat Lineage
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white mt-2 leading-[1.15]">
                  Rooted in Panipat. Reimagined for the World.
                </h2>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed">
                For centuries, Panipat has lived and breathed textiles. Its looms have clothed royal courts, supplied global luxury hotel chains, and defined the warmth of North Indian winters. Yet, for decades, true factory-direct mastery remained obscured behind middlemen and overseas private labels.
              </p>

              <p className="text-sm text-stone-300 leading-relaxed">
                With <strong>AAVAAS</strong>, parent company <strong>KT International</strong> brings that formidable manufacturing power directly to modern Indian residences. No generic reseller polyester; no markups for imported brand tags. Just honest, long-staple cottons, cloud-soft micro-mink blankets, and serene living textiles tailored for how modern families live, sleep, and gather.
              </p>

              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-stone-800">
                <div>
                  <span className="font-serif text-2xl text-amber-300 block">100%</span>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider">
                    In-House Weaving &amp; Finishing
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl text-amber-300 block">35+ Yrs</span>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider">
                    KT International Expertise
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl text-amber-300 block">20+ Countries</span>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider">
                    Export Grade Quality
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FAF8F5] underline underline-offset-8 hover:text-amber-300 transition"
                >
                  <span>Read the Full AAVAAS Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY AAVAAS (4 Minimal Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold">
            Our Foundation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] mt-1 font-normal">
            Why AAVAAS
          </h2>
          <p className="text-xs text-stone-600 mt-2">
            The principles that anchor every thread spun and hem stitched.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Pillar 1 */}
          <div className="p-6 bg-white border border-[#E5DFD5] rounded-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-stone-800">
              <Compass className="w-5 h-5 stroke-1" />
            </div>
            <h3 className="font-serif text-xl text-stone-900">Thoughtful Design</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every dimension is tailored for contemporary living — from 108&quot; × 108&quot; extra tuck-in bedsheets that never pull loose to reversible dual-mood colorways.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 bg-white border border-[#E5DFD5] rounded-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-stone-800">
              <Layers className="w-5 h-5 stroke-1" />
            </div>
            <h3 className="font-serif text-xl text-stone-900">Panipat Craftsmanship</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Backed by KT International&apos;s heritage machinery and multigenerational master weavers. Direct mill control from raw yarn spinning to final hand-hemstitch inspection.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 bg-white border border-[#E5DFD5] rounded-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-stone-800">
              <HeartHandshake className="w-5 h-5 stroke-1" />
            </div>
            <h3 className="font-serif text-xl text-stone-900">Accessible Premium</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              By bypassing department store markups and distributor tiers, we deliver ₹7,000-grade luxury fabrics at honest, uninflated prices.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 bg-white border border-[#E5DFD5] rounded-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-stone-800">
              <Feather className="w-5 h-5 stroke-1" />
            </div>
            <h3 className="font-serif text-xl text-stone-900">Elevated Comfort</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Silken 400TC Supima sateen, breathable gossamer malmal falalen, and plush zero-twist Turkish terry. Tactile sensations that make coming home a relief.
            </p>
          </div>
        </div>
      </section>

      {/* 8. GIFTING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#EDE8E0] border border-[#E5DFD5] rounded-xs overflow-hidden p-8 sm:p-12 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B95D41] font-semibold">
                The Art of Thoughtful Giving
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] leading-tight">
                Heirloom Gifting for Weddings, Festivals &amp; New Homes
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-xl">
                Celebrate unions, housewarmings, and festive milestones with hand-curated trousseau boxes, twin dohar suites, and custom-embossed keepsake linen trunks.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/shop?category=gifting"
                  className="px-6 py-3.5 bg-[#1C1917] hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-medium rounded-xs transition"
                >
                  Explore Gift Suites
                </Link>
                <Link
                  href="/bulk-enquiries"
                  className="px-6 py-3.5 bg-transparent border border-stone-700 hover:border-stone-900 text-stone-900 text-xs uppercase tracking-widest font-medium rounded-xs transition"
                >
                  Corporate &amp; Bulk Gifting Enquiry
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 w-full bg-stone-300 rounded-xs overflow-hidden shadow-lg border border-stone-300">
                <Image
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop"
                  alt="AAVAAS Luxury Gift Suite Trunk"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#FAF8F5]/95 backdrop-blur-xs px-3 py-1.5 rounded-xs text-xs text-stone-900 font-serif">
                  Bespoke Embossed Wooden Linen Trunks
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
