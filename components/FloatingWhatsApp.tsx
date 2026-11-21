"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappMessage = encodeURIComponent(
    "Hello AAVAAS team, I am exploring your collection and would like personal styling and fabric assistance."
  );
  const whatsappUrl = `https://wa.me/919812000000?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col gap-2">
      {/* Subtle editorial notification popup */}
      {showTooltip && (
        <div className="relative mb-1 max-w-[280px] bg-[#FAF8F5] border border-[#E5DFD5] p-3.5 shadow-xl text-left rounded-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-stone-400 hover:text-stone-700 transition"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-medium tracking-wider uppercase text-stone-500">
              AAVAAS Concierge
            </span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            Need fabric advice or custom sizing? Speak directly with our Panipat home stylists.
          </p>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AAVAAS on WhatsApp"
        className="group flex items-center gap-2.5 bg-[#1C1917] hover:bg-[#2D2926] text-[#FAF8F5] px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-700/30"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
        <span className="text-xs font-medium tracking-wide uppercase">WhatsApp Concierge</span>
      </a>
    </div>
  );
}
