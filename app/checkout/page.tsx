"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { checkDeliveryPincode } from "@/lib/pincodes";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Building,
  CheckCircle2,
  ArrowRight,
  Printer,
  ChevronLeft,
  Lock,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartSubtotal, hasFreeShipping, clearCart } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Address State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "Aryan Malhotra",
    phone: "9876543210",
    email: "aryan.malhotra@gmail.com",
    addressLine1: "Flat 402, Signature Towers, Golf Course Road",
    addressLine2: "Sector 54",
    pincode: "122002",
    city: "Gurugram",
    state: "Haryana",
  });

  // GST Invoice State
  const [needsGstInvoice, setNeedsGstInvoice] = useState(false);
  const [gstData, setGstData] = useState({
    companyName: "Malhotra Design Studio LLP",
    gstin: "06AABCM1234D1ZP",
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod" | "netbanking">("upi");
  const [selectedUpiApp, setSelectedUpiApp] = useState("gpay");
  const [upiVpa, setUpiVpa] = useState("aryan@okhdfcbank");

  // Promo Code State
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const handlePincodeChange = (pin: string) => {
    setShippingAddress((prev) => ({ ...prev, pincode: pin }));
    if (pin.length === 6) {
      const detected = checkDeliveryPincode(pin);
      if (detected) {
        setShippingAddress((prev) => ({
          ...prev,
          pincode: pin,
          city: detected.city.split("(")[0].trim(),
          state: detected.state.split("/")[0].trim(),
        }));
      }
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (promoCode.trim().toUpperCase() === "AAVAAS10") {
      const discount = Math.round(cartSubtotal * 0.1);
      setPromoDiscount(discount);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === "WINTER26") {
      setPromoDiscount(500);
      setPromoApplied(true);
    } else {
      setPromoError("Invalid code. Try 'AAVAAS10' for 10% off.");
    }
  };

  const shippingCost = hasFreeShipping ? 0 : 149;
  const grandTotal = Math.max(0, cartSubtotal - promoDiscount + shippingCost);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newOrderId = `AAV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderId(newOrderId);
      setIsProcessing(false);
      setOrderPlaced(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-32 animate-in fade-in">
        <div className="space-y-8 text-left">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#6B655E] font-medium">
              ORDER CONFIRMED
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1917] font-light">
              Thank You for Weaving with AAVAAS
            </h1>
            <p className="text-sm text-[#6B655E] font-serif italic">
              Order reference <strong className="text-[#1C1917] font-mono">{orderId}</strong> has been scheduled for dispatch at Panipat.
            </p>
          </div>

          <div className="py-6 border-y border-[#1C1917]/10 text-xs space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[10px] text-[#6B655E] uppercase tracking-wider block">Order ID</span>
                <span className="font-mono text-[#1C1917] font-medium">{orderId}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B655E] uppercase tracking-wider block">Estimated Delivery</span>
                <span className="text-[#1C1917] font-medium">2–3 Business Days</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B655E] uppercase tracking-wider block">Payment</span>
                <span className="text-[#1C1917] font-medium uppercase">{paymentMethod}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B655E] uppercase tracking-wider block">Total Paid</span>
                <span className="font-serif text-sm font-medium text-[#1C1917]">{formatINR(grandTotal)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1C1917]/10">
              <p className="text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">Delivering To:</p>
              <p className="text-[#1C1917] font-medium">{shippingAddress.fullName}</p>
              <p className="text-[#6B655E]">{shippingAddress.addressLine1}, {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pincode}</p>
            </div>

            {needsGstInvoice && (
              <div className="p-3 bg-[#EDE8E0] text-[11px] text-[#1C1917]">
                ✓ B2B GST Invoice billed to: <strong>{gstData.companyName}</strong> (GSTIN: {gstData.gstin}).
              </div>
            )}
          </div>

          <div className="flex items-center gap-6 pt-4 text-xs uppercase tracking-[0.2em] font-medium">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 border border-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] transition"
            >
              Print Receipt
            </button>
            <Link
              href="/"
              onClick={() => clearCart()}
              className="text-[#1C1917] hover:underline"
            >
              Return Home →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-6 py-36 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#1C1917] font-light">Your bag is empty</h2>
        <p className="text-xs text-[#6B655E] font-serif italic">
          Select pieces from our catalog before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-block mt-2 px-6 py-3 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] transition"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#6B655E] hover:text-[#1C1917] transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT 7 COLS: Address & Payment */}
          <div className="lg:col-span-7 space-y-10">
            {/* Address */}
            <div className="space-y-5">
              <h2 className="font-serif text-2xl text-[#1C1917] font-light border-b border-[#1C1917]/10 pb-3">
                1. Delivery Address
              </h2>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">Phone</label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">Email</label>
                  <input
                    type="email"
                    value={shippingAddress.email}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                    className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">Street Address</label>
                  <input
                    type="text"
                    value={shippingAddress.addressLine1}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                    className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">Pincode</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={shippingAddress.pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] font-mono focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">City</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">State</label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>
                </div>
              </div>

              {/* GST Invoice Toggle */}
              <div className="pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1C1917]">
                  <input
                    type="checkbox"
                    checked={needsGstInvoice}
                    onChange={(e) => setNeedsGstInvoice(e.target.checked)}
                    className="w-3.5 h-3.5 text-[#1C1917]"
                  />
                  <span>Claim 12% GST Input Tax Credit (Business / Hospitality Buyer)</span>
                </label>

                {needsGstInvoice && (
                  <div className="mt-3 p-4 bg-[#EDE8E0] space-y-3 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">Company Name</label>
                      <input
                        type="text"
                        value={gstData.companyName}
                        onChange={(e) => setGstData({ ...gstData, companyName: e.target.value })}
                        className="w-full bg-white border border-[#1C1917]/20 p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">15-Digit GSTIN</label>
                      <input
                        type="text"
                        maxLength={15}
                        value={gstData.gstin}
                        onChange={(e) => setGstData({ ...gstData, gstin: e.target.value.toUpperCase() })}
                        className="w-full bg-white border border-[#1C1917]/20 p-2 text-xs font-mono uppercase"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-[#1C1917] font-light border-b border-[#1C1917]/10 pb-3">
                2. Payment Method
              </h2>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-3 border text-left transition ${
                    paymentMethod === "upi" ? "border-[#1C1917] bg-[#1C1917] text-white" : "border-[#1C1917]/20 text-[#1C1917]"
                  }`}
                >
                  <p className="font-medium uppercase tracking-wider text-[11px]">UPI</p>
                  <p className={`text-[10px] mt-0.5 ${paymentMethod === "upi" ? "text-stone-300" : "text-[#6B655E]"}`}>GPay, PhonePe</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 border text-left transition ${
                    paymentMethod === "card" ? "border-[#1C1917] bg-[#1C1917] text-white" : "border-[#1C1917]/20 text-[#1C1917]"
                  }`}
                >
                  <p className="font-medium uppercase tracking-wider text-[11px]">Cards</p>
                  <p className={`text-[10px] mt-0.5 ${paymentMethod === "card" ? "text-stone-300" : "text-[#6B655E]"}`}>Visa, Master</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3 border text-left transition ${
                    paymentMethod === "cod" ? "border-[#1C1917] bg-[#1C1917] text-white" : "border-[#1C1917]/20 text-[#1C1917]"
                  }`}
                >
                  <p className="font-medium uppercase tracking-wider text-[11px]">COD</p>
                  <p className={`text-[10px] mt-0.5 ${paymentMethod === "cod" ? "text-stone-300" : "text-[#6B655E]"}`}>At Doorstep</p>
                </button>
              </div>

              {paymentMethod === "upi" && (
                <div className="p-4 bg-[#EDE8E0] text-xs space-y-2">
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B655E]">Enter UPI ID / VPA</label>
                  <input
                    type="text"
                    value={upiVpa}
                    onChange={(e) => setUpiVpa(e.target.value)}
                    placeholder="mobile@upi"
                    className="w-full bg-white border border-[#1C1917]/20 p-2 text-xs"
                  />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 5 COLS: Order Summary */}
          <div className="lg:col-span-5">
            <div className="border border-[#1C1917]/10 p-6 space-y-5 sticky top-28 bg-[#FAF8F5]">
              <h3 className="font-serif text-xl text-[#1C1917] font-light border-b border-[#1C1917]/10 pb-3">
                Summary ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>

              <div className="divide-y divide-[#1C1917]/10 max-h-72 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 text-xs">
                    <div className="relative w-14 h-18 bg-[#EDE8E0] shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="font-serif text-sm text-[#1C1917] line-clamp-1">{item.product.name}</p>
                        <p className="text-[#6B655E] text-[11px]">{item.selectedSize} • {item.selectedColor}</p>
                      </div>
                      <p className="font-medium text-[#1C1917]">{formatINR(item.unitPrice * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleApplyPromo} className="pt-2 border-t border-[#1C1917]/10 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Coupon (e.g. AAVAAS10)"
                  className="flex-1 bg-transparent border-b border-[#1C1917]/20 py-1.5 text-xs font-mono uppercase focus:outline-none"
                />
                <button type="submit" className="text-xs uppercase tracking-wider font-semibold text-[#1C1917] hover:underline">
                  Apply
                </button>
              </form>
              {promoApplied && <p className="text-[11px] text-emerald-800">✓ {formatINR(promoDiscount)} discount applied.</p>}

              <div className="space-y-1.5 text-xs text-[#6B655E] pt-3 border-t border-[#1C1917]/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1C1917] font-medium">{formatINR(cartSubtotal)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Discount</span>
                    <span>- {formatINR(promoDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pan-India Delivery</span>
                  <span className={hasFreeShipping ? "text-emerald-800" : "text-[#1C1917]"}>
                    {hasFreeShipping ? "FREE" : "₹149"}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#1C1917]/10 flex justify-between items-baseline">
                  <span className="text-sm font-medium text-[#1C1917]">Total</span>
                  <span className="font-serif text-2xl text-[#1C1917] font-light">{formatINR(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#1C1917] hover:bg-black text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-medium transition"
              >
                {isProcessing ? "Confirming..." : `Place Order • ${formatINR(grandTotal)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
