"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CATEGORIES } from "@/data/categories";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";

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
      const threshold = isHomePage
        ? typeof window !== "undefined"
          ? Math.max(window.innerHeight * 0.75, 450)
          : 500
        : 20;
      setIsScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-150 ease-out ${
          isTransparent
            ? "bg-transparent text-white border-b border-white/15 py-5 sm:py-6"
            : "bg-[#FAF8F5]/95 backdrop-blur-md text-[#1C1917] border-b border-[#1C1917]/10 shadow-xs py-4 sm:py-5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative flex items-center justify-between">
          {/* LEFT: Clean Minimal Nav Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1 transition-colors hover:text-[#8C6B4F]"
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
                  className="transition-colors hover:underline underline-offset-8"
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
                                className="text-[11px] text-[#6B655E] hover:text-[#1C1917] tracking-wider transition-colors block"
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
                className="transition-colors hover:underline underline-offset-8"
              >
                Winter &apos;26–27
              </Link>

              <Link
                href="/shop?category=gifting"
                className="transition-colors hover:underline underline-offset-8"
              >
                Gifting
              </Link>

              <Link
                href="/bulk-enquiries"
                className="transition-colors hover:underline underline-offset-8"
              >
                Bulk &amp; Business
              </Link>

              <Link
                href="/our-story"
                className="transition-colors hover:underline underline-offset-8"
              >
                Our Story
              </Link>
            </nav>
          </div>

          {/* CENTER: Refined Serif Wordmark - Absolute Centered */}
          <div className="text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
            <Link href="/" className="inline-block group text-center">
              <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.25em] uppercase block">
                AAVAAS
              </span>
              <span
                className={`text-[8px] uppercase tracking-[0.35em] block -mt-1 font-sans transition-colors ${
                  isTransparent ? "text-stone-300" : "text-[#6B655E]"
                }`}
              >
                PANIPAT • KT INTERNATIONAL
              </span>
            </Link>
          </div>

          {/* RIGHT: Minimal Utility Icons */}
          <div className="flex items-center gap-5 sm:gap-7">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 transition-colors flex items-center gap-1.5"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[1.25]" />
              <span className="hidden xl:inline text-[11px] uppercase tracking-[0.2em] font-normal">
                Search
              </span>
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-1.5 transition-colors flex items-center gap-1.5"
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
              className="relative p-1.5 transition-colors flex items-center gap-2"
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
    </>
  );
}
