"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ArrowRight, Truck } from "lucide-react";
import { formatINR } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    cartSubtotal,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    hasFreeShipping,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  const progressPercent = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#F8F5F0] shadow-2xl flex flex-col border-l border-[#191715]/10 text-left"
            >
              {/* Header */}
              <div className="p-6 sm:p-7 border-b border-[#191715]/10 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#191715] font-normal">
                    Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                  </h3>
                  <p className="text-[10px] text-[#5E5850] uppercase tracking-[0.22em] mt-0.5 font-semibold">
                    Direct Mill Delivery from Panipat
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#5E5850] hover:text-[#191715] transition rounded-full"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="bg-[#EFEAE2] px-6 py-4 border-b border-[#191715]/10">
                <div className="flex items-center justify-between text-xs text-[#5E5850] mb-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#8C6B4F]" />
                    {hasFreeShipping ? (
                      <span className="text-emerald-900 font-semibold">
                        Unlocked: Complimentary Pan-India Shipping
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-[#191715]">{formatINR(amountNeededForFreeShipping)}</strong> more for Free Shipping
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[11px] font-semibold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-stone-300 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      hasFreeShipping ? "bg-emerald-800" : "bg-[#8C6B4F]"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-7">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#EFEAE2] flex items-center justify-center text-[#5E5850]">
                      <Truck className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif text-2xl text-[#191715]">Your bag is empty</h4>
                    <p className="text-xs text-[#5E5850] max-w-xs leading-relaxed">
                      Discover our Winter 2026–27 Mink blankets and signature 400TC Supima sheets.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 px-8 py-3.5 bg-[#191715] hover:bg-[#8C6B4F] text-[#F8F5F0] text-xs uppercase tracking-[0.18em] font-semibold transition rounded-full shadow-md"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-[#191715]/10">
                    {cart.map((item) => (
                      <div key={item.id} className="py-5 flex gap-4">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="relative w-20 h-24 bg-[#EFEAE2] shrink-0 overflow-hidden rounded-xl shadow-xs"
                        >
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </Link>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                href={`/products/${item.product.slug}`}
                                onClick={() => setIsCartOpen(false)}
                                className="text-sm font-medium text-[#191715] hover:underline line-clamp-1"
                              >
                                {item.product.name}
                              </Link>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-[#5E5850] hover:text-rose-700 transition p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-[11px] text-[#5E5850] mt-0.5">
                              {item.selectedSize} • {item.selectedColor}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center border border-[#191715]/20 bg-[#EFEAE2]/60 rounded-full px-2 py-0.5">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-[#191715] hover:opacity-70 transition text-xs font-bold"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-semibold text-[#191715] font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 text-[#191715] hover:opacity-70 transition text-xs font-bold"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-semibold text-sm text-[#191715]">
                              {formatINR(item.unitPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 bg-[#EFEAE2] border-t border-[#191715]/10 space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#5E5850]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#191715]">{formatINR(cartSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#5E5850]">
                      <span>Shipping</span>
                      <span className="font-semibold text-emerald-900">
                        {hasFreeShipping ? "FREE (Complimentary)" : "₹149"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-[#191715] pt-2 border-t border-[#191715]/10">
                      <span>Estimated Total</span>
                      <span>{formatINR(hasFreeShipping ? cartSubtotal : cartSubtotal + 149)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 bg-[#191715] hover:bg-[#8C6B4F] text-[#F8F5F0] text-xs uppercase tracking-[0.18em] font-semibold rounded-full transition flex items-center justify-center gap-2 shadow-xl"
                  >
                    <span>Proceed to Indian Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
