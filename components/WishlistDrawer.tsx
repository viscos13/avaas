"use client";

import React, { useEffect } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { X, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E5DFD5]">
          {/* Header */}
          <div className="p-6 border-b border-[#E5DFD5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#B95D41] fill-[#B95D41]" />
              <h3 className="font-serif text-lg tracking-wide text-stone-900">
                Your Saved Pieces ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-800 transition"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-stone-400">
                  <Heart className="w-6 h-6 stroke-1" />
                </div>
                <h4 className="font-serif text-xl text-stone-800">Your wishlist is empty</h4>
                <p className="text-xs text-stone-500 mt-2 max-w-xs leading-relaxed">
                  Curate your sanctuary. Save your favorite Winter &apos;26–27 pieces and timeless bedding here to review later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-widest hover:bg-stone-800 transition rounded-xs"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#E5DFD5]">
                {wishlist.map((product) => (
                  <div key={product.id} className="py-4 flex gap-4">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => setIsWishlistOpen(false)}
                      className="relative w-20 h-24 bg-stone-100 shrink-0 overflow-hidden rounded-xs"
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
                            className="font-serif text-sm text-stone-900 hover:underline line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="text-stone-400 hover:text-stone-700 transition"
                            aria-label="Remove item"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 capitalize mt-0.5">
                          {product.subcategory} • {product.collection}
                        </p>
                        <p className="text-xs font-medium text-stone-900 mt-1">
                          {formatINR(product.price)}
                          {product.originalPrice > product.price && (
                            <span className="text-[11px] text-stone-400 line-through ml-2">
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
                          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-[#1C1917] text-white text-[11px] uppercase tracking-wider hover:bg-stone-800 transition rounded-xs"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={() => setIsWishlistOpen(false)}
                          className="p-1.5 border border-stone-300 text-stone-600 hover:text-stone-900 transition rounded-xs"
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
        </div>
      </div>
    </div>
  );
}
