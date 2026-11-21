"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Building2,
  Hotel,
  Palette,
  Gift,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Send,
  Award,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BulkEnquiriesPage() {
  const [submitted, setSubmitted] = useState(false);
  const [rfqNumber, setRfqNumber] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    buyerType: "Hotels & Resorts",
    productCategories: ["Bedroom (Bedsheets, Dohars, Blankets)"],
    orderVolume: "200 – 500 pcs",
    phone: "",
    email: "",
    targetDelivery: "Within 30 Days",
    message: "",
    gstin: "",
  });

  const buyerTypes = [
    {
      title: "Hotels & Luxury Resorts",
      desc: "5-star hotel grade 400TC–600TC bed linens, 700 GSM zero-twist bath sheets, and bespoke duvets.",
    },
    {
      title: "Interior Designers & Architects",
      desc: "Custom dimensions, custom Pantone palette dyeing, and textured handloom bouclé cushions.",
    },
    {
      title: "Retailers & Wholesalers",
      desc: "Direct mill-gate pricing, private label packaging, and scheduled distributor dispatches.",
    },
    {
      title: "Corporate & Festive Gifting",
      desc: "Handcrafted linen keepsake trunks, twin dohar sets, and company logo embossed sleeves.",
    },
    {
      title: "Global Export Buyers",
      desc: "Container-scale raschel mink blankets, OEKO-TEX Standard 100 certification, and CIF/FOB logistics.",
    },
  ];

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => {
      const exists = prev.productCategories.includes(category);
      if (exists) {
        return {
          ...prev,
          productCategories: prev.productCategories.filter((c) => c !== category),
        };
      } else {
        return {
          ...prev,
          productCategories: [...prev.productCategories, category],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `KT-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqNumber(generatedId);
    setSubmitted(true);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="bg-[#F8F5F0] text-[#191715] pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-32">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14">
        {/* Editorial B2B Header */}
        <div className="max-w-3xl mb-10 sm:mb-16 text-left">
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-2">
            KT International · Institutional &amp; Export Division
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#191715] font-normal leading-[1.1] tracking-tight">
            Direct Mill Procurement for Hospitality &amp; Enterprise
          </h1>
          <p className="text-[15px] text-[#5E5850] mt-4 leading-relaxed font-normal">
            Leverage 35+ years of Panipat textile manufacturing scale. From boutique luxury resorts to nationwide corporate gifting and international exports — access factory-direct pricing with verified GST input tax credit and OEKO-TEX certifications.
          </p>
        </div>

        {/* 2-Column Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Capabilities & MOQs */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="p-8 sm:p-10 bg-[#EFEAE2] rounded-3xl border border-[#191715]/10 space-y-6 shadow-sm">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6B4F] font-semibold block mb-1">
                  Mill Capacity &amp; Strengths
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#191715] font-normal">
                  KT International Infrastructure
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[#5E5850] leading-relaxed">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#191715] font-semibold">Integrated Panipat Mill:</strong> In-house yarn dyeing, automated circular raschel warp-knits, wide-width air-jet looms, and computerized box quilting.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#191715] font-semibold">Bespoke Sizing:</strong> Seamless weaving of 108&quot; × 108&quot;, 120&quot; × 120&quot;, and 15&quot; fitted sheet depths for heavy luxury hotel mattresses.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#191715] font-semibold">Private Label &amp; Branding:</strong> Custom woven damask labels, gold-foil debossed gift trunks, and barcode tagging.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#191715] font-semibold">Pan-India Express Dispatch:</strong> Dedicated container loading bays and express air-cargo connectivity to all major metros.
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#191715]/10">
                <p className="text-[10px] text-[#5E5850] uppercase tracking-[0.2em] mb-3 font-semibold">Urgent requirement?</p>
                <a
                  href="https://wa.me/919812000000?text=Hello%20KT%20International%20B2B%20Desk,%20I%20have%20an%20urgent%20bulk%20enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 bg-[#191715] hover:bg-[#8C6B4F] text-[#F8F5F0] text-xs uppercase tracking-[0.18em] font-semibold rounded-full flex items-center justify-center gap-2.5 transition shadow-md"
                >
                  <span>Connect with Institutional Desk</span>
                </a>
              </div>
            </div>

            {/* Buyer Types Carousel/List */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#5E5850] font-semibold block">
                Tailored Programs for Every Scale
              </span>
              <div className="space-y-2.5">
                {buyerTypes.map((b) => (
                  <div key={b.title} className="p-4 bg-white rounded-2xl border border-[#191715]/8 shadow-xs">
                    <h4 className="text-sm font-semibold text-[#191715]">{b.title}</h4>
                    <p className="text-xs text-[#5E5850] mt-1 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: RFQ Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-8 lg:p-10 shadow-sm border border-[#191715]/8 text-left">
              {submitted ? (
                <div className="py-12 space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C6B4F] font-semibold block mb-1">
                      RFQ Successfully Logged
                    </span>
                    <h3 className="font-serif text-3xl text-[#191715] font-normal">
                      Thank You, {formData.fullName}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5E5850] max-w-md mx-auto mt-2 leading-relaxed">
                      Your commercial requirement has been routed directly to KT International&apos;s Panipat Institutional Desk.
                    </p>
                  </div>

                  <div className="p-5 bg-[#EFEAE2] max-w-sm mx-auto rounded-2xl text-left text-xs space-y-2 font-mono">
                    <div className="flex justify-between">
                      <span className="text-[#5E5850]">Reference:</span>
                      <strong className="text-[#191715]">{rfqNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5E5850]">Company:</span>
                      <span className="text-[#191715]">{formData.companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5E5850]">Order Volume:</span>
                      <span className="text-[#191715]">{formData.orderVolume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5E5850]">Response SLA:</span>
                      <span className="text-emerald-900 font-bold">Within 4 Business Hours</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 border border-[#191715] text-[#191715] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#191715] hover:text-[#F8F5F0] transition rounded-full"
                    >
                      Submit Another RFQ
                    </button>
                    <a
                      href={`https://wa.me/919812000000?text=Hello,%20I%20just%20submitted%20RFQ%20${rfqNumber}%20for%20${formData.companyName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#191715] hover:bg-[#8C6B4F] text-[#F8F5F0] text-xs uppercase tracking-[0.18em] font-semibold transition rounded-full"
                    >
                      Track via WhatsApp →
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6B4F] font-semibold block mb-1">
                      Request for Quote (RFQ)
                    </span>
                    <h3 className="font-serif text-3xl text-[#191715] font-normal">
                      Direct Institutional Enquiry
                    </h3>
                    <p className="text-xs text-[#5E5850] mt-1 font-normal">
                      Fill out your requirements below to receive wholesale pricing sheets and fabric swatch portfolios.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikramaditya Mehta"
                        className="w-full bg-[#F8F5F0] rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">
                        Company / Organisation *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Royal Heritage Resort Pvt Ltd"
                        className="w-full bg-[#F8F5F0] rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">
                        Buyer Type *
                      </label>
                      <select
                        value={formData.buyerType}
                        onChange={(e) => setFormData({ ...formData, buyerType: e.target.value })}
                        className="w-full bg-[#F8F5F0] rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715] cursor-pointer"
                      >
                        <option value="Hotels & Resorts">Hotels, Resorts &amp; Homestays</option>
                        <option value="Retailer / Wholesaler">Retail Store / Regional Wholesaler</option>
                        <option value="Interior Designer">Interior Designer / Architect</option>
                        <option value="Corporate Gifting">Corporate Festive / Wedding Gifting</option>
                        <option value="Export Buyer">International Export Buyer</option>
                        <option value="Other Institutional">Hospital / Educational Institution</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">
                        Estimated Order Volume *
                      </label>
                      <select
                        value={formData.orderVolume}
                        onChange={(e) => setFormData({ ...formData, orderVolume: e.target.value })}
                        className="w-full bg-[#F8F5F0] rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715] cursor-pointer"
                      >
                        <option value="50 – 150 pcs (Sample / Boutique)">50 – 150 pcs (Sample / Boutique)</option>
                        <option value="200 – 500 pcs">200 – 500 pcs (Standard)</option>
                        <option value="500 – 2000 pcs">500 – 2,000 pcs (Hotel Scale)</option>
                        <option value="2000+ pcs / Bulk Container">2,000+ pcs / Full Container Load</option>
                      </select>
                    </div>
                  </div>

                  {/* Multi-Select Category Checkboxes */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-2">
                      Product Categories of Interest
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        "Bedroom (Bedsheets, Dohars, Blankets)",
                        "Winter Mink & Polar Fleece Blankets",
                        "Bath (Zero-Twist 700 GSM Towels, Robes)",
                        "Living & Cushions (Bouclé, Throws)",
                        "Dining Linens (Tablecloths, Napkins)",
                        "Curated Gifting Trunks & Boxes",
                      ].map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center gap-2 p-2.5 rounded-xl border border-[#191715]/10 cursor-pointer hover:border-[#191715] text-xs text-[#191715] transition bg-[#F8F5F0]"
                        >
                          <input
                            type="checkbox"
                            checked={formData.productCategories.includes(cat)}
                            onChange={() => handleCategoryToggle(cat)}
                            className="accent-[#191715]"
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#F8F5F0] rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="procurement@company.com"
                        className="w-full bg-[#F8F5F0] rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">
                        GSTIN (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.gstin}
                        onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                        placeholder="07AAAAA0000A1Z5"
                        className="w-full bg-[#F8F5F0] rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715] uppercase font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#5E5850] font-semibold mb-1">
                      Detailed Specifications or Project Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention thread counts, custom dimensions, target delivery date, or branding requirements..."
                      className="w-full bg-[#F8F5F0] rounded-xl border border-[#191715]/15 p-3 text-xs text-[#191715] focus:outline-none focus:border-[#191715]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#191715] hover:bg-[#8C6B4F] text-[#F8F5F0] text-xs uppercase tracking-[0.18em] font-semibold rounded-full transition shadow-xl flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Commercial RFQ</span>
                    </button>
                    <p className="text-[10px] text-[#5E5850] text-center mt-3 font-normal">
                      Commercial requirements are held under strict non-disclosure. KT International directly manufactures and fulfills all institutional contracts.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
