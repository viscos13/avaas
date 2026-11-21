"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR } from "@/lib/utils";
import { Heart, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0]?.name || "Standard"
  );
  const [isAdded, setIsAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const hasMultipleImages = product.images.length > 1;

  const currentSizeObj = product.sizes.find((s) => s.name === selectedSize);
  const displayPrice = product.price + (currentSizeObj?.priceModifier || 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors[0]?.name || "Natural";
    addItem(product, selectedSize, defaultColor, 1, displayPrice);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col justify-between bg-transparent transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tall Portrait Image Container (aspect-[3/4], completely borderless, sharp corners) */}
      <div className="relative aspect-3/4 w-full bg-[#EDE8E0] overflow-hidden rounded-none">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered && hasMultipleImages ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
          />
          {hasMultipleImages && (
            <Image
              src={product.images[1]}
              alt={`${product.name} styled angle`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover absolute inset-0 transition-all duration-700 ease-out ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}
        </Link>

        {/* Minimalist Heart Icon Top Right */}
        <button
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? "Saved in wishlist" : "Add to wishlist"}
          className="absolute top-3.5 right-3.5 z-10 p-2 text-stone-700 hover:text-black transition"
        >
          <Heart
            className={`w-4 h-4 stroke-[1.25] transition ${
              inWishlist ? "fill-[#B95D41] stroke-[#B95D41]" : "fill-white/70 stroke-stone-800"
            }`}
          />
        </button>

        {/* On-Hover Translucent Frosted Quick-Add Bar */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-[#FAF8F5]/92 backdrop-blur-md px-3 py-2.5 flex items-center justify-between text-[11px] transition-transform duration-300 ease-out ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          {/* Quick Size Select */}
          <div className="flex items-center gap-1.5">
            {product.sizes.map((s) => (
              <button
                key={s.name}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSize(s.name);
                }}
                className={`px-1.5 py-0.5 text-[10px] uppercase font-mono transition ${
                  selectedSize === s.name
                    ? "text-[#1C1917] font-bold border-b border-[#1C1917]"
                    : "text-[#6B655E] hover:text-[#1C1917]"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Quick Add Trigger */}
          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1C1917] hover:text-[#B95D41] transition flex items-center gap-1"
          >
            {isAdded ? (
              <>
                <Check className="w-3 h-3 text-emerald-700" />
                <span>Added</span>
              </>
            ) : (
              <span>+ Quick Add</span>
            )}
          </button>
        </div>
      </div>

      {/* Editorial Details Below Image (Left-aligned, zero box clutter) */}
      <div className="pt-3.5 pb-2 text-left">
        {/* Line 1: Collection label in tiny muted uppercase */}
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B655E] font-medium">
          {product.collection}
        </p>

        {/* Line 2: Product title in refined regular font */}
        <Link href={`/products/${product.slug}`} className="block mt-0.5">
          <h3 className="text-sm text-[#1C1917] hover:underline font-normal line-clamp-1 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Line 3: Price in clean INR + tiny circular color dots on right */}
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-[#1C1917] font-medium font-sans">
            {formatINR(displayPrice)}
          </span>

          {/* Color swatch dots */}
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((c) => (
              <span
                key={c.name}
                className="w-2 h-2 rounded-full border border-black/15"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
