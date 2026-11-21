"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CATEGORIES } from "@/data/categories";
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // Transparent over hero on homepage until user scrolls past hero section
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        {/* Top Running Announcement Ribbon (Continuous Editorial Marquee) */}
        <div className="h-8 bg-[#191715] text-[#F8F5F0] flex items-center overflow-hidden border-b border-white/5 select-none">
          <div className="flex w-max animate-ribbon">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-6 sm:gap-8 px-4 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium shrink-0 whitespace-nowrap"
              >
                <span>COMPLIMENTARY PAN-INDIA SHIPPING ON ORDERS ABOVE ₹2,999</span>
                <span className="text-[#8C6B4F]">✦</span>
                <span>CRAFTED IN PANIPAT BY KT INTERNATIONAL</span>
                <span className="text-[#8C6B4F]">✦</span>
                <span>DIRECT MILL-GATE LINEAGE</span>
                <span className="text-[#8C6B4F]">✦</span>
                <span>100% OEKO-TEX STANDARD 100 CERTIFIED</span>
                <span className="text-[#8C6B4F]">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Navigation Bar - Height tuned with EXACT screen-width center alignment */}
        <nav
          className={`relative h-16 sm:h-20 w-full transition-colors duration-150 ease-out ${
            isTransparent
              ? "bg-gradient-to-b from-black/60 via-black/25 to-transparent text-white"
              : "bg-[#F8F5F0]/95 backdrop-blur-md text-[#191715] border-b border-[#191715]/10 shadow-[0_8px_30px_rgba(25,23,21,0.06)]"
          }`}
        >
          {/* Centered Brand Wordmark: Pinned across 100vw for absolute optical & mathematical center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <Link
              href="/"
              className="pointer-events-auto group focus:outline-none flex items-center justify-center"
            >
              <span className="font-serif text-[21px] sm:text-2xl lg:text-[28px] tracking-[0.25em] font-medium leading-none block uppercase select-none text-center">
                AAVAAS
              </span>
            </Link>
          </div>

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14 h-full relative z-10 flex items-center justify-between">
            {/* Left: Mobile Hamburger & Desktop Links */}
            <div className="flex items-center gap-3 lg:gap-7 justify-start">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-1 transition-colors hover:text-[#8C6B4F] flex items-center justify-center touch-manipulation cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden lg:flex items-center h-full gap-7 xl:gap-8 text-[13px] tracking-[0.12em] uppercase font-medium whitespace-nowrap">
                {/* 1. Shop dropdown trigger */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setShopMenuOpen(true)}
                  onMouseLeave={() => setShopMenuOpen(false)}
                >
                  <Link
                    href="/shop"
                    className="h-full flex items-center transition-colors hover:text-[#8C6B4F] whitespace-nowrap cursor-pointer"
                  >
                    <span>Shop</span>
                  </Link>

                  {/* Mega-menu dropdown panel */}
                  <AnimatePresence>
                    {shopMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed left-0 right-0 top-full w-full bg-[#F8F5F0] text-[#191715] border-b border-[#191715]/10 shadow-2xl py-10 px-8 xl:px-16"
                      >
                        <div className="max-w-[1440px] mx-auto">
                          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#191715]/10">
                            <div>
                              <p className="text-[10px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold">
                                Panipat Master Catalog
                              </p>
                              <h3 className="font-serif text-2xl text-[#191715] font-normal mt-0.5">
                                Explore Our 6 Living Departments
                              </h3>
                            </div>
                            <Link
                              href="/shop"
                              onClick={() => setShopMenuOpen(false)}
                              className="text-xs uppercase tracking-[0.18em] font-semibold text-[#191715] hover:text-[#8C6B4F] flex items-center gap-1.5 transition-colors"
                            >
                              <span>View All Products</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {CATEGORIES.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/shop?category=${cat.slug}`}
                                onClick={() => setShopMenuOpen(false)}
                                className="group block text-left"
                              >
                                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#EFEAE2] mb-3 shadow-xs">
                                  <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                  <span className="absolute bottom-2.5 left-2.5 text-[10px] font-medium text-white/90 uppercase tracking-widest">
                                    {cat.itemCount} Items
                                  </span>
                                </div>
                                <h4 className="font-serif text-base text-[#191715] font-normal group-hover:text-[#8C6B4F] transition-colors">
                                  {cat.name}
                                </h4>
                                <p className="text-[11px] text-[#5E5850] line-clamp-1 mt-0.5 font-normal">
                                  {cat.subcategories.slice(0, 2).join(", ")}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Winter '26 */}
                <Link
                  href="/shop?winter=true"
                  className="h-full flex items-center transition-colors hover:text-[#8C6B4F] whitespace-nowrap"
                >
                  <span>Winter &apos;26</span>
                </Link>

                {/* 3. Collections */}
                <Link
                  href="/shop"
                  className="h-full flex items-center transition-colors hover:text-[#8C6B4F] whitespace-nowrap"
                >
                  <span>Collections</span>
                </Link>

                {/* 4. Bulk & Trade */}
                <Link
                  href="/bulk-enquiries"
                  className="h-full flex items-center transition-colors hover:text-[#8C6B4F] whitespace-nowrap"
                >
                  <span>Bulk &amp; Trade</span>
                </Link>
              </div>
            </div>

            {/* Right: Our Story + Utilities */}
            <div className="flex items-center gap-1.5 sm:gap-6 justify-end">
              <Link
                href="/our-story"
                className="hidden xl:inline-block text-[13px] tracking-[0.12em] uppercase font-medium transition-colors hover:text-[#8C6B4F]"
              >
                Our Story
              </Link>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 sm:p-2 transition-colors hover:text-[#8C6B4F] cursor-pointer touch-manipulation"
                aria-label="Search Catalog"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-1.5 sm:p-2 transition-colors hover:text-[#8C6B4F] cursor-pointer touch-manipulation"
                aria-label={`Wishlist (${wishlistCount})`}
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[17px] h-[17px] px-1 bg-[#8C6B4F] text-white text-[9px] font-semibold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 sm:p-2 transition-colors hover:text-[#8C6B4F] cursor-pointer touch-manipulation"
                aria-label={`Shopping Bag (${cartCount})`}
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[17px] h-[17px] px-1 bg-[#191715] text-[#F8F5F0] text-[9px] font-semibold rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Animated Slide-Out Drawer - Optimized with Full Department Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-y-0 left-0 w-[85vw] max-w-sm bg-[#F8F5F0] text-[#191715] shadow-2xl flex flex-col border-r border-[#191715]/10"
            >
              {/* Drawer Top Header */}
              <div className="p-5 border-b border-[#191715]/10 flex items-center justify-between">
                <div>
                  <span className="font-serif text-2xl tracking-[0.25em] uppercase block font-medium">
                    AAVAAS
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#5E5850]">
                    Panipat • KT International
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#5E5850] hover:text-[#191715] transition rounded-full cursor-pointer touch-manipulation -mr-2"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Search Tap */}
              <div className="px-5 pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#EFEAE2] text-[#5E5850] text-xs font-normal text-left"
                >
                  <Search className="w-4 h-4 shrink-0 text-[#8C6B4F]" />
                  <span>Search bedsheets, blankets...</span>
                </button>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 text-sm">
                {/* Main Navigation Links */}
                <div className="space-y-3.5 text-left">
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl text-[#191715] block font-normal py-1"
                  >
                    Shop All
                  </Link>
                  <Link
                    href="/shop?winter=true"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl text-[#8C6B4F] flex items-center justify-between py-1"
                  >
                    <span>Winter &apos;26 Edition</span>
                    <span className="text-[9px] font-sans font-semibold uppercase tracking-wider bg-[#8C6B4F]/15 px-2 py-0.5 rounded-full">
                      New
                    </span>
                  </Link>
                  <Link
                    href="/shop?category=gifting"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl text-[#191715] block font-normal py-1"
                  >
                    Gifting Suites
                  </Link>
                  <Link
                    href="/bulk-enquiries"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl text-[#191715] block font-normal py-1"
                  >
                    Bulk &amp; Trade Portal
                  </Link>
                  <Link
                    href="/our-story"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl text-[#191715] block font-normal py-1"
                  >
                    Our Panipat Story
                  </Link>
                </div>

                {/* 6 Living Departments Grid */}
                <div className="pt-5 border-t border-[#191715]/10 text-left">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#5E5850] mb-3 font-semibold">
                    Living Departments
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2.5 rounded-xl bg-[#EFEAE2]/60 hover:bg-[#EFEAE2] transition text-left block"
                      >
                        <span className="block text-xs font-medium text-[#191715]">
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-[#5E5850]">
                          {cat.itemCount} Items
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Collections Tiers */}
                <div className="pt-4 border-t border-[#191715]/10 text-left">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#5E5850] mb-2 font-semibold">
                    Curated Collections
                  </p>
                  <div className="space-y-2">
                    <Link
                      href="/shop?collection=essential"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-[#191715] hover:text-[#8C6B4F]"
                    >
                      Essential Everyday Living
                    </Link>
                    <Link
                      href="/shop?collection=signature"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-[#191715] hover:text-[#8C6B4F]"
                    >
                      Signature Heirloom Comfort
                    </Link>
                    <Link
                      href="/shop?collection=reserve"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-[#191715] hover:text-[#8C6B4F]"
                    >
                      Reserve Small-Batch Jacquards
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Support Row */}
              <div className="p-5 border-t border-[#191715]/10 bg-[#EFEAE2]/40 flex items-center justify-between">
                <a
                  href="https://wa.me/919812000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#191715] hover:text-[#8C6B4F]"
                >
                  <MessageSquare className="w-4 h-4 text-[#8C6B4F]" />
                  <span>WhatsApp Concierge</span>
                </a>
                <span className="text-[11px] text-[#5E5850]">Panipat, India</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
