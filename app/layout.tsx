import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ToastNotifications from "@/components/ToastNotifications";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AAVAAS — Thoughtfully Made for Modern Homes | By KT International",
  description:
    "Accessible premium Indian Home & Living brand crafted in Panipat by parent company KT International. Explore luxury mink blankets, 400TC Supima bedsheets, reversible falalen dohars, and hotel-grade bath linens.",
  keywords: [
    "AAVAAS",
    "KT International",
    "Panipat bedsheets",
    "mink blankets India",
    "Indian luxury home decor",
    "Supima cotton bedsheets",
    "dohars",
    "trousseau gifting",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] antialiased selection:bg-[#EDE8E0] selection:text-[#1C1917]">
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <WishlistDrawer />
            <SearchOverlay />
            <FloatingWhatsApp />
            <ToastNotifications />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
