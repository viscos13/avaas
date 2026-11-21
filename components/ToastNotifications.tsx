"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToastNotifications() {
  const { toasts, dismissToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="pointer-events-auto bg-[#191715] text-[#F8F5F0] border border-white/15 p-4 shadow-2xl rounded-2xl flex items-start justify-between gap-3 text-left"
          >
            <div className="flex items-start gap-2.5">
              <span className="p-1 rounded-full bg-emerald-900 text-white mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </span>
              <div>
                <p className="text-xs font-semibold text-white">{toast.message}</p>
                {toast.productName && (
                  <p className="text-xs text-[#E6E0D8]/80 line-clamp-1 mt-0.5">
                    {toast.productName}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-stone-400 hover:text-white transition p-0.5"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
