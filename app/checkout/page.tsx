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
import { motion } from "framer-motion";

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
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
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
      <div className="max-w-[760px] mx-auto px-6 py-36 text-left">
        <div className="bg-[#EFEAE2] p-8 sm:p-12 rounded-3xl border border-[#191715]/10 space-y-6 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-emerald-900 text-white flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6B4F] font-semibold">
              Order Confirmed &amp; Scheduled
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#191715] font-normal mt-1">
              Thank You for Weaving with AAVAAS
            </h1>
            <p className="text-sm text-[#5E5850] mt-2 leading-relaxed">
              Order reference <strong className="font-mono text-[#191715]">{orderId}</strong> has been logged directly with KT International&apos;s Panipat dispatch center.
            </p>
          </div>

          <div className="py-5 border-y border-[#191715]/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-[#5E5850] uppercase tracking-wider block">Order ID</span>
              <span className="font-mono text-[#191715] font-semibold">{orderId}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5E5850] uppercase tracking-wider block">Estimated Delivery</span>
              <span className="text-[#191715] font-semibold">2–3 Days</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5E5850] uppercase tracking-wider block">Payment</span>
              <span className="text-[#191715] font-semibold uppercase">{paymentMethod}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5E5850] uppercase tracking-wider block">Total Paid</span>
              <span className="font-semibold text-[#191715]">{formatINR(grandTotal)}</span>
            </div>
          </div>

          <div className="text-xs text-[#5E5850]">
            <p className="text-[10px] uppercase tracking-wider text-[#191715] font-semibold mb-1">Delivering To:</p>
            <p className="font-medium text-[#191715]">{shippingAddress.fullName}</p>
            <p>{shippingAddress.addressLine1}, {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pincode}</p>
          </div>

          {needsGstInvoice && (
            <div className="p-3 bg-white rounded-xl text-xs text-[#191715] border border-[#191715]/10">
              ✓ B2B Tax Invoice with input credit addressed to <strong>{gstData.companyName}</strong> (GSTIN: {gstData.gstin}).
            </div>
          )}

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 border border-[#191715] hover:bg-[#191715] hover:text-[#F8F5F0] text-xs uppercase tracking-wider font-semibold rounded-full transition"
            >
              Print Receipt
            </button>
            <Link
              href="/"
              onClick={() => clearCart()}
              className="px-6 py-3 bg-[#191715] hover:bg-[#8C6B4F] text-[#F8F5F0] text-xs uppercase tracking-wider font-semibold rounded-full transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-6 py-36 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#191715]">Your bag is empty</h2>
        <p className="text-xs text-[#5E5850]">
          Add pieces from our catalog before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-block mt-2 px-7 py-3.5 bg-[#191715] text-[#F8F5F0] text-xs uppercase tracking-wider font-semibold rounded-full"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-32 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14 text-left">
      <div className="mb-6 sm:mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#5E5850] hover:text-[#191715] transition font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* LEFT 7 COLS: Address, GST, Payment */}
        <div className="lg:col-span-7 space-y-8 sm:space-y-10">
          {/* 1. Delivery Address */}
          <div className="p-5 sm:p-8 bg-[#EFEAE2] rounded-2xl sm:rounded-3xl border border-[#191715]/10 space-y-5 sm:space-y-6">
            <h2 className="font-serif text-2xl text-[#191715] font-normal border-b border-[#191715]/10 pb-3">
              1. Delivery Address
            </h2>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full bg-white rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">Phone</label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full bg-white rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">Email for Invoice &amp; Dispatch Updates</label>
                <input
                  type="email"
                  value={shippingAddress.email}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                  className="w-full bg-white rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">Street Address</label>
                <input
                  type="text"
                  value={shippingAddress.addressLine1}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                  className="w-full bg-white rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">Pincode</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={shippingAddress.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    className="w-full bg-white rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] font-mono focus:outline-none focus:border-[#191715]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full bg-white rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">State</label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full bg-white rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715]"
                  />
                </div>
              </div>
            </div>

            {/* GST Invoice Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#191715] font-medium">
                <input
                  type="checkbox"
                  checked={needsGstInvoice}
                  onChange={(e) => setNeedsGstInvoice(e.target.checked)}
                  className="w-4 h-4 text-[#191715] accent-[#191715]"
                />
                <span>Need a GST Invoice? (Claim 12% Input Tax Credit for Business / Hospitality)</span>
              </label>

              {needsGstInvoice && (
                <div className="mt-4 p-4 bg-white rounded-2xl space-y-3 text-xs border border-[#191715]/10">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">Registered Company Name</label>
                    <input
                      type="text"
                      value={gstData.companyName}
                      onChange={(e) => setGstData({ ...gstData, companyName: e.target.value })}
                      className="w-full bg-[#F8F5F0] rounded-xl border border-[#191715]/15 p-2.5 text-xs text-[#191715]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">15-Digit GSTIN</label>
                    <input
                      type="text"
                      maxLength={15}
                      value={gstData.gstin}
                      onChange={(e) => setGstData({ ...gstData, gstin: e.target.value.toUpperCase() })}
                      className="w-full bg-[#F8F5F0] rounded-xl border border-[#191715]/15 p-2.5 text-xs font-mono uppercase text-[#191715]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Indian Payment Methods */}
          <div className="p-8 bg-[#EFEAE2] rounded-3xl border border-[#191715]/10 space-y-6">
            <h2 className="font-serif text-2xl text-[#191715] font-normal border-b border-[#191715]/10 pb-3">
              2. Payment Method
            </h2>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`p-4 rounded-2xl text-left transition ${
                  paymentMethod === "upi"
                    ? "bg-[#191715] text-white shadow-md"
                    : "bg-white text-[#191715] border border-[#191715]/10 hover:border-[#191715]"
                }`}
              >
                <QrCode className="w-5 h-5 mb-1" />
                <p className="font-semibold uppercase tracking-wider text-[11px]">Instant UPI</p>
                <p className={`text-[10px] mt-0.5 ${paymentMethod === "upi" ? "text-stone-300" : "text-[#5E5850]"}`}>GPay, PhonePe, Paytm</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-2xl text-left transition ${
                  paymentMethod === "card"
                    ? "bg-[#191715] text-white shadow-md"
                    : "bg-white text-[#191715] border border-[#191715]/10 hover:border-[#191715]"
                }`}
              >
                <CreditCard className="w-5 h-5 mb-1" />
                <p className="font-semibold uppercase tracking-wider text-[11px]">Cards / EMI</p>
                <p className={`text-[10px] mt-0.5 ${paymentMethod === "card" ? "text-stone-300" : "text-[#5E5850]"}`}>Visa, Mastercard, Amex</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-4 rounded-2xl text-left transition ${
                  paymentMethod === "cod"
                    ? "bg-[#191715] text-white shadow-md"
                    : "bg-white text-[#191715] border border-[#191715]/10 hover:border-[#191715]"
                }`}
              >
                <Banknote className="w-5 h-5 mb-1" />
                <p className="font-semibold uppercase tracking-wider text-[11px]">Pay on Delivery</p>
                <p className={`text-[10px] mt-0.5 ${paymentMethod === "cod" ? "text-stone-300" : "text-[#5E5850]"}`}>Cash / UPI at Doorstep</p>
              </button>
            </div>

            {paymentMethod === "upi" && (
              <div className="p-4 bg-white rounded-2xl space-y-3 text-xs border border-[#191715]/10">
                <span className="text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold block">
                  Select Your Preferred UPI Option
                </span>
                <div className="flex gap-2">
                  {["gpay", "phonepe", "paytm"].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setSelectedUpiApp(app)}
                      className={`px-4 py-2 rounded-full uppercase text-[10px] font-semibold tracking-wider transition ${
                        selectedUpiApp === app ? "bg-[#191715] text-white" : "bg-[#EFEAE2] text-[#191715]"
                      }`}
                    >
                      {app}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={upiVpa}
                  onChange={(e) => setUpiVpa(e.target.value)}
                  placeholder="Enter UPI VPA (e.g. mobile@upi)"
                  className="w-full bg-[#F8F5F0] rounded-xl border border-[#191715]/15 p-2.5 text-xs text-[#191715] font-mono"
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT 5 COLS: Order Summary */}
        <div className="lg:col-span-5">
          <div className="p-8 bg-[#EFEAE2] rounded-3xl border border-[#191715]/10 space-y-6 sticky top-28">
            <h2 className="font-serif text-2xl text-[#191715] font-normal border-b border-[#191715]/10 pb-3">
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-white shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#191715] truncate">{item.product.name}</p>
                    <p className="text-[11px] text-[#5E5850]">{item.selectedSize} • Qty {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-[#191715]">{formatINR(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="pt-4 border-t border-[#191715]/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code (AAVAAS10)"
                  className="w-full bg-white rounded-full px-4 py-2 text-xs uppercase tracking-wider font-mono text-[#191715] border border-[#191715]/15 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#191715] hover:bg-[#8C6B4F] text-[#F8F5F0] rounded-full text-xs uppercase tracking-wider font-semibold transition"
                >
                  Apply
                </button>
              </div>
              {promoApplied && <p className="text-[11px] text-emerald-800 font-semibold mt-1">✓ Promo Applied: ₹{promoDiscount} off</p>}
              {promoError && <p className="text-[11px] text-rose-700 mt-1">{promoError}</p>}
            </form>

            {/* Totals */}
            <div className="pt-4 border-t border-[#191715]/10 space-y-2 text-xs text-[#5E5850]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#191715]">{formatINR(cartSubtotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Discount</span>
                  <span>- {formatINR(promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Complimentary Pan-India Shipping</span>
                <span className="font-semibold text-emerald-900">{shippingCost === 0 ? "FREE" : "₹149"}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#191715] pt-3 border-t border-[#191715]/10">
                <span>Total Amount</span>
                <span>{formatINR(grandTotal)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-4 bg-[#191715] hover:bg-[#8C6B4F] disabled:opacity-50 text-[#F8F5F0] text-xs uppercase tracking-[0.18em] font-semibold rounded-full transition shadow-xl flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isProcessing ? "Authorizing Indian Payment..." : `Place Order • ${formatINR(grandTotal)}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
