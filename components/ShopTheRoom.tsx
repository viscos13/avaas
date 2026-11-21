"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { Plus, X, ShoppingBag, ArrowUpRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HotspotConfig {
  id: string;
  slug: string;
  label: string;
  part: string;
  top: string;
  left: string;
  popoverPlacement: "top" | "bottom" | "left" | "right";
}

const HOTSPOT_CONFIGS: HotspotConfig[] = [
  {
    id: "hotspot-cushions",
    slug: "panipat-hand-tufted-boucle-cushion-cover-pair",
    label: "01 · Pillows & Cushions",
    part: "Head of Bed",
    top: "43%",
    left: "44%",
    popoverPlacement: "bottom",
  },
  {
    id: "hotspot-bedsheet",
    slug: "aura-400tc-supima-cotton-sateen-bedsheet",
    label: "02 · Sateen Bedsheet",
    part: "Mattress Bedding",
    top: "60%",
    left: "50%",
    popoverPlacement: "top",
  },
  {
    id: "hotspot-blanket",
    slug: "nordic-luxury-ultra-plush-mink-blanket",
    label: "03 · Mink Blanket",
    part: "Foot of Bed Throw",
    top: "76%",
    left: "67%",
    popoverPlacement: "top",
  },
];

export default function ShopTheRoom() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>("hotspot-bedsheet");
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleQuickAdd = (slug: string, hotspotId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const realProduct = PRODUCTS.find((p) => p.slug === slug);
    if (!realProduct) return;

    const defaultSize = realProduct.sizes[0]?.name || "Standard";
    const defaultColor = realProduct.colors[0]?.name || "Default";
    const price = realProduct.price;

    addItem(realProduct, defaultSize, defaultColor, 1, price);
    setAddedId(hotspotId);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="py-20 lg:py-28 max-w-[1440px] mx-auto px-6 lg:px-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-left">
        <div>
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-2">
            Interactive Sanctuary Studio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#191715] font-normal tracking-tight">
            Style the Sanctuary
          </h2>
          <p className="text-[15px] text-[#5E5850] mt-2 font-normal max-w-lg">
            Tap the interactive hotspot pins on the bedding to explore and shop the curated bedroom aesthetic.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#191715] hover:text-[#8C6B4F] transition"
        >
          <span>Explore All Room Looks</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Hero Room Canvas with Hotspots */}
      <div className="relative w-full h-[560px] lg:h-[640px] rounded-3xl overflow-hidden bg-[#EFEAE2] shadow-xl group select-none">
        {/* Local Verified Room Image for 0ms Instant Loading */}
        <Image
          src="/images/hero-1.jpg"
          alt="Curated AAVAAS bedroom sanctuary room look"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Soft vignette scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#191715]/40 via-transparent to-black/10 pointer-events-none" />

        {/* Room Title Floating Pill */}
        <div className="absolute top-6 left-6 z-10">
          <div className="bg-white/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-left shadow-sm">
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#8C6B4F] block">
              Look 01 / Winter 2026–27
            </span>
            <span className="font-serif text-sm text-[#191715] font-normal">
              The Panipat Earth &amp; Stone Suite
            </span>
          </div>
        </div>

        {/* Interactive Hotspot Dots */}
        {HOTSPOT_CONFIGS.map((spot) => {
          const realProduct = PRODUCTS.find((p) => p.slug === spot.slug);
          if (!realProduct) return null;

          const isActive = activeHotspot === spot.id;
          const isAdded = addedId === spot.id;

          return (
            <div
              key={spot.id}
              className="absolute z-20"
              style={{ top: spot.top, left: spot.left }}
            >
              {/* Pulsing Hotspot Button with Visible Label Pill */}
              <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                  className="relative group focus:outline-none"
                  aria-label={`View ${realProduct.name}`}
                >
                  {/* Ping ripple effect */}
                  <span className="absolute inset-0 rounded-full bg-white/70 animate-ping opacity-75" />
                  {/* Outer Glass Ring */}
                  <span
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md shadow-xl border border-white/70 transition-transform duration-300 ${
                      isActive ? "bg-[#191715] scale-110" : "bg-white/90 hover:scale-115"
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full transition-colors ${
                        isActive ? "bg-white" : "bg-[#191715]"
                      }`}
                    />
                  </span>
                </button>

                {/* Permanent Micro Pill on Canvas */}
                <button
                  onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border shadow-md transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#191715] text-white border-[#191715]"
                      : "bg-white/85 text-[#191715] border-white/60 hover:bg-white"
                  }`}
                >
                  <span>{spot.label}</span>
                  <span className="font-mono text-[10px] opacity-75">· {formatINR(realProduct.price)}</span>
                </button>
              </div>

              {/* Floating Frosted Card Modal */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-4 left-6 -translate-y-full w-80 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/70 text-left z-30"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] uppercase tracking-[0.16em] font-semibold text-[#8C6B4F] bg-[#EFEAE2] px-2.5 py-0.5 rounded-full">
                          {spot.part}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-[#5E5850]">
                          {realProduct.collection} Tier
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="text-[#5E5850] hover:text-[#191715] p-1 transition rounded-full"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="relative w-20 h-22 rounded-xl overflow-hidden bg-[#EFEAE2] shrink-0 shadow-xs">
                        <Image
                          src={realProduct.images[0]}
                          alt={realProduct.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-medium text-[#191715] line-clamp-1">
                          {realProduct.name}
                        </h4>
                        <p className="text-[11px] text-[#5E5850] line-clamp-1 mt-0.5">
                          {realProduct.subtitle}
                        </p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-semibold text-[#191715]">
                            {formatINR(realProduct.price)}
                          </span>
                          {realProduct.originalPrice > realProduct.price && (
                            <span className="text-[11px] text-[#5E5850] line-through">
                              {formatINR(realProduct.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-[#191715]/10 flex items-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(spot.slug, spot.id, e)}
                        className={`flex-1 py-2 px-3 text-xs uppercase tracking-wider font-semibold rounded-full transition flex items-center justify-center gap-1.5 shadow-md ${
                          isAdded
                            ? "bg-emerald-800 text-white"
                            : "bg-[#191715] hover:bg-[#8C6B4F] text-[#F8F5F0]"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Bag!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                      <Link
                        href={`/products/${realProduct.slug}`}
                        className="p-2 border border-[#191715]/20 hover:border-[#191715] rounded-full transition text-[#191715]"
                        aria-label="View product details"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
