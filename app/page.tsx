"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { COLLECTIONS } from "@/data/collections";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  // Exactly 8 Winter '26-27 launch items (no empty slots in 4-col grid)
  const winterLaunchProducts = PRODUCTS.filter((p) => p.isWinterLaunch).slice(0, 8);

  // Exactly 8 Bestsellers
  const bestsellerProducts = PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);

  return (
    <div className="space-y-24 lg:space-y-36 pb-28">
      {/* =========================================================
          SECTION B: FULL-BLEED ARCHITECTURAL HERO (h-[92vh])
      ========================================================= */}
      <section className="relative w-full h-[92vh] flex items-end overflow-hidden">
        {/* Full-Viewport Sunlit Bedroom Photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=90&w=2400&auto=format&fit=crop"
            alt="AAVAAS Sunlit Luxury Sanctuary — Panipat Weaves"
            fill
            priority
            className="object-cover object-center brightness-[0.92] contrast-[1.03]"
          />
          {/* Subtle bottom-up dark gradient scrim for effortless readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Clean Lower-Left / Center Typography with Generous Breathing Room */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-16 sm:pb-20 text-white">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs tracking-[0.25em] uppercase text-white/90 font-medium">
              WINTER 2026–27 EDITION
            </p>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.04] tracking-tight">
              Thoughtfully Made for Modern Homes.
            </h1>

            <p className="text-sm sm:text-base text-white/85 font-serif italic pt-1 font-light">
              Crafted in Panipat. Designed for contemporary living.
            </p>

            {/* Minimal CTAs: Crisp off-white rectangular button + minimal underlined link */}
            <div className="pt-6 flex flex-wrap items-center gap-6">
              <Link
                href="#winter-collection"
                className="px-8 py-3.5 bg-[#FAF8F5] hover:bg-white text-[#1C1917] text-xs uppercase tracking-[0.22em] font-medium rounded-none transition duration-300 shadow-sm"
              >
                Explore Winter &apos;26–27
              </Link>

              <Link
                href="#bestsellers"
                className="text-xs uppercase tracking-[0.22em] text-white hover:text-white/80 underline underline-offset-8 transition font-medium flex items-center gap-2"
              >
                <span>Shop Bestsellers</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION C: SHOP BY CATEGORY (Editorial Full-Bleed Grid)
      ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-10 text-left">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#6B655E] font-medium mb-1.5">
            DEPARTMENTS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-light">
            Shop by Category
          </h2>
        </div>

        {/* 6 Categories: Tall aspect-[3/4] borderless photo tiles, zero white boxes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative block aspect-3/4 w-full bg-[#EDE8E0] overflow-hidden rounded-none"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Soft bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Overlaid Title & Count at bottom-left in warm white */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight">
                  {category.name}
                </h3>
                <p className="text-[11px] tracking-[0.15em] text-white/80 uppercase mt-0.5 font-light">
                  {category.itemCount} Designs
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION D: FEATURED SEASONAL COLLECTION — WINTER 2026–27
      ========================================================= */}
      <section id="winter-collection" className="w-full space-y-16">
        {/* Full-Bleed 50/50 Editorial Split Banner on Soft Sand (#EFECE6) */}
        <div className="w-full bg-[#EFECE6] grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Left: Full-Height Cozy Textured Blanket Lifestyle Photo */}
          <div className="relative min-h-[380px] lg:min-h-[580px] w-full bg-[#EDE8E0]">
            <Image
              src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=85&w=1400&auto=format&fit=crop"
              alt="Winter 2026-27 Thermal Collection"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Generous Negative Space, Serif Title, Brief Poetic Copy, Minimal Underlined CTA */}
          <div className="p-10 sm:p-14 lg:p-24 flex flex-col justify-center space-y-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#6B655E] font-medium">
              WINTER 2026–27 CAMPAIGN
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1917] leading-tight">
              The Thermal Capsule
            </h2>

            <p className="text-sm text-[#6B655E] leading-relaxed max-w-md font-light">
              Panipat is celebrated as India&apos;s blanket capital. For Winter &apos;26–27, AAVAAS crafts 680 GSM cloud micro-mink, reversible polar fleece, and 3-layer falalen dohars with understated modern restraint.
            </p>

            <div className="pt-2">
              <Link
                href="/shop?winter=true"
                className="text-xs uppercase tracking-[0.25em] text-[#1C1917] hover:text-[#B95D41] underline underline-offset-8 transition font-medium"
              >
                Discover the Full Capsule →
              </Link>
            </div>
          </div>
        </div>

        {/* Exactly 8 Winter Products in Clean 4-Column Desktop Grid (No orphan slot!) */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {winterLaunchProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION E: BESTSELLERS GRID
      ========================================================= */}
      <section id="bestsellers" className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#1C1917]/10">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#6B655E] font-medium mb-1.5">
              TIMELESS STAPLES
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-light">
              Bestsellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-3 sm:mt-0 text-xs uppercase tracking-[0.2em] text-[#1C1917] hover:underline underline-offset-8 transition font-medium"
          >
            View All Pieces →
          </Link>
        </div>

        {/* 4-column desktop / 2-column mobile borderless product cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {bestsellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION F: THE THREE COLLECTIONS (3 Tall Full-Bleed Portrait Panels)
      ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-10 text-left">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#6B655E] font-medium mb-1.5">
            ARCHITECTURAL TIERS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-light">
            The Three Collections
          </h2>
        </div>

        {/* 3 tall, edge-to-edge full-bleed portrait panels (min-h-[540px]) side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              className="relative min-h-[540px] w-full bg-[#EDE8E0] overflow-hidden rounded-none flex items-end p-8 group"
            >
              <Image
                src={col.image}
                alt={`${col.name} Collection`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Soft bottom gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              {/* Minimal Overlaid Editorial Content */}
              <div className="relative z-10 text-white space-y-2">
                <h3 className="font-serif text-3xl sm:text-4xl font-light text-white">
                  {col.name}
                </h3>
                <p className="text-xs text-white/80 font-light leading-relaxed max-w-xs font-serif italic">
                  {col.tagline}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/shop?collection=${col.id}`}
                    className="text-xs uppercase tracking-[0.25em] text-white hover:text-white/80 underline underline-offset-8 transition font-medium"
                  >
                    Discover Collection →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION G: LIFESTYLE & BRAND STORY (Warm Editorial Split on #EDE8E0)
      ========================================================= */}
      <section className="w-full bg-[#EDE8E0]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Left: Full-bleed close-up photography of woven linen craftsmanship */}
          <div className="relative min-h-[420px] lg:min-h-[600px] w-full bg-[#E5DDCF]">
            <Image
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=1200&auto=format&fit=crop"
              alt="Linen craftsmanship at Panipat looms"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Generous whitespace, eyebrow, heading, 2-paragraph story, hairline stats */}
          <div className="py-16 sm:py-20 px-8 lg:px-20 flex flex-col justify-center space-y-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#6B655E] font-medium">
              ROOTED IN PANIPAT • BUILT FOR THE WORLD
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1917] leading-tight">
              Where Loom Heritage Meets Contemporary Restraint.
            </h2>

            <p className="text-sm text-[#6B655E] leading-relaxed font-light">
              For generations, the historic city of Panipat has anchored Indian textile craft. Backed by parent enterprise <strong>KT International</strong>&apos;s 35-year manufacturing legacy, AAVAAS unites traditional raschel warp-knits and long-staple cotton spinning with architectural simplicity.
            </p>

            <p className="text-sm text-[#6B655E] leading-relaxed font-light">
              We eliminate intermediaries and synthetic compromises, delivering export-grade bedding, blankets, and living textiles directly from Haryana mills to modern homes.
            </p>

            {/* Clean hairline-separated typographic stats */}
            <div className="pt-6 border-t border-[#1C1917]/15 grid grid-cols-3 gap-6 text-xs text-[#1C1917]">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light block">30+ Yrs</span>
                <span className="text-[10px] tracking-[0.15em] text-[#6B655E] uppercase block mt-1">Textile Legacy</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light block">Panipat</span>
                <span className="text-[10px] tracking-[0.15em] text-[#6B655E] uppercase block mt-1">Craftsmanship</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light block">20+ Nations</span>
                <span className="text-[10px] tracking-[0.15em] text-[#6B655E] uppercase block mt-1">Export Standards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION H: WHY AAVAAS (Minimal Architectural Strip)
      ========================================================= */}
      <section className="w-full border-y border-[#1C1917]/15 py-14 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-left">
          <div className="space-y-1.5">
            <span className="font-serif text-2xl font-light text-[#1C1917]/40 block">01</span>
            <h3 className="font-serif text-lg text-[#1C1917] font-normal">Thoughtful Design</h3>
            <p className="text-xs text-[#6B655E] leading-relaxed font-light">
              108&quot; × 108&quot; extra deep tuck-in sheets and reversible dual-tone colorways.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-serif text-2xl font-light text-[#1C1917]/40 block">02</span>
            <h3 className="font-serif text-lg text-[#1C1917] font-normal">Panipat Craftsmanship</h3>
            <p className="text-xs text-[#6B655E] leading-relaxed font-light">
              Master looms and finishing divisions under parent company KT International.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-serif text-2xl font-light text-[#1C1917]/40 block">03</span>
            <h3 className="font-serif text-lg text-[#1C1917] font-normal">Accessible Premium</h3>
            <p className="text-xs text-[#6B655E] leading-relaxed font-light">
              Direct-from-loom pricing without distributor margins or inflated retailer markups.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="font-serif text-2xl font-light text-[#1C1917]/40 block">04</span>
            <h3 className="font-serif text-lg text-[#1C1917] font-normal">Elevated Comfort</h3>
            <p className="text-xs text-[#6B655E] leading-relaxed font-light">
              400TC Supima sateen, cloud-plush mink, and breathable 3-layer falalen cotton.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION I: GIFTING & BULK ENQUIRIES BANNER
      ========================================================= */}
      <section className="w-full bg-[#E9E4DC]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Editorial copy and clean links */}
          <div className="p-10 sm:p-14 lg:p-20 flex flex-col justify-center space-y-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#6B655E] font-medium">
              CURATED GIVING &amp; TRADE
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1917] leading-tight">
              Trousseau Suites &amp; Institutional Procurement
            </h2>

            <p className="text-sm text-[#6B655E] leading-relaxed font-light max-w-md">
              Celebrate weddings and milestones with linen-wrapped keepsake boxes, or engage our Panipat manufacturing works for boutique hotels, resorts, and corporate gifting.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.2em] font-medium">
              <Link
                href="/shop?category=gifting"
                className="px-6 py-3 bg-[#1C1917] hover:bg-black text-[#FAF8F5] transition"
              >
                Explore Gift Sets
              </Link>
              <Link
                href="/bulk-enquiries"
                className="text-[#1C1917] hover:underline underline-offset-8 transition"
              >
                Bulk &amp; Business Enquiries →
              </Link>
            </div>
          </div>

          {/* Warm, neutral luxury gifting photo (NO PINK BOX) */}
          <div className="relative min-h-[380px] lg:min-h-[500px] w-full bg-[#E5DDCF]">
            <Image
              src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=85&w=1200&auto=format&fit=crop"
              alt="Linen-wrapped luxury gift suite"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
