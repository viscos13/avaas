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
  Sparkles,
  ShoppingBag,
  Trash2,
  Lock,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartSubtotal, hasFreeShipping, clearCart } = useCart();

  // Step state: 'checkout' | 'confirmed'
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

  // Payment Method State: 'upi' | 'card' | 'cod' | 'netbanking'
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod" | "netbanking">("upi");
  const [selectedUpiApp, setSelectedUpiApp] = useState("gpay");
  const [upiVpa, setUpiVpa] = useState("aryan@okhdfcbank");

  // Promo Code State
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  // Card details state
  const [cardData, setCardData] = useState({
    number: "•••• •••• •••• 4242",
    expiry: "12/28",
    cvv: "•••",
    nameOnCard: "Aryan Malhotra",
  });

  // Handle Pincode Auto-detect
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
    }, 1500);
  };

  // If order is placed, show Order Confirmation Screen
  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 animate-in fade-in">
        <div className="bg-white border border-[#E5DFD5] p-8 sm:p-12 rounded-xs shadow-xl space-y-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-semibold">
              Payment &amp; Order Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-900">
              Thank You for Weaving with AAVAAS
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Your order <strong className="text-stone-900 font-mono">{orderId}</strong> has been logged directly into KT International&apos;s Panipat dispatch system.
            </p>
          </div>

          {/* Key Details Card */}
          <div className="bg-[#FAF8F5] border border-stone-200 p-6 rounded-xs space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                  Order Number
                </span>
                <span className="font-mono font-medium text-stone-900">{orderId}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                  Delivery By
                </span>
                <span className="font-medium text-emerald-800">2–3 Business Days</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                  Payment Method
                </span>
                <span className="font-medium text-stone-900 uppercase">
                  {paymentMethod === "upi" ? `UPI (${selectedUpiApp.toUpperCase()})` : paymentMethod}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                  Amount Paid
                </span>
                <span className="font-medium text-stone-900">{formatINR(grandTotal)}</span>
              </div>
            </div>

            {/* Shipping To */}
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">
                Delivering To:
              </p>
              <p className="font-medium text-stone-900">{shippingAddress.fullName}</p>
              <p className="text-stone-600">
                {shippingAddress.addressLine1}, {shippingAddress.addressLine2}
              </p>
              <p className="text-stone-600">
                {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pincode}
              </p>
              <p className="text-stone-500 mt-1">Phone: +91 {shippingAddress.phone}</p>
            </div>

            {/* GST Tax Invoice acknowledgement */}
            {needsGstInvoice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xs text-[11px] text-emerald-900">
                <p className="font-medium">✅ B2B GST Tax Invoice Enabled</p>
                <p className="text-emerald-800 mt-0.5">
                  Billed to: <strong>{gstData.companyName}</strong> (GSTIN: {gstData.gstin}). Input tax credit will reflect in your GSTR-2B.
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-2.5 border border-stone-300 hover:border-stone-800 text-stone-700 text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice / Receipt</span>
            </button>

            <Link
              href="/"
              onClick={() => clearCart()}
              className="w-full sm:w-auto px-8 py-3 bg-[#1C1917] hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition text-center"
            >
              Return to Sanctuary
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-8 h-8 stroke-1" />
        </div>
        <h2 className="font-serif text-3xl text-stone-800">Your bag is empty</h2>
        <p className="text-xs text-stone-500 leading-relaxed">
          Please select pieces from our Winter &apos;26–27 collection or core bedsheets before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-block mt-4 px-6 py-3 bg-[#1C1917] text-white text-xs uppercase tracking-widest rounded-xs hover:bg-stone-800 transition"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT 7 COLS: Shipping Address, GST Invoice Toggle & Payment Methods */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Delivery Address */}
          <div className="bg-white border border-[#E5DFD5] p-6 sm:p-8 rounded-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h2 className="font-serif text-xl sm:text-2xl text-stone-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-stone-700" />
                <span>1. Delivery Destination</span>
              </h2>
              <span className="text-[11px] text-emerald-800 font-medium">Pan-India Courier Network</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-stone-300 p-2.5 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Phone Number (For Delivery OTP) *</label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-stone-300 p-2.5 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Email (For Invoice &amp; Tracking) *</label>
                <input
                  type="email"
                  value={shippingAddress.email}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-stone-300 p-2.5 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Flat, Suite, Building, Street *</label>
                <input
                  type="text"
                  value={shippingAddress.addressLine1}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-stone-300 p-2.5 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Pincode *</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={shippingAddress.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-stone-300 p-2.5 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">City / District *</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-stone-300 p-2.5 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">State *</label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-stone-300 p-2.5 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* GST INVOICE TOGGLE FOR BUSINESS BUYERS */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              <label className="flex items-center gap-3 p-3 bg-[#FAF8F5] border border-stone-300 rounded-xs cursor-pointer hover:bg-stone-100 transition">
                <input
                  type="checkbox"
                  checked={needsGstInvoice}
                  onChange={(e) => setNeedsGstInvoice(e.target.checked)}
                  className="w-4 h-4 rounded-xs text-stone-900 focus:ring-stone-900"
                />
                <div>
                  <p className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-stone-700" />
                    <span>Claim GST Input Tax Credit (Business / Hospitality Buyer)</span>
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Enter your Registered Company Name &amp; GSTIN to receive a compliant B2B tax invoice.
                  </p>
                </div>
              </label>

              {needsGstInvoice && (
                <div className="mt-3 p-4 bg-white border border-stone-300 rounded-xs space-y-3 animate-in fade-in text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Registered Company / Studio Name *
                    </label>
                    <input
                      type="text"
                      value={gstData.companyName}
                      onChange={(e) => setGstData({ ...gstData, companyName: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-stone-300 p-2.5 rounded-xs focus:outline-none text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      15-Digit GST Identification Number (GSTIN) *
                    </label>
                    <input
                      type="text"
                      maxLength={15}
                      value={gstData.gstin}
                      onChange={(e) => setGstData({ ...gstData, gstin: e.target.value.toUpperCase() })}
                      className="w-full bg-[#FAF8F5] border border-stone-300 p-2.5 rounded-xs focus:outline-none text-stone-900 font-mono uppercase"
                    />
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    ✓ Eligible for full 12% GST input credit on commercial textile purchases.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Indian Payment Options */}
          <div className="bg-white border border-[#E5DFD5] p-6 sm:p-8 rounded-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h2 className="font-serif text-xl sm:text-2xl text-stone-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-stone-700" />
                <span>2. Select Payment Method</span>
              </h2>
              <span className="text-[11px] text-stone-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                256-bit Encrypted
              </span>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`p-3 rounded-xs border text-left transition flex flex-col justify-between ${
                  paymentMethod === "upi"
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-200 bg-[#FAF8F5] text-stone-800 hover:border-stone-400"
                }`}
              >
                <QrCode className="w-5 h-5 mb-2" />
                <div>
                  <p className="text-xs font-semibold">UPI</p>
                  <p className={`text-[10px] ${paymentMethod === "upi" ? "text-stone-300" : "text-stone-500"}`}>
                    GPay, PhonePe, Paytm
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 rounded-xs border text-left transition flex flex-col justify-between ${
                  paymentMethod === "card"
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-200 bg-[#FAF8F5] text-stone-800 hover:border-stone-400"
                }`}
              >
                <CreditCard className="w-5 h-5 mb-2" />
                <div>
                  <p className="text-xs font-semibold">Cards</p>
                  <p className={`text-[10px] ${paymentMethod === "card" ? "text-stone-300" : "text-stone-500"}`}>
                    Visa, Master, RuPay
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-3 rounded-xs border text-left transition flex flex-col justify-between ${
                  paymentMethod === "cod"
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-200 bg-[#FAF8F5] text-stone-800 hover:border-stone-400"
                }`}
              >
                <Banknote className="w-5 h-5 mb-2" />
                <div>
                  <p className="text-xs font-semibold">Cash on Delivery</p>
                  <p className={`text-[10px] ${paymentMethod === "cod" ? "text-stone-300" : "text-stone-500"}`}>
                    Pay at Doorstep
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("netbanking")}
                className={`p-3 rounded-xs border text-left transition flex flex-col justify-between ${
                  paymentMethod === "netbanking"
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-200 bg-[#FAF8F5] text-stone-800 hover:border-stone-400"
                }`}
              >
                <Building className="w-5 h-5 mb-2" />
                <div>
                  <p className="text-xs font-semibold">Net Banking</p>
                  <p className={`text-[10px] ${paymentMethod === "netbanking" ? "text-stone-300" : "text-stone-500"}`}>
                    HDFC, ICICI, SBI
                  </p>
                </div>
              </button>
            </div>

            {/* Sub-tab view: UPI */}
            {paymentMethod === "upi" && (
              <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-xs space-y-4 animate-in fade-in">
                <div className="flex items-center gap-3">
                  {["gpay", "phonepe", "paytm", "bhim"].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setSelectedUpiApp(app)}
                      className={`px-3 py-1.5 rounded-xs text-xs font-medium border uppercase transition ${
                        selectedUpiApp === app
                          ? "bg-stone-900 text-white border-stone-900"
                          : "bg-white text-stone-700 border-stone-300 hover:border-stone-500"
                      }`}
                    >
                      {app}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiVpa}
                      onChange={(e) => setUpiVpa(e.target.value)}
                      placeholder="mobile@upi or user@okhdfc"
                      className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 rounded-xs focus:outline-none"
                    />
                  </div>
                  <div className="p-3 bg-white border border-stone-200 rounded-xs text-center text-xs text-stone-600">
                    <p className="font-semibold text-stone-900 mb-0.5">Instant App Approval</p>
                    <p className="text-[11px] text-stone-500">
                      A payment request will be sent to your {selectedUpiApp.toUpperCase()} app upon placing order.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab view: Card */}
            {paymentMethod === "card" && (
              <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-xs space-y-3 animate-in fade-in text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                    className="w-full bg-white border border-stone-300 p-2.5 rounded-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Valid Thru</label>
                    <input
                      type="text"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      className="w-full bg-white border border-stone-300 p-2.5 rounded-xs font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      className="w-full bg-white border border-stone-300 p-2.5 rounded-xs font-mono text-center"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-stone-700 font-medium mb-1">Name on Card</label>
                    <input
                      type="text"
                      value={cardData.nameOnCard}
                      onChange={(e) => setCardData({ ...cardData, nameOnCard: e.target.value })}
                      className="w-full bg-white border border-stone-300 p-2.5 rounded-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab view: Cash on Delivery */}
            {paymentMethod === "cod" && (
              <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-xs space-y-2 animate-in fade-in text-xs">
                <div className="flex items-center gap-2 font-semibold text-stone-900">
                  <Banknote className="w-4 h-4 text-emerald-700" />
                  <span>Pay Cash or UPI QR upon Delivery</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Our courier executive will present a verified package. You may pay with cash or scan the delivery agent&apos;s dynamic UPI QR code on the spot.
                </p>
                <p className="text-[11px] text-stone-500 italic">
                  Note: An SMS verification OTP will be sent prior to dispatch.
                </p>
              </div>
            )}

            {/* Sub-tab view: Net Banking */}
            {paymentMethod === "netbanking" && (
              <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-xs space-y-3 animate-in fade-in text-xs">
                <p className="font-medium text-stone-900">Popular Indian Banks:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank"].map((b) => (
                    <label
                      key={b}
                      className="p-2 border border-stone-300 bg-white rounded-xs flex items-center gap-2 cursor-pointer hover:border-stone-700"
                    >
                      <input type="radio" name="bank" defaultChecked={b === "HDFC Bank"} />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT 5 COLS: Order Summary & Instant Checkout */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E5DFD5] p-6 rounded-xs space-y-5 sticky top-24 shadow-xs">
            <h3 className="font-serif text-xl text-stone-900 border-b border-stone-200 pb-3">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h3>

            {/* Cart Items list */}
            <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex gap-3">
                  <div className="relative w-14 h-18 bg-stone-100 shrink-0 rounded-xs overflow-hidden border border-stone-200">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <h4 className="font-serif text-sm text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {item.selectedSize} • {item.selectedColor}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-stone-700">
                      <span>Qty: {item.quantity}</span>
                      <span className="font-semibold text-stone-900">
                        {formatINR(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="pt-3 border-t border-stone-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Coupon code (e.g. AAVAAS10)"
                  className="flex-1 bg-[#FAF8F5] border border-stone-300 px-3 py-2 text-xs uppercase font-mono text-stone-900 rounded-xs focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 text-white text-xs uppercase tracking-wider font-medium hover:bg-stone-900 transition rounded-xs"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-rose-600 mt-1">{promoError}</p>}
              {promoApplied && (
                <p className="text-xs text-emerald-700 mt-1 font-medium">
                  ✓ Code applied! {formatINR(promoDiscount)} discount deducted.
                </p>
              )}
            </form>

            {/* Financial Totals Breakdown */}
            <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-stone-900">{formatINR(cartSubtotal)}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Promo Code Savings</span>
                  <span>- {formatINR(promoDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Pan-India Delivery</span>
                <span className={hasFreeShipping ? "text-emerald-700 font-medium" : "text-stone-900"}>
                  {hasFreeShipping ? "FREE (Orders > ₹1,999)" : "₹149"}
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-stone-500">
                <span>Estimated GST Included (12%)</span>
                <span>{formatINR(Math.round(cartSubtotal * 0.107))}</span>
              </div>

              <div className="pt-3 border-t border-stone-300 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-semibold text-stone-900">Total Payable</span>
                  <p className="text-[10px] text-stone-400">All taxes &amp; shipping included</p>
                </div>
                <span className="font-serif text-2xl font-medium text-stone-900">
                  {formatINR(grandTotal)}
                </span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-4 bg-[#1C1917] hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition shadow-lg flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Confirming Order with Panipat Mill...</span>
              ) : (
                <>
                  <span>Place Order • {formatINR(grandTotal)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-[10px] text-stone-500 text-center space-y-1">
              <p>7-Day Easy Returns • Doorstep Pickup Guaranteed</p>
              <p>Authentic Loom Woven • KT International, Panipat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
