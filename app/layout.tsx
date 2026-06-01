import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laptop Second Malang",
  description: "Pusat laptop second berkualitas tinggi di Malang. Bersih, rapi, dan bergaransi.",
};

import BottomNav from "@/components/BottomNav";
import { CartProvider } from "@/components/CartProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-slate-100 text-slate-900 min-h-screen flex justify-center`}
      >
        <div className="w-full max-w-[600px] bg-white min-h-screen shadow-2xl relative flex flex-col pb-20">
          <CartProvider>
            {children}
            <BottomNav />
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
