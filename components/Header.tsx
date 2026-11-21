"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CATEGORIES } from "@/data/categories";
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
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
      // On the homepage, remain seamlessly transparent over the hero carousel
      // until the user actually scrolls past the hero banner (~75vh).
      // On other pages (which don't have a full-bleed dark hero), transition immediately.
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

  // Transparent over hero on homepage until user scrolls past hero section
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        {/* Top Announcement Bar */}
        <div className="h-9 bg-[#191715] text-[#F8F5F0] flex items-center justify-center px-4 text-center border-b border-white/5">
          <p className="text-[11px] tracking-[0.18em] uppercase font-medium truncate">
            COMPLIMENTARY PAN-INDIA SHIPPING ABOVE ₹2,999 &nbsp;•&nbsp; CRAFTED IN PANIPAT
          </p>
        </div>

        {/* Main Navigation Bar - Zero delay, instant crisp text */}
        <nav
          className={`h-20 w-full transition-colors duration-150 ease-out ${
            isTransparent
              ? "bg-gradient-to-b from-black/60 via-black/25 to-transparent text-white"
              : "bg-[#F8F5F0]/95 backdrop-blur-md text-[#191715] border-b border-[#191715]/10 shadow-[0_8px_30px_rgba(25,23,21,0.06)]"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-6 lg:px-14 h-full grid grid-cols-3 items-center">
            {/* Left Column: Mobile Menu Toggle + 4 Clean Links */}
            <div className="flex items-center gap-7 justify-start">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 transition-colors hover:text-[#8C6B4F]"
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
                    className="h-full flex items-center transition-colors hover:text-[#8C6B4F] whitespace-nowrap"
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

            {/* Center Column: AAVAAS Serif Wordmark */}
            <div className="flex flex-col items-center justify-center text-center">
              <Link href="/" className="inline-block group focus:outline-none">
                <span className="font-serif text-2xl lg:text-[28px] tracking-[0.28em] font-medium leading-none block uppercase">
                  AAVAAS
                </span>
              </Link>
            </div>

            {/* Right Column: Our Story + Utilities - Instant rendering with 0 delay */}
            <div className="flex items-center gap-6 justify-end">
              <Link
                href="/our-story"
                className="hidden xl:inline-block text-[13px] tracking-[0.12em] uppercase font-medium transition-colors hover:text-[#8C6B4F]"
              >
                Our Story
              </Link>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 transition-colors hover:text-[#8C6B4F]"
                aria-label="Search Catalog"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-1.5 transition-colors hover:text-[#8C6B4F]"
                aria-label={`Wishlist (${wishlistCount})`}
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#8C6B4F] text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 transition-colors hover:text-[#8C6B4F]"
                aria-label={`Shopping Bag (${cartCount})`}
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#191715] text-[#F8F5F0] text-[10px] font-semibold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Animated Slide-Out Drawer */}
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
              className="absolute inset-y-0 left-0 max-w-sm w-full bg-[#F8F5F0] text-[#191715] shadow-2xl flex flex-col border-r border-[#191715]/10"
            >
              <div className="p-6 border-b border-[#191715]/10 flex items-center justify-between">
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
                  className="p-1.5 text-[#5E5850] hover:text-[#191715] transition rounded-full"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
                <div className="space-y-4 text-left">
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl text-[#191715] block font-normal"
                  >
                    Shop All
                  </Link>
                  <Link
                    href="/shop?winter=true"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl text-[#8C6B4F] block font-normal"
                  >
                    Winter &apos;26 Edition
                  </Link>
                  <Link
                    href="/shop?category=gifting"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl text-[#191715] block font-normal"
                  >
                    Gifting Suites
                  </Link>
                  <Link
                    href="/bulk-enquiries"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl text-[#191715] block font-normal"
                  >
                    Bulk &amp; Trade Portal
                  </Link>
                  <Link
                    href="/our-story"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xl text-[#191715] block font-normal"
                  >
                    Our Panipat Story
                  </Link>
                </div>

                <div className="pt-6 border-t border-[#191715]/10 text-left">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#5E5850] mb-3 font-semibold">
                    Living Departments
                  </p>
                  <div className="space-y-2.5">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-[13px] text-[#191715] hover:text-[#8C6B4F] transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
