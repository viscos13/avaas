"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  id: string; // combination of product.id + size + color
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  unitPrice: number;
}

interface ToastMessage {
  id: string;
  message: string;
  productName?: string;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  addItem: (product: Product, size: string, color: string, quantity?: number, unitPrice?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  hasFreeShipping: boolean;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 1999;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aavaas_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("aavaas_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, isHydrated]);

  const addToast = (message: string, productName?: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, productName }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addItem = (
    product: Product,
    size: string,
    color: string,
    quantity: number = 1,
    customUnitPrice?: number
  ) => {
    const unitPrice =
      customUnitPrice !== undefined
        ? customUnitPrice
        : product.sizes.find((s) => s.name === size)
        ? product.price + (product.sizes.find((s) => s.name === size)?.priceModifier || 0)
        : product.price;

    const cartItemId = `${product.id}-${size}-${color}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            quantity,
            selectedSize: size,
            selectedColor: color,
            unitPrice,
          },
        ];
      }
    });

    addToast(`Added to your shopping bag`, product.name);
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - cartSubtotal
  );

  const hasFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        hasFreeShipping,
        toasts,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
