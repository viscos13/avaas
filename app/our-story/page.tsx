import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, HeartHandshake, Layers, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story — Rooted in Panipat, Reimagined by KT International | AAVAAS",
  description:
    "Learn about AAVAAS, born from 35+ years of Panipat textile weaving excellence under parent company KT International. Crafting modern Indian home sanctuaries.",
};

export default function OurStoryPage() {
  const pillars = [
    {
      num: "01",
      title: "Panipat Mill Mastery",
      desc: "Direct integration with KT International's automated wide-width air-jet looms, circular raschel warp-knitting divisions, and OEKO-TEX certified dye houses.",
    },
    {
      num: "02",
      title: "108\" × 108\" Indian Tuck",
      desc: "Generous bedsheet tuck-ins specifically calibrated to grip 14-inch heavy Indian mattresses firmly without pulling loose overnight.",
    },
    {
      num: "03",
      title: "OEKO-TEX Standard 100",
      desc: "100% AZO-free water-based reactive pigments and zero formaldehyde finishes — completely safe for sensitive skin and infant nurseries.",
    },
    {
      num: "04",
      title: "Honest Loom Value",
      desc: "Pure mill-to-home pricing without multi-tier distributor markups or artificial retail inflation. World-class luxury made truly accessible.",
    },
  ];

  return (
    <div className="bg-[#F8F5F0] text-[#191715] pt-32 pb-32 text-left">
      {/* Editorial Hero Header */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-14 mb-16">
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-2">
          Heritage &amp; Lineage
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#191715] leading-[1.08] max-w-4xl tracking-tight">
          The Weave of Panipat. The Soul of AAVAAS.
        </h1>
        <p className="text-[15px] sm:text-base text-[#5E5850] mt-4 max-w-2xl font-normal leading-relaxed">
          Where thirty-five years of industrial textile mastery under KT International meet contemporary residential living.
        </p>
      </section>

      {/* Main Narrative Split */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-14 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-[#EFEAE2] shadow-xl">
              <Image
                src="/images/panipat-craft.jpg"
                alt="Panipat Textile Loom Artistry"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xs bg-[#191715] text-[#F8F5F0] p-6 rounded-2xl shadow-xl">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C6B4F] font-semibold block mb-1">
                Since 1989
              </span>
              <p className="font-serif text-lg font-normal leading-snug">
                From Panipat Looms to Discerning Global Bedrooms.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-[#5E5850] text-[15px] sm:text-base leading-relaxed font-normal">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6B4F] font-semibold block">
              OUR ORIGIN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#191715] font-normal leading-tight tracking-tight">
              Why AAVAAS Was Born
            </h2>
            <p>
              For centuries, the historic city of <strong className="text-[#191715] font-semibold">Panipat, Haryana</strong> has been revered across Asia as India&apos;s weaving heartland. Its master artisans and mill engineers have perfected the intricate physics of warp tension, ring-spun yarns, and thermal raschel knits for generations.
            </p>
            <p>
              Under parent company <strong className="text-[#191715] font-semibold">KT International</strong>, our mills have spent over three decades crafting world-class bedding, plush bath sheets, and luxury jacquards for five-star global hospitality chains and premium private labels across 20+ countries.
            </p>
            <p>
              Yet, when shopping within India, we observed an undeniable disconnect: consumers were forced to choose between dated, overly ornate traditional bedsheet shops, or pay exorbitant 400% markups for European lifestyle brands selling goods that were often woven right here in Panipat.
            </p>
            <blockquote className="font-serif italic text-lg sm:text-xl text-[#191715] border-l-2 border-[#8C6B4F] pl-6 py-2 my-6">
              &ldquo;We created AAVAAS to dismantle that paradox — to deliver honest, world-class loom mastery directly from Panipat into Indian living rooms.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* The 4 Principles of AAVAAS (Architectural Cards) */}
      <section className="bg-[#EFEAE2] py-20 md:py-24 border-y border-[#191715]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
          <div className="max-w-2xl mb-14 text-left">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#8C6B4F] font-semibold block mb-2">
              Uncompromising Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#191715] font-normal tracking-tight">
              The Four Pillars of Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.num} className="p-8 rounded-2xl bg-white/70 border border-[#191715]/10 space-y-3">
                <span className="font-mono text-xs text-[#8C6B4F] tracking-widest font-semibold block">
                  {pillar.num}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#191715] font-normal">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#5E5850] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-14 pt-24 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6B4F] font-semibold block">
            Discover the Collections
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#191715] font-normal">
            Begin Your Sanctuary Experience
          </h2>
          <p className="text-sm text-[#5E5850] max-w-lg mx-auto leading-relaxed">
            Explore our newly unveiled Winter 2026–27 collection or our signature 400TC Supima sateen bedsheets.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-[#191715] hover:bg-[#8C6B4F] text-[#F8F5F0] text-xs uppercase tracking-[0.18em] font-semibold rounded-full transition shadow-lg"
            >
              Explore All Pieces
            </Link>
            <Link
              href="/bulk-enquiries"
              className="px-8 py-3.5 border border-[#191715] hover:bg-[#191715] hover:text-[#F8F5F0] text-[#191715] text-xs uppercase tracking-[0.18em] font-semibold rounded-full transition"
            >
              Institutional &amp; Hotel Enquiries
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
