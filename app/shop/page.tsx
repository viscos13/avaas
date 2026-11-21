"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, Product } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { COLLECTIONS } from "@/data/collections";
import ProductCard from "@/components/ProductCard";
import { Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialCollection = searchParams.get("collection") || "all";
  const initialWinter = searchParams.get("winter") === "true";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [onlyWinter, setOnlyWinter] = useState<boolean>(initialWinter);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<number>(10000);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Collection filter
      if (selectedCollection !== "all" && product.collection !== selectedCollection) {
        return false;
      }
      // Winter launch filter
      if (onlyWinter && !product.isWinterLaunch) {
        return false;
      }
      // Price filter
      if (product.price > priceRange) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedCollection, onlyWinter, priceRange, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);

  return (
    <div className="pb-24">
      {/* Editorial Header */}
      <div className="bg-[#EDE8E0]/70 py-12 sm:py-16 border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#B95D41] font-semibold bg-[#B95D41]/10 px-3 py-1 rounded-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Panipat Master Woven Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] font-normal">
            {activeCategoryObj ? activeCategoryObj.name : onlyWinter ? "Winter '26–27 Collection" : "All Home & Living Pieces"}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto italic font-serif">
            {activeCategoryObj
              ? activeCategoryObj.tagline
              : onlyWinter
              ? "High-density mink blankets, cloud sherpa fleece, and 3-layer falalen dohars."
              : "Thoughtfully made for modern Indian sanctuaries. Explore beds, bath, living, and gifting."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Controls Bar: Categories, Filters, Sorting */}
        <div className="space-y-6 mb-10 pb-6 border-b border-[#E5DFD5]">
          {/* Category Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setOnlyWinter(false);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-xs border transition shrink-0 ${
                selectedCategory === "all" && !onlyWinter
                  ? "bg-[#1C1917] text-white border-[#1C1917]"
                  : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
              }`}
            >
              All Categories
            </button>

            <button
              onClick={() => {
                setOnlyWinter(!onlyWinter);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-xs border transition shrink-0 flex items-center gap-1.5 ${
                onlyWinter
                  ? "bg-[#B95D41] text-white border-[#B95D41]"
                  : "bg-white text-[#B95D41] border-[#B95D41]/40 hover:bg-[#B95D41]/5"
              }`}
            >
              <span>Winter &apos;26–27 Launch</span>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setOnlyWinter(false);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded-xs border transition shrink-0 ${
                  selectedCategory === cat.slug && !onlyWinter
                    ? "bg-[#1C1917] text-white border-[#1C1917]"
                    : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sub-Filters: Collection & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            {/* Collection Tier Selectors */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-stone-400 uppercase tracking-wider font-semibold text-[10px]">
                Collection:
              </span>
              {["all", "essential", "signature", "reserve"].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedCollection(tier)}
                  className={`px-3 py-1 rounded-xs border uppercase tracking-wider text-[11px] transition ${
                    selectedCollection === tier
                      ? "bg-stone-800 text-white border-stone-800"
                      : "bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            {/* Sorting Select */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-500">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-stone-300 px-3 py-1.5 text-xs text-stone-900 rounded-xs focus:outline-none"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Result Grid */}
        <div>
          <div className="flex items-center justify-between text-xs text-stone-400 mb-6">
            <span>Showing {filteredProducts.length} master crafted pieces</span>
            {(selectedCategory !== "all" || selectedCollection !== "all" || onlyWinter) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedCollection("all");
                  setOnlyWinter(false);
                }}
                className="text-stone-700 hover:text-stone-900 underline flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-[#E5DFD5] rounded-xs space-y-4">
              <h3 className="font-serif text-2xl text-stone-700">No pieces match this selection</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try loosening your filters or explore our Winter &apos;26–27 collection.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedCollection("all");
                  setOnlyWinter(false);
                }}
                className="px-6 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-widest rounded-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center font-serif">Loading AAVAAS Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
