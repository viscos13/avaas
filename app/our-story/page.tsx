import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Award, ShieldCheck, HeartHandshake, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story — Rooted in Panipat, Reimagined by KT International | AAVAAS",
  description:
    "Learn about AAVAAS, born from 35+ years of Panipat textile weaving excellence under parent company KT International. Crafting modern Indian home sanctuaries.",
};

export default function OurStoryPage() {
  return (
    <div className="pb-24">
      {/* Hero Header */}
      <section className="relative bg-[#EDE8E0] py-20 md:py-28 border-b border-[#E5DFD5]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#B95D41] font-semibold bg-[#B95D41]/10 px-3 py-1 rounded-xs">
            Heritage &amp; Lineage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1C1917] font-normal leading-tight">
            The Weave of Panipat. The Soul of AAVAAS.
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-serif italic">
            Where generations of textile alchemy meet contemporary modern living.
          </p>
        </div>
      </section>

      {/* Main Narrative Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/5 w-full bg-stone-200 rounded-xs overflow-hidden shadow-xl border border-stone-300">
              <Image
                src="https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=1200&auto=format&fit=crop"
                alt="Panipat Textile Loom Artistry"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-[#1C1917] text-white p-6 max-w-xs rounded-xs shadow-2xl hidden sm:block">
              <p className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">
                Since 1989
              </p>
              <p className="font-serif text-lg mt-1">
                From Panipat Looms to Discerning Global Bedrooms
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed">
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-snug">
              Why AAVAAS Was Born
            </h2>
            <p>
              For centuries, the historic city of <strong>Panipat, Haryana</strong> has been revered as India&apos;s weaving heartland. Its artisans have mastered the intricate physics of yarn counts, warp tension, and thermal raschel knits for generations.
            </p>
            <p>
              Under parent enterprise <strong>KT International</strong>, our mills have spent over three decades crafting world-class bedding, plush bath sheets, and luxury jacquards for five-star global hospitality chains and premium private labels across 20+ countries.
            </p>
            <p>
              Yet, when shopping within India, we observed an undeniable disconnect: consumers were forced to choose between dated, overly ornate traditional linen shops, or pay exorbitant 400% markups for European lifestyle brands selling goods that were often woven right here in Haryana.
            </p>
            <p className="font-serif italic text-lg text-stone-900 border-l-2 border-[#B95D41] pl-4 my-4">
              &ldquo;We created AAVAAS to dismantle that paradox — to deliver honest, world-class loom mastery directly from Panipat into Indian living rooms.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Principles of AAVAAS */}
      <section className="bg-white border-y border-[#E5DFD5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B95D41] font-semibold">
              Uncompromising Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-1">
              The Four Pillars of Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-stone-300 flex items-center justify-center text-stone-900">
                <Award className="w-5 h-5 stroke-1" />
              </div>
              <h3 className="font-serif text-xl text-stone-900">Panipat Mill Mastery</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct integration with KT International&apos;s automated looms, circular raschel knitting divisions, and eco-certified dye houses.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-stone-300 flex items-center justify-center text-stone-900">
                <Compass className="w-5 h-5 stroke-1" />
              </div>
              <h3 className="font-serif text-xl text-stone-900">Thoughtful Proportions</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Generous 108&quot; × 108&quot; bedsheet tuck-ins that grip 14-inch heavy Indian mattresses and reversible color combinations.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-stone-300 flex items-center justify-center text-stone-900">
                <ShieldCheck className="w-5 h-5 stroke-1" />
              </div>
              <h3 className="font-serif text-xl text-stone-900">OEKO-TEX Certified</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                100% AZO-free water-based reactive pigments and zero formaldehyde finishes, safe for sensitive skin and baby nursery rooms.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-stone-300 flex items-center justify-center text-stone-900">
                <HeartHandshake className="w-5 h-5 stroke-1" />
              </div>
              <h3 className="font-serif text-xl text-stone-900">Honest Value</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pure factory-direct pricing without distributor margins. True five-star luxury fabrics accessible to every home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action to Explore */}
      <section className="max-w-4xl mx-auto px-6 text-center pt-20">
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
          Begin Your Sanctuary Experience
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
          Explore our newly unveiled Winter 2026–27 collection or our signature 400TC Supima sateen bedsheets.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-stone-800 transition"
          >
            Explore All Pieces
          </Link>
          <Link
            href="/bulk-enquiries"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#EDE8E0] text-stone-900 text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-stone-300 transition"
          >
            Institutional &amp; Hotel Enquiries
          </Link>
        </div>
      </section>
    </div>
  );
}
