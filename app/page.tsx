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
  ChevronRight,
  Award,
} from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { COLLECTIONS } from "@/data/collections";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const [winterFilter, setWinterFilter] = useState<string>("all");

  // Winter '26-27 launch items
  const winterLaunchProducts = PRODUCTS.filter((p) => p.isWinterLaunch);

  const displayedWinterItems =
    winterFilter === "all"
      ? winterLaunchProducts
      : winterLaunchProducts.filter((p) => {
          if (winterFilter === "mink") return p.subcategory.includes("Blankets & Mink");
          if (winterFilter === "comforter") return p.subcategory.includes("Comforters");
          if (winterFilter === "dohar") return p.subcategory.includes("Dohars");
          return true;
        });

  // Bestsellers
  const bestsellerProducts = PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);

  return (
    <div className="space-y-36 md:space-y-48 lg:space-y-56 pb-40">
      {/* 1. FULL-BLEED LIFESTYLE HERO BANNER WITH OPULENT SPACING */}
      <section className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Rich Architectural Bedroom Visual */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=90&w=2600&auto=format&fit=crop"
            alt="AAVAAS Grand Royal Master Suite — Panipat Weaves"
            fill
            priority
            className="object-cover object-center brightness-[0.82] contrast-[1.08] scale-100 transition-transform duration-1000 ease-out"
          />
          {/* Subtle warm champagne & espresso vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/85 via-[#141210]/35 to-[#141210]/40" />
        </div>

        {/* Hero Content with Expansive Breathing Room */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 text-center text-[#FAF6F0] py-24 sm:py-32">
          {/* Subtle Royal Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#141210]/60 backdrop-blur-md border border-[#D4AF37]/40 mb-8 text-[11px] uppercase tracking-[0.3em] font-semibold text-[#EFE8DD] shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Winter 2026–27 Collection Live</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[1.04] text-white">
            Thoughtfully Made for Modern Homes.
          </h1>

          {/* Subheadline with generous spacing */}
          <p className="mt-8 text-lg sm:text-xl md:text-2xl text-stone-200 font-light max-w-2xl mx-auto tracking-wide italic font-serif leading-relaxed">
            Crafted in Panipat. Designed for contemporary living.
          </p>

          {/* Luxury CTAs */}
          <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
            <Link
              href="#winter-collection"
              className="w-full sm:w-auto px-10 py-4.5 bg-[#FAF6F0] hover:bg-white text-[#141210] text-xs uppercase tracking-[0.25em] font-semibold rounded-xs transition-all duration-300 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 flex items-center justify-center gap-3 group border border-white"
            >
              <span>Explore Winter 2026–27</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>

            <Link
              href="#bestsellers"
              className="w-full sm:w-auto px-10 py-4.5 bg-[#141210]/50 hover:bg-[#141210]/85 text-[#FAF6F0] border border-white/50 hover:border-white text-xs uppercase tracking-[0.25em] font-semibold rounded-xs transition-all duration-300 backdrop-blur-md flex items-center justify-center"
            >
              Shop Bestsellers
            </Link>
          </div>

          {/* Micro Trust Indicators with Generous Breathing Room */}
          <div className="mt-20 pt-10 border-t border-white/20 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs uppercase tracking-[0.22em] text-stone-300">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              KT International Panipat Looms
            </span>
            <span className="hidden sm:inline text-stone-500">•</span>
            <span>100% Extra Long-Staple Cotton</span>
            <span className="hidden sm:inline text-stone-500">•</span>
            <span>Free Pan-India Delivery &gt; ₹1,999</span>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY (Scalable Architecture - 6 Grand Visual Categories) */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E2D7C7]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold block mb-2">
              Architectural Sanctuaries
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#141210] font-light leading-tight">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-lg mt-4 md:mt-0 leading-relaxed font-serif italic text-base">
            From Panipat&apos;s celebrated warp-knit looms to your personal residence. Six dedicated departments engineered for modern luxury living.
          </p>
        </div>

        {/* 6 Category Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative block bg-[#FDFBF8] border border-[#E2D7C7] hover:border-stone-900 transition-all duration-500 overflow-hidden rounded-xs shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(20,18,16,0.12)]"
            >
              {/* Category Photography */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EFE8DD]">
                <Image
                  src={category.image}
                  alt={`${category.name} collection`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-1000 ease-out brightness-[0.94]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/75 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <span className="absolute top-4 right-4 bg-[#141210]/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 text-white border border-white/20">
                  {category.itemCount} Designs
                </span>

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-0.5">
                    Department
                  </span>
                  <h3 className="font-serif text-3xl text-white font-light">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Category Details with Generous Spacing */}
              <div className="p-7 space-y-4">
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>

                {/* Subcategory Pills */}
                <div className="pt-4 border-t border-[#EAE3D7] flex flex-wrap gap-2">
                  {category.subcategories.slice(0, 4).map((sub) => (
                    <span
                      key={sub}
                      className="text-[11px] bg-[#EFE8DD]/70 border border-[#E2D7C7] text-stone-800 px-3 py-1 rounded-xs"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 4 && (
                    <span className="text-xs text-stone-500 self-center pl-1 font-serif italic">
                      +{category.subcategories.length - 4} more
                    </span>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 group-hover:text-[#B95D41] transition">
                  <span>Explore Department</span>
                  <div className="w-8 h-8 rounded-full border border-stone-300 group-hover:border-stone-900 group-hover:bg-[#141210] group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED SEASONAL COLLECTION — WINTER 2026–27 (Opulent Editorial Split Lookbook) */}
      <section id="winter-collection" className="bg-[#EFE8DD] py-24 sm:py-32 border-y border-[#E2D7C7]">
        <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Split Banner with Generous Negative Space */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold bg-[#B95D41]/10 px-3.5 py-1.5 rounded-xs border border-[#B95D41]/20">
                Seasonal Debut • Launch Lineup
              </span>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#141210] font-light leading-[1.12]">
                Winter 2026–27: The Thermal Capsule
              </h2>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif italic">
                Panipat is globally celebrated as India&apos;s blanket capital. For Winter &apos;26–27, AAVAAS unites traditional raschel warp-knitting with modern featherweight micro-mink, reversible sherpa fleece, and 3-layer falalen dohars.
              </p>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  onClick={() => setWinterFilter("all")}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.2em] rounded-xs border transition-all duration-300 ${
                    winterFilter === "all"
                      ? "bg-[#141210] text-[#FAF6F0] border-[#141210] shadow-md"
                      : "bg-[#FAF7F2] text-stone-700 border-[#CEC0AD] hover:border-stone-800"
                  }`}
                >
                  All Launch ({winterLaunchProducts.length})
                </button>
                <button
                  onClick={() => setWinterFilter("mink")}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.2em] rounded-xs border transition-all duration-300 ${
                    winterFilter === "mink"
                      ? "bg-[#141210] text-[#FAF6F0] border-[#141210] shadow-md"
                      : "bg-[#FAF7F2] text-stone-700 border-[#CEC0AD] hover:border-stone-800"
                  }`}
                >
                  Mink &amp; Polar Fleece
                </button>
                <button
                  onClick={() => setWinterFilter("comforter")}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.2em] rounded-xs border transition-all duration-300 ${
                    winterFilter === "comforter"
                      ? "bg-[#141210] text-[#FAF6F0] border-[#141210] shadow-md"
                      : "bg-[#FAF7F2] text-stone-700 border-[#CEC0AD] hover:border-stone-800"
                  }`}
                >
                  Comforters &amp; Duvets
                </button>
                <button
                  onClick={() => setWinterFilter("dohar")}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.2em] rounded-xs border transition-all duration-300 ${
                    winterFilter === "dohar"
                      ? "bg-[#141210] text-[#FAF6F0] border-[#141210] shadow-md"
                      : "bg-[#FAF7F2] text-stone-700 border-[#CEC0AD] hover:border-stone-800"
                  }`}
                >
                  Layered Dohars
                </button>
              </div>
            </div>

            {/* Editorial Showcase Hero Photography Card */}
            <div className="lg:col-span-7">
              <div className="relative aspect-16/10 w-full bg-[#E5DDCF] overflow-hidden rounded-xs border border-[#CEC0AD] shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=90&w=1600&auto=format&fit=crop"
                  alt="Winter 2026-27 Mink Blankets Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/85 via-[#141210]/40 to-transparent flex items-center p-8 sm:p-14">
                  <div className="max-w-md text-white space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono font-semibold">
                      680 GSM Cloud Pile Weave
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
                      Nordic Ultra-Plush Mink
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif italic">
                      Zero shedding. Dual-ply high-filament micro-mink pile with sheared velvet borders.
                    </p>
                    <div className="pt-3">
                      <Link
                        href="/products/nordic-luxury-ultra-plush-mink-blanket"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-[#FAF6F0] text-[#141210] text-xs uppercase tracking-[0.22em] font-semibold rounded-xs hover:bg-white transition shadow-lg"
                      >
                        <span>Inspect Piece</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Winter Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {displayedWinterItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. BESTSELLERS GRID (Spacious Stately Presentation) */}
      <section id="bestsellers" className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-[#E2D7C7]">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Timeless Staples</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#141210] font-light">
              AAVAAS Bestsellers
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-6">
            <span className="text-xs sm:text-sm text-stone-500 font-serif italic">
              Core Bedsheets (₹1,500–₹2,500) &amp; Winter Releases
            </span>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-[0.22em] font-semibold text-stone-900 hover:text-[#B95D41] flex items-center gap-2 transition"
            >
              <span>View All Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4-column desktop / 2-column mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestsellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. THE THREE COLLECTIONS (Essential, Signature, Reserve - Opulent Moodboard) */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.3em] text-stone-500 font-semibold block">
            Architectural Grading
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#141210] font-light leading-tight">
            The Three Collections
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-serif italic">
            Every home maintains its own cadence. We structure our craftsmanship across three deliberate tiers to offer accessible luxury for every room.
          </p>
        </div>

        {/* 3-Column Editorial Cards with Generous Padding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              className="group border border-[#E2D7C7] hover:border-stone-900 bg-[#FDFBF8] p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 rounded-xs shadow-xs hover:shadow-[0_25px_50px_-12px_rgba(20,18,16,0.15)]"
            >
              <div>
                <div className="relative aspect-4/3 w-full bg-[#EFE8DD] overflow-hidden mb-8 rounded-xs">
                  <Image
                    src={col.image}
                    alt={`${col.name} Collection`}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-1000 ease-out brightness-[0.95]"
                  />
                  <div className="absolute top-4 left-4 bg-[#141210]/90 backdrop-blur-md px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#FAF6F0] border border-white/20">
                    {col.priceRange}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold">
                    Tier {col.id === "essential" ? "01" : col.id === "signature" ? "02" : "03"}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light">
                    {col.name}
                  </h3>
                  <p className="text-xs sm:text-sm italic font-serif text-stone-700 pt-1">
                    &ldquo;{col.tagline}&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-2">
                    {col.philosophy}
                  </p>
                </div>

                {/* Materials preview */}
                <div className="mt-8 pt-6 border-t border-[#EAE3D7]">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold mb-3">
                    Master Weaves &amp; Yarns:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                    {col.materials.map((m) => (
                      <li key={m} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[#EAE3D7]">
                <Link
                  href={`/shop?collection=${col.id}`}
                  className="w-full py-4 px-6 bg-[#EFE8DD] hover:bg-[#141210] hover:text-[#FAF6F0] text-stone-900 text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 rounded-xs flex items-center justify-center gap-2.5 border border-[#CEC0AD] hover:border-[#141210]"
                >
                  <span>Explore {col.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LIFESTYLE & BRAND STORY (Asymmetric Royal Editorial Layout) */}
      <section className="bg-[#141210] text-[#FAF6F0] py-28 md:py-36 overflow-hidden border-y border-stone-800">
        <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
            {/* Visual with Overlapping Story Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/5 w-full max-w-lg mx-auto bg-stone-900 rounded-xs overflow-hidden border border-stone-700 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=90&w=1400&auto=format&fit=crop"
                  alt="AAVAAS Loom Finishing and Weaving at Panipat"
                  fill
                  className="object-cover brightness-[0.92]"
                />
              </div>

              <div className="absolute -bottom-8 -right-2 sm:right-4 bg-[#FAF7F2] text-stone-900 p-7 max-w-[280px] rounded-xs shadow-2xl border border-[#D4AF37]/50 hidden sm:block">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold">
                  Heritage Mill
                </p>
                <p className="font-serif text-2xl leading-tight mt-1 text-[#141210]">
                  35+ Years of Weaving Legacy
                </p>
                <p className="text-xs text-stone-600 mt-2 font-serif italic">
                  Parent company KT International, Panipat.
                </p>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-[11px] uppercase tracking-[0.32em] text-[#D4AF37] font-semibold block mb-2">
                  The Panipat Lineage
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.12]">
                  Rooted in Panipat. Reimagined for the World.
                </h2>
              </div>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
                For centuries, Panipat has lived and breathed textiles. Its looms have clothed royal courts, supplied global luxury hotel chains, and defined the warmth of North Indian winters. Yet, for decades, true factory-direct mastery remained obscured behind middlemen and overseas private labels.
              </p>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
                With <strong>AAVAAS</strong>, parent company <strong>KT International</strong> brings that formidable manufacturing power directly to modern residences. No synthetic polyester blends; no markups for foreign logos. Just honest, extra-long staple cottons, cloud-soft micro-mink blankets, and serene living textiles tailored for how modern families live, sleep, and gather.
              </p>

              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-stone-800">
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#D4AF37] block font-light">100%</span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-[0.2em] block mt-1">
                    In-House Looms
                  </span>
                </div>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#D4AF37] block font-light">35+ Yrs</span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-[0.2em] block mt-1">
                    Weaving Mastery
                  </span>
                </div>
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#D4AF37] block font-light">20+ Nations</span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-[0.2em] block mt-1">
                    Export Ready
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-stone-600 hover:border-white text-xs uppercase tracking-[0.25em] font-semibold rounded-xs transition-all duration-300"
                >
                  <span>Read the Full Heritage Narrative</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY AAVAAS (4 Stately Pillars with Generous Spacing) */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-stone-500 font-semibold block">
            Our Foundation
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#141210] font-light">
            Why AAVAAS
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-serif italic">
            The principles that anchor every thread spun and hem stitched.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="p-8 bg-[#FDFBF8] border border-[#E2D7C7] rounded-xs space-y-4 hover:border-stone-900 transition-all duration-300 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#EFE8DD] border border-[#CEC0AD] flex items-center justify-center text-stone-900 mb-2">
              <Compass className="w-6 h-6 stroke-[1.25]" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-light">Thoughtful Design</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Tailored for contemporary living — from generous 108&quot; × 108&quot; bedsheet dimensions that stay tucked into 14-inch heavy mattresses to reversible dual-mood color palettes.
            </p>
          </div>

          <div className="p-8 bg-[#FDFBF8] border border-[#E2D7C7] rounded-xs space-y-4 hover:border-stone-900 transition-all duration-300 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#EFE8DD] border border-[#CEC0AD] flex items-center justify-center text-stone-900 mb-2">
              <Layers className="w-6 h-6 stroke-[1.25]" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-light">Panipat Craftsmanship</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Backed by KT International&apos;s heritage machinery and multigenerational master weavers. Direct mill control from raw yarn spinning to final hand-hemstitch inspection.
            </p>
          </div>

          <div className="p-8 bg-[#FDFBF8] border border-[#E2D7C7] rounded-xs space-y-4 hover:border-stone-900 transition-all duration-300 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#EFE8DD] border border-[#CEC0AD] flex items-center justify-center text-stone-900 mb-2">
              <HeartHandshake className="w-6 h-6 stroke-[1.25]" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-light">Accessible Premium</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              By bypassing department store markups and distributor tiers, we deliver ₹8,000-grade luxury fabrics at honest, uninflated prices.
            </p>
          </div>

          <div className="p-8 bg-[#FDFBF8] border border-[#E2D7C7] rounded-xs space-y-4 hover:border-stone-900 transition-all duration-300 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#EFE8DD] border border-[#CEC0AD] flex items-center justify-center text-stone-900 mb-2">
              <Feather className="w-6 h-6 stroke-[1.25]" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-light">Elevated Comfort</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Silken 400TC Supima sateen, breathable gossamer malmal falalen, and plush zero-twist Turkish terry. Tactile sensations that make coming home a relief.
            </p>
          </div>
        </div>
      </section>

      {/* 8. GIFTING SECTION (Royal Trousseau & Luxury Trunks) */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="relative bg-[#EFE8DD] border border-[#E2D7C7] rounded-xs overflow-hidden p-10 sm:p-16 md:p-20 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold">
                The Art of Thoughtful Giving
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#141210] font-light leading-tight">
                Heirloom Gifting for Weddings, Festivals &amp; New Homes
              </h2>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-xl font-serif italic">
                Celebrate unions, housewarmings, and festive milestones with hand-curated trousseau boxes, twin dohar suites, and custom-embossed keepsake linen trunks.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/shop?category=gifting"
                  className="px-9 py-4 bg-[#141210] hover:bg-stone-800 text-[#FAF6F0] text-xs uppercase tracking-[0.25em] font-semibold rounded-xs transition-all duration-300 shadow-md"
                >
                  Explore Gift Suites
                </Link>
                <Link
                  href="/bulk-enquiries"
                  className="px-9 py-4 bg-transparent border border-stone-800 hover:bg-[#141210] hover:text-[#FAF6F0] text-stone-900 text-xs uppercase tracking-[0.25em] font-semibold rounded-xs transition-all duration-300"
                >
                  Corporate &amp; Bulk Gifting Enquiry
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 w-full bg-[#E5DDCF] rounded-xs overflow-hidden shadow-2xl border border-[#CEC0AD]">
                <Image
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=90&w=1400&auto=format&fit=crop"
                  alt="AAVAAS Luxury Gift Suite Trunk"
                  fill
                  className="object-cover brightness-[0.95]"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#141210]/85 backdrop-blur-md px-4 py-2.5 rounded-xs text-xs text-[#FAF6F0] font-serif flex items-center justify-between border border-white/20">
                  <span>Bespoke Embossed Wooden Linen Trunks</span>
                  <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest">By KT International</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
