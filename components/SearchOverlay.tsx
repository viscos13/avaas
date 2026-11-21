"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { Search, X, ArrowRight } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { formatINR } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matched = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
    );
    setResults(matched);
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    "Winter Mink Blankets",
    "400TC Supima Bedsheet",
    "Pure Malmal Dohar",
    "Belgian Washed Linen",
    "Down-Alternative Comforter",
    "Turkish Bath Sheets",
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FAF7F2]/98 backdrop-blur-md animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="border-b border-[#E2D7C7] px-8 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1">
            <Search className="w-5 h-5 text-stone-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blankets, bedsheets, dohars, collections..."
              className="w-full bg-transparent text-xl md:text-2xl text-[#141210] placeholder-stone-400 focus:outline-none font-serif tracking-wide"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-stone-400 hover:text-stone-800 text-xs uppercase tracking-widest"
              >
                Clear
              </button>
            )}
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2.5 text-stone-500 hover:text-stone-900 border border-[#CEC0AD] hover:border-stone-800 rounded-full transition"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Body content */}
      <div className="flex-1 overflow-y-auto px-8 py-10">
        <div className="max-w-5xl mx-auto">
          {query.trim() === "" ? (
            <div className="space-y-12">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-400 mb-4">
                  Curated Search Inquiries
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-[#EFE8DD] hover:bg-[#141210] hover:text-[#FAF6F0] text-stone-800 text-xs tracking-wider rounded-xs transition-all duration-300 border border-[#E2D7C7]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-400 mb-4">
                  Browse by Department
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="group p-4 border border-[#E2D7C7] hover:border-stone-900 bg-[#FDFBF8] transition rounded-xs text-center shadow-xs"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-stone-900 group-hover:underline">
                        {cat.name}
                      </p>
                      <p className="text-[11px] text-stone-500 mt-1 font-serif italic">{cat.itemCount} items</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-6 font-mono">
                {results.length} {results.length === 1 ? "result" : "results"} found for &ldquo;{query}&rdquo;
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="group border border-[#E2D7C7] hover:border-stone-900 bg-[#FDFBF8] transition p-4 rounded-xs flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="relative aspect-4/3 w-full bg-[#EFE8DD] overflow-hidden mb-3.5 rounded-xs">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 bg-[#141210]/90 backdrop-blur-xs px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-semibold text-white">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-stone-500">
                        {product.subcategory} • {product.collection}
                      </span>
                      <h4 className="text-base font-serif text-stone-900 line-clamp-1 mt-1 group-hover:underline">
                        {product.name}
                      </h4>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#EAE3D7] flex items-center justify-between">
                      <span className="text-sm font-serif font-medium text-stone-900">
                        {formatINR(product.price)}
                      </span>
                      <span className="text-xs uppercase tracking-wider font-semibold text-stone-700 flex items-center gap-1.5 group-hover:translate-x-1 transition duration-150">
                        <span>View</span> <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <p className="font-serif text-2xl text-stone-800">No matching pieces found</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto font-serif italic">
                We couldn&apos;t find items matching &ldquo;{query}&rdquo;. Try browsing our Winter &apos;26–27 collection or Core Bedsheet range.
              </p>
              <button
                onClick={() => setQuery("Bedsheet")}
                className="mt-2 px-8 py-3.5 bg-[#141210] hover:bg-stone-800 text-white text-xs uppercase tracking-[0.25em] font-semibold rounded-xs transition"
              >
                Browse Bedsheets
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
