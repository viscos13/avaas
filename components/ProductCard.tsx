"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR } from "@/lib/utils";
import { Heart, Star, ShoppingBag, Check, ArrowRight } from "lucide-react";
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
        return "bg-[#141210] text-[#D4AF37] border-[#D4AF37]/50";
      case "signature":
        return "bg-[#FAF7F2] text-[#B95D41] border-[#B95D41]/40";
      default:
        return "bg-[#EFE8DD] text-stone-800 border-[#CEC0AD]";
    }
  };

  return (
    <div
      className="group relative flex flex-col justify-between bg-[#FDFBF8] border border-[#E2D7C7] hover:border-stone-800 hover:shadow-[0_15px_30px_-10px_rgba(20,18,16,0.1)] transition-all duration-500 rounded-xs overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container with Rich Aspect Ratio */}
      <div className="relative aspect-4/5 w-full bg-[#EFE8DD] overflow-hidden">
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

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-[#141210]/95 backdrop-blur-xs text-[#FAF6F0] px-2.5 py-1 text-[9px] uppercase font-semibold tracking-[0.2em] border border-stone-700 shadow-md">
              {product.badge}
            </span>
          )}
          <span
            className={`px-2 py-0.5 text-[8px] uppercase tracking-[0.25em] font-medium border rounded-xs self-start backdrop-blur-xs ${getCollectionBadgeStyle(
              product.collection
            )}`}
          >
            {product.collection}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? "Saved in wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-xs ${
            inWishlist
              ? "bg-[#141210] text-[#B95D41] shadow-md scale-105"
              : "bg-[#FAF7F2]/90 text-stone-700 hover:text-black hover:bg-[#FAF7F2] hover:scale-105"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition ${
              inWishlist ? "fill-[#B95D41] stroke-[#B95D41]" : "stroke-stone-800"
            }`}
          />
        </button>

        {/* Hover Drawer: Quick Select & Refined Luxury Action Button */}
        <div
          className={`hidden md:flex absolute bottom-0 inset-x-0 bg-[#FAF7F2]/98 backdrop-blur-md border-t border-[#E2D7C7] p-3.5 flex-col gap-2.5 transition-transform duration-300 ease-out ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {product.sizes.length > 1 && (
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-widest font-medium">
                Size:
              </span>
              <div className="flex gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(s.name);
                    }}
                    className={`px-2.5 py-1 text-[10px] font-medium transition rounded-xs border ${
                      selectedSize === s.name
                        ? "bg-[#141210] text-white border-[#141210]"
                        : "bg-white text-stone-800 border-[#E2D7C7] hover:border-stone-800"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Luxury Add to Bag button */}
          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`w-full py-2.5 px-4 text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-300 flex items-center justify-center gap-2 rounded-xs border shadow-sm ${
              isAdded
                ? "bg-emerald-900 text-white border-emerald-900"
                : "bg-[#141210] hover:bg-[#25221F] hover:border-[#C5A880] text-[#FAF6F0] border-[#141210]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Information Section */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="uppercase tracking-[0.18em] text-[10px] font-medium">
              {product.subcategory}
            </span>
            <div className="flex items-center gap-1 text-stone-700">
              <Star className="w-3 h-3 fill-[#D4AF37] stroke-[#D4AF37]" />
              <span className="font-semibold text-[11px]">{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-serif text-base sm:text-lg font-normal text-stone-900 group-hover:underline line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-stone-500 line-clamp-1 mt-1 font-serif italic">
            {product.fabric}
          </p>
        </div>

        {/* Pricing & Mobile Action */}
        <div className="pt-3 border-t border-[#EAE3D7] flex items-center justify-between">
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-base sm:text-lg font-medium text-stone-900">
              {formatINR(displayPrice)}
            </span>
            {displayOriginalPrice > displayPrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatINR(displayOriginalPrice)}
              </span>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={handleQuickAdd}
            className="md:hidden p-2 bg-[#141210] text-white rounded-xs hover:bg-stone-800 transition"
            aria-label="Add to bag"
          >
            {isAdded ? <Check className="w-4 h-4 text-emerald-300" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
