"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CATEGORIES } from "@/data/categories";
import { COLLECTIONS } from "@/data/collections";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [collectionsMenuOpen, setCollectionsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1C1917] text-[#FAF8F5] text-[11px] py-2 px-4 tracking-wider uppercase flex items-center justify-center font-medium border-b border-stone-800">
        <div className="flex items-center gap-2 text-center">
          <Sparkles className="w-3 h-3 text-amber-400 shrink-0 hidden sm:inline" />
          <span>Complimentary Pan-India Delivery Above ₹1,999</span>
          <span className="hidden md:inline text-stone-500">•</span>
          <span className="hidden md:inline text-stone-300">
            Crafted with Panipat Heritage by KT International
          </span>
        </div>
      </div>

      {/* Sticky Main Navigation */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DFD5] shadow-xs py-3.5"
            : "bg-[#FAF8F5] border-b border-[#E5DFD5]/70 py-4.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-stone-700 hover:text-stone-900 transition"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Left Nav Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {/* Shop Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setShopMenuOpen(true)}
                onMouseLeave={() => setShopMenuOpen(false)}
              >
                <Link
                  href="/shop"
                  className="flex items-center gap-1 text-xs uppercase tracking-widest text-stone-800 hover:text-stone-950 font-medium py-2 transition"
                >
                  <span>Shop</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      shopMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                {/* Shop Mega Menu Dropdown */}
                {shopMenuOpen && (
                  <div className="absolute top-full left-0 w-[840px] bg-[#FAF8F5] border border-[#E5DFD5] shadow-2xl p-6 rounded-xs grid grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="col-span-3 grid grid-cols-3 gap-6 border-r border-[#E5DFD5] pr-6">
                      {CATEGORIES.map((cat) => (
                        <div key={cat.id} className="space-y-2">
                          <Link
                            href={`/shop?category=${cat.slug}`}
                            className="font-serif text-base text-stone-900 hover:underline block font-normal"
                          >
                            {cat.name}
                          </Link>
                          <ul className="space-y-1">
                            {cat.subcategories.slice(0, 4).map((sub) => (
                              <li key={sub}>
                                <Link
                                  href={`/shop?category=${cat.slug}&subcategory=${encodeURIComponent(
                                    sub
                                  )}`}
                                  className="text-[11px] text-stone-500 hover:text-stone-900 transition block py-0.5"
                                >
                                  {sub}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Spotlight Column */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#B95D41] font-semibold">
                          Seasonal Highlight
                        </span>
                        <h4 className="font-serif text-base text-stone-900 mt-1">
                          Winter &apos;26–27 Launch
                        </h4>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          Mink blankets, polar fleece throws, and layered falalen dohars.
                        </p>
                      </div>
                      <Link
                        href="/shop?winter=true"
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-stone-900 hover:underline pt-3 border-t border-[#E5DFD5]"
                      >
                        <span>Explore Launch</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Winter Collection */}
              <Link
                href="/shop?winter=true"
                className="text-xs uppercase tracking-widest text-stone-800 hover:text-[#B95D41] font-medium transition flex items-center gap-1.5"
              >
                <span>Winter &apos;26–27</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B95D41]"></span>
              </Link>

              {/* Collections Menu */}
              <div
                className="relative"
                onMouseEnter={() => setCollectionsMenuOpen(true)}
                onMouseLeave={() => setCollectionsMenuOpen(false)}
              >
                <Link
                  href="/shop"
                  className="flex items-center gap-1 text-xs uppercase tracking-widest text-stone-800 hover:text-stone-950 font-medium py-2 transition"
                >
                  <span>Collections</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      collectionsMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                {collectionsMenuOpen && (
                  <div className="absolute top-full left-0 w-72 bg-[#FAF8F5] border border-[#E5DFD5] shadow-xl p-4 rounded-xs space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    {COLLECTIONS.map((col) => (
                      <Link
                        key={col.id}
                        href={`/shop?collection=${col.id}`}
                        className="block p-2 hover:bg-stone-100 rounded-xs transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-sm font-medium text-stone-900">
                            {col.name}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {col.priceRange}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                          {col.tagline}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Gifting */}
              <Link
                href="/shop?category=gifting"
                className="text-xs uppercase tracking-widest text-stone-800 hover:text-stone-950 font-medium transition"
              >
                Gifting
              </Link>

              {/* Bulk & Business */}
              <Link
                href="/bulk-enquiries"
                className="text-xs uppercase tracking-widest text-stone-800 hover:text-stone-950 font-medium transition"
              >
                Bulk &amp; Business
              </Link>

              {/* Our Story */}
              <Link
                href="/our-story"
                className="text-xs uppercase tracking-widest text-stone-800 hover:text-stone-950 font-medium transition"
              >
                Our Story
              </Link>
            </nav>

            {/* Brand Typographic Center Logo */}
            <div className="text-center">
              <Link href="/" className="inline-block group">
                <span className="font-serif text-2xl sm:text-3xl md:text-3xl font-normal tracking-[0.22em] text-[#1C1917] uppercase block transition group-hover:opacity-85">
                  AAVAAS
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-stone-500 block -mt-1 font-sans">
                  By KT International • Panipat
                </span>
              </Link>
            </div>

            {/* Right Utility Icons */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-stone-700 hover:text-stone-950 transition flex items-center gap-1.5"
                aria-label="Search collection"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline text-[11px] uppercase tracking-wider text-stone-400">
                  Search
                </span>
              </button>

              {/* Wishlist Drawer Trigger */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-1.5 text-stone-700 hover:text-stone-950 transition"
                aria-label={`Wishlist (${wishlistCount})`}
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B95D41] text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 text-stone-700 hover:text-stone-950 transition flex items-center gap-1.5"
                aria-label={`Shopping Bag (${cartCount})`}
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1C1917] text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="hidden xl:inline text-[11px] uppercase tracking-wider text-stone-800 font-medium">
                  Bag
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
          />
          <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-[#FAF8F5] shadow-2xl flex flex-col border-r border-[#E5DFD5]">
            <div className="p-5 border-b border-[#E5DFD5] flex items-center justify-between">
              <div>
                <span className="font-serif text-xl tracking-[0.2em] text-[#1C1917] uppercase block">
                  AAVAAS
                </span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-stone-500">
                  By KT International
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-900 transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-2">
                  Navigation
                </p>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/shop"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-base text-stone-900 block"
                    >
                      Shop All Pieces
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?winter=true"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-base text-[#B95D41] flex items-center justify-between"
                    >
                      <span>Winter &apos;26–27 Launch</span>
                      <span className="text-[10px] uppercase font-sans tracking-wider bg-[#B95D41]/10 px-2 py-0.5 rounded-xs">
                        New
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?category=gifting"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-base text-stone-900 block"
                    >
                      Gifting Suites
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/bulk-enquiries"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-base text-stone-900 block"
                    >
                      Bulk &amp; Business Enquiries
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/our-story"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-base text-stone-900 block"
                    >
                      Our Story &amp; Heritage
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-2">
                  Shop by Category
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 bg-white border border-[#E5DFD5] rounded-xs text-xs font-medium text-stone-800"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-2">
                  The Three Collections
                </p>
                <div className="space-y-1.5">
                  {COLLECTIONS.map((c) => (
                    <Link
                      key={c.id}
                      href={`/shop?collection=${c.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-2 text-xs text-stone-800 hover:bg-stone-100 rounded-xs"
                    >
                      <span>{c.name} Collection</span>
                      <span className="text-[10px] text-stone-500">{c.priceRange}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-[#E5DFD5] bg-[#EDE8E0] space-y-2 text-xs text-stone-600">
              <p className="font-serif text-stone-900 font-medium">Panipat Flagship Experience</p>
              <p className="text-[11px] leading-relaxed">
                Direct loom dispatch with verified GST invoicing for residential &amp; hospitality clients.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
