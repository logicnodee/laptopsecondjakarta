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
  metadataBase: new URL('https://laptopsecondmalang.vercel.app'),
  title: {
    default: "Laptop Second Malang | Beli Laptop Bekas Bergaransi",
    template: "%s | Laptop Second Malang"
  },
  description: "Pusat laptop second berkualitas tinggi di Malang by Winner Komputer. Bersih, rapi, dan bergaransi. Melayani pembelian dan tukar tambah laptop bekas area Malang.",
  keywords: ["laptop second malang", "laptop bekas malang", "beli laptop malang", "tukar tambah laptop", "winner komputer malang", "laptop bergaransi", "laptop murah malang"],
  openGraph: {
    title: "Laptop Second Malang | Beli Laptop Bekas Bergaransi",
    description: "Pusat laptop second berkualitas tinggi di Malang by Winner Komputer. Bersih, rapi, dan bergaransi.",
    url: "https://laptopsecondmalang.vercel.app",
    siteName: "Laptop Second Malang",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laptop Second Malang",
    description: "Pusat laptop second berkualitas tinggi di Malang by Winner Komputer. Bersih, rapi, dan bergaransi.",
  },
  alternates: {
    canonical: '/',
  },
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
