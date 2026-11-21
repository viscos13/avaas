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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Royal Announcement Strip */}
      <div className="bg-[#141210] text-[#F5F0E6] text-[11px] py-2.5 px-6 tracking-[0.28em] uppercase flex items-center justify-center font-medium border-b border-stone-800/80">
        <div className="flex items-center gap-3 text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span>Complimentary Pan-India Delivery on Orders Above ₹1,999</span>
          <span className="hidden md:inline text-stone-600">|</span>
          <span className="hidden md:inline text-stone-300">
            Crafted in Panipat by KT International
          </span>
        </div>
      </div>

      {/* Spacious Luxury Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E2D9CC] shadow-xs py-4 sm:py-5"
            : "bg-[#FAF7F2] border-b border-[#E8E1D5] py-6 sm:py-7"
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-6">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 lg:hidden text-stone-800 hover:text-stone-950 transition"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link href="/" className="group block">
                <span className="font-serif text-2xl sm:text-3xl md:text-3xl font-light tracking-[0.32em] text-[#141210] uppercase block transition group-hover:opacity-80">
                  AAVAAS
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.32em] text-stone-500 block -mt-1 font-sans">
                  KT INTERNATIONAL • PANIPAT
                </span>
              </Link>
            </div>

            {/* Center: Spacious Editorial Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-11">
              {/* Shop Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setShopMenuOpen(true)}
                onMouseLeave={() => setShopMenuOpen(false)}
              >
                <Link
                  href="/shop"
                  className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-stone-800 hover:text-stone-950 font-medium py-3 transition group"
                >
                  <span className="group-hover:border-b group-hover:border-stone-900 pb-0.5">Shop</span>
                  <ChevronDown
                    className={`w-3 h-3 text-stone-400 transition-transform duration-300 ${
                      shopMenuOpen ? "rotate-180 text-stone-900" : ""
                    }`}
                  />
                </Link>

                {/* Mega Menu Dropdown */}
                {shopMenuOpen && (
                  <div className="absolute top-full -left-20 w-[920px] bg-[#FAF7F2] border border-[#E2D9CC] shadow-2xl p-8 rounded-xs grid grid-cols-4 gap-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="col-span-3 grid grid-cols-3 gap-8 border-r border-[#E2D9CC] pr-8">
                      {CATEGORIES.map((cat) => (
                        <div key={cat.id} className="space-y-3">
                          <Link
                            href={`/shop?category=${cat.slug}`}
                            className="font-serif text-lg text-stone-900 hover:underline block font-normal tracking-wide"
                          >
                            {cat.name}
                          </Link>
                          <ul className="space-y-1.5">
                            {cat.subcategories.slice(0, 4).map((sub) => (
                              <li key={sub}>
                                <Link
                                  href={`/shop?category=${cat.slug}&subcategory=${encodeURIComponent(
                                    sub
                                  )}`}
                                  className="text-xs text-stone-600 hover:text-stone-950 transition block py-0.5"
                                >
                                  {sub}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Spotlight Showcase Column */}
                    <div className="flex flex-col justify-between pl-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B95D41] font-semibold">
                          Seasonal Debut
                        </span>
                        <h4 className="font-serif text-lg text-stone-900 mt-1">
                          Winter &apos;26–27 Launch
                        </h4>
                        <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                          680 GSM cloud mink blankets, reversible sherpa fleece, and falalen dohars.
                        </p>
                      </div>
                      <Link
                        href="/shop?winter=true"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-stone-900 hover:text-[#B95D41] transition pt-4 border-t border-[#E2D9CC]"
                      >
                        <span>Explore Launch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Winter Collection Link */}
              <Link
                href="/shop?winter=true"
                className="text-[11px] uppercase tracking-[0.22em] text-[#B95D41] hover:text-[#973e27] font-semibold transition flex items-center gap-1.5"
              >
                <span>Winter &apos;26–27</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B95D41] animate-pulse"></span>
              </Link>

              {/* Collections Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCollectionsMenuOpen(true)}
                onMouseLeave={() => setCollectionsMenuOpen(false)}
              >
                <Link
                  href="/shop"
                  className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-stone-800 hover:text-stone-950 font-medium py-3 transition group"
                >
                  <span className="group-hover:border-b group-hover:border-stone-900 pb-0.5">Collections</span>
                  <ChevronDown
                    className={`w-3 h-3 text-stone-400 transition-transform duration-300 ${
                      collectionsMenuOpen ? "rotate-180 text-stone-900" : ""
                    }`}
                  />
                </Link>

                {collectionsMenuOpen && (
                  <div className="absolute top-full left-0 w-80 bg-[#FAF7F2] border border-[#E2D9CC] shadow-2xl p-5 rounded-xs space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    {COLLECTIONS.map((col) => (
                      <Link
                        key={col.id}
                        href={`/shop?collection=${col.id}`}
                        className="block p-3 hover:bg-[#EFE9DF] rounded-xs transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-base font-normal text-stone-900">
                            {col.name}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {col.priceRange}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1 line-clamp-1">
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
                className="text-[11px] uppercase tracking-[0.22em] text-stone-800 hover:text-stone-950 font-medium transition py-1 hover:border-b hover:border-stone-900"
              >
                Gifting
              </Link>

              {/* Bulk & Business */}
              <Link
                href="/bulk-enquiries"
                className="text-[11px] uppercase tracking-[0.22em] text-stone-800 hover:text-stone-950 font-medium transition py-1 hover:border-b hover:border-stone-900"
              >
                Bulk &amp; Business
              </Link>

              {/* Our Story */}
              <Link
                href="/our-story"
                className="text-[11px] uppercase tracking-[0.22em] text-stone-800 hover:text-stone-950 font-medium transition py-1 hover:border-b hover:border-stone-900"
              >
                Our Story
              </Link>
            </nav>

            {/* COMPLETE RIGHT SIDE: Search, Wishlist, and Shopping Bag with generous luxury spacing */}
            <div className="flex items-center gap-6 sm:gap-8 ml-auto">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="group flex items-center gap-2 p-1.5 text-stone-800 hover:text-stone-950 transition"
                aria-label="Search"
              >
                <Search className="w-4 h-4 stroke-[1.5] transition group-hover:scale-110" />
                <span className="hidden xl:inline text-[11px] uppercase tracking-[0.22em] font-medium text-stone-600 group-hover:text-stone-950">
                  Search
                </span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="group relative flex items-center gap-2 p-1.5 text-stone-800 hover:text-stone-950 transition"
                aria-label={`Wishlist (${wishlistCount})`}
              >
                <Heart className="w-4 h-4 stroke-[1.5] transition group-hover:scale-110" />
                <span className="hidden xl:inline text-[11px] uppercase tracking-[0.22em] font-medium text-stone-600 group-hover:text-stone-950">
                  Wishlist
                </span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#B95D41] text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag — Placed on the COMPLETE RIGHT SIDE */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="group relative flex items-center gap-2.5 px-4 py-2 bg-[#141210] hover:bg-stone-800 text-white rounded-xs shadow-sm transition active:scale-95"
                aria-label={`Shopping Bag (${cartCount})`}
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                <span className="text-[11px] uppercase tracking-[0.22em] font-medium">
                  Bag {cartCount > 0 && `(${cartCount})`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
          />
          <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-[#FAF7F2] shadow-2xl flex flex-col border-r border-[#E2D9CC]">
            <div className="p-6 border-b border-[#E2D9CC] flex items-center justify-between">
              <div>
                <span className="font-serif text-2xl tracking-[0.25em] text-[#141210] uppercase block">
                  AAVAAS
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-sans">
                  KT International • Panipat
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-950 transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-7">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-lg text-stone-900 block"
                  >
                    Shop All Sanctuary
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?winter=true"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-lg text-[#B95D41] flex items-center justify-between"
                  >
                    <span>Winter &apos;26–27 Launch</span>
                    <span className="text-[9px] uppercase font-sans tracking-widest bg-[#B95D41]/10 px-2 py-0.5 rounded-xs font-semibold">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=gifting"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-lg text-stone-900 block"
                  >
                    Gifting Suites
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bulk-enquiries"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-lg text-stone-900 block"
                  >
                    Bulk &amp; Business Enquiries
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-story"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-lg text-stone-900 block"
                  >
                    Our Story &amp; Heritage
                  </Link>
                </li>
              </ul>

              <div className="pt-4 border-t border-[#E2D9CC]">
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-3">
                  Shop by Department
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 bg-[#EFE9DF] border border-[#E2D9CC] rounded-xs text-xs font-medium text-stone-800"
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
