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
  ShieldCheck,
  Send,
  MessageCircle,
  FileSpreadsheet,
  Award,
} from "lucide-react";

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
      title: "Hotels & Resorts",
      icon: Hotel,
      desc: "5-star hotel grade 400TC–600TC bed linens, plush 700 GSM bath sheets, and bespoke duvets.",
    },
    {
      title: "Interior Designers & Architects",
      icon: Palette,
      desc: "Custom dimensions, custom Pantone palette dyeing, and textured handloom bouclé cushions.",
    },
    {
      title: "Retailers & Wholesalers",
      icon: Building2,
      desc: "Competitive factory-gate pricing, private label packaging, and scheduled distributor dispatches.",
    },
    {
      title: "Corporate & Festive Gifting",
      icon: Gift,
      desc: "Handcrafted linen keepsake trunks, twin dohar sets, and company logo embossed sleeves.",
    },
    {
      title: "Global Export Buyers",
      icon: Globe2,
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
    <div className="pb-24">
      {/* Hero Header */}
      <section className="relative bg-[#1C1917] text-[#FAF8F5] py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 border border-stone-700 rounded-full text-[10px] uppercase tracking-widest text-amber-300">
              <Award className="w-3.5 h-3.5" />
              <span>KT International B2B &amp; Institutional Division</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight">
              Direct Mill Procurement for Hospitality &amp; Enterprise
            </h1>
            <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
              Leverage 35+ years of Panipat textile manufacturing scale. From luxury boutique resorts to corporate gifting and multi-property hospitality chains — access factory-direct pricing with verified GST input credit and export certifications.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 pt-8 border-t border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-stone-400">
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-white block">50,000+</span>
              <span className="uppercase tracking-wider text-[10px]">Monthly Loom Capacity</span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-white block">Panipat</span>
              <span className="uppercase tracking-wider text-[10px]">Integrated Weaving Mill</span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-white block">20+ Nations</span>
              <span className="uppercase tracking-wider text-[10px]">Global Export Presence</span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-white block">100% GST</span>
              <span className="uppercase tracking-wider text-[10px]">Input Credit Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Target Buyer Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B95D41] font-semibold">
            Tailored Programs
          </span>
          <h2 className="font-serif text-3xl text-stone-900 mt-1">
            Who We Partner With
          </h2>
          <p className="text-xs text-stone-600 mt-2">
            Engineered institutional specifications for every commercial requirement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {buyerTypes.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="p-5 bg-white border border-[#E5DFD5] rounded-xs space-y-3 hover:border-stone-900 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-stone-800 mb-3">
                    <Icon className="w-5 h-5 stroke-1" />
                  </div>
                  <h3 className="font-serif text-lg text-stone-900">{b.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mt-2">{b.desc}</p>
                </div>
                <div className="pt-3 border-t border-stone-100 text-[11px] text-[#B95D41] font-medium flex items-center gap-1">
                  <span>Customizable Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Interactive Form & Credentials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: KT International Manufacturing Strengths */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-[#EDE8E0] border border-[#E5DFD5] rounded-xs space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B95D41] font-semibold">
                  Factory Direct Assurance
                </span>
                <h3 className="font-serif text-2xl text-stone-900 mt-1">
                  KT International Infrastructure
                </h3>
              </div>

              <div className="space-y-4 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900">End-to-End Panipat Loom Complex:</strong> In-house yarn dyeing, automated circular raschel warp-knits, wide-width shuttleless air-jet looms, and computerized box quilting.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900">Custom Sizing &amp; Deep Mattresses:</strong> Seamless manufacturing of 108&quot; × 108&quot;, 120&quot; × 120&quot;, and 15&quot; fitted sheet depths for heavy hospitality mattresses.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900">Private Labeling &amp; Brand Embossing:</strong> Custom woven damask labels, gold-foil gift trunks, and barcode tagging ready for retail shelves.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900">Rapid Pan-India Logistics:</strong> Central logistics hub in Panipat with dedicated container loading bays and express air-cargo connectivity to all metros.
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-stone-300">
                <p className="text-xs text-stone-600 mb-2 font-medium">Need immediate project pricing?</p>
                <a
                  href="https://wa.me/919812000000?text=Hello%20KT%20International%20B2B%20Desk,%20I%20have%20an%20urgent%20bulk%20enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#1C1917] hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-medium rounded-xs flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Connect with B2B Director on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Client Testimonial */}
            <div className="p-6 bg-white border border-[#E5DFD5] rounded-xs space-y-2">
              <p className="text-xs italic font-serif text-stone-700 leading-relaxed">
                &ldquo;KT International has supplied our boutique chain in Goa and Rajasthan for over 4 years. Their 400TC Supima sheets survive 200+ commercial wash cycles with zero pilling.&rdquo;
              </p>
              <p className="text-[11px] font-semibold text-stone-900 pt-1">
                — Hospitality Procurement Lead, Heritage Villas Goa
              </p>
            </div>
          </div>

          {/* RIGHT: Interactive Working Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E5DFD5] p-6 sm:p-10 rounded-xs shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-6 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-semibold">
                      RFQ Successfully Submitted
                    </span>
                    <h3 className="font-serif text-3xl text-stone-900 mt-1">
                      Thank You, {formData.fullName}
                    </h3>
                    <p className="text-xs text-stone-600 max-w-md mx-auto mt-2 leading-relaxed">
                      Your commercial requirement has been routed directly to KT International&apos;s Panipat Institutional Desk.
                    </p>
                  </div>

                  <div className="bg-[#FAF8F5] border border-stone-200 p-4 max-w-sm mx-auto rounded-xs text-left text-xs space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span className="text-stone-500">RFQ Reference:</span>
                      <strong className="text-stone-900">{rfqNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Organisation:</span>
                      <span className="text-stone-800">{formData.companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Order Volume:</span>
                      <span className="text-stone-800">{formData.orderVolume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Response SLA:</span>
                      <span className="text-emerald-700 font-bold">Within 4 Business Hours</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 border border-stone-800 text-stone-900 text-xs uppercase tracking-wider hover:bg-stone-100 transition rounded-xs"
                    >
                      Submit Another Requirement
                    </button>
                    <a
                      href={`https://wa.me/919812000000?text=Hello,%20I%20just%20submitted%20RFQ%20${rfqNumber}%20for%20${formData.companyName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-wider hover:bg-stone-800 transition rounded-xs flex items-center gap-2"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Track RFQ via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B95D41] font-semibold">
                      Request for Quote (RFQ)
                    </span>
                    <h3 className="font-serif text-2xl text-stone-900 mt-1">
                      Direct Institutional Enquiry
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Fill out your requirements below to receive wholesale pricing sheets and fabric swatch portfolios.
                    </p>
                  </div>

                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikramaditya Mehta"
                        className="w-full bg-[#FAF8F5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Company / Organisation *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Royal Heritage Resort Pvt Ltd"
                        className="w-full bg-[#FAF8F5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
                      />
                    </div>
                  </div>

                  {/* Buyer Type & Order Volume */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Buyer Type *
                      </label>
                      <select
                        value={formData.buyerType}
                        onChange={(e) => setFormData({ ...formData, buyerType: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
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
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Estimated Order Volume *
                      </label>
                      <select
                        value={formData.orderVolume}
                        onChange={(e) => setFormData({ ...formData, orderVolume: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
                      >
                        <option value="50 – 150 pcs (Sample / Boutique)">50 – 150 pcs (Sample / Boutique)</option>
                        <option value="200 – 500 pcs">200 – 500 pcs (Standard)</option>
                        <option value="500 – 2000 pcs">500 – 2,000 pcs (Hotel Scale)</option>
                        <option value="2000+ pcs / Bulk Container">2,000+ pcs / Full Container Load</option>
                      </select>
                    </div>
                  </div>

                  {/* Product Category Interest Multi-Select */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-2">
                      Product Categories of Interest (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Bedroom (Bedsheets, Dohars, Blankets)",
                        "Winter Mink & Polar Fleece Blankets",
                        "Bath (Zero-Twist 700 GSM Towels, Robes)",
                        "Living & Cushions (Bouclé, Handloom Throws)",
                        "Dining Linens (Tablecloths, Napkins)",
                        "Curated Gifting Trunks & Boxes",
                      ].map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center gap-2 p-2 bg-[#FAF8F5] border border-stone-200 rounded-xs cursor-pointer hover:bg-stone-100 text-xs text-stone-800"
                        >
                          <input
                            type="checkbox"
                            checked={formData.productCategories.includes(cat)}
                            onChange={() => handleCategoryToggle(cat)}
                            className="rounded-xs text-stone-900 focus:ring-stone-800"
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info (Phone / Email / GSTIN) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAF8F5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="procurement@company.com"
                        className="w-full bg-[#FAF8F5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        GSTIN (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.gstin}
                        onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                        placeholder="07AAAAA0000A1Z5"
                        className="w-full bg-[#FAF8F5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs uppercase"
                      />
                    </div>
                  </div>

                  {/* Detailed Requirements Message */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Detailed Specifications or Project Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention thread counts required, custom sizes, target delivery date, or branding requirements..."
                      className="w-full bg-[#FAF8F5] border border-stone-300 p-3 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#1C1917] hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition shadow-md flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Commercial RFQ</span>
                    </button>
                    <p className="text-[10px] text-stone-500 text-center mt-2">
                      🔒 Your commercial details are protected under NDA. KT International directly manufactures and fulfills all institutional contracts.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
