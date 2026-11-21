"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { Plus, X, ShoppingBag, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HotspotItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  slug: string;
  image: string;
  top: string;
  left: string;
  badge: string;
}

const HOTSPOTS: HotspotItem[] = [
  {
    id: "hotspot-1",
    name: "Aura 400TC Supima Bedsheet Set",
    subtitle: "Long-staple sateen in Oatmeal Stone",
    price: 2199,
    slug: "aura-400tc-supima-cotton-sateen-bedsheet",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=85&w=600&auto=format&fit=crop",
    top: "62%",
    left: "48%",
    badge: "100% Supima Cotton",
  },
  {
    id: "hotspot-2",
    name: "Kashmir Cloud Mink Blanket",
    subtitle: "550 GSM sculpted thermal weave",
    price: 2499,
    slug: "kashmir-cloud-embossed-mink-blanket",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=85&w=600&auto=format&fit=crop",
    top: "45%",
    left: "72%",
    badge: "Winter '26 Edition",
  },
  {
    id: "hotspot-3",
    name: "Bouclé Loop Cushion Pair",
    subtitle: "Hand-tufted organic wool loops",
    price: 1499,
    slug: "panipat-hand-tufted-boucle-cushion-cover-pair",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=600&auto=format&fit=crop",
    top: "35%",
    left: "28%",
    badge: "Handloom Craft",
  },
];

export default function ShopTheRoom() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleQuickAdd = (item: HotspotItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Mock product shape for CartContext
    const mockProduct = {
      id: item.slug,
      slug: item.slug,
      name: item.name,
      subtitle: item.subtitle,
      category: "bedroom" as const,
      subcategory: "Bedroom",
      collection: "signature" as const,
      price: item.price,
      originalPrice: item.price + 800,
      discountPercent: 25,
      rating: 4.9,
      reviewsCount: 120,
      inStock: true,
      images: [item.image],
      colors: [{ name: "Standard", hex: "#D9D0C3" }],
      sizes: [{ name: "Standard", label: "Standard", dimensions: "Standard", dimensionsMetric: "Standard", inStock: true, priceModifier: 0 }],
      fabric: "Premium Weave",
      leadParagraph: item.subtitle,
      materialCraft: "Panipat loom weave",
      specifications: {},
      careInstructions: [],
      reviews: [],
    };

    addItem(mockProduct, "Standard", "Standard", 1, item.price);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
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
      <div className="relative w-full h-[560px] lg:h-[640px] rounded-3xl overflow-hidden bg-[#EFEAE2] shadow-xl group">
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=90&w=1800&auto=format&fit=crop"
          alt="Curated AAVAAS bedroom sanctuary room look"
          fill
          priority
          className="object-cover"
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
        {HOTSPOTS.map((spot) => {
          const isActive = activeHotspot === spot.id;
          return (
            <div
              key={spot.id}
              className="absolute z-20"
              style={{ top: spot.top, left: spot.left }}
            >
              {/* Pulsing Hotspot Button */}
              <button
                onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                className="relative -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                aria-label={`View ${spot.name}`}
              >
                {/* Ping ripple effect */}
                <span className="absolute inset-0 rounded-full bg-white/70 animate-ping opacity-75" />
                {/* Outer Glass Ring */}
                <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white/60 transition-transform duration-300 group-hover:scale-115">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#191715] group-hover:bg-[#8C6B4F] transition-colors" />
                </span>
              </button>

              {/* Floating Frosted Card Modal */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-4 left-6 -translate-y-full w-72 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/60 text-left z-30"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <span className="text-[9px] uppercase tracking-[0.16em] font-semibold text-[#8C6B4F] bg-[#EFEAE2] px-2 py-0.5 rounded-full">
                        {spot.badge}
                      </span>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="text-[#5E5850] hover:text-[#191715] p-0.5 transition"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="relative w-16 h-18 rounded-xl overflow-hidden bg-[#EFEAE2] shrink-0">
                        <Image src={spot.image} alt={spot.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-medium text-[#191715] truncate">
                          {spot.name}
                        </h4>
                        <p className="text-[11px] text-[#5E5850] line-clamp-1 mt-0.5">
                          {spot.subtitle}
                        </p>
                        <p className="text-sm font-semibold text-[#191715] mt-1">
                          {formatINR(spot.price)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-[#191715]/10 flex items-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(spot, e)}
                        className="flex-1 py-2 px-3 bg-[#191715] hover:bg-[#8C6B4F] text-[#F8F5F0] text-xs uppercase tracking-wider font-semibold rounded-full transition flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{addedId === spot.id ? "Added!" : "Add to Bag"}</span>
                      </button>
                      <Link
                        href={`/products/${spot.slug}`}
                        className="p-2 border border-[#191715]/20 hover:border-[#191715] rounded-full transition text-[#191715]"
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
