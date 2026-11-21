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
    <div className="pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-stone-900 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-stone-900 transition">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-stone-900 transition capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-stone-800 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT: Multi-Image Gallery + Video Preview Tab */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails list */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-20 md:w-20 md:h-24 bg-stone-100 rounded-xs overflow-hidden border-2 transition ${
                    activeImageIndex === idx
                      ? "border-stone-900"
                      : "border-transparent hover:border-stone-300"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}

              {/* Video Preview Badge Button */}
              <button
                onClick={() => setIsVideoOpen(true)}
                className="relative w-16 h-20 md:w-20 md:h-24 bg-[#EDE8E0] rounded-xs border border-stone-300 hover:border-stone-600 flex flex-col items-center justify-center text-center p-1 group transition"
                aria-label="Watch video preview"
              >
                <div className="w-7 h-7 rounded-full bg-[#1C1917] text-white flex items-center justify-center mb-1 group-hover:scale-110 transition">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-stone-800">
                  Loom Video
                </span>
              </button>
            </div>

            {/* Main Featured Photo */}
            <div className="relative flex-1 aspect-4/5 bg-stone-100 rounded-xs overflow-hidden border border-[#E5DFD5]">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />

              {/* Badges on main image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="bg-[#FAF8F5]/95 backdrop-blur-xs text-[#1C1917] px-3 py-1 text-xs uppercase font-semibold tracking-wider border border-[#E5DFD5] shadow-xs">
                    {product.badge}
                  </span>
                )}
                <span className="bg-[#EDE8E0]/90 backdrop-blur-xs text-stone-800 px-2.5 py-0.5 text-[10px] uppercase font-medium tracking-widest border border-stone-300 self-start">
                  {product.collection} Tier
                </span>
              </div>

              {/* Video overlay pill */}
              <button
                onClick={() => setIsVideoOpen(true)}
                className="absolute bottom-4 left-4 bg-[#1C1917]/85 hover:bg-[#1C1917] text-white px-3.5 py-2 text-xs uppercase tracking-wider font-medium rounded-full backdrop-blur-md flex items-center gap-2 shadow-lg transition"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Watch Panipat Loom Preview</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Product Purchasing Details & Accordions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Collection & Subcategory */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span className="uppercase tracking-widest font-medium">
                  {product.category} • {product.subcategory}
                </span>
                <span className="capitalize text-stone-600 font-mono">
                  Collection: {product.collection}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-stone-600 mt-2 italic font-serif">
                {product.subtitle}
              </p>

              {/* Reviews Stars */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-500 stroke-amber-500"
                          : "fill-stone-200 stroke-stone-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs font-semibold text-stone-900 ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-stone-300">•</span>
                <a href="#reviews" className="text-xs text-stone-600 hover:underline">
                  {product.reviewsCount} Verified Buyer Reviews
                </a>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="pt-4 border-t border-[#E5DFD5] space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-normal text-stone-900">
                  {formatINR(unitPrice)}
                </span>
                {originalPrice > unitPrice && (
                  <span className="text-base text-stone-400 line-through">
                    {formatINR(originalPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="bg-[#B95D41]/10 text-[#B95D41] text-xs font-semibold px-2 py-0.5 rounded-xs">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">
                Inclusive of all Indian taxes (GST) • Direct Panipat Factory Dispatch
              </p>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600 font-medium">
                  Color: <strong className="text-stone-900">{selectedColor}</strong>
                </span>
                <span className="text-stone-400 text-[11px]">
                  {product.colors.length} shades
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`group relative p-0.5 rounded-full transition ${
                      selectedColor === c.name ? "ring-2 ring-stone-900 ring-offset-2" : ""
                    }`}
                    title={c.name}
                  >
                    <span
                      className="block w-7 h-7 rounded-full border border-stone-300"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600 font-medium">
                  Size: <strong className="text-stone-900">{selectedSize}</strong>
                </span>
                <span className="text-stone-500 text-[11px]">
                  {currentSizeObj?.dimensions} ({currentSizeObj?.dimensionsMetric})
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSize(s.name)}
                    className={`py-2.5 px-3 text-xs rounded-xs border text-center transition flex flex-col items-center justify-center ${
                      selectedSize === s.name
                        ? "bg-[#1C1917] text-white border-[#1C1917]"
                        : "bg-white text-stone-800 border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <span className="font-medium">{s.name}</span>
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
            <div className="space-y-3 pt-4 border-t border-[#E5DFD5]">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 rounded-xs bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-3 text-stone-600 hover:bg-stone-100 transition"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-stone-900 min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-3 text-stone-600 hover:bg-stone-100 transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToBag}
                  className={`flex-1 py-3.5 px-6 rounded-xs text-xs uppercase tracking-widest font-semibold transition flex items-center justify-center gap-2 shadow-sm ${
                    isAddedFeedback
                      ? "bg-emerald-800 text-white"
                      : "bg-[#1C1917] hover:bg-stone-800 text-white"
                  }`}
                >
                  {isAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
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
                  className={`p-3.5 border rounded-xs transition ${
                    inWishlist
                      ? "border-[#B95D41] bg-[#B95D41]/10 text-[#B95D41]"
                      : "border-stone-300 hover:border-stone-900 text-stone-700 bg-white"
                  }`}
                  aria-label={inWishlist ? "Saved in Wishlist" : "Save to Wishlist"}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#EDE8E0] hover:bg-[#E4DDD3] text-[#1C1917] border border-stone-300 text-xs uppercase tracking-widest font-medium rounded-xs transition flex items-center justify-center gap-2"
              >
                <span>Buy Now with 1-Click</span>
              </button>
            </div>

            {/* Pincode & Delivery Availability Checker */}
            <div className="bg-[#FAF8F5] border border-[#E5DFD5] p-4 rounded-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-700" />
                  Delivery &amp; COD Availability
                </span>
                <span className="text-[10px] text-stone-400">Pan-India Network</span>
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="w-full bg-white border border-stone-300 px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-600 rounded-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-stone-800 transition rounded-xs shrink-0"
                >
                  Check
                </button>
              </form>

              {pincodeError && <p className="text-xs text-rose-600">{pincodeError}</p>}

              {pincodeResult && (
                <div className="pt-2 border-t border-stone-200 text-xs text-stone-700 space-y-1">
                  <div className="flex items-center gap-2 font-medium text-emerald-800">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      Delivery to {pincodeResult.city}, {pincodeResult.state} ({pincodeResult.pincode})
                    </span>
                  </div>
                  <p className="text-stone-600 pl-5">
                    Estimated Time: <strong>{pincodeResult.deliveryDays}</strong>
                  </p>
                  <p className="text-stone-500 pl-5 text-[11px]">
                    Dispatch Hub: {pincodeResult.hub} • Cash on Delivery (COD) Available
                  </p>
                </div>
              )}
            </div>

            {/* Collapsible Accordions */}
            <div className="border-t border-[#E5DFD5] divide-y divide-[#E5DFD5] text-xs">
              {/* Accordion 1: Material & Craft */}
              <div>
                <button
                  onClick={() => toggleAccordion("material")}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-base text-stone-900 hover:text-stone-700"
                >
                  <span>Material &amp; Panipat Craft</span>
                  {openAccordions.material ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>
                {openAccordions.material && (
                  <div className="pb-4 space-y-2 text-stone-600 leading-relaxed">
                    <p>{product.materialCraft}</p>
                    <p className="text-[11px] text-stone-500 italic">
                      Woven exclusively at KT International&apos;s Panipat facility with non-toxic, eco-certified dyes.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Dimensions & Specifications */}
              <div>
                <button
                  onClick={() => toggleAccordion("specs")}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-base text-stone-900 hover:text-stone-700"
                >
                  <span>Dimensions &amp; Specifications</span>
                  {openAccordions.specs ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>
                {openAccordions.specs && (
                  <div className="pb-4">
                    <dl className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <div key={key}>
                          <dt className="text-[11px] text-stone-400 uppercase tracking-wider">
                            {key}
                          </dt>
                          <dd className="font-medium text-stone-800">{val}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care Instructions */}
              <div>
                <button
                  onClick={() => toggleAccordion("care")}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-base text-stone-900 hover:text-stone-700"
                >
                  <span>Care Instructions</span>
                  {openAccordions.care ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>
                {openAccordions.care && (
                  <div className="pb-4 space-y-1.5 text-stone-600">
                    {product.careInstructions.map((instruction, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                        <span>{instruction}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Shipping & GST Invoice Info */}
              <div>
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full py-4 flex items-center justify-between text-left font-serif text-base text-stone-900 hover:text-stone-700"
                >
                  <span>Shipping, GST Invoice &amp; Returns</span>
                  {openAccordions.shipping ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>
                {openAccordions.shipping && (
                  <div className="pb-4 space-y-2 text-stone-600 leading-relaxed">
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

        {/* Reviews Section */}
        <div id="reviews" className="mt-24 pt-12 border-t border-[#E5DFD5]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E5DFD5]">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#B95D41] font-semibold">
                Customer Testimonials
              </span>
              <h2 className="font-serif text-3xl text-stone-900 mt-1">
                Verified Buyer Reviews ({product.reviewsCount})
              </h2>
            </div>
            <div className="mt-3 md:mt-0 flex items-center gap-4">
              <span className="text-sm font-serif font-medium text-stone-900">
                {product.rating} out of 5.0 Rating
              </span>
              <button
                onClick={() => alert("Review submission form: As a verified buyer, you can post a review after receiving your order.")}
                className="px-4 py-2 border border-stone-800 text-stone-900 text-xs uppercase tracking-wider font-medium hover:bg-stone-900 hover:text-white transition rounded-xs"
              >
                Write a Review
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 bg-white border border-[#E5DFD5] rounded-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? "fill-amber-500 stroke-amber-500"
                            : "fill-stone-200 stroke-stone-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-stone-400 font-mono">{rev.date}</span>
                </div>

                <h4 className="font-serif text-base text-stone-900 font-medium">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="font-medium text-stone-800">
                    {rev.author} • {rev.city}
                  </span>
                  {rev.verifiedPurchase && (
                    <span className="flex items-center gap-1 text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products: Complete the Look */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#E5DFD5]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                  Curated Pairings
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mt-0.5">
                  Complete the Sanctuary
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-widest font-semibold text-stone-900 hover:underline"
              >
                View Catalog
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Modal Simulation */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#1C1917] rounded-xs overflow-hidden border border-stone-700 shadow-2xl">
            <div className="p-4 border-b border-stone-800 flex items-center justify-between text-stone-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-serif text-base">
                  Panipat Craftsmanship &amp; Loom Weave Reel
                </span>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-1 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-16/9 bg-stone-900 flex items-center justify-center text-center p-6">
              <div className="max-w-md text-stone-300 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-600 mx-auto flex items-center justify-center text-amber-400 shadow-inner">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-white">
                    Inside KT International Mill #4
                  </h4>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    High-definition raschel warp-knit loom spinning and micro-mink finishing captured on-site at Panipat, Haryana.
                  </p>
                </div>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="px-6 py-2.5 bg-[#FAF8F5] text-stone-900 text-xs uppercase tracking-widest font-medium rounded-xs hover:bg-white transition"
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
