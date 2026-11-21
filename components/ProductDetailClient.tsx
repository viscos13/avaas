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
  Share2,
  RefreshCw,
  HelpCircle,
  Clock,
  Sparkles,
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

  // State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Default");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.name || "Standard");
  const [quantity, setQuantity] = useState(1);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Pincode Checker State
  const [pincodeInput, setPincodeInput] = useState("110001");
  const [pincodeResult, setPincodeResult] = useState<PincodeInfo | null>(() =>
    checkDeliveryPincode("110001")
  );
  const [pincodeError, setPincodeError] = useState("");

  // Accordion State
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
    <div className="pt-8 pb-32">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-stone-500 mb-12 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-stone-900 transition">
            Home
          </Link>
          <span className="text-stone-300">/</span>
          <Link href="/shop" className="hover:text-stone-900 transition">
            Shop
          </Link>
          <span className="text-stone-300">/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-stone-900 transition capitalize"
          >
            {product.category}
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Layout with generous spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* LEFT: Multi-Image Gallery + Video Preview Reel */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-5">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3.5 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-26 sm:w-22 sm:h-28 bg-[#EFE8DD] rounded-xs overflow-hidden border-2 transition-all duration-300 ${
                    activeImageIndex === idx
                      ? "border-stone-900 shadow-md scale-102"
                      : "border-transparent hover:border-[#CEC0AD]"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}

              {/* Loom Video Button */}
              <button
                onClick={() => setIsVideoOpen(true)}
                className="relative w-20 h-26 sm:w-22 sm:h-28 bg-[#EFE8DD] rounded-xs border border-[#CEC0AD] hover:border-stone-900 flex flex-col items-center justify-center text-center p-2 group transition"
                aria-label="Watch video preview"
              >
                <div className="w-8 h-8 rounded-full bg-[#141210] text-[#D4AF37] flex items-center justify-center mb-1 group-hover:scale-110 transition shadow-sm">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-stone-800">
                  Loom Reel
                </span>
              </button>
            </div>

            {/* Main Featured Photo */}
            <div className="relative flex-1 aspect-4/5 bg-[#EFE8DD] rounded-xs overflow-hidden border border-[#E2D7C7] shadow-xl">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out"
              />

              <div className="absolute top-5 left-5 flex flex-col gap-2 z-10 pointer-events-none">
                {product.badge && (
                  <span className="bg-[#141210]/95 backdrop-blur-md text-[#FAF6F0] px-3.5 py-1 text-[10px] uppercase font-semibold tracking-[0.25em] border border-stone-700 shadow-lg">
                    {product.badge}
                  </span>
                )}
                <span className="bg-[#FAF7F2]/95 backdrop-blur-md text-stone-900 px-3 py-1 text-[9px] uppercase font-semibold tracking-[0.25em] border border-[#E2D7C7] self-start shadow-sm">
                  {product.collection} Tier
                </span>
              </div>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="absolute bottom-5 left-5 bg-[#141210]/90 hover:bg-[#141210] text-white px-5 py-2.5 text-xs uppercase tracking-[0.25em] font-semibold rounded-full backdrop-blur-md flex items-center gap-2.5 shadow-2xl transition hover:scale-102"
              >
                <Play className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                <span>Panipat Loom Preview</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Purchasing Details with Generous Spacing */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500 uppercase tracking-[0.2em]">
                <span>{product.category} • {product.subcategory}</span>
                <span className="font-semibold text-stone-700 font-mono">
                  {product.collection} Edition
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#141210] font-light leading-tight">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-stone-600 font-serif italic pt-1">
                {product.subtitle}
              </p>

              {/* Reviews Stars */}
              <div className="pt-3 flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? "fill-[#D4AF37] stroke-[#D4AF37]"
                          : "fill-stone-300 stroke-stone-300"
                      }`}
                    />
                  ))}
                  <span className="font-semibold text-stone-900 ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-stone-300">•</span>
                <a href="#reviews" className="text-stone-600 hover:text-black underline uppercase tracking-wider text-[11px]">
                  {product.reviewsCount} Verified Reviews
                </a>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="py-5 border-y border-[#E2D7C7] space-y-1.5">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-4xl sm:text-5xl font-light text-[#141210]">
                  {formatINR(unitPrice)}
                </span>
                {originalPrice > unitPrice && (
                  <span className="text-lg text-stone-400 line-through">
                    {formatINR(originalPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="bg-[#B95D41]/10 text-[#B95D41] text-xs font-semibold px-2.5 py-0.5 rounded-xs tracking-wider border border-[#B95D41]/30">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 font-serif italic">
                Inclusive of all Indian taxes (GST) • Direct Panipat Mill Dispatch
              </p>
            </div>

            {/* Color Swatches */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-700 uppercase tracking-wider">
                  Color: <strong className="text-stone-950 font-semibold">{selectedColor}</strong>
                </span>
                <span className="text-stone-500 text-[11px]">
                  {product.colors.length} shades available
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`group relative p-1 rounded-full transition-all duration-300 ${
                      selectedColor === c.name ? "ring-2 ring-stone-900 ring-offset-2 scale-110" : "hover:scale-105"
                    }`}
                    title={c.name}
                  >
                    <span
                      className="block w-8 h-8 rounded-full border border-stone-300 shadow-inner"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-700 uppercase tracking-wider">
                  Size: <strong className="text-stone-950 font-semibold">{selectedSize}</strong>
                </span>
                <span className="text-stone-500 text-[11px] font-mono">
                  {currentSizeObj?.dimensions} ({currentSizeObj?.dimensionsMetric})
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSize(s.name)}
                    className={`py-3 px-3 text-xs rounded-xs border text-center transition-all duration-300 flex flex-col items-center justify-center ${
                      selectedSize === s.name
                        ? "bg-[#141210] text-white border-[#141210] shadow-md"
                        : "bg-[#FDFBF8] text-stone-800 border-[#E2D7C7] hover:border-stone-800"
                    }`}
                  >
                    <span className="font-semibold uppercase tracking-wider text-[11px]">{s.name}</span>
                    <span
                      className={`text-[10px] mt-0.5 ${
                        selectedSize === s.name ? "text-stone-300" : "text-stone-500"
                      }`}
                    >
                      {s.dimensions}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Main Action Buttons */}
            <div className="space-y-4 pt-4 border-t border-[#E2D7C7]">
              <div className="flex gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-[#CEC0AD] rounded-xs bg-[#FAF7F2]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-4 text-stone-700 hover:bg-stone-200 transition font-serif text-base"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-stone-900 min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-4 text-stone-700 hover:bg-stone-200 transition font-serif text-base"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToBag}
                  className={`flex-1 py-4.5 px-8 rounded-xs text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                    isAddedFeedback
                      ? "bg-emerald-900 text-white"
                      : "bg-[#141210] hover:bg-[#25221F] hover:border-[#D4AF37] border border-[#141210] text-[#FAF6F0]"
                  }`}
                >
                  {isAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • {formatINR(unitPrice * quantity)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border rounded-xs transition-all duration-300 ${
                    inWishlist
                      ? "border-[#B95D41] bg-[#B95D41]/10 text-[#B95D41] scale-102"
                      : "border-[#CEC0AD] hover:border-stone-900 text-stone-700 bg-[#FAF7F2]"
                  }`}
                  aria-label={inWishlist ? "Saved in Wishlist" : "Save to Wishlist"}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-4.5 bg-[#EFE8DD] hover:bg-[#141210] hover:text-[#FAF6F0] text-[#141210] border border-[#CEC0AD] hover:border-[#141210] text-xs uppercase tracking-[0.25em] font-semibold rounded-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Buy Now with 1-Click</span>
              </button>
            </div>

            {/* Pincode & Delivery Availability Checker */}
            <div className="bg-[#FAF7F2] border border-[#E2D7C7] p-5 rounded-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-900 flex items-center gap-2 uppercase tracking-wider">
                  <Truck className="w-4 h-4 text-stone-800" />
                  Delivery &amp; COD Availability
                </span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">Pan-India</span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="w-full bg-white border border-[#CEC0AD] px-4 py-2.5 text-xs text-stone-900 font-mono placeholder-stone-400 focus:outline-none focus:border-stone-900 rounded-xs"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#141210] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-stone-800 transition rounded-xs shrink-0"
                >
                  Check
                </button>
              </form>

              {pincodeError && <p className="text-xs text-rose-600">{pincodeError}</p>}

              {pincodeResult && (
                <div className="pt-3 border-t border-[#EAE3D7] text-xs text-stone-700 space-y-1.5">
                  <div className="flex items-center gap-2 font-medium text-emerald-900">
                    <Check className="w-4 h-4 shrink-0 text-emerald-700" />
                    <span>
                      Delivery available to {pincodeResult.city}, {pincodeResult.state} ({pincodeResult.pincode})
                    </span>
                  </div>
                  <p className="text-stone-700 pl-6">
                    Delivery Estimate: <strong>{pincodeResult.deliveryDays}</strong>
                  </p>
                  <p className="text-stone-500 pl-6 text-[11px]">
                    Dispatch Hub: {pincodeResult.hub} • Cash on Delivery (COD) Available
                  </p>
                </div>
              )}
            </div>

            {/* Collapsible Accordions with Stately Spacing */}
            <div className="border-t border-[#E2D7C7] divide-y divide-[#E2D7C7] text-xs">
              <div>
                <button
                  onClick={() => toggleAccordion("material")}
                  className="w-full py-5 flex items-center justify-between text-left font-serif text-lg text-stone-900 hover:text-stone-700"
                >
                  <span>Material &amp; Panipat Loom Craft</span>
                  {openAccordions.material ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>
                {openAccordions.material && (
                  <div className="pb-5 space-y-2 text-stone-600 leading-relaxed text-sm font-light">
                    <p>{product.materialCraft}</p>
                    <p className="text-xs text-stone-500 italic font-serif">
                      Woven exclusively at KT International&apos;s Panipat facility with non-toxic, eco-certified dyes.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion("specs")}
                  className="w-full py-5 flex items-center justify-between text-left font-serif text-lg text-stone-900 hover:text-stone-700"
                >
                  <span>Dimensions &amp; Specifications</span>
                  {openAccordions.specs ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>
                {openAccordions.specs && (
                  <div className="pb-5">
                    <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs">
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <div key={key}>
                          <dt className="text-[10px] text-stone-400 uppercase tracking-widest">
                            {key}
                          </dt>
                          <dd className="font-medium text-stone-800 mt-0.5">{val}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion("care")}
                  className="w-full py-5 flex items-center justify-between text-left font-serif text-lg text-stone-900 hover:text-stone-700"
                >
                  <span>Care Instructions</span>
                  {openAccordions.care ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>
                {openAccordions.care && (
                  <div className="pb-5 space-y-2 text-stone-600 text-xs">
                    {product.careInstructions.map((instruction, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                        <span>{instruction}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full py-5 flex items-center justify-between text-left font-serif text-lg text-stone-900 hover:text-stone-700"
                >
                  <span>Shipping, GST Invoice &amp; Returns</span>
                  {openAccordions.shipping ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>
                {openAccordions.shipping && (
                  <div className="pb-5 space-y-2.5 text-stone-600 leading-relaxed text-xs">
                    <p>
                      <strong>Free Pan-India Delivery:</strong> Orders dispatched within 24–48 hours from our Panipat warehouse.
                    </p>
                    <p>
                      <strong>GST Input Credit:</strong> Registered business buyers (Hotels, Architects, Interior Designers) can enter their GSTIN at checkout to receive formal tax invoices.
                    </p>
                    <p>
                      <strong>7-Day Returns:</strong> If you are not completely satisfied with the drape, color, or hand-feel, we arrange hassle-free doorstep return pickup.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div id="reviews" className="mt-32 pt-16 border-t border-[#E2D7C7]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#E2D7C7]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold block mb-1">
                Customer Testimonials
              </span>
              <h2 className="font-serif text-4xl text-stone-900 font-light">
                Verified Buyer Reviews ({product.reviewsCount})
              </h2>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-6">
              <span className="text-base font-serif font-medium text-stone-900">
                {product.rating} out of 5.0 Rating
              </span>
              <button
                onClick={() => alert("Review submission: As a verified buyer, you may post a review after order delivery.")}
                className="px-6 py-2.5 border border-stone-800 text-stone-900 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#141210] hover:text-white transition rounded-xs"
              >
                Write a Review
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-8 bg-[#FDFBF8] border border-[#E2D7C7] rounded-xs space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? "fill-[#D4AF37] stroke-[#D4AF37]"
                            : "fill-stone-300 stroke-stone-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-stone-400 font-mono">{rev.date}</span>
                </div>

                <h4 className="font-serif text-lg text-stone-900 font-normal">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">{rev.comment}</p>

                <div className="pt-3 border-t border-[#EAE3D7] flex items-center justify-between text-xs text-stone-500">
                  <span className="font-medium text-stone-900">
                    {rev.author} • {rev.city}
                  </span>
                  {rev.verifiedPurchase && (
                    <span className="flex items-center gap-1 text-emerald-800 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete the Sanctuary / Related Pairings */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-16 border-t border-[#E2D7C7]">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-stone-500 font-semibold block mb-1">
                  Curated Pairings
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light">
                  Complete the Sanctuary
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 hover:text-[#B95D41] transition"
              >
                View Catalog
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Reel Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-[#141210] rounded-xs overflow-hidden border border-stone-700 shadow-2xl">
            <div className="p-5 border-b border-stone-800 flex items-center justify-between text-stone-200">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-serif text-lg tracking-wide">
                  KT International Loom Weaving Reel (Panipat)
                </span>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-1 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-16/9 bg-stone-900 flex items-center justify-center text-center p-8">
              <div className="max-w-md text-stone-300 space-y-5">
                <div className="w-20 h-20 rounded-full bg-stone-800 border border-stone-600 mx-auto flex items-center justify-center text-[#D4AF37] shadow-xl">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div>
                  <h4 className="font-serif text-3xl text-white font-light">
                    Inside Mill #4 • Panipat, Haryana
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 mt-2 leading-relaxed">
                    High-definition raschel warp-knit loom spinning and micro-mink finishing captured on-site at KT International&apos;s master weaving facility.
                  </p>
                </div>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="px-8 py-3 bg-[#FAF6F0] text-[#141210] text-xs uppercase tracking-[0.25em] font-semibold rounded-xs hover:bg-white transition"
                >
                  Return to Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
