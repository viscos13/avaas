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
    <div className="pb-36">
      {/* Hero Header */}
      <section className="relative bg-[#141210] text-[#FAF6F0] py-28 md:py-36 overflow-hidden border-b border-stone-800">
        <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-stone-900 border border-[#D4AF37]/40 rounded-full text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">
              <Award className="w-3.5 h-3.5" />
              <span>KT International B2B &amp; Institutional Division</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-[1.08]">
              Direct Mill Procurement for Hospitality &amp; Enterprise
            </h1>
            <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed font-light">
              Leverage 35+ years of Panipat textile manufacturing scale. From luxury boutique resorts to corporate gifting and multi-property hospitality chains — access factory-direct pricing with verified GST input credit and export certifications.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="mt-16 pt-10 border-t border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-stone-400">
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-[#D4AF37] block font-light">50,000+</span>
              <span className="uppercase tracking-[0.2em] text-[10px] block mt-1">Monthly Loom Capacity</span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-white block font-light">Panipat</span>
              <span className="uppercase tracking-[0.2em] text-[10px] block mt-1">Integrated Weaving Mill</span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-white block font-light">20+ Nations</span>
              <span className="uppercase tracking-[0.2em] text-[10px] block mt-1">Global Export Presence</span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-emerald-400 block font-light">100% GST</span>
              <span className="uppercase tracking-[0.2em] text-[10px] block mt-1">Input Credit Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Target Buyer Categories */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold block">
            Tailored Programs
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 font-light">
            Who We Partner With
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-serif italic">
            Engineered institutional specifications for every commercial requirement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {buyerTypes.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="p-7 bg-[#FDFBF8] border border-[#E2D7C7] rounded-xs space-y-4 hover:border-stone-900 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#EFE8DD] border border-[#CEC0AD] flex items-center justify-center text-stone-900 mb-4">
                    <Icon className="w-6 h-6 stroke-[1.25]" />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 font-light">{b.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2 font-light">{b.desc}</p>
                </div>
                <div className="pt-4 border-t border-[#EAE3D7] text-xs text-[#B95D41] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <span>Custom Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Form & Credentials with Generous Spacing */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEFT: Manufacturing Strengths */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 sm:p-10 bg-[#EFE8DD] border border-[#E2D7C7] rounded-xs space-y-8 shadow-sm">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold block mb-1">
                  Factory Direct Assurance
                </span>
                <h3 className="font-serif text-3xl text-stone-900 font-light">
                  KT International Infrastructure
                </h3>
              </div>

              <div className="space-y-5 text-xs sm:text-sm text-stone-700 font-light">
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 font-medium">End-to-End Panipat Loom Complex:</strong> In-house yarn dyeing, automated circular raschel warp-knits, wide-width shuttleless air-jet looms, and computerized box quilting.
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 font-medium">Custom Sizing &amp; Deep Mattresses:</strong> Seamless manufacturing of 108&quot; × 108&quot;, 120&quot; × 120&quot;, and 15&quot; fitted sheet depths for heavy hospitality mattresses.
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 font-medium">Private Labeling &amp; Brand Embossing:</strong> Custom woven damask labels, gold-foil gift trunks, and barcode tagging ready for retail distribution.
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 font-medium">Pan-India Cargo Logistics:</strong> Direct central logistics hub in Panipat with dedicated container loading bays and express air-cargo connectivity to all metros.
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-6 border-t border-[#CEC0AD]">
                <p className="text-xs text-stone-600 mb-3 font-medium uppercase tracking-wider">Need immediate project pricing?</p>
                <a
                  href="https://wa.me/919812000000?text=Hello%20KT%20International%20B2B%20Desk,%20I%20have%20an%20urgent%20bulk%20enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-[0.22em] font-semibold rounded-xs flex items-center justify-center gap-2.5 transition shadow-md"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Connect via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: RFQ Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FDFBF8] border border-[#E2D7C7] p-8 sm:p-12 rounded-xs shadow-md">
              {submitted ? (
                <div className="text-center py-16 space-y-6 animate-in fade-in">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-800 font-semibold block mb-1">
                      RFQ Successfully Submitted
                    </span>
                    <h3 className="font-serif text-4xl text-stone-900 font-light">
                      Thank You, {formData.fullName}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-2 leading-relaxed font-serif italic">
                      Your commercial requirement has been routed directly to KT International&apos;s Panipat Institutional Desk.
                    </p>
                  </div>

                  <div className="bg-[#FAF7F2] border border-[#E2D7C7] p-5 max-w-sm mx-auto rounded-xs text-left text-xs space-y-1.5 font-mono">
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
                      <span className="text-emerald-800 font-bold">Within 4 Business Hours</span>
                    </div>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3.5 border border-stone-800 text-stone-900 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-stone-100 transition rounded-xs"
                    >
                      Submit Another RFQ
                    </button>
                    <a
                      href={`https://wa.me/919812000000?text=Hello,%20I%20just%20submitted%20RFQ%20${rfqNumber}%20for%20${formData.companyName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-[0.2em] font-semibold transition rounded-xs flex items-center gap-2 shadow-md"
                    >
                      <span>Track via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold block mb-1">
                      Request for Quote (RFQ)
                    </span>
                    <h3 className="font-serif text-3xl text-stone-900 font-light">
                      Direct Institutional Enquiry
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 font-serif italic">
                      Fill out your requirements below to receive wholesale pricing sheets and fabric swatch portfolios.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikramaditya Mehta"
                        className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
                        Company / Organisation *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Royal Heritage Resort Pvt Ltd"
                        className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
                        Buyer Type *
                      </label>
                      <select
                        value={formData.buyerType}
                        onChange={(e) => setFormData({ ...formData, buyerType: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
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
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
                        Estimated Order Volume *
                      </label>
                      <select
                        value={formData.orderVolume}
                        onChange={(e) => setFormData({ ...formData, orderVolume: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
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
                    <label className="block text-xs font-semibold text-stone-700 mb-2.5 uppercase tracking-wider text-[11px]">
                      Product Categories of Interest
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                          className="flex items-center gap-2.5 p-3 bg-[#FAF7F2] border border-[#E2D7C7] rounded-xs cursor-pointer hover:bg-[#EFE8DD] text-xs text-stone-800 transition"
                        >
                          <input
                            type="checkbox"
                            checked={formData.productCategories.includes(cat)}
                            onChange={() => handleCategoryToggle(cat)}
                            className="rounded-xs text-stone-900 focus:ring-stone-900"
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="procurement@company.com"
                        className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
                        GSTIN (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.gstin}
                        onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                        placeholder="07AAAAA0000A1Z5"
                        className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs uppercase font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
                      Detailed Specifications or Project Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention thread counts required, custom sizes, target delivery date, or branding requirements..."
                      className="w-full bg-[#FAF7F2] border border-[#CEC0AD] p-3 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-xs"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4.5 bg-[#141210] hover:bg-stone-800 text-white text-xs uppercase tracking-[0.25em] font-semibold rounded-xs transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Commercial RFQ</span>
                    </button>
                    <p className="text-[10px] text-stone-500 text-center mt-3 font-serif italic">
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
