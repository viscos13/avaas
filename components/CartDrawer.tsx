"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { formatINR } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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

  if (!isCartOpen) return null;

  const progressPercent = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E5DFD5]">
          {/* Header */}
          <div className="p-6 border-b border-[#E5DFD5] flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg tracking-wide text-stone-900">
                Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h3>
              <p className="text-[11px] text-stone-500 uppercase tracking-wider mt-0.5">
                Complimentary Pan-India Delivery
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-800 transition"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#EDE8E0] px-6 py-3 border-b border-[#E5DFD5]">
            <div className="flex items-center justify-between text-xs text-stone-700 mb-1.5">
              <div className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-stone-700" />
                {hasFreeShipping ? (
                  <span className="text-emerald-800 font-semibold">
                    Congratulations! You unlocked Free Pan-India Delivery
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-stone-900">{formatINR(amountNeededForFreeShipping)}</strong> more for Free Shipping
                  </span>
                )}
              </div>
              <span className="text-[11px] text-stone-500">{progressPercent}%</span>
            </div>
            <div className="w-full bg-stone-300 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  hasFreeShipping ? "bg-emerald-600" : "bg-[#B95D41]"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-stone-400">
                  <Truck className="w-6 h-6 stroke-1" />
                </div>
                <h4 className="font-serif text-xl text-stone-800">Your bag is empty</h4>
                <p className="text-xs text-stone-500 mt-2 max-w-xs leading-relaxed">
                  Discover our Winter &apos;26–27 Mink blankets and signature 400TC Supima sheets woven with Panipat mastery.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-widest hover:bg-stone-800 transition rounded-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#E5DFD5]">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4">
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="relative w-20 h-24 bg-stone-100 shrink-0 overflow-hidden rounded-xs border border-stone-200"
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
                            className="font-serif text-sm text-stone-900 hover:underline line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-stone-400 hover:text-rose-600 transition"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Size: <span className="text-stone-800 font-medium">{item.selectedSize}</span> | Color:{" "}
                          <span className="text-stone-800 font-medium">{item.selectedColor}</span>
                        </p>
                        <p className="text-xs font-semibold text-stone-900 mt-1">
                          {formatINR(item.unitPrice)}
                        </p>
                      </div>

                      {/* Quantity selector */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-stone-300 rounded-xs bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-medium text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-medium text-stone-800">
                          Total: {formatINR(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E5DFD5] bg-[#FAF8F5] space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal (Inclusive of all GST)</span>
                  <span className="font-medium text-stone-900">{formatINR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pan-India Shipping</span>
                  <span className={hasFreeShipping ? "text-emerald-700 font-medium" : "text-stone-700"}>
                    {hasFreeShipping ? "FREE" : "₹149"}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-semibold text-stone-900">Estimated Total</span>
                  <p className="text-[10px] text-stone-400">Includes 12% GST & dispatch insurance</p>
                </div>
                <span className="font-serif text-xl font-medium text-stone-900">
                  {formatINR(cartSubtotal + (hasFreeShipping ? 0 : 149))}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1C1917] hover:bg-stone-800 text-white text-xs uppercase tracking-widest transition rounded-xs font-medium shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  UPI &amp; COD Available
                </span>
                <span>•</span>
                <span>Panipat Direct Dispatch</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
