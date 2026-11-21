"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { Check, X } from "lucide-react";

export default function ToastNotifications() {
  const { toasts, dismissToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#1C1917] text-[#FAF8F5] border border-stone-800 p-3.5 shadow-2xl rounded-sm flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-start gap-2.5">
            <span className="p-1 rounded-full bg-emerald-950 text-emerald-400 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </span>
            <div>
              <p className="text-xs font-medium text-stone-200">{toast.message}</p>
              {toast.productName && (
                <p className="text-xs text-stone-400 font-serif line-clamp-1 italic mt-0.5">
                  {toast.productName}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-stone-400 hover:text-stone-200 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
