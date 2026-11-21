"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { Search, X, ArrowRight } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { formatINR } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-[#F8F5F0]/98 backdrop-blur-xl animate-in fade-in duration-300 text-left">
        {/* Header bar */}
        <div className="border-b border-[#191715]/10 px-8 py-6">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <Search className="w-6 h-6 text-[#8C6B4F]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blankets, bedsheets, dohars, collections..."
                className="w-full bg-transparent text-xl md:text-3xl text-[#191715] placeholder-[#5E5850]/60 focus:outline-none font-serif tracking-tight"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs uppercase tracking-widest text-[#5E5850] hover:text-[#191715] font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2.5 text-[#5E5850] hover:text-[#191715] border border-[#191715]/15 hover:border-[#191715] rounded-full transition"
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
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5E5850] mb-4">
                    Curated Inquiries
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-[#EFEAE2] hover:bg-[#191715] hover:text-[#F8F5F0] text-[#191715] text-xs font-semibold rounded-full transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5E5850] mb-4">
                    Browse by Living Department
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="group p-3 bg-[#EFEAE2]/60 hover:bg-[#EFEAE2] transition rounded-2xl text-center shadow-xs block"
                      >
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-2">
                          <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <h4 className="font-serif text-sm font-normal text-[#191715]">{cat.name}</h4>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs text-[#5E5850] mb-6 font-medium">
                  {results.length} results found for &ldquo;<span className="text-[#191715]">{query}</span>&rdquo;
                </p>

                {results.length === 0 ? (
                  <div className="py-20 text-center space-y-2">
                    <p className="font-serif text-2xl text-[#191715]">No matching pieces found</p>
                    <p className="text-xs text-[#5E5850]">Try searching for &quot;Mink&quot;, &quot;Supima&quot;, &quot;Dohar&quot;, or &quot;Towels&quot;</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="group flex gap-4 p-4 rounded-2xl bg-white border border-[#191715]/10 hover:border-[#191715] transition shadow-xs"
                      >
                        <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#EFEAE2] shrink-0">
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#8C6B4F] font-semibold block">{product.collection} Tier</span>
                            <h4 className="text-sm font-medium text-[#191715] line-clamp-1 group-hover:text-[#8C6B4F] transition">{product.name}</h4>
                            <p className="text-xs text-[#5E5850] line-clamp-1">{product.subtitle}</p>
                          </div>
                          <span className="text-sm font-semibold text-[#191715]">{formatINR(product.price)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
