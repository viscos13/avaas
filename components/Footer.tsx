"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Truck, RefreshCw, Award } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#141210] text-[#FAF6F0] pt-24 pb-16 border-t border-stone-800">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Trust Badges Strip with Generous Spacing */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-20 border-b border-stone-800/80">
          <div className="flex items-start gap-4">
            <Award className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-serif text-base text-stone-100 font-normal">Panipat Heritage</p>
              <p className="text-xs text-stone-400 leading-relaxed">Woven on advanced looms by parent company KT International</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Truck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-serif text-base text-stone-100 font-normal">Free Pan-India Delivery</p>
              <p className="text-xs text-stone-400 leading-relaxed">Complimentary courier on orders above ₹1,999</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <RefreshCw className="w-6 h-6 text-stone-300 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-serif text-base text-stone-100 font-normal">7-Day Easy Returns</p>
              <p className="text-xs text-stone-400 leading-relaxed">Hassle-free doorstep pickup &amp; exchanges</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-serif text-base text-stone-100 font-normal">GST Invoiced &amp; Verified</p>
              <p className="text-xs text-stone-400 leading-relaxed">Full 12% input credit for hotels &amp; interior designers</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section with Royal Spacing */}
        <div className="py-20 border-b border-stone-800/80 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              The AAVAAS Journal
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-stone-100 leading-tight">
              Join the AAVAAS Journal — 10% off your first order
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed font-light">
              Stories of Panipat textile heritage, new seasonal fabric releases, and private interior styling portfolios.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="bg-stone-900 border border-stone-700 p-5 rounded-xs flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-100">Welcome to the AAVAAS Journal</p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Use code <strong className="text-[#D4AF37] font-mono">AAVAAS10</strong> at checkout for 10% off your order.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-stone-900/90 border border-stone-700 px-5 py-4 text-xs text-stone-100 placeholder-stone-500 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#FAF6F0] hover:bg-white text-[#141210] text-xs uppercase tracking-[0.25em] font-semibold rounded-xs transition-all duration-300 flex items-center justify-center gap-2 shrink-0 shadow-md"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-20 grid grid-cols-2 md:grid-cols-5 gap-10 text-xs">
          <div className="space-y-4">
            <p className="font-serif text-base uppercase tracking-[0.2em] text-stone-200">Shop Sanctuary</p>
            <ul className="space-y-2.5 text-stone-400">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link href={`/shop?category=${c.slug}`} className="hover:text-stone-100 transition">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop?winter=true" className="text-[#B95D41] hover:underline font-medium">
                  Winter &apos;26–27 Launch
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="font-serif text-base uppercase tracking-[0.2em] text-stone-200">Collections</p>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <Link href="/shop?collection=essential" className="hover:text-stone-100 transition">
                  Essential Range (₹1,299–₹2,499)
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=signature" className="hover:text-stone-100 transition">
                  Signature Range (₹2,299–₹4,499)
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=reserve" className="hover:text-stone-100 transition">
                  Reserve Editions (₹4,999–₹9,999)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gifting" className="hover:text-stone-100 transition">
                  Trousseau &amp; Wedding Suites
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="font-serif text-base uppercase tracking-[0.2em] text-stone-200">Business &amp; Exports</p>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <Link href="/bulk-enquiries" className="hover:text-stone-100 transition font-medium text-stone-200">
                  Bulk &amp; Institutional RFQ
                </Link>
              </li>
              <li>
                <Link href="/bulk-enquiries#hotels" className="hover:text-stone-100 transition">
                  Hotels, Resorts &amp; Spas
                </Link>
              </li>
              <li>
                <Link href="/bulk-enquiries#designers" className="hover:text-stone-100 transition">
                  Interior Designers &amp; Architects
                </Link>
              </li>
              <li>
                <Link href="/bulk-enquiries#corporate" className="hover:text-stone-100 transition">
                  Corporate Gifting Hampers
                </Link>
              </li>
              <li>
                <Link href="/bulk-enquiries#exports" className="hover:text-stone-100 transition">
                  KT International Export Division
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="font-serif text-base uppercase tracking-[0.2em] text-stone-200">Support &amp; Care</p>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <a href="#order-tracking" onClick={(e) => { e.preventDefault(); alert("Order tracking: Enter your AAV-XXXXX ID to view live dispatch status."); }} className="hover:text-stone-100 transition">
                  Order Tracking
                </a>
              </li>
              <li>
                <Link href="/our-story#care" className="hover:text-stone-100 transition">
                  Fabric &amp; Loom Care Guide
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-stone-100 transition">
                  Shipping &amp; Delivery Matrix
                </Link>
              </li>
              <li>
                <a href="https://wa.me/919812000000" target="_blank" rel="noopener noreferrer" className="hover:text-stone-100 transition">
                  WhatsApp Support Desk
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-4">
            <p className="font-serif text-base uppercase tracking-[0.2em] text-stone-200">Parent Heritage</p>
            <p className="text-stone-400 leading-relaxed text-xs font-light">
              Parent company <strong>KT International</strong> has spearheaded Indian textile innovation for over three decades from Panipat, weaving export-grade bed and bath collections for prestigious destinations across 20+ countries.
            </p>
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
                Flagship Works:
              </span>
              <p className="text-xs text-stone-400 mt-1">
                Sector 29, Industrial Area, Panipat, Haryana 132103
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Bottom Legal Line */}
        <div className="pt-10 border-t border-stone-800 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-400">
          <p className="font-medium text-stone-300 tracking-wide">
            AAVAAS — A Home &amp; Living Brand by KT International | Panipat, Haryana, India.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-stone-500">
            <span>© {new Date().getFullYear()} AAVAAS Living Pvt Ltd.</span>
            <span>All rights reserved</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
