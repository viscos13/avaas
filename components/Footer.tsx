"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setEmail(""), 3000);
    }
  };

  return (
    <footer className="bg-[#191715] text-[#E6E0D8] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
        {/* Newsletter: Sleek Pill Form */}
        <div className="pb-16 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-2 text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6B4F] font-semibold">
              The AAVAAS Journal
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white leading-tight">
              Join the Journal — 10% off your first order.
            </h3>
            <p className="text-xs text-[#A8A29A] leading-relaxed max-w-md font-normal">
              Stories of Panipat textile heritage, seasonal collection debuts, and private styling previews.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-3 bg-white/10 border border-[#8C6B4F] text-xs text-[#E6E0D8] rounded-full flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-[#8C6B4F]" />
                <span>Thank you. Use code <strong>AAVAAS10</strong> at checkout for 10% off.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex items-center bg-white/5 border border-white/15 rounded-full p-1.5 focus-within:border-white/40 transition"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for the journal"
                  className="w-full min-w-0 bg-transparent px-4 sm:px-5 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none tracking-wider"
                />
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2.5 bg-white text-[#191715] hover:bg-[#F8F5F0] text-xs uppercase tracking-[0.18em] font-semibold rounded-full transition flex items-center gap-1.5 shrink-0 shadow-md cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Minimal Link Architecture */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-xs text-left">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white font-semibold">Departments</p>
            <ul className="space-y-2.5 text-[#A8A29A]">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link href={`/shop?category=${c.slug}`} className="hover:text-white transition">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop?winter=true" className="text-[#8C6B4F] hover:underline">
                  Winter &apos;26 Capsule
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white font-semibold">Collections</p>
            <ul className="space-y-2.5 text-[#A8A29A]">
              <li>
                <Link href="/shop?collection=essential" className="hover:text-white transition">
                  Essential Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=signature" className="hover:text-white transition">
                  Signature Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=reserve" className="hover:text-white transition">
                  Reserve Limited Edition
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gifting" className="hover:text-white transition">
                  Gifting Suites
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white font-semibold">Business &amp; Trade</p>
            <ul className="space-y-2.5 text-[#A8A29A]">
              <li>
                <Link href="/bulk-enquiries" className="hover:text-white transition">
                  Hospitality &amp; Hotel RFQ
                </Link>
              </li>
              <li>
                <Link href="/bulk-enquiries" className="hover:text-white transition">
                  Interior Designers Program
                </Link>
              </li>
              <li>
                <Link href="/bulk-enquiries" className="hover:text-white transition">
                  Corporate Gifting
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition">
                  KT International Export Division
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white font-semibold">Customer Concierge</p>
            <ul className="space-y-2.5 text-[#A8A29A]">
              <li>
                <Link href="/checkout" className="hover:text-white transition">
                  Complimentary Pan-India Shipping
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition">
                  Fabric &amp; Loom Care Guide
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/919812000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  WhatsApp Concierge
                </a>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white transition">
                  B2B GST Tax Invoicing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Exact Mandatory Bottom Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8E877F] text-center md:text-left">
          <p className="font-light tracking-wide text-[#A8A29A]">
            AAVAAS — A Home &amp; Living Brand by KT International | Panipat, Haryana, India.
          </p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>© {new Date().getFullYear()} AAVAAS Living</span>
            <Link href="/" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
