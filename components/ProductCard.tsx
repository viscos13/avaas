"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR } from "@/lib/utils";
import { Heart, Plus } from "lucide-react";

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
    setTimeout(() => setAddedEffect(false), 1200);
  };

  // Subdetail label (e.g. "680 GSM Micro-Mink • Double" or "400TC Supima Cotton")
  const subDetail = product.gsm
    ? `${product.gsm} • ${product.subcategory}`
    : product.threadCount
    ? `${product.threadCount} • ${product.subcategory}`
    : `${product.subcategory}`;

  return (
    <div
      className="group flex flex-col text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with rounded-2xl */}
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#EFEAE2] shadow-xs">
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

        {/* Top-Left: Subtle frosted pill tag */}
        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <span className="bg-white/85 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#191715] shadow-xs">
            {product.collection}
          </span>
        </div>

        {/* Top-Right: Circular frosted Wishlist heart button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10 shadow-xs ${
            inWishlist ? "text-[#8C6B4F] scale-105" : "text-[#191715] hover:scale-110"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : "stroke-[1.5]"}`} />
        </button>

        {/* Hover Quick-Add Floating Bar */}
        <div
          className={`absolute bottom-3 inset-x-3 rounded-xl bg-white/95 backdrop-blur-md p-2 shadow-lg transition-all duration-300 flex items-center justify-between gap-1.5 z-20 ${
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
                  className={`w-7 h-7 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition ${
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
            className="flex-1 py-1.5 px-3 bg-[#191715] text-[#F8F5F0] hover:bg-[#8C6B4F] text-[11px] font-medium tracking-wider uppercase rounded-lg transition text-center flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>{addedEffect ? "Added!" : "Quick Add"}</span>
          </button>
        </div>
      </div>

      {/* Details Container */}
      <div className="pt-3.5 flex flex-col gap-1 text-left">
        <Link href={`/products/${product.slug}`} className="group-hover:text-[#8C6B4F] transition">
          <h3 className="text-[15px] font-medium text-[#191715] leading-snug line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-[#5E5850] font-normal truncate">
          {subDetail}
        </p>

        <div className="pt-1 flex items-center justify-between">
          <span className="text-[15px] font-semibold text-[#191715]">
            {formatINR(product.price)}
          </span>

          {/* Interactive Color Dots */}
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 3).map((col) => (
              <button
                key={col.name}
                onClick={() => setSelectedColor(col.name)}
                className={`w-3.5 h-3.5 rounded-full border border-black/15 transition-transform ${
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
