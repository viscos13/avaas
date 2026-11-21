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
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-stone-800/80">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-serif text-sm text-stone-100 font-medium">Panipat Heritage</p>
              <p className="text-xs text-stone-400 mt-0.5">Woven on advanced looms by KT International</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-serif text-sm text-stone-100 font-medium">Free Pan-India Delivery</p>
              <p className="text-xs text-stone-400 mt-0.5">Complimentary shipping on orders above ₹1,999</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
            <div>
              <p className="font-serif text-sm text-stone-100 font-medium">7-Day Easy Returns</p>
              <p className="text-xs text-stone-400 mt-0.5">Hassle-free doorstep pickup &amp; exchanges</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p className="font-serif text-sm text-stone-100 font-medium">GST Invoiced &amp; Verified</p>
              <p className="text-xs text-stone-400 mt-0.5">Full input credit for hotels &amp; interior designers</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-12 border-b border-stone-800/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
              The AAVAAS Journal
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-stone-100">
              Join the AAVAAS Journal — 10% off your first order
            </h3>
            <p className="text-xs text-stone-400 max-w-md leading-relaxed">
              Stories of Panipat textile heritage, new seasonal fabric releases, and intimate home styling guides.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="bg-stone-900 border border-stone-700 p-4 rounded-xs flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-900/80 text-emerald-300 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-200">Welcome to the AAVAAS Journal</p>
                  <p className="text-[11px] text-stone-400">
                    Use code <strong className="text-amber-300">AAVAAS10</strong> at checkout for 10% off.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-stone-900/90 border border-stone-700 px-4 py-3 text-xs text-stone-100 placeholder-stone-500 rounded-xs focus:outline-none focus:border-stone-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FAF8F5] text-stone-900 hover:bg-white text-xs uppercase tracking-widest font-medium rounded-xs transition flex items-center gap-1.5 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          {/* Col 1: Shop */}
          <div className="space-y-3">
            <p className="font-serif text-sm uppercase tracking-wider text-stone-200">Shop Sanctuary</p>
            <ul className="space-y-2 text-stone-400">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link href={`/shop?category=${c.slug}`} className="hover:text-stone-100 transition">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop?winter=true" className="text-[#B95D41] hover:underline">
                  Winter &apos;26–27 Launch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: The Collections */}
          <div className="space-y-3">
            <p className="font-serif text-sm uppercase tracking-wider text-stone-200">Collections</p>
            <ul className="space-y-2 text-stone-400">
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
              <li>
                <Link href="/shop" className="hover:text-stone-100 transition">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Business & Exports */}
          <div className="space-y-3">
            <p className="font-serif text-sm uppercase tracking-wider text-stone-200">Business &amp; Exports</p>
            <ul className="space-y-2 text-stone-400">
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

          {/* Col 4: Support & Policies */}
          <div className="space-y-3">
            <p className="font-serif text-sm uppercase tracking-wider text-stone-200">Support &amp; Care</p>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#order-tracking" onClick={(e) => { e.preventDefault(); alert("Order tracking simulation: Enter your AAV-XXXXXX ID to view live Pan-India dispatch status."); }} className="hover:text-stone-100 transition">
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
              <li>
                <Link href="/our-story" className="hover:text-stone-100 transition">
                  Panipat Factory Visits
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Brand Identity */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <p className="font-serif text-sm uppercase tracking-wider text-stone-200">Parent Heritage</p>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              Parent company <strong>KT International</strong> has spearheaded Indian textile innovation for over three decades from Panipat, weaving export-grade bed and bath collections for five-star global destinations.
            </p>
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block">
                Flagship Works:
              </span>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Sector 29, Industrial Area, Panipat, Haryana 132103
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with mandatory exact line */}
        <div className="pt-8 border-t border-stone-800 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p className="font-medium text-stone-300">
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
