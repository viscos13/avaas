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
    <div className="pb-36">
      {/* Hero Header */}
      <section className="relative bg-[#EFE8DD] py-28 md:py-36 border-b border-[#E2D7C7]">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 text-center space-y-5">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold bg-[#B95D41]/10 px-4 py-1.5 rounded-xs border border-[#B95D41]/20">
            Heritage &amp; Lineage
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#141210] font-light leading-tight">
            The Weave of Panipat. The Soul of AAVAAS.
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-serif italic">
            Where generations of textile alchemy meet contemporary modern living.
          </p>
        </div>
      </section>

      {/* Main Narrative Split with Generous Spacing */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/5 w-full bg-[#E5DDCF] rounded-xs overflow-hidden shadow-2xl border border-[#CEC0AD]">
              <Image
                src="https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=90&w=1400&auto=format&fit=crop"
                alt="Panipat Textile Loom Artistry"
                fill
                className="object-cover brightness-[0.95]"
              />
            </div>
            <div className="absolute -bottom-8 -left-4 sm:left-6 bg-[#141210] text-[#FAF6F0] p-8 max-w-sm rounded-xs shadow-2xl hidden sm:block border border-stone-700">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Since 1989
              </p>
              <p className="font-serif text-2xl mt-1 leading-snug">
                From Panipat Looms to Discerning Global Bedrooms
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-7 text-stone-700 text-sm sm:text-base leading-relaxed font-light">
            <h2 className="font-serif text-4xl sm:text-5xl text-[#141210] font-light leading-snug">
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
            <p className="font-serif italic text-xl text-stone-900 border-l-2 border-[#B95D41] pl-5 my-6 leading-relaxed">
              &ldquo;We created AAVAAS to dismantle that paradox — to deliver honest, world-class loom mastery directly from Panipat into Indian living rooms.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Principles of AAVAAS */}
      <section className="bg-[#EFE8DD] border-y border-[#E2D7C7] py-28">
        <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#B95D41] font-semibold block">
              Uncompromising Standards
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#141210] font-light">
              The Four Pillars of Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="space-y-4 p-8 bg-[#FDFBF8] border border-[#E2D7C7] rounded-xs shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#EFE8DD] border border-[#CEC0AD] flex items-center justify-center text-stone-900">
                <Award className="w-6 h-6 stroke-[1.25]" />
              </div>
              <h3 className="font-serif text-2xl text-stone-900 font-light">Panipat Mill Mastery</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                Direct integration with KT International&apos;s automated looms, circular raschel knitting divisions, and eco-certified dye houses.
              </p>
            </div>

            <div className="space-y-4 p-8 bg-[#FDFBF8] border border-[#E2D7C7] rounded-xs shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#EFE8DD] border border-[#CEC0AD] flex items-center justify-center text-stone-900">
                <Compass className="w-6 h-6 stroke-[1.25]" />
              </div>
              <h3 className="font-serif text-2xl text-stone-900 font-light">Thoughtful Proportions</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                Generous 108&quot; × 108&quot; bedsheet tuck-ins that grip 14-inch heavy Indian mattresses and reversible color combinations.
              </p>
            </div>

            <div className="space-y-4 p-8 bg-[#FDFBF8] border border-[#E2D7C7] rounded-xs shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#EFE8DD] border border-[#CEC0AD] flex items-center justify-center text-stone-900">
                <ShieldCheck className="w-6 h-6 stroke-[1.25]" />
              </div>
              <h3 className="font-serif text-2xl text-stone-900 font-light">OEKO-TEX Certified</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                100% AZO-free water-based reactive pigments and zero formaldehyde finishes, safe for sensitive skin and baby nursery rooms.
              </p>
            </div>

            <div className="space-y-4 p-8 bg-[#FDFBF8] border border-[#E2D7C7] rounded-xs shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#EFE8DD] border border-[#CEC0AD] flex items-center justify-center text-stone-900">
                <HeartHandshake className="w-6 h-6 stroke-[1.25]" />
              </div>
              <h3 className="font-serif text-2xl text-stone-900 font-light">Honest Value</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                Pure factory-direct pricing without distributor margins. True five-star luxury fabrics accessible to every home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-6 text-center pt-28">
        <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 font-light">
          Begin Your Sanctuary Experience
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-3 max-w-lg mx-auto leading-relaxed font-serif italic">
          Explore our newly unveiled Winter 2026–27 collection or our signature 400TC Supima sateen bedsheets.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-10 py-4.5 bg-[#141210] text-[#FAF6F0] text-xs uppercase tracking-[0.25em] font-semibold rounded-xs hover:bg-stone-800 transition shadow-xl"
          >
            Explore All Pieces
          </Link>
          <Link
            href="/bulk-enquiries"
            className="w-full sm:w-auto px-10 py-4.5 bg-[#EFE8DD] text-stone-900 border border-[#CEC0AD] text-xs uppercase tracking-[0.25em] font-semibold rounded-xs hover:bg-[#141210] hover:text-[#FAF6F0] transition shadow-xs"
          >
            Institutional &amp; Hotel Enquiries
          </Link>
        </div>
      </section>
    </div>
  );
}
