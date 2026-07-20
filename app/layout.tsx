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
  metadataBase: new URL('https://laptopsecondjakarta.vercel.app'),
  title: {
    default: "Laptop Second Jakarta | Jual Laptop Bekas Bergaransi",
    template: "%s | Laptop Second Jakarta"
  },
  description: "Pusat laptop second berkualitas tinggi di Jakarta by Winner Komputer. Bersih, rapi, dan bergaransi.",
  keywords: ["laptop second jakarta", "laptop bekas jakarta", "jual laptop jakarta", "winner komputer jakarta", "laptop bergaransi", "laptop murah jakarta"],
  openGraph: {
    title: "Laptop Second Jakarta | Jual Laptop Bekas Bergaransi",
    description: "Pusat laptop second berkualitas tinggi di Jakarta by Winner Komputer. Bersih, rapi, dan bergaransi.",
    url: "https://laptopsecondjakarta.vercel.app",
    siteName: "Laptop Second Jakarta",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Laptop Second Jakarta Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laptop Second Jakarta | Jual Laptop Bekas Bergaransi",
    description: "Pusat laptop second berkualitas tinggi di Jakarta by Winner Komputer. Bersih, rapi, dan bergaransi.",
    images: ["/logo.jpg"],
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
