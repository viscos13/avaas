import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, HeartHandshake, Layers } from "lucide-react";
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
      desc: "Direct integration with KT International's automated wide-width air-jet looms, circular raschel knitting divisions, and OEKO-TEX certified dye houses.",
    },
    {
      num: "02",
      title: "Thoughtful Proportions",
      desc: "Generous 108\" × 108\" bedsheet tuck-ins engineered to grip 14-inch heavy Indian mattresses securely without slipping overnight.",
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
    <div className="pb-32 bg-[#FAF8F5] text-[#1C1917]">
      {/* Editorial Hero Header */}
      <section className="pt-32 pb-20 md:py-28 border-b border-[#1C1917]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-left">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#6B655E] font-medium mb-3">
            HERITAGE &amp; LINEAGE
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#1C1917] leading-[1.08] max-w-4xl">
            The Weave of Panipat. The Soul of AAVAAS.
          </h1>
          <p className="text-sm sm:text-base text-[#6B655E] mt-4 max-w-2xl font-serif italic">
            Where thirty-five years of industrial textile mastery meet contemporary residential living.
          </p>
        </div>
      </section>

      {/* Main Narrative Split */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full bg-[#EDE8E0] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=85&w=1400&auto=format&fit=crop"
                alt="Panipat Textile Loom Artistry"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xs bg-[#181614] text-[#FAF8F5] p-6 text-left">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#D6D1C9]">
                Since 1989
              </p>
              <p className="font-serif text-lg mt-1 leading-snug">
                From Panipat Looms to Discerning Global Bedrooms.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-[#6B655E] text-sm sm:text-base leading-relaxed font-light">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#B95D41] font-semibold">
              OUR ORIGIN
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] font-light leading-tight">
              Why AAVAAS Was Born
            </h2>
            <p>
              For centuries, the historic city of <strong className="text-[#1C1917] font-medium">Panipat, Haryana</strong> has been revered across Asia as India&apos;s weaving heartland. Its master artisans and mill engineers have perfected the intricate physics of warp tension, ring-spun yarns, and thermal raschel knits for generations.
            </p>
            <p>
              Under parent company <strong className="text-[#1C1917] font-medium">KT International</strong>, our mills have spent over three decades crafting world-class bedding, plush bath sheets, and luxury jacquards for five-star global hospitality chains and premium private labels across 20+ countries.
            </p>
            <p>
              Yet, when shopping within India, we observed an undeniable disconnect: consumers were forced to choose between dated, overly ornate traditional bedsheet shops, or pay exorbitant 400% markups for European lifestyle brands selling goods that were often woven right here in Panipat.
            </p>
            <blockquote className="font-serif italic text-lg sm:text-xl text-[#1C1917] border-l border-[#B95D41] pl-6 py-2 my-6">
              &ldquo;We created AAVAAS to dismantle that paradox — to deliver honest, world-class loom mastery directly from Panipat into Indian living rooms.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* The 4 Principles of AAVAAS (Editorial Numbered Grid) */}
      <section className="bg-[#EDE8E0] py-20 md:py-24 border-y border-[#1C1917]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-16 text-left">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#6B655E] font-medium mb-2">
              UNCOMPROMISING STANDARDS
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-light">
              The Four Pillars of Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {pillars.map((pillar) => (
              <div key={pillar.num} className="pt-6 border-t border-[#1C1917]/15">
                <span className="font-mono text-xs text-[#6B655E] tracking-widest block mb-3">
                  {pillar.num}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1C1917] font-light mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B655E] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#6B655E] font-medium">
            DISCOVER THE COLLECTIONS
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1917] font-light">
            Begin Your Sanctuary Experience
          </h2>
          <p className="text-sm text-[#6B655E] font-serif italic max-w-lg mx-auto">
            Explore our newly unveiled Winter 2026–27 collection or our signature 400TC Supima sateen bedsheets.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] hover:bg-black transition"
            >
              Explore All Pieces
            </Link>
            <Link
              href="/bulk-enquiries"
              className="w-full sm:w-auto text-xs uppercase tracking-[0.2em] text-[#1C1917] hover:underline"
            >
              Institutional &amp; Hotel Enquiries →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
