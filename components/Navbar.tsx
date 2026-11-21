"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CATEGORIES } from "@/data/categories";
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Transparent over hero if on homepage and not scrolled
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          isTransparent
            ? "bg-transparent text-white border-b border-white/15 py-5 sm:py-6"
            : "bg-[#FAF8F5]/95 backdrop-blur-md text-[#1C1917] border-b border-[#1C1917]/10 shadow-xs py-4 sm:py-5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* LEFT: Clean Minimal Nav Links (Zara Home / Pottery Barn Layout) */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1 transition opacity-90 hover:opacity-100"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-[11px] uppercase tracking-[0.25em] font-normal">
              {/* Shop Mega Menu Trigger */}
              <div
                className="relative py-2"
                onMouseEnter={() => setShopMenuOpen(true)}
                onMouseLeave={() => setShopMenuOpen(false)}
              >
                <Link
                  href="/shop"
                  className="transition opacity-85 hover:opacity-100 hover:underline underline-offset-8"
                >
                  Shop
                </Link>

                {/* Dropdown Panel */}
                {shopMenuOpen && (
                  <div className="absolute top-full left-0 w-[680px] bg-[#FAF8F5] text-[#1C1917] border border-[#1C1917]/10 shadow-2xl p-8 rounded-none grid grid-cols-3 gap-8 animate-in fade-in duration-200">
                    {CATEGORIES.map((cat) => (
                      <div key={cat.id} className="space-y-2.5">
                        <Link
                          href={`/shop?category=${cat.slug}`}
                          className="font-serif text-base text-[#1C1917] hover:underline block font-normal tracking-wide"
                        >
                          {cat.name}
                        </Link>
                        <ul className="space-y-1">
                          {cat.subcategories.slice(0, 3).map((sub) => (
                            <li key={sub}>
                              <Link
                                href={`/shop?category=${cat.slug}&subcategory=${encodeURIComponent(sub)}`}
                                className="text-[11px] text-[#6B655E] hover:text-[#1C1917] tracking-wider transition block"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/shop?winter=true"
                className="transition opacity-85 hover:opacity-100 hover:underline underline-offset-8"
              >
                Winter &apos;26–27
              </Link>

              <Link
                href="/shop?category=gifting"
                className="transition opacity-85 hover:opacity-100 hover:underline underline-offset-8"
              >
                Gifting
              </Link>

              <Link
                href="/bulk-enquiries"
                className="transition opacity-85 hover:opacity-100 hover:underline underline-offset-8"
              >
                Bulk &amp; Business
              </Link>

              <Link
                href="/our-story"
                className="transition opacity-85 hover:opacity-100 hover:underline underline-offset-8"
              >
                Our Story
              </Link>
            </nav>
          </div>

          {/* CENTER: Refined Serif Wordmark */}
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="inline-block group text-center">
              <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.25em] uppercase block">
                AAVAAS
              </span>
              <span
                className={`text-[8px] uppercase tracking-[0.35em] block -mt-1 font-sans transition-opacity ${
                  isTransparent ? "text-stone-300" : "text-[#6B655E]"
                }`}
              >
                PANIPAT • KT INTERNATIONAL
              </span>
            </Link>
          </div>

          {/* RIGHT: Minimal Utility Icons (Search, Wishlist, Bag) */}
          <div className="flex items-center gap-5 sm:gap-7">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 transition opacity-85 hover:opacity-100 flex items-center gap-1.5"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[1.25]" />
              <span className="hidden xl:inline text-[11px] uppercase tracking-[0.2em] font-normal">
                Search
              </span>
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-1.5 transition opacity-85 hover:opacity-100 flex items-center gap-1.5"
              aria-label={`Wishlist (${wishlistCount})`}
            >
              <Heart className="w-4 h-4 stroke-[1.25]" />
              {wishlistCount > 0 && (
                <span className="text-[10px] font-mono tracking-wider font-medium">
                  ({wishlistCount})
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 transition opacity-85 hover:opacity-100 flex items-center gap-2"
              aria-label={`Shopping Bag (${cartCount})`}
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.25]" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-normal">
                Bag {cartCount > 0 && `(${cartCount})`}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />
          <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-[#FAF8F5] text-[#1C1917] shadow-2xl flex flex-col border-r border-[#1C1917]/10">
            <div className="p-6 border-b border-[#1C1917]/10 flex items-center justify-between">
              <div>
                <span className="font-serif text-2xl tracking-[0.25em] uppercase block">
                  AAVAAS
                </span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-[#6B655E]">
                  Panipat • KT International
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-stone-600 hover:text-black transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm uppercase tracking-[0.2em]">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-lg normal-case tracking-normal text-[#1C1917] block"
                  >
                    Shop All
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?winter=true"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-lg normal-case tracking-normal text-[#B95D41] block"
                  >
                    Winter &apos;26–27 Edition
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=gifting"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-lg normal-case tracking-normal text-[#1C1917] block"
                  >
                    Gifting Suites
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bulk-enquiries"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-lg normal-case tracking-normal text-[#1C1917] block"
                  >
                    Bulk &amp; Business
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-story"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-lg normal-case tracking-normal text-[#1C1917] block"
                  >
                    Our Story
                  </Link>
                </li>
              </ul>

              <div className="pt-6 border-t border-[#1C1917]/10">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#6B655E] mb-3">
                  Departments
                </p>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-[#1C1917] hover:underline"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
