"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR } from "@/lib/utils";
import { Heart, Plus, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Default");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.name || "Standard");
  const [isHovered, setIsHovered] = useState(false);
  const [addedEffect, setAddedEffect] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (sizeName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const sizeObj = product.sizes.find((s) => s.name === sizeName) || product.sizes[0];
    const unitPrice = product.price + (sizeObj?.priceModifier || 0);

    addItem(product, sizeName, selectedColor, 1, unitPrice);
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 1400);
  };

  // Subdetail label (e.g. "680 GSM Micro-Mink • Double" or "400TC Supima Cotton")
  const subDetail = product.gsm
    ? `${product.gsm} • ${product.subcategory}`
    : product.threadCount
    ? `${product.threadCount} • ${product.subcategory}`
    : `${product.subcategory}`;

  return (
    <div
      className="group flex flex-col text-left select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with rounded-xl / rounded-2xl */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#EFEAE2] shadow-xs">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Editorial color grade overlay */}
          <div className="absolute inset-0 bg-[#3A2E25]/5 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
        </Link>

        {/* Top-Left: Collection badge pill */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 pointer-events-none z-10">
          <span className="bg-white/90 backdrop-blur-md rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase text-[#191715] shadow-xs">
            {product.collection}
          </span>
        </div>

        {/* Top-Right: Wishlist heart button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10 shadow-xs cursor-pointer touch-manipulation ${
            inWishlist ? "text-[#8C6B4F] scale-105" : "text-[#191715] hover:scale-110 active:scale-95"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? "fill-current" : "stroke-[1.5]"}`} />
        </button>

        {/* MOBILE ONLY: Dedicated Tap Quick-Add Floating Button */}
        <button
          onClick={(e) => handleQuickAdd(selectedSize, e)}
          className={`lg:hidden absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-20 cursor-pointer touch-manipulation active:scale-90 transition-all ${
            addedEffect
              ? "bg-emerald-800 text-white"
              : "bg-[#191715]/90 text-white backdrop-blur-md active:bg-[#8C6B4F]"
          }`}
          aria-label={`Add ${product.name} to bag`}
        >
          {addedEffect ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Plus className="w-4 h-4 stroke-[2]" />
          )}
        </button>

        {/* DESKTOP ONLY: Hover Quick-Add Floating Bar with Size Options */}
        <div
          className={`hidden lg:flex absolute bottom-3 inset-x-3 rounded-xl bg-white/95 backdrop-blur-md p-2 shadow-lg transition-all duration-300 items-center justify-between gap-1.5 z-20 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-1">
            {product.sizes.map((s) => {
              const shortName = s.name.charAt(0);
              return (
                <button
                  key={s.name}
                  onClick={(e) => handleQuickAdd(s.name, e)}
                  className={`w-7 h-7 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition cursor-pointer ${
                    selectedSize === s.name
                      ? "bg-[#191715] text-white"
                      : "bg-[#F8F5F0] text-[#191715] hover:bg-[#EFEAE2]"
                  }`}
                  title={`Add ${s.name} size`}
                >
                  {shortName}
                </button>
              );
            })}
          </div>

          <button
            onClick={(e) => handleQuickAdd(selectedSize, e)}
            className={`flex-1 py-1.5 px-3 text-[11px] font-medium tracking-wider uppercase rounded-lg transition text-center flex items-center justify-center gap-1 cursor-pointer ${
              addedEffect
                ? "bg-emerald-800 text-white"
                : "bg-[#191715] text-[#F8F5F0] hover:bg-[#8C6B4F]"
            }`}
          >
            {addedEffect ? (
              <>
                <Check className="w-3 h-3" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Details Container */}
      <div className="pt-2.5 sm:pt-3.5 flex flex-col gap-0.5 sm:gap-1 text-left">
        <Link href={`/products/${product.slug}`} className="group-hover:text-[#8C6B4F] transition">
          <h3 className="text-[13px] sm:text-[15px] font-medium text-[#191715] leading-snug line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-[11px] sm:text-xs text-[#5E5850] font-normal truncate">
          {subDetail}
        </p>

        <div className="pt-0.5 sm:pt-1 flex items-center justify-between">
          <span className="text-[13px] sm:text-[15px] font-semibold text-[#191715]">
            {formatINR(product.price)}
          </span>

          {/* Interactive Color Dots */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {product.colors.slice(0, 3).map((col) => (
              <button
                key={col.name}
                onClick={() => setSelectedColor(col.name)}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-black/15 transition-transform cursor-pointer touch-manipulation ${
                  selectedColor === col.name ? "scale-125 ring-1 ring-[#191715] ring-offset-1" : "hover:scale-110"
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
                aria-label={`Select ${col.name} color`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
