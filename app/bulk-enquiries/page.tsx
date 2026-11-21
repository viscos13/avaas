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
  MessageCircle,
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
      num: "01",
      title: "Hotels & Resorts",
      desc: "5-star hotel grade 400TC–600TC bed linens, plush 700 GSM zero-twist bath sheets, and bespoke duvets.",
    },
    {
      num: "02",
      title: "Designers & Architects",
      desc: "Custom dimensions, custom Pantone palette dyeing, and textured handloom bouclé cushions.",
    },
    {
      num: "03",
      title: "Retailers & Wholesalers",
      desc: "Direct mill-gate pricing, private label packaging, and scheduled distributor dispatches.",
    },
    {
      num: "04",
      title: "Corporate & Gifting",
      desc: "Handcrafted linen keepsake trunks, twin dohar sets, and company logo embossed sleeves.",
    },
    {
      num: "05",
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
    <div className="pb-32 bg-[#FAF8F5] text-[#1C1917]">
      {/* Editorial Dark Header */}
      <section className="bg-[#181614] text-[#FAF8F5] pt-32 pb-20 md:py-28 border-b border-[#FAF8F5]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#D6D1C9] font-medium">
              KT INTERNATIONAL · INSTITUTIONAL &amp; B2B DIVISION
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#FAF8F5] leading-[1.08]">
              Direct Mill Procurement for Hospitality &amp; Enterprise
            </h1>
            <p className="text-sm sm:text-base text-[#D6D1C9] max-w-2xl leading-relaxed font-light font-serif italic">
              Leverage 35+ years of Panipat textile manufacturing scale. From boutique resorts to corporate gifting and multi-property chains — access factory-direct pricing with verified GST input credit and export certifications.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="mt-16 pt-10 border-t border-[#FAF8F5]/15 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] block font-light">50,000+</span>
              <span className="uppercase tracking-[0.2em] text-[10px] text-[#D6D1C9] block mt-1">Monthly Loom Capacity</span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] block font-light">Panipat</span>
              <span className="uppercase tracking-[0.2em] text-[10px] text-[#D6D1C9] block mt-1">Integrated Weaving Mill</span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] block font-light">20+ Nations</span>
              <span className="uppercase tracking-[0.2em] text-[10px] text-[#D6D1C9] block mt-1">Global Export Reach</span>
            </div>
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] block font-light">100% GST</span>
              <span className="uppercase tracking-[0.2em] text-[10px] text-[#D6D1C9] block mt-1">Input Credit Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Target Buyer Categories (Architectural Grid) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 md:py-24 border-b border-[#1C1917]/10">
        <div className="max-w-2xl mb-14 text-left">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#6B655E] font-medium mb-2">
            TAILORED INSTITUTIONAL PROGRAMS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-light">
            Who We Partner With
          </h2>
          <p className="text-xs sm:text-sm text-[#6B655E] font-serif italic mt-1">
            Engineered commercial specifications for hospitality, interior design, and gifting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {buyerTypes.map((b) => (
            <div
              key={b.title}
              className="pt-6 border-t border-[#1C1917]/15 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#6B655E] tracking-widest block mb-3">
                  {b.num}
                </span>
                <h3 className="font-serif text-xl text-[#1C1917] font-light mb-2">{b.title}</h3>
                <p className="text-xs text-[#6B655E] leading-relaxed font-light">{b.desc}</p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#1C1917]/10 text-[10px] text-[#B95D41] uppercase tracking-[0.2em] font-medium flex items-center gap-1">
                <span>Custom Specs</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form & Assurance Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Mill Strengths */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 sm:p-10 bg-[#EDE8E0] text-left space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#6B655E] font-medium mb-1">
                  FACTORY DIRECT ASSURANCE
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-light">
                  KT International Infrastructure
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[#6B655E] leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="font-serif text-sm text-[#1C1917] font-medium">•</span>
                  <div>
                    <strong className="text-[#1C1917] font-medium">Integrated Panipat Mill:</strong> In-house yarn dyeing, automated circular raschel warp-knits, wide-width shuttleless air-jet looms, and computerized box quilting.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-serif text-sm text-[#1C1917] font-medium">•</span>
                  <div>
                    <strong className="text-[#1C1917] font-medium">Bespoke Hospitality Sizing:</strong> Seamless weaving of 108&quot; × 108&quot;, 120&quot; × 120&quot;, and 15&quot; fitted sheet depths for heavy luxury hotel mattresses.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-serif text-sm text-[#1C1917] font-medium">•</span>
                  <div>
                    <strong className="text-[#1C1917] font-medium">Private Labeling &amp; Keepsake Boxes:</strong> Custom woven damask labels, gold-foil debossed gift trunks, and barcode tagging ready for retail.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-serif text-sm text-[#1C1917] font-medium">•</span>
                  <div>
                    <strong className="text-[#1C1917] font-medium">Direct Pan-India Dispatch:</strong> Dedicated container loading bays and express air-cargo connectivity to all major metros.
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-6 border-t border-[#1C1917]/15">
                <p className="text-[10px] text-[#6B655E] uppercase tracking-[0.2em] mb-3">Need immediate project pricing?</p>
                <a
                  href="https://wa.me/919812000000?text=Hello%20KT%20International%20B2B%20Desk,%20I%20have%20an%20urgent%20bulk%20enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 bg-[#1C1917] hover:bg-black text-[#FAF8F5] text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 transition"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Connect with B2B Desk</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: RFQ Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#1C1917]/15 p-8 sm:p-12 text-left bg-transparent">
              {submitted ? (
                <div className="py-12 space-y-6 text-center">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#B95D41] font-semibold">
                      RFQ SUBMITTED
                    </p>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-light">
                      Thank You, {formData.fullName}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B655E] max-w-md mx-auto font-serif italic">
                      Your commercial requirement has been routed directly to KT International&apos;s Panipat Institutional Desk.
                    </p>
                  </div>

                  <div className="p-5 bg-[#EDE8E0] max-w-sm mx-auto text-left text-xs space-y-2 font-mono">
                    <div className="flex justify-between">
                      <span className="text-[#6B655E]">Reference:</span>
                      <strong className="text-[#1C1917]">{rfqNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B655E]">Company:</span>
                      <span className="text-[#1C1917]">{formData.companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B655E]">Volume:</span>
                      <span className="text-[#1C1917]">{formData.orderVolume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B655E]">Response:</span>
                      <span className="text-[#1C1917] font-bold">Within 4 Business Hours</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 border border-[#1C1917] text-[#1C1917] text-xs uppercase tracking-[0.2em] hover:bg-[#1C1917] hover:text-[#FAF8F5] transition"
                    >
                      Submit Another RFQ
                    </button>
                    <a
                      href={`https://wa.me/919812000000?text=Hello,%20I%20just%20submitted%20RFQ%20${rfqNumber}%20for%20${formData.companyName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-[0.2em] text-[#1C1917] hover:underline"
                    >
                      Track via WhatsApp →
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#6B655E] font-medium mb-1">
                      REQUEST FOR QUOTE (RFQ)
                    </p>
                    <h3 className="font-serif text-3xl text-[#1C1917] font-light">
                      Direct Institutional Enquiry
                    </h3>
                    <p className="text-xs text-[#6B655E] mt-1 font-serif italic">
                      Fill out your requirements below to receive wholesale pricing sheets and fabric swatch portfolios.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikramaditya Mehta"
                        className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">
                        Company / Organisation *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Royal Heritage Resort Pvt Ltd"
                        className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">
                        Buyer Type *
                      </label>
                      <select
                        value={formData.buyerType}
                        onChange={(e) => setFormData({ ...formData, buyerType: e.target.value })}
                        className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917] cursor-pointer"
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
                      <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">
                        Estimated Order Volume *
                      </label>
                      <select
                        value={formData.orderVolume}
                        onChange={(e) => setFormData({ ...formData, orderVolume: e.target.value })}
                        className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917] cursor-pointer"
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
                    <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-2">
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
                          className="flex items-center gap-2 p-2.5 border border-[#1C1917]/10 cursor-pointer hover:border-[#1C1917] text-xs text-[#1C1917] transition"
                        >
                          <input
                            type="checkbox"
                            checked={formData.productCategories.includes(cat)}
                            onChange={() => handleCategoryToggle(cat)}
                            className="text-[#1C1917] accent-[#1C1917]"
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="procurement@company.com"
                        className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">
                        GSTIN (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.gstin}
                        onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                        placeholder="07AAAAA0000A1Z5"
                        className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917] uppercase font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#6B655E] mb-1">
                      Detailed Specifications or Project Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention thread counts required, custom sizes, target delivery date, or branding requirements..."
                      className="w-full bg-transparent border-b border-[#1C1917]/20 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#1C1917] hover:bg-black text-[#FAF8F5] text-xs uppercase tracking-[0.2em] transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Commercial RFQ</span>
                    </button>
                    <p className="text-[10px] text-[#6B655E] text-center mt-3 font-serif italic">
                      Commercial details are held under strict non-disclosure. KT International fulfills all institutional contracts.
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
