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
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-500"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E2D7C7]">
          {/* Header */}
          <div className="p-6 sm:p-7 border-b border-[#E2D7C7] flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl tracking-wide text-stone-900 font-light">
                Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h3>
              <p className="text-[10px] text-stone-500 uppercase tracking-[0.25em] mt-1">
                Complimentary Pan-India Delivery
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-950 transition"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#EFE8DD] px-6 py-4 border-b border-[#E2D7C7]">
            <div className="flex items-center justify-between text-xs text-stone-700 mb-2">
              <div className="flex items-center gap-2 font-medium">
                <Truck className="w-4 h-4 text-stone-700" />
                {hasFreeShipping ? (
                  <span className="text-emerald-900 font-semibold">
                    You unlocked Complimentary Pan-India Delivery
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-stone-950">{formatINR(amountNeededForFreeShipping)}</strong> more for Free Shipping
                  </span>
                )}
              </div>
              <span className="text-[11px] text-stone-500 font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#D8CEBE] h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${
                  hasFreeShipping ? "bg-emerald-700" : "bg-[#B95D41]"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-7">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE8DD] border border-[#CEC0AD] flex items-center justify-center text-stone-400">
                  <Truck className="w-7 h-7 stroke-1" />
                </div>
                <h4 className="font-serif text-2xl text-stone-800 font-light">Your bag is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed font-serif italic">
                  Discover our Winter &apos;26–27 Mink blankets and signature 400TC Supima sheets woven in Panipat.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-8 py-3.5 bg-[#141210] hover:bg-stone-800 text-white text-xs uppercase tracking-[0.25em] font-semibold transition rounded-xs shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#EAE3D7]">
                {cart.map((item) => (
                  <div key={item.id} className="py-5 flex gap-4">
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="relative w-20 h-26 bg-[#EFE8DD] shrink-0 overflow-hidden rounded-xs border border-[#E2D7C7]"
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
                            className="font-serif text-base text-stone-900 hover:underline line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-stone-400 hover:text-rose-600 transition p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          Size: <span className="text-stone-900 font-medium">{item.selectedSize}</span> | Color:{" "}
                          <span className="text-stone-900 font-medium">{item.selectedColor}</span>
                        </p>
                        <p className="text-sm font-serif font-medium text-stone-900 mt-1">
                          {formatINR(item.unitPrice)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[#CEC0AD] rounded-xs bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-semibold text-stone-900">
                          {formatINR(item.unitPrice * item.quantity)}
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
            <div className="p-6 sm:p-7 border-t border-[#E2D7C7] bg-[#FAF7F2] space-y-4">
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal (Inclusive of GST)</span>
                  <span className="font-medium text-stone-900">{formatINR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pan-India Delivery</span>
                  <span className={hasFreeShipping ? "text-emerald-800 font-semibold" : "text-stone-700"}>
                    {hasFreeShipping ? "FREE" : "₹149"}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EAE3D7] flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-semibold text-stone-900">Estimated Total</span>
                  <p className="text-[10px] text-stone-400">Includes 12% GST &amp; transit insurance</p>
                </div>
                <span className="font-serif text-2xl font-light text-stone-900">
                  {formatINR(cartSubtotal + (hasFreeShipping ? 0 : 149))}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#141210] hover:bg-stone-800 text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 rounded-xs shadow-xl hover:shadow-2xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  UPI &amp; COD Available
                </span>
                <span>•</span>
                <span>Panipat Mill Dispatch</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
