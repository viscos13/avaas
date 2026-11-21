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
    <div className="pb-36">
      {/* Editorial Header */}
      <div className="bg-[#EFE8DD] py-20 sm:py-24 border-b border-[#E2D7C7]">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold bg-[#B95D41]/10 px-4 py-1.5 rounded-xs border border-[#B95D41]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Panipat Master Woven Catalog</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#141210] font-light leading-tight">
            {activeCategoryObj ? activeCategoryObj.name : onlyWinter ? "Winter '26–27 Collection" : "All Home & Living Pieces"}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto italic font-serif leading-relaxed">
            {activeCategoryObj
              ? activeCategoryObj.tagline
              : onlyWinter
              ? "High-density mink blankets, cloud sherpa fleece, and 3-layer falalen dohars."
              : "Thoughtfully made for modern sanctuaries. Explore beds, bath, living, and gifting."}
          </p>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 pt-14">
        {/* Controls Bar: Categories, Filters, Sorting */}
        <div className="space-y-8 mb-14 pb-8 border-b border-[#E2D7C7]">
          {/* Category Pills Bar */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setOnlyWinter(false);
              }}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] rounded-xs border transition-all duration-300 shrink-0 ${
                selectedCategory === "all" && !onlyWinter
                  ? "bg-[#141210] text-[#FAF6F0] border-[#141210] shadow-md"
                  : "bg-[#FDFBF8] text-stone-700 border-[#E2D7C7] hover:border-stone-800"
              }`}
            >
              All Departments
            </button>

            <button
              onClick={() => {
                setOnlyWinter(!onlyWinter);
              }}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] rounded-xs border transition-all duration-300 shrink-0 flex items-center gap-2 ${
                onlyWinter
                  ? "bg-[#B95D41] text-white border-[#B95D41] shadow-md"
                  : "bg-[#FDFBF8] text-[#B95D41] border-[#B95D41]/40 hover:bg-[#B95D41]/10"
              }`}
            >
              <span>Winter &apos;26–27 Launch</span>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setOnlyWinter(false);
                }}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] rounded-xs border transition-all duration-300 shrink-0 ${
                  selectedCategory === cat.slug && !onlyWinter
                    ? "bg-[#141210] text-[#FAF6F0] border-[#141210] shadow-md"
                    : "bg-[#FDFBF8] text-stone-700 border-[#E2D7C7] hover:border-stone-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sub-Filters: Collection & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-6 text-xs">
            {/* Collection Tier Selectors */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-stone-400 uppercase tracking-[0.22em] font-semibold text-[10px]">
                Collection Tier:
              </span>
              {["all", "essential", "signature", "reserve"].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedCollection(tier)}
                  className={`px-4 py-1.5 rounded-xs border uppercase tracking-[0.2em] text-[11px] font-medium transition-all duration-300 ${
                    selectedCollection === tier
                      ? "bg-[#141210] text-white border-[#141210] shadow-xs"
                      : "bg-[#EFE8DD] text-stone-700 border-[#CEC0AD] hover:border-stone-800"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            {/* Sorting Select */}
            <div className="flex items-center gap-3">
              <ArrowUpDown className="w-4 h-4 text-stone-500" />
              <span className="text-stone-600 font-medium uppercase tracking-wider text-[11px]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FAF7F2] border border-[#CEC0AD] px-4 py-2 text-xs text-stone-900 rounded-xs focus:outline-none focus:border-stone-900"
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
          <div className="flex items-center justify-between text-xs text-stone-500 mb-8">
            <span className="font-mono">Showing {filteredProducts.length} master crafted pieces</span>
            {(selectedCategory !== "all" || selectedCollection !== "all" || onlyWinter) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedCollection("all");
                  setOnlyWinter(false);
                }}
                className="text-stone-800 hover:text-black underline uppercase tracking-wider text-[11px] flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-28 bg-[#FDFBF8] border border-[#E2D7C7] rounded-xs space-y-4">
              <h3 className="font-serif text-3xl text-stone-800 font-light">No pieces match this selection</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto font-serif italic">
                Try loosening your filters or explore our Winter &apos;26–27 collection.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedCollection("all");
                  setOnlyWinter(false);
                }}
                className="px-8 py-4 bg-[#141210] hover:bg-stone-800 text-white text-xs uppercase tracking-[0.25em] font-semibold rounded-xs shadow-md"
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
    <Suspense fallback={<div className="py-28 text-center font-serif text-xl">Loading AAVAAS Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
