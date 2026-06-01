"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Main Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 w-full">
        <div className="w-full px-4">
          <div className="flex flex-col gap-3 py-3">
            
            <div className="flex justify-between items-center w-full">
              {/* Logo and Hamburger Menu */}
              <div className="flex-shrink-0 flex items-center">
                <Sidebar />
                <Link href="/" className="flex items-center">
                  <img src="/logo.png" alt="Laptop Second Malang" className="h-8 w-auto object-contain" />
                </Link>
              </div>
              
              <div className="flex gap-4 items-center">
                <Link href="/admin" className="text-slate-500 hover:text-blue-600 transition-colors">
                  <span className="sr-only">Akun Admin</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Search Bar - Full Width below logo */}
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Cari Produk & Brand" 
                className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>

                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-4 shadow-lg absolute w-full left-0">
            {/* Mobile Search */}
          </div>
        )}
      </header>
    </>
  );
}
