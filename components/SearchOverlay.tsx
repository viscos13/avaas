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
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FAF8F5]/98 backdrop-blur-md animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="border-b border-[#E5DFD5] px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-stone-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blankets, bedsheets, dohars, collections..."
              className="w-full bg-transparent text-lg md:text-xl text-[#1C1917] placeholder-stone-400 focus:outline-none font-serif tracking-wide"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-stone-400 hover:text-stone-700 text-xs uppercase tracking-wider"
              >
                Clear
              </button>
            )}
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-stone-500 hover:text-stone-900 border border-stone-200 hover:border-stone-400 rounded-full transition"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Body content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {query.trim() === "" ? (
            <div className="space-y-8">
              {/* Popular search tags */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-3">
                  Trending Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 bg-[#EDE8E0] hover:bg-[#E4DDD3] text-stone-800 text-xs rounded-full transition duration-150"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Category Jump */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-3">
                  Browse by Category
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="group p-3 border border-[#E5DFD5] hover:border-stone-900 bg-white hover:bg-stone-50 transition rounded-sm text-center"
                    >
                      <p className="text-xs font-medium text-stone-900 group-hover:underline">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-stone-500 mt-0.5">{cat.itemCount} items</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
                {results.length} {results.length === 1 ? "result" : "results"} found for &ldquo;{query}&rdquo;
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="group border border-[#E5DFD5] hover:border-stone-900 bg-white transition p-3 rounded-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden mb-3">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 bg-[#FAF8F5]/90 backdrop-blur-sm px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold text-stone-800">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400">
                        {product.subcategory} • {product.collection}
                      </span>
                      <h4 className="text-sm font-serif text-stone-900 line-clamp-1 mt-0.5 group-hover:underline">
                        {product.name}
                      </h4>
                    </div>
                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-900">
                        {formatINR(product.price)}
                      </span>
                      <span className="text-[11px] text-stone-500 flex items-center gap-1 group-hover:translate-x-1 transition duration-150">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-serif text-xl text-stone-700">No matching pieces found</p>
              <p className="text-xs text-stone-500 mt-2 max-w-sm mx-auto">
                We couldn&apos;t find items matching &ldquo;{query}&rdquo;. Try browsing our Winter &apos;26–27 collection or Core Bedsheet range.
              </p>
              <button
                onClick={() => setQuery("Bedsheet")}
                className="mt-4 px-4 py-2 border border-stone-800 text-xs uppercase tracking-wider hover:bg-stone-900 hover:text-white transition"
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
