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
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Instantly force page scroll to top whenever product loads or switches
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [product.slug]);

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
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-28 sm:pb-32 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14 text-left">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#5E5850] mb-8 overflow-x-auto whitespace-nowrap font-medium">
        <Link href="/" className="hover:text-[#191715] transition">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#191715] transition">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-[#191715] transition capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#191715] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* LEFT: Multi-Image Gallery with rounded-2xl */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-24 rounded-xl overflow-hidden bg-[#EFEAE2] transition-all duration-300 ${
                  activeImageIndex === idx
                    ? "ring-2 ring-[#191715] shadow-md"
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
              className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#EFEAE2] border border-[#191715]/15 flex flex-col items-center justify-center text-center p-2 group transition hover:border-[#191715]"
              aria-label="Watch Panipat loom video reel"
            >
              <div className="w-8 h-8 rounded-full bg-[#191715] text-white flex items-center justify-center mb-1 group-hover:scale-110 transition">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#191715] font-semibold">
                Loom Reel
              </span>
            </button>
          </div>

          {/* Main Featured Photo (aspect-[4/5] with rounded-2xl) */}
          <div className="relative flex-1 aspect-[4/5] rounded-2xl overflow-hidden bg-[#EFEAE2] shadow-lg">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />

            {/* Collection Tier Tag */}
            <div className="absolute top-4 left-4">
              <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#191715] bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xs">
                {product.collection} Tier
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Purchasing Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block">
              {product.subcategory}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#191715] font-normal leading-[1.12]">
              {product.name}
            </h1>

            <p className="text-[15px] text-[#5E5850] font-normal pt-1 leading-relaxed">
              {product.subtitle}
            </p>

            {/* Rating & Reviews */}
            <div className="pt-2 flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-[#8C6B4F] stroke-[#8C6B4F]"
                        : "fill-stone-200 stroke-stone-300"
                    }`}
                  />
                ))}
                <span className="font-semibold text-[#191715] ml-1">{product.rating}</span>
              </div>
              <span className="text-stone-300">•</span>
              <a href="#reviews" className="text-[#5E5850] hover:text-[#191715] underline text-xs">
                {product.reviewsCount} Verified Buyer Reviews
              </a>
            </div>
          </div>

          {/* Price */}
          <div className="py-4 border-y border-[#191715]/10 flex items-baseline gap-3">
            <span className="font-serif text-3xl font-normal text-[#191715]">
              {formatINR(unitPrice)}
            </span>
            {originalPrice > unitPrice && (
              <span className="text-sm text-[#5E5850] line-through font-normal">
                {formatINR(originalPrice)}
              </span>
            )}
            <span className="text-xs text-[#5E5850] ml-auto font-normal">
              Inclusive of GST • Pan-India Delivery
            </span>
          </div>

          {/* Color Swatches */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#191715] uppercase tracking-wider text-[11px]">
                Color: <strong className="font-semibold">{selectedColor}</strong>
              </span>
              <span className="text-[#5E5850] text-xs">
                {product.colors.length} shades available
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`p-0.5 rounded-full transition ${
                    selectedColor === c.name ? "ring-2 ring-[#191715] ring-offset-2" : "hover:scale-105"
                  }`}
                  title={c.name}
                >
                  <span
                    className="block w-7 h-7 rounded-full border border-black/15 shadow-xs"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector with rounded-full Pills */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#191715] uppercase tracking-wider text-[11px]">
                Dimension: <strong className="font-semibold">{selectedSize}</strong>
              </span>
              <span className="text-[#5E5850] text-xs font-mono">
                {currentSizeObj?.dimensions}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setSelectedSize(s.name)}
                  className={`py-3 px-3 rounded-full text-xs text-center transition flex flex-col items-center justify-center ${
                    selectedSize === s.name
                      ? "bg-[#191715] text-white shadow-sm"
                      : "bg-[#EFEAE2] text-[#191715] hover:bg-[#EFEAE2]/80"
                  }`}
                >
                  <span className="font-semibold uppercase tracking-wider text-[11px]">{s.name}</span>
                  <span
                    className={`text-[10px] mt-0.5 ${
                      selectedSize === s.name ? "text-stone-300" : "text-[#5E5850]"
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
              <div className="flex items-center border border-[#191715]/20 bg-[#EFEAE2]/50 rounded-full px-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-3 text-[#191715] hover:opacity-70 transition text-sm font-semibold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-2 text-xs font-semibold text-[#191715] min-w-[2rem] text-center font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-3 text-[#191715] hover:opacity-70 transition text-sm font-semibold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Bag (rounded-full) */}
              <button
                onClick={handleAddToBag}
                className={`flex-1 py-4 px-6 text-xs uppercase tracking-[0.18em] font-semibold rounded-full transition flex items-center justify-center gap-2 shadow-lg ${
                  isAddedFeedback
                    ? "bg-emerald-900 text-white"
                    : "bg-[#191715] hover:bg-[#8C6B4F] text-[#F8F5F0]"
                }`}
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                    <span>Add to Bag • {formatINR(unitPrice * quantity)}</span>
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded-full border transition ${
                  inWishlist
                    ? "border-[#8C6B4F] bg-[#8C6B4F] text-white"
                    : "border-[#191715]/20 text-[#191715] hover:border-[#191715]"
                }`}
                aria-label={inWishlist ? "Saved in wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : "stroke-[1.5]"}`} />
              </button>
            </div>

            {/* Buy Now (rounded-full) */}
            <button
              onClick={handleBuyNow}
              className="w-full py-4 bg-transparent border border-[#191715] hover:bg-[#191715] hover:text-[#F8F5F0] text-[#191715] text-xs uppercase tracking-[0.18em] font-semibold rounded-full transition"
            >
              Buy Now with 1-Click Checkout
            </button>
          </div>

          {/* Indian Pincode Delivery Checker */}
          <div className="pt-4 border-t border-[#191715]/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-wider text-[11px] text-[#191715] flex items-center gap-1.5 font-semibold">
                <Truck className="w-3.5 h-3.5 stroke-[1.5]" />
                Pan-India Delivery &amp; COD Checker
              </span>
              <span className="text-[11px] text-[#5E5850]">19,000+ Pincodes</span>
            </div>

            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value)}
                placeholder="Enter 6-digit Pincode"
                className="w-full bg-[#EFEAE2]/60 rounded-full px-5 py-2.5 text-xs text-[#191715] font-mono placeholder-[#5E5850] focus:outline-none focus:ring-1 focus:ring-[#191715]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#191715] text-[#F8F5F0] rounded-full text-xs uppercase tracking-wider font-semibold transition hover:bg-[#8C6B4F]"
              >
                Check
              </button>
            </form>

            {pincodeError && <p className="text-xs text-rose-600">{pincodeError}</p>}

            {pincodeResult && (
              <div className="p-3 bg-[#EFEAE2] rounded-xl text-xs text-[#191715] space-y-1">
                <p className="font-semibold text-emerald-900">
                  ✓ Available to {pincodeResult.city}, {pincodeResult.state} ({pincodeResult.pincode})
                </p>
                <p className="text-[11px] text-[#5E5850]">
                  Dispatch within 24h from Panipat • Estimated: <strong>{pincodeResult.deliveryDays}</strong> • COD Active
                </p>
              </div>
            )}
          </div>

          {/* Framer Motion Accordions */}
          <div className="border-t border-[#191715]/10 divide-y divide-[#191715]/10 text-xs">
            {/* 1. Material & Craft */}
            <div>
              <button
                onClick={() => toggleAccordion("material")}
                className="w-full py-4 flex items-center justify-between text-left font-serif text-lg text-[#191715]"
              >
                <span>Material &amp; Weaving Mastery</span>
                {openAccordions.material ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <AnimatePresence>
                {openAccordions.material && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pb-4 text-[#5E5850] space-y-2 leading-relaxed"
                  >
                    <p>{product.leadParagraph}</p>
                    <p>{product.materialCraft}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Specifications */}
            <div>
              <button
                onClick={() => toggleAccordion("specs")}
                className="w-full py-4 flex items-center justify-between text-left font-serif text-lg text-[#191715]"
              >
                <span>Dimensions &amp; Specifications</span>
                {openAccordions.specs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <AnimatePresence>
                {openAccordions.specs && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pb-4 text-[#5E5850] space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <div key={key} className="p-2.5 bg-[#EFEAE2]/60 rounded-xl">
                          <span className="block text-[10px] uppercase tracking-wider text-[#5E5850]">{key}</span>
                          <span className="block text-xs font-semibold text-[#191715] mt-0.5">{val}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Care Instructions */}
            <div>
              <button
                onClick={() => toggleAccordion("care")}
                className="w-full py-4 flex items-center justify-between text-left font-serif text-lg text-[#191715]"
              >
                <span>Care &amp; Wash Guide</span>
                {openAccordions.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <AnimatePresence>
                {openAccordions.care && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pb-4 text-[#5E5850] space-y-1.5"
                  >
                    {product.careInstructions.map((instruction, idx) => (
                      <p key={idx} className="flex items-center gap-2">
                        <span className="text-[#8C6B4F]">•</span>
                        <span>{instruction}</span>
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. Shipping & GST Invoice */}
            <div>
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full py-4 flex items-center justify-between text-left font-serif text-lg text-[#191715]"
              >
                <span>Shipping &amp; B2B GST Invoicing</span>
                {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <AnimatePresence>
                {openAccordions.shipping && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pb-4 text-[#5E5850] space-y-2 leading-relaxed"
                  >
                    <p>• Complimentary express courier shipping across India on orders above ₹2,999.</p>
                    <p>• Tax invoice with GST input credit automatically provided upon checkout if company GSTIN is entered.</p>
                    <p>• Direct Panipat warehouse dispatch with full door-to-door tracking.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Loom Reel Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#191715] text-[#F8F5F0] rounded-3xl p-6 sm:p-8 max-w-xl w-full z-10 shadow-2xl border border-white/20 text-left"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C6B4F] font-semibold block mb-2">
                Panipat Weaving Facility · KT International
              </span>
              <h3 className="font-serif text-2xl text-white font-normal mb-4">
                The Making of {product.name}
              </h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 border border-white/10 mb-4">
                <Image
                  src={product.images[0]}
                  alt="Video thumbnail"
                  fill
                  className="object-cover brightness-75"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-14 h-14 rounded-full bg-white text-[#191715] flex items-center justify-center shadow-2xl mb-2">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-white font-semibold">
                    Interactive Loom Preview (High-Definition Reel)
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-normal">
                Witness our high-speed circular raschel looms and 400TC combed Supima tension frames operating inside KT International&apos;s Panipat complex.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Customer Reviews Section */}
      <section id="reviews" className="mt-28 pt-16 border-t border-[#191715]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-1">
              Verified Residences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#191715] font-normal">
              Customer Experiences
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-[#8C6B4F]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current stroke-current" />
              ))}
            </div>
            <span className="font-semibold text-sm text-[#191715]">{product.rating} Out of 5</span>
            <span className="text-xs text-[#5E5850]">({product.reviewsCount} reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-2xl bg-[#EFEAE2]/50 border border-[#191715]/8 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#8C6B4F]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current stroke-current" />
                  ))}
                </div>
                <span className="text-[11px] text-[#5E5850]">{rev.date}</span>
              </div>
              <h4 className="text-sm font-semibold text-[#191715]">{rev.title}</h4>
              <p className="text-xs text-[#5E5850] leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-[#5E5850] border-t border-[#191715]/10">
                <span className="font-medium text-[#191715]">{rev.author} · {rev.city}</span>
                <span className="text-emerald-800 font-semibold">✓ Verified Buyer</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complete the Look Cross-Sell Row */}
      {relatedProducts.length > 0 && (
        <section className="mt-28 pt-16 border-t border-[#191715]/10">
          <div className="text-left mb-10">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-1">
              Curated Harmonies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#191715] font-normal">
              Complete the Sanctuary Look
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#F8F5F0]/95 backdrop-blur-xl border-t border-[#191715]/10 px-4 py-3 shadow-[0_-8px_25px_rgba(25,23,21,0.08)] flex items-center justify-between gap-3">
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-[#5E5850] uppercase tracking-wider font-semibold">
            {selectedSize} · Total
          </span>
          <span className="text-base font-semibold text-[#191715]">
            {formatINR(unitPrice * quantity)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition cursor-pointer touch-manipulation ${
              inWishlist
                ? "border-[#8C6B4F] bg-[#8C6B4F] text-white"
                : "border-[#191715]/20 text-[#191715]"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : "stroke-[1.5]"}`} />
          </button>

          <button
            onClick={handleAddToBag}
            className={`py-3 px-5 sm:px-6 text-xs uppercase tracking-[0.16em] font-semibold rounded-full transition flex items-center justify-center gap-2 shadow-md cursor-pointer touch-manipulation ${
              isAddedFeedback
                ? "bg-emerald-900 text-white"
                : "bg-[#191715] active:bg-[#8C6B4F] text-[#F8F5F0]"
            }`}
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
