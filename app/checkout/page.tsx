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

  // Card details state
  const [cardData, setCardData] = useState({
    number: "•••• •••• •••• 4242",
    expiry: "12/28",
    cvv: "•••",
    nameOnCard: "Aryan Malhotra",
  });

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

  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 sm:py-28 animate-in fade-in">
        <div className="bg-[#FDFBF8] border border-[#E2D7C7] p-8 sm:p-14 rounded-xs shadow-2xl space-y-10">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-emerald-800 font-semibold block">
              Payment &amp; Dispatch Order Confirmed
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#141210] font-light">
              Thank You for Weaving with AAVAAS
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto font-serif italic">
              Your order <strong className="text-stone-900 font-mono">{orderId}</strong> has been logged directly into KT International&apos;s Panipat automated dispatch schedule.
            </p>
          </div>

          <div className="bg-[#FAF7F2] border border-[#E2D7C7] p-7 rounded-xs space-y-6 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-6 border-b border-[#EAE3D7]">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block">
                  Order Number
                </span>
                <span className="font-mono font-medium text-stone-900 text-sm">{orderId}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block">
                  Delivery By
                </span>
                <span className="font-semibold text-emerald-800 text-sm">2–3 Business Days</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block">
                  Payment Method
                </span>
                <span className="font-medium text-stone-900 uppercase">
                  {paymentMethod === "upi" ? `UPI (${selectedUpiApp.toUpperCase()})` : paymentMethod}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block">
                  Amount Paid
                </span>
                <span className="font-serif font-medium text-stone-900 text-base">{formatINR(grandTotal)}</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1.5 font-semibold">
                Delivering To:
              </p>
              <p className="font-semibold text-stone-900 text-sm">{shippingAddress.fullName}</p>
              <p className="text-stone-600">
                {shippingAddress.addressLine1}, {shippingAddress.addressLine2}
              </p>
              <p className="text-stone-600">
                {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pincode}
              </p>
              <p className="text-stone-500 mt-1">Phone: +91 {shippingAddress.phone}</p>
            </div>

            {needsGstInvoice && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xs text-xs text-emerald-950">
                <p className="font-semibold">✅ Formal B2B GST Tax Invoice Enabled</p>
                <p className="text-emerald-800 mt-1">
                  Billed to: <strong>{gstData.companyName}</strong> (GSTIN: {gstData.gstin}). Input tax credit will reflect automatically in your GSTR-2B.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#EAE3D7]">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-8 py-3.5 border border-stone-400 hover:border-stone-900 text-stone-800 text-xs uppercase tracking-[0.2em] font-semibold rounded-xs flex items-center justify-center gap-2.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>

            <Link
              href="/"
              onClick={() => clearCart()}
              className="w-full sm:w-auto px-10 py-4 bg-[#141210] hover:bg-stone-800 text-white text-xs uppercase tracking-[0.25em] font-semibold rounded-xs transition text-center shadow-lg"
            >
              Return to Sanctuary
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-[#EFE8DD] border border-[#CEC0AD] flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-8 h-8 stroke-1" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-800 font-light">Your bag is empty</h2>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-serif italic">
          Please select pieces from our Winter &apos;26–27 collection or core bedsheets before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-block mt-4 px-8 py-4 bg-[#141210] text-white text-xs uppercase tracking-[0.25em] font-semibold rounded-xs hover:bg-stone-800 transition shadow-md"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-18">
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* LEFT 7 COLS: Shipping Address, GST Invoice Toggle & Payment Methods */}
        <div className="lg:col-span-7 space-y-10">
          {/* Section 1: Delivery Address */}
          <div className="bg-[#FDFBF8] border border-[#E2D7C7] p-8 sm:p-10 rounded-xs space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#EAE3D7] pb-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-light flex items-center gap-3">
                <Truck className="w-5 h-5 text-stone-700" />
                <span>1. Delivery Destination</span>
              </h2>
              <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">
                Pan-India Express
              </span>
            </div>

            <div className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-stone-700 font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                    Phone (For Courier Dispatch OTP) *
                  </label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={shippingAddress.email}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                  Street Address &amp; Suite / Villa *
                </label>
                <input
                  type="text"
                  value={shippingAddress.addressLine1}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-stone-700 font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={shippingAddress.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                    City / District *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                    State *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 rounded-xs focus:outline-none focus:border-stone-900 text-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* GST INVOICE TOGGLE */}
            <div className="mt-8 pt-6 border-t border-[#EAE3D7]">
              <label className="flex items-center gap-3.5 p-4 bg-[#EFE8DD] border border-[#CEC0AD] rounded-xs cursor-pointer hover:bg-[#E5DDCF] transition">
                <input
                  type="checkbox"
                  checked={needsGstInvoice}
                  onChange={(e) => setNeedsGstInvoice(e.target.checked)}
                  className="w-4 h-4 rounded-xs text-stone-900 focus:ring-stone-900"
                />
                <div>
                  <p className="text-xs font-semibold text-stone-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-stone-700" />
                    <span>Claim 12% GST Input Credit (Business / Hospitality Buyer)</span>
                  </p>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Enter your Registered Company Name &amp; GSTIN to receive a formal B2B invoice.
                  </p>
                </div>
              </label>

              {needsGstInvoice && (
                <div className="mt-4 p-5 bg-[#FAF7F2] border border-[#CEC0AD] rounded-xs space-y-4 animate-in fade-in text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Registered Company / Studio Name *
                    </label>
                    <input
                      type="text"
                      value={gstData.companyName}
                      onChange={(e) => setGstData({ ...gstData, companyName: e.target.value })}
                      className="w-full bg-white border border-[#CEC0AD] p-3 rounded-xs focus:outline-none text-stone-900"
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
                      className="w-full bg-white border border-[#CEC0AD] p-3 rounded-xs focus:outline-none text-stone-900 font-mono uppercase"
                    />
                  </div>
                  <p className="text-[11px] text-emerald-900 font-medium">
                    ✓ Verified eligible for full 12% input tax credit on commercial furnishings.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Indian Payment Options */}
          <div className="bg-[#FDFBF8] border border-[#E2D7C7] p-8 sm:p-10 rounded-xs space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#EAE3D7] pb-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-light flex items-center gap-3">
                <Lock className="w-5 h-5 text-stone-700" />
                <span>2. Select Payment Method</span>
              </h2>
              <span className="text-xs text-stone-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                256-bit Bank Encryption
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`p-4 rounded-xs border text-left transition-all duration-300 flex flex-col justify-between ${
                  paymentMethod === "upi"
                    ? "border-stone-900 bg-[#141210] text-white shadow-md"
                    : "border-[#CEC0AD] bg-[#FAF7F2] text-stone-800 hover:border-stone-800"
                }`}
              >
                <QrCode className="w-6 h-6 mb-2" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">UPI</p>
                  <p className={`text-[10px] mt-0.5 ${paymentMethod === "upi" ? "text-stone-300" : "text-stone-500"}`}>
                    GPay, PhonePe, Paytm
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xs border text-left transition-all duration-300 flex flex-col justify-between ${
                  paymentMethod === "card"
                    ? "border-stone-900 bg-[#141210] text-white shadow-md"
                    : "border-[#CEC0AD] bg-[#FAF7F2] text-stone-800 hover:border-stone-800"
                }`}
              >
                <CreditCard className="w-6 h-6 mb-2" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">Cards</p>
                  <p className={`text-[10px] mt-0.5 ${paymentMethod === "card" ? "text-stone-300" : "text-stone-500"}`}>
                    Visa, Master, RuPay
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-4 rounded-xs border text-left transition-all duration-300 flex flex-col justify-between ${
                  paymentMethod === "cod"
                    ? "border-stone-900 bg-[#141210] text-white shadow-md"
                    : "border-[#CEC0AD] bg-[#FAF7F2] text-stone-800 hover:border-stone-800"
                }`}
              >
                <Banknote className="w-6 h-6 mb-2" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">Cash on Delivery</p>
                  <p className={`text-[10px] mt-0.5 ${paymentMethod === "cod" ? "text-stone-300" : "text-stone-500"}`}>
                    Pay at Doorstep
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("netbanking")}
                className={`p-4 rounded-xs border text-left transition-all duration-300 flex flex-col justify-between ${
                  paymentMethod === "netbanking"
                    ? "border-stone-900 bg-[#141210] text-white shadow-md"
                    : "border-[#CEC0AD] bg-[#FAF7F2] text-stone-800 hover:border-stone-800"
                }`}
              >
                <Building className="w-6 h-6 mb-2" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">Net Banking</p>
                  <p className={`text-[10px] mt-0.5 ${paymentMethod === "netbanking" ? "text-stone-300" : "text-stone-500"}`}>
                    HDFC, ICICI, SBI
                  </p>
                </div>
              </button>
            </div>

            {/* UPI view */}
            {paymentMethod === "upi" && (
              <div className="p-5 bg-[#FAF7F2] border border-[#CEC0AD] rounded-xs space-y-4 animate-in fade-in">
                <div className="flex items-center gap-3">
                  {["gpay", "phonepe", "paytm", "bhim"].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setSelectedUpiApp(app)}
                      className={`px-4 py-2 rounded-xs text-xs font-semibold border uppercase tracking-wider transition ${
                        selectedUpiApp === app
                          ? "bg-[#141210] text-white border-[#141210]"
                          : "bg-white text-stone-700 border-[#CEC0AD] hover:border-stone-500"
                      }`}
                    >
                      {app}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1.5">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiVpa}
                      onChange={(e) => setUpiVpa(e.target.value)}
                      placeholder="mobile@upi or user@okhdfc"
                      className="w-full bg-white border border-[#CEC0AD] p-3 text-xs text-stone-900 rounded-xs focus:outline-none"
                    />
                  </div>
                  <div className="p-4 bg-[#EFE8DD] border border-[#CEC0AD] rounded-xs text-center text-xs text-stone-700">
                    <p className="font-semibold text-stone-950 mb-1">Instant App Notification</p>
                    <p className="text-[11px] text-stone-600 font-serif italic">
                      A payment request will be sent to your {selectedUpiApp.toUpperCase()} app upon placing order.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Card view */}
            {paymentMethod === "card" && (
              <div className="p-5 bg-[#FAF7F2] border border-[#CEC0AD] rounded-xs space-y-4 animate-in fade-in text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                    className="w-full bg-white border border-[#CEC0AD] p-3 rounded-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Valid Thru</label>
                    <input
                      type="text"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      className="w-full bg-white border border-[#CEC0AD] p-3 rounded-xs font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      className="w-full bg-white border border-[#CEC0AD] p-3 rounded-xs font-mono text-center"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-stone-700 font-medium mb-1">Name on Card</label>
                    <input
                      type="text"
                      value={cardData.nameOnCard}
                      onChange={(e) => setCardData({ ...cardData, nameOnCard: e.target.value })}
                      className="w-full bg-white border border-[#CEC0AD] p-3 rounded-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* COD view */}
            {paymentMethod === "cod" && (
              <div className="p-5 bg-[#FAF7F2] border border-[#CEC0AD] rounded-xs space-y-2 animate-in fade-in text-xs">
                <div className="flex items-center gap-2 font-semibold text-stone-900 text-sm">
                  <Banknote className="w-5 h-5 text-emerald-800" />
                  <span>Pay Cash or UPI QR upon Delivery</span>
                </div>
                <p className="text-stone-600 leading-relaxed font-serif italic text-sm">
                  Our courier executive will present a verified package. You may pay with cash or scan the delivery agent&apos;s dynamic UPI QR code on the spot.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT 5 COLS: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FDFBF8] border border-[#E2D7C7] p-8 rounded-xs space-y-6 sticky top-28 shadow-md">
            <h3 className="font-serif text-2xl text-stone-900 border-b border-[#EAE3D7] pb-4 font-light">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h3>

            <div className="divide-y divide-[#EAE3D7] max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <div className="relative w-16 h-20 bg-[#EFE8DD] shrink-0 rounded-xs overflow-hidden border border-[#E2D7C7]">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <h4 className="font-serif text-base text-stone-900 line-clamp-1 font-normal">
                        {item.product.name}
                      </h4>
                      <p className="text-stone-500 mt-0.5">
                        {item.selectedSize} • {item.selectedColor}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-stone-700">
                      <span>Qty: {item.quantity}</span>
                      <span className="font-serif font-medium text-stone-900 text-sm">
                        {formatINR(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleApplyPromo} className="pt-4 border-t border-[#EAE3D7]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Coupon code (e.g. AAVAAS10)"
                  className="flex-1 bg-[#FAF7F2] border border-[#CEC0AD] px-4 py-2.5 text-xs uppercase font-mono text-stone-900 rounded-xs focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#141210] text-white text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition rounded-xs"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-rose-600 mt-1">{promoError}</p>}
              {promoApplied && (
                <p className="text-xs text-emerald-800 mt-1 font-medium">
                  ✓ Code applied! {formatINR(promoDiscount)} discount deducted.
                </p>
              )}
            </form>

            <div className="space-y-2.5 text-xs text-stone-600 pt-4 border-t border-[#EAE3D7]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-stone-900">{formatINR(cartSubtotal)}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Promo Code Savings</span>
                  <span>- {formatINR(promoDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Pan-India Delivery</span>
                <span className={hasFreeShipping ? "text-emerald-800 font-semibold" : "text-stone-900"}>
                  {hasFreeShipping ? "FREE (Orders > ₹1,999)" : "₹149"}
                </span>
              </div>

              <div className="pt-4 border-t border-[#EAE3D7] flex justify-between items-baseline">
                <div>
                  <span className="text-base font-semibold text-stone-900">Total Payable</span>
                  <p className="text-[10px] text-stone-400">All taxes &amp; shipping included</p>
                </div>
                <span className="font-serif text-3xl font-light text-stone-900">
                  {formatINR(grandTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-4.5 bg-[#141210] hover:bg-[#25221F] text-white text-xs uppercase tracking-[0.25em] font-semibold rounded-xs transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5"
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
          </div>
        </div>
      </div>
    </div>
  );
}
