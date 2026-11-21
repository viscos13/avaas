"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR } from "@/lib/utils";
import { Heart, Star, ShoppingBag, Check } from "lucide-react";
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

  // Selected size modifier
  const currentSizeObj = product.sizes.find((s) => s.name === selectedSize);
  const displayPrice = product.price + (currentSizeObj?.priceModifier || 0);
  const displayOriginalPrice = product.originalPrice + (currentSizeObj?.priceModifier || 0);

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

  const getCollectionBadgeStyle = (collection: string) => {
    switch (collection) {
      case "reserve":
        return "bg-[#5A6349]/10 text-[#474E39] border-[#5A6349]/30";
      case "signature":
        return "bg-[#B95D41]/10 text-[#9F4D34] border-[#B95D41]/30";
      default:
        return "bg-stone-200/80 text-stone-700 border-stone-300";
    }
  };

  return (
    <div
      className="group relative flex flex-col justify-between bg-white border border-[#E5DFD5] hover:border-stone-400 transition-all duration-300 rounded-xs overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Container */}
      <div className="relative aspect-3/4 w-full bg-[#FAF8F5] overflow-hidden">
        {/* Main & Secondary Image with smooth crossfade */}
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={`object-cover transition-all duration-700 ${
              isHovered && hasMultipleImages ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
          />
          {hasMultipleImages && (
            <Image
              src={product.images[1]}
              alt={`${product.name} lifestyle detail`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover absolute inset-0 transition-all duration-700 ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-[#FAF8F5]/95 backdrop-blur-xs text-[#1C1917] px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider border border-[#E5DFD5] shadow-xs">
              {product.badge}
            </span>
          )}
          <span
            className={`px-2 py-0.5 text-[9px] uppercase tracking-widest font-medium border rounded-xs self-start backdrop-blur-xs ${getCollectionBadgeStyle(
              product.collection
            )}`}
          >
            {product.collection}
          </span>
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            inWishlist
              ? "bg-[#FAF8F5] text-[#B95D41] shadow-md"
              : "bg-[#FAF8F5]/80 text-stone-500 hover:text-stone-900 hover:bg-[#FAF8F5]"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition ${
              inWishlist ? "fill-[#B95D41] stroke-[#B95D41]" : "stroke-stone-700"
            }`}
          />
        </button>

        {/* Hover Size Quick Select & Add to Bag Drawer on Desktop */}
        <div
          className={`hidden md:flex absolute bottom-0 inset-x-0 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E5DFD5] p-3 flex-col gap-2 transition-transform duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {product.sizes.length > 1 && (
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider">Size:</span>
              <div className="flex gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(s.name);
                    }}
                    className={`px-2 py-0.5 text-[10px] font-medium transition rounded-xs border ${
                      selectedSize === s.name
                        ? "bg-[#1C1917] text-white border-[#1C1917]"
                        : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`w-full py-2 px-3 text-xs uppercase tracking-widest font-medium transition flex items-center justify-center gap-2 rounded-xs ${
              isAdded
                ? "bg-emerald-800 text-white"
                : "bg-[#1C1917] hover:bg-stone-800 text-white"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Information Details */}
      <div className="p-3.5 md:p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="uppercase tracking-wider">{product.subcategory}</span>
            <div className="flex items-center gap-1 text-stone-600">
              <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
              <span className="font-medium text-[11px]">{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-serif text-sm md:text-base font-normal text-stone-900 group-hover:underline line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
            {product.fabric}
          </p>
        </div>

        {/* Price & Mobile Add to Bag */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xs md:text-sm font-semibold text-stone-900">
              {formatINR(displayPrice)}
            </span>
            {displayOriginalPrice > displayPrice && (
              <span className="text-[11px] text-stone-400 line-through">
                {formatINR(displayOriginalPrice)}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="md:hidden p-1.5 bg-stone-900 text-white rounded-xs hover:bg-stone-800 transition"
            aria-label="Add to bag"
          >
            {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
