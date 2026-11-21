"use client";

import React, { useEffect } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { X, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isWishlistOpen]);

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-full sm:max-w-md bg-[#F8F5F0] shadow-2xl flex flex-col border-l border-[#191715]/10 text-left"
            >
              {/* Header */}
              <div className="p-6 sm:p-7 border-b border-[#191715]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Heart className="w-5 h-5 text-[#8C6B4F] fill-current" />
                  <h3 className="font-serif text-2xl text-[#191715] font-normal">
                    Saved Pieces ({wishlist.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 text-[#5E5850] hover:text-[#191715] transition rounded-full"
                  aria-label="Close wishlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-7">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#EFEAE2] flex items-center justify-center text-[#5E5850]">
                      <Heart className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif text-2xl text-[#191715]">Your wishlist is empty</h4>
                    <p className="text-xs text-[#5E5850] max-w-xs leading-relaxed">
                      Curate your sanctuary. Save your favorite Winter 2026–27 pieces and timeless bedding here to review later.
                    </p>
                    <button
                      onClick={() => setIsWishlistOpen(false)}
                      className="mt-4 px-8 py-3.5 bg-[#191715] hover:bg-[#8C6B4F] text-[#F8F5F0] text-xs uppercase tracking-[0.18em] font-semibold transition rounded-full shadow-md"
                    >
                      Explore Collection
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-[#191715]/10">
                    {wishlist.map((product) => (
                      <div key={product.id} className="py-5 flex gap-4">
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={() => setIsWishlistOpen(false)}
                          className="relative w-20 h-24 bg-[#EFEAE2] shrink-0 overflow-hidden rounded-xl shadow-xs"
                        >
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </Link>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                href={`/products/${product.slug}`}
                                onClick={() => setIsWishlistOpen(false)}
                                className="text-sm font-medium text-[#191715] hover:underline line-clamp-1"
                              >
                                {product.name}
                              </Link>
                              <button
                                onClick={() => removeFromWishlist(product.id)}
                                className="text-[#5E5850] hover:text-rose-700 transition p-1"
                                aria-label="Remove item"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-[11px] text-[#5E5850] capitalize mt-0.5">
                              {product.subcategory} • {product.collection}
                            </p>
                            <p className="text-sm font-semibold text-[#191715] mt-1">
                              {formatINR(product.price)}
                              {product.originalPrice > product.price && (
                                <span className="text-xs text-[#5E5850] line-through ml-2 font-normal">
                                  {formatINR(product.originalPrice)}
                                </span>
                              )}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={() => {
                                const defaultSize = product.sizes[0]?.name || "Standard";
                                const defaultColor = product.colors[0]?.name || "Default";
                                addItem(product, defaultSize, defaultColor, 1);
                                removeFromWishlist(product.id);
                              }}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#191715] hover:bg-[#8C6B4F] text-white text-xs uppercase tracking-wider font-semibold transition rounded-full shadow-sm"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Move to Bag</span>
                            </button>
                            <Link
                              href={`/products/${product.slug}`}
                              onClick={() => setIsWishlistOpen(false)}
                              className="p-2.5 border border-[#191715]/20 hover:border-[#191715] text-[#191715] transition rounded-full"
                              aria-label="View details"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
