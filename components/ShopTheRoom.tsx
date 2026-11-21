"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { X, ShoppingBag, ArrowUpRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HotspotConfig {
  id: string;
  slug: string;
  part: string;
  top: string;
  left: string;
  placement: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

const HOTSPOT_CONFIGS: HotspotConfig[] = [
  {
    id: "hotspot-cushions",
    slug: "panipat-hand-tufted-boucle-cushion-cover-pair",
    part: "Sofa Cushions",
    top: "58%",
    left: "46%",
    placement: "top-right",
  },
  {
    id: "hotspot-blanket",
    slug: "nordic-luxury-ultra-plush-mink-blanket",
    part: "Chaise Throw",
    top: "72%",
    left: "74%",
    placement: "top-left",
  },
  {
    id: "hotspot-sherpa",
    slug: "chamonix-reversible-sherpa-fleece",
    part: "Accent Chair Throw",
    top: "62%",
    left: "22%",
    placement: "top-right",
  },
];

export default function ShopTheRoom() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveHotspot(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <section className="py-14 sm:py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 text-left">
        <div>
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-2">
            Interactive Sanctuary Studio
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#191715] font-normal tracking-tight">
            Style the Sanctuary
          </h2>
          <p className="text-xs sm:text-[15px] text-[#5E5850] mt-1.5 sm:mt-2 font-normal max-w-lg">
            Tap the interactive hotspot pins on the room to explore and shop the curated living aesthetic.
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
      <div
        ref={containerRef}
        className="relative w-full h-[440px] sm:h-[540px] lg:h-[640px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#EFEAE2] shadow-xl group select-none"
      >
        {/* Curated Sanctuary Living Room Photo */}
        <Image
          src="/images/style-the-sanctuary.jpg"
          alt="Curated AAVAAS Earth & Stone Suite room look"
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover object-center"
        />

        {/* Soft vignette scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#191715]/40 via-transparent to-black/10 pointer-events-none" />

        {/* Room Title Floating Pill */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/30 text-left shadow-sm">
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold text-[#8C6B4F] block">
              Look 01 / Winter 2026–27
            </span>
            <span className="font-serif text-xs sm:text-sm text-[#191715] font-normal">
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

          // Responsive placement alignment: on mobile pinned to bottom canvas, on desktop floats next to dot
          const desktopPlacementClasses =
            spot.placement === "top-left"
              ? "sm:bottom-12 sm:right-0 sm:-right-4"
              : spot.placement === "top-right"
              ? "sm:bottom-12 sm:left-0 sm:-left-4"
              : spot.placement === "bottom-left"
              ? "sm:top-12 sm:right-0 sm:-right-4"
              : "sm:top-12 sm:left-0 sm:-left-4";

          return (
            <div
              key={spot.id}
              className="absolute z-20"
              style={{ top: spot.top, left: spot.left }}
            >
              {/* Pulsing Hotspot Button */}
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <button
                  onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                  className="relative group focus:outline-none cursor-pointer block touch-manipulation"
                  aria-label={`Explore product at ${spot.part}`}
                >
                  {/* Ping ripple effect */}
                  <span className="absolute inset-0 rounded-full bg-white/70 animate-ping opacity-75" />
                  {/* Outer Glass Ring */}
                  <span
                    className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-md shadow-xl border border-white/80 transition-all duration-300 ${
                      isActive
                        ? "bg-[#191715] scale-110"
                        : "bg-white/90 hover:scale-115 hover:bg-white active:scale-95"
                    }`}
                  >
                    <span
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-colors ${
                        isActive ? "bg-white" : "bg-[#191715] group-hover:bg-[#8C6B4F]"
                      }`}
                    />
                  </span>
                </button>
              </div>

              {/* Floating Frosted Product Card Modal */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className={`fixed inset-x-4 bottom-4 sm:fixed-none sm:absolute ${desktopPlacementClasses} sm:w-80 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/70 text-left z-30`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
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
                        className="text-[#5E5850] hover:text-[#191715] p-1 transition rounded-full cursor-pointer touch-manipulation"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="relative w-16 h-18 sm:w-18 sm:h-20 rounded-xl overflow-hidden bg-[#EFEAE2] shrink-0 shadow-xs">
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

                    <div className="mt-3 pt-3 border-t border-[#191715]/10 flex items-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(spot.slug, spot.id, e)}
                        className={`flex-1 py-2 px-3 text-xs uppercase tracking-wider font-semibold rounded-full transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer touch-manipulation ${
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
                        scroll={true}
                        className="p-2 border border-[#191715]/20 hover:border-[#191715] rounded-full transition text-[#191715] cursor-pointer"
                        aria-label="View product details"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
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
