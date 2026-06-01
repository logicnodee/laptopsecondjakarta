"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  if (pathname.startsWith('/product/')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 w-full max-w-[600px] bg-black text-white flex justify-around items-center h-16 z-50 rounded-t-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <Link href="/" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.99 8.99a.75.75 0 1 1-1.06 1.06l-1.46-1.46v6.819a.75.75 0 0 1-.75.75H13.5a.75.75 0 0 1-.75-.75V15h-1.5v4.25a.75.75 0 0 1-.75.75H5.75a.75.75 0 0 1-.75-.75v-6.82l-1.46 1.46a.75.75 0 0 1-1.06-1.06l8.99-8.99Z" />
        </svg>
        <span className="text-[10px] font-medium">Home</span>
      </Link>
      
      <Link href="/cart" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/cart' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-black">
              {totalItems}
            </span>
          )}
        </div>
        <span className="text-[10px] font-medium">Keranjang</span>
      </Link>
    </div>
  );
}
