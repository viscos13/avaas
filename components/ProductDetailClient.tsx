"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR } from "@/lib/utils";
import { checkDeliveryPincode, PincodeInfo } from "@/lib/pincodes";
import ProductCard from "@/components/ProductCard";
import {
  Heart,
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Play,
  X,
  Check,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Default");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.name || "Standard");
  const [quantity, setQuantity] = useState(1);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Pincode checker state
  const [pincodeInput, setPincodeInput] = useState("110001");
  const [pincodeResult, setPincodeResult] = useState<PincodeInfo | null>(() =>
    checkDeliveryPincode("110001")
  );
  const [pincodeError, setPincodeError] = useState("");

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    material: true,
    specs: false,
    care: false,
    shipping: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentSizeObj = product.sizes.find((s) => s.name === selectedSize) || product.sizes[0];
  const unitPrice = product.price + (currentSizeObj?.priceModifier || 0);
  const originalPrice = product.originalPrice + (currentSizeObj?.priceModifier || 0);

  const inWishlist = isInWishlist(product.id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setPincodeError("");
    const info = checkDeliveryPincode(pincodeInput);
    if (!info) {
      setPincodeError("Please enter a valid 6-digit Indian pincode.");
      setPincodeResult(null);
    } else {
      setPincodeResult(info);
    }
  };

  const handleAddToBag = () => {
    addItem(product, selectedSize, selectedColor, quantity, unitPrice);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, selectedColor, quantity, unitPrice);
    router.push("/checkout");
  };

  return (
    <div className="pt-28 pb-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-[#6B655E] mb-10 overflow-x-auto whitespace-nowrap font-light">
          <Link href="/" className="hover:text-[#1C1917] transition">
            Home
          </Link>
          <span className="text-stone-300">/</span>
          <Link href="/shop" className="hover:text-[#1C1917] transition">
            Shop
          </Link>
          <span className="text-stone-300">/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-[#1C1917] transition capitalize"
          >
            {product.category}
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-[#1C1917] font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT: Multi-Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-18 h-24 bg-[#EDE8E0] overflow-hidden transition-all duration-300 ${
                    activeImageIndex === idx
                      ? "ring-1 ring-[#1C1917]"
                      : "opacity-75 hover:opacity-100"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}

              {/* Loom Video Button */}
              <button
                onClick={() => setIsVideoOpen(true)}
                className="relative w-18 h-24 bg-[#EFECE6] border border-[#1C1917]/10 flex flex-col items-center justify-center text-center p-2 group transition hover:border-[#1C1917]"
                aria-label="Watch video reel"
              >
                <div className="w-7 h-7 rounded-full bg-[#1C1917] text-white flex items-center justify-center mb-1 group-hover:scale-110 transition">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#1C1917] font-medium">
                  Loom Reel
                </span>
              </button>
            </div>

            {/* Main Featured Photo (aspect-[4/5] borderless) */}
            <div className="relative flex-1 aspect-4/5 bg-[#EDE8E0] overflow-hidden">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />

              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1917] bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1">
                  {product.collection} Tier
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Purchasing Details */}
          <div className="lg:col-span-5 space-y-7">
            <div className="space-y-2">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#6B655E] font-medium">
                {product.subcategory}
              </p>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-light leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-[#6B655E] font-serif italic pt-0.5">
                {product.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? "fill-[#1C1917] stroke-[#1C1917]"
                          : "fill-stone-200 stroke-stone-300"
                      }`}
                    />
                  ))}
                  <span className="font-medium text-[#1C1917] ml-1">{product.rating}</span>
                </div>
                <span className="text-stone-300">•</span>
                <a href="#reviews" className="text-[#6B655E] hover:text-[#1C1917] underline text-[11px] uppercase tracking-wider">
                  {product.reviewsCount} Verified Reviews
                </a>
              </div>
            </div>

            {/* Price */}
            <div className="py-4 border-y border-[#1C1917]/10 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-normal text-[#1C1917]">
                {formatINR(unitPrice)}
              </span>
              {originalPrice > unitPrice && (
                <span className="text-sm text-[#6B655E] line-through font-light">
                  {formatINR(originalPrice)}
                </span>
              )}
              <span className="text-[11px] text-[#6B655E] ml-auto font-light">
                Inclusive of all Indian taxes (GST)
              </span>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#1C1917] uppercase tracking-wider text-[11px]">
                  Color: <strong className="font-medium">{selectedColor}</strong>
                </span>
                <span className="text-[#6B655E] text-[11px] font-mono">
                  {product.colors.length} shades
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`p-0.5 rounded-full transition ${
                      selectedColor === c.name ? "ring-1 ring-[#1C1917] ring-offset-2" : ""
                    }`}
                    title={c.name}
                  >
                    <span
                      className="block w-6 h-6 rounded-full border border-black/15"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#1C1917] uppercase tracking-wider text-[11px]">
                  Size: <strong className="font-medium">{selectedSize}</strong>
                </span>
                <span className="text-[#6B655E] text-[11px] font-mono">
                  {currentSizeObj?.dimensions}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSize(s.name)}
                    className={`py-2.5 px-3 text-xs border text-center transition flex flex-col items-center justify-center ${
                      selectedSize === s.name
                        ? "bg-[#1C1917] text-white border-[#1C1917]"
                        : "bg-transparent text-[#1C1917] border-[#1C1917]/20 hover:border-[#1C1917]"
                    }`}
                  >
                    <span className="font-medium text-[11px] uppercase tracking-wider">{s.name}</span>
                    <span
                      className={`text-[10px] mt-0.5 font-mono ${
                        selectedSize === s.name ? "text-stone-300" : "text-[#6B655E]"
                      }`}
                    >
                      {s.dimensions}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-3">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#1C1917]/20 bg-transparent">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-3 text-[#1C1917] hover:bg-[#1C1917]/5 transition text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-medium text-[#1C1917] min-w-[2rem] text-center font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-3 text-[#1C1917] hover:bg-[#1C1917]/5 transition text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToBag}
                  className={`flex-1 py-3.5 px-6 text-xs uppercase tracking-[0.22em] font-medium transition flex items-center justify-center gap-2 ${
                    isAddedFeedback
                      ? "bg-emerald-900 text-white"
                      : "bg-[#1C1917] hover:bg-black text-[#FAF8F5]"
                  }`}
                >
                  {isAddedFeedback ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5 stroke-[1.25]" />
                      <span>Add to Bag • {formatINR(unitPrice * quantity)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 border transition ${
                    inWishlist
                      ? "border-[#B95D41] text-[#B95D41]"
                      : "border-[#1C1917]/20 text-[#1C1917] hover:border-[#1C1917]"
                  }`}
                  aria-label={inWishlist ? "Saved" : "Save to wishlist"}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-transparent border border-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] text-[#1C1917] text-xs uppercase tracking-[0.22em] font-medium transition"
              >
                Buy Now with 1-Click
              </button>
            </div>

            {/* Pincode & Delivery Availability Checker */}
            <div className="pt-4 border-t border-[#1C1917]/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider text-[11px] text-[#1C1917] flex items-center gap-1.5 font-medium">
                  <Truck className="w-3.5 h-3.5 stroke-[1.25]" />
                  Delivery &amp; COD Verification
                </span>
                <span className="text-[10px] text-[#6B655E]">Pan-India Coverage</span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="w-full bg-transparent border-b border-[#1C1917]/30 py-2 text-xs text-[#1C1917] font-mono placeholder-[#6B655E] focus:outline-none focus:border-[#1C1917]"
                />
                <button
                  type="submit"
                  className="px-5 py-2 text-xs uppercase tracking-[0.2em] font-medium text-[#1C1917] hover:underline"
                >
                  Check
                </button>
              </form>

              {pincodeError && <p className="text-xs text-rose-600">{pincodeError}</p>}

              {pincodeResult && (
                <div className="pt-1 text-xs text-[#6B655E] space-y-1">
                  <p className="text-[#1C1917] font-medium">
                    ✓ Delivery available to {pincodeResult.city}, {pincodeResult.state} ({pincodeResult.pincode})
                  </p>
                  <p className="text-[11px]">
                    Estimated: <strong>{pincodeResult.deliveryDays}</strong> • Cash on Delivery (COD) Available
                  </p>
                </div>
              )}
            </div>

            {/* Accordions */}
            <div className="border-t border-[#1C1917]/10 divide-y divide-[#1C1917]/10 text-xs">
              <div>
                <button
                  onClick={() => toggleAccordion("material")}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-base text-[#1C1917]"
                >
                  <span>Material &amp; Craft</span>
                  {openAccordions.material ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.material && (
                  <div className="pb-4 text-xs text-[#6B655E] leading-relaxed space-y-2">
                    <p>{product.materialCraft}</p>
                    <p className="italic">Woven at KT International Panipat works with OEKO-TEX certified processes.</p>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion("specs")}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-base text-[#1C1917]"
                >
                  <span>Dimensions &amp; Specifications</span>
                  {openAccordions.specs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.specs && (
                  <div className="pb-4">
                    <dl className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-[#6B655E]">
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <div key={key}>
                          <dt className="text-[10px] uppercase tracking-wider text-stone-400">{key}</dt>
                          <dd className="font-medium text-[#1C1917]">{val}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion("care")}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-base text-[#1C1917]"
                >
                  <span>Care Instructions</span>
                  {openAccordions.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.care && (
                  <div className="pb-4 space-y-1.5 text-xs text-[#6B655E]">
                    {product.careInstructions.map((instruction, idx) => (
                      <p key={idx}>• {instruction}</p>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-base text-[#1C1917]"
                >
                  <span>Shipping &amp; GST Invoicing</span>
                  {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.shipping && (
                  <div className="pb-4 space-y-1.5 text-xs text-[#6B655E] leading-relaxed">
                    <p>Complimentary Pan-India delivery on orders above ₹1,999. Dispatched within 24–48 hours from Panipat.</p>
                    <p>Eligible for full 12% B2B GST input credit at checkout.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div id="reviews" className="mt-28 pt-12 border-t border-[#1C1917]/10">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-2xl text-[#1C1917] font-light">
              Customer Reviews ({product.reviewsCount})
            </h2>
            <span className="text-xs text-[#6B655E] font-medium">{product.rating} / 5.0 Rating</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="space-y-2 text-xs border-b border-[#1C1917]/10 pb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rev.rating ? "fill-[#1C1917] stroke-[#1C1917]" : "fill-stone-200 stroke-stone-300"
                      }`}
                    />
                  ))}
                  <span className="text-stone-400 font-mono ml-2">{rev.date}</span>
                </div>
                <h4 className="font-serif text-base text-[#1C1917] font-normal">&ldquo;{rev.title}&rdquo;</h4>
                <p className="text-[#6B655E] leading-relaxed font-light">{rev.comment}</p>
                <p className="text-[11px] text-stone-500">{rev.author} • {rev.city} (Verified Purchase)</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Pairings */}
        {relatedProducts.length > 0 && (
          <div className="mt-28 pt-12 border-t border-[#1C1917]/10">
            <h2 className="font-serif text-2xl text-[#1C1917] font-light mb-8">
              Complete the Sanctuary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loom Reel Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#181614] text-white p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-serif text-lg font-light">KT International Loom Weaving Reel (Panipat)</span>
              <button onClick={() => setIsVideoOpen(false)} className="p-1 hover:opacity-75">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-16/9 bg-stone-900 flex items-center justify-center text-center p-6">
              <div className="space-y-3 max-w-sm">
                <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
                <h4 className="font-serif text-2xl font-light">Inside KT International Panipat Mills</h4>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  High-gauge circular raschel warp-knitting and micro-mink finishing captured on-site.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
