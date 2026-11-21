"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { COLLECTIONS } from "@/data/collections";
import ProductCard from "@/components/ProductCard";
import { ArrowUpDown, X, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialCollection = searchParams.get("collection") || "all";
  const initialWinter = searchParams.get("winter") === "true";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [onlyWinter, setOnlyWinter] = useState<boolean>(initialWinter);
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      if (selectedCollection !== "all" && product.collection !== selectedCollection) {
        return false;
      }
      if (onlyWinter && !product.isWinterLaunch) {
        return false;
      }
      if (product.price > priceRange) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedCollection, onlyWinter, priceRange, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-32 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14 text-left">
      {/* Editorial Header */}
      <div className="mb-8 sm:mb-10">
        <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-2">
          Panipat Master Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#191715] font-normal tracking-tight">
          {activeCategoryObj
            ? activeCategoryObj.name
            : onlyWinter
            ? "Winter 2026–27 Capsule"
            : selectedCollection !== "all"
            ? `${selectedCollection.toUpperCase()} Collection`
            : "All Home & Living Pieces"}
        </h1>
        <p className="text-[15px] text-[#5E5850] mt-3 max-w-2xl font-normal leading-relaxed">
          {activeCategoryObj
            ? activeCategoryObj.description
            : onlyWinter
            ? "Engineered for northern winter temperatures: 680 GSM cloud mink blankets, sherpa fleece, and pure cotton falalen dohars."
            : "Authentic loom mastery woven in Panipat by KT International for discerning contemporary spaces."}
        </p>
      </div>

      {/* Filter Bar with Sleek Pills */}
      <div className="space-y-4 pb-8 mb-10 border-b border-[#191715]/10">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => {
              setSelectedCategory("all");
              setOnlyWinter(false);
            }}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition shrink-0 ${
              selectedCategory === "all" && !onlyWinter
                ? "bg-[#191715] text-[#F8F5F0] shadow-sm"
                : "bg-[#EFEAE2] text-[#5E5850] hover:text-[#191715]"
            }`}
          >
            All Departments
          </button>

          <button
            onClick={() => setOnlyWinter(!onlyWinter)}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition shrink-0 ${
              onlyWinter
                ? "bg-[#8C6B4F] text-white shadow-sm"
                : "bg-[#EFEAE2] text-[#8C6B4F] hover:bg-[#8C6B4F]/15"
            }`}
          >
            Winter &apos;26–27 Launch
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.slug);
                setOnlyWinter(false);
              }}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition shrink-0 ${
                selectedCategory === cat.slug && !onlyWinter
                  ? "bg-[#191715] text-[#F8F5F0] shadow-sm"
                  : "bg-[#EFEAE2] text-[#5E5850] hover:text-[#191715]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Secondary Filter Row: Collections, Max Price & Sort By */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Collection Pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#5E5850] font-medium mr-1">
              Tier:
            </span>
            {["all", "essential", "signature", "reserve"].map((col) => (
              <button
                key={col}
                onClick={() => setSelectedCollection(col)}
                className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold transition ${
                  selectedCollection === col
                    ? "bg-[#191715] text-white"
                    : "border border-[#191715]/15 text-[#5E5850] hover:border-[#191715]"
                }`}
              >
                {col}
              </button>
            ))}
          </div>

          {/* Right Tools: Max Price & Sort By */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-[#5E5850]">
              <span>Max:</span>
              <input
                type="range"
                min="1400"
                max="8000"
                step="200"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-24 accent-[#191715] cursor-pointer"
              />
              <span className="font-semibold text-[#191715]">₹{priceRange}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#5E5850]">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-[#191715] font-semibold uppercase tracking-wider text-[11px] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Results Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#5E5850] mb-8">
          <span className="font-medium">{filteredProducts.length} curated pieces</span>
          {(selectedCategory !== "all" || selectedCollection !== "all" || onlyWinter || priceRange < 10000) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedCollection("all");
                setOnlyWinter(false);
                setPriceRange(10000);
              }}
              className="text-[#191715] hover:text-[#8C6B4F] flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-semibold transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-3 bg-[#EFEAE2]/30 rounded-2xl">
            <p className="font-serif text-2xl text-[#191715]">No pieces match your selected filters</p>
            <p className="text-xs text-[#5E5850]">Try resetting your price or department filter to view the catalog.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedCollection("all");
                setOnlyWinter(false);
                setPriceRange(10000);
              }}
              className="mt-3 px-6 py-2.5 bg-[#191715] text-[#F8F5F0] rounded-full text-xs uppercase tracking-wider font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 sm:gap-x-5 gap-y-8 sm:gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-36 text-center font-serif text-2xl">Loading AAVAAS Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
