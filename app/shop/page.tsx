"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { COLLECTIONS } from "@/data/collections";
import ProductCard from "@/components/ProductCard";
import { ArrowUpDown, X } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialCollection = searchParams.get("collection") || "all";
  const initialWinter = searchParams.get("winter") === "true";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [onlyWinter, setOnlyWinter] = useState<boolean>(initialWinter);
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
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedCollection, onlyWinter, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);

  return (
    <div className="pt-28 pb-32">
      {/* Editorial Header */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-12 text-left">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#6B655E] font-medium mb-1">
          PANIPAT MASTER CATALOG
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1917] font-light">
          {activeCategoryObj ? activeCategoryObj.name : onlyWinter ? "Winter '26–27 Capsule" : "All Home & Living Pieces"}
        </h1>
        <p className="text-sm text-[#6B655E] mt-2 font-serif italic max-w-xl">
          {activeCategoryObj
            ? activeCategoryObj.tagline
            : onlyWinter
            ? "High-density mink blankets, cloud sherpa fleece, and 3-layer falalen dohars."
            : "Woven in Panipat with long-staple natural yarns for contemporary living."}
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Minimal Category & Sorting Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 mb-10 border-b border-[#1C1917]/10 text-xs">
          {/* Department links */}
          <div className="flex items-center gap-6 overflow-x-auto pb-1 scrollbar-none uppercase tracking-[0.2em] text-[11px]">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setOnlyWinter(false);
              }}
              className={`transition ${
                selectedCategory === "all" && !onlyWinter
                  ? "text-[#1C1917] font-semibold border-b border-[#1C1917] pb-1"
                  : "text-[#6B655E] hover:text-[#1C1917]"
              }`}
            >
              All Departments
            </button>

            <button
              onClick={() => setOnlyWinter(!onlyWinter)}
              className={`transition ${
                onlyWinter
                  ? "text-[#B95D41] font-semibold border-b border-[#B95D41] pb-1"
                  : "text-[#B95D41]/80 hover:text-[#B95D41]"
              }`}
            >
              Winter &apos;26–27
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setOnlyWinter(false);
                }}
                className={`transition ${
                  selectedCategory === cat.slug && !onlyWinter
                    ? "text-[#1C1917] font-semibold border-b border-[#1C1917] pb-1"
                    : "text-[#6B655E] hover:text-[#1C1917]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 text-xs text-[#6B655E]">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-[#1C1917] font-medium uppercase tracking-wider text-[11px] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Catalog Result Grid: 4-col desktop borderless cards */}
        <div>
          <div className="flex items-center justify-between text-xs text-[#6B655E] mb-6">
            <span>{filteredProducts.length} pieces</span>
            {(selectedCategory !== "all" || selectedCollection !== "all" || onlyWinter) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedCollection("all");
                  setOnlyWinter(false);
                }}
                className="text-[#1C1917] hover:underline flex items-center gap-1 uppercase tracking-wider text-[10px]"
              >
                <X className="w-3 h-3" />
                <span>Reset filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-28 text-center font-serif text-xl">Loading Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
