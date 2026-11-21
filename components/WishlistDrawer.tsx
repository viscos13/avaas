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
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-500"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E2D7C7]">
          {/* Header */}
          <div className="p-6 sm:p-7 border-b border-[#E2D7C7] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#B95D41] fill-[#B95D41]" />
              <h3 className="font-serif text-xl tracking-wide text-stone-900 font-light">
                Saved Pieces ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-950 transition"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-7">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE8DD] border border-[#CEC0AD] flex items-center justify-center text-stone-400">
                  <Heart className="w-7 h-7 stroke-1" />
                </div>
                <h4 className="font-serif text-2xl text-stone-800 font-light">Your wishlist is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed font-serif italic">
                  Curate your sanctuary. Save your favorite Winter &apos;26–27 pieces and timeless bedding here to review later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-4 px-8 py-3.5 bg-[#141210] hover:bg-stone-800 text-white text-xs uppercase tracking-[0.25em] font-semibold transition rounded-xs shadow-md"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#EAE3D7]">
                {wishlist.map((product) => (
                  <div key={product.id} className="py-5 flex gap-4">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => setIsWishlistOpen(false)}
                      className="relative w-20 h-26 bg-[#EFE8DD] shrink-0 overflow-hidden rounded-xs border border-[#E2D7C7]"
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
                            className="font-serif text-base text-stone-900 hover:underline line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="text-stone-400 hover:text-stone-800 transition p-1"
                            aria-label="Remove item"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-stone-500 capitalize mt-1">
                          {product.subcategory} • {product.collection}
                        </p>
                        <p className="text-sm font-serif font-medium text-stone-900 mt-1">
                          {formatINR(product.price)}
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-stone-400 line-through ml-2">
                              {formatINR(product.originalPrice)}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() => {
                            const defaultSize = product.sizes[0]?.name || "Standard";
                            const defaultColor = product.colors[0]?.name || "Default";
                            addItem(product, defaultSize, defaultColor, 1);
                            removeFromWishlist(product.id);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#141210] hover:bg-stone-800 text-white text-[11px] uppercase tracking-[0.2em] font-semibold transition rounded-xs shadow-sm"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={() => setIsWishlistOpen(false)}
                          className="p-2 border border-[#CEC0AD] text-stone-600 hover:text-stone-900 transition rounded-xs"
                          aria-label="View details"
                        >
                          <ArrowRight className="w-4 h-4" />
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
