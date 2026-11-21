import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ToastNotifications from "@/components/ToastNotifications";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AAVAAS — Thoughtfully Made for Modern Homes | By KT International",
  description:
    "Accessible luxury Indian Home & Living brand crafted in Panipat by parent company KT International. Explore luxury mink blankets, 400TC Supima bedsheets, reversible falalen dohars, and spa-grade bath linens.",
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
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#F8F5F0] text-[#191715] antialiased selection:bg-[#EFEAE2] selection:text-[#191715]">
        <CartProvider>
          <WishlistProvider>
            <Header />
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
