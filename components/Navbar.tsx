"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar - Hidden on mobile */}
      <div className="bg-slate-900 text-slate-300 text-[10px] py-1 hidden md:block">
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
          <div className="flex gap-4">
            <a href="https://maps.app.goo.gl/DE8bEzh1s7V8bHW88" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Lokasi Toko di Malang</a>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/admin" className="hover:text-white transition-colors">Akun Admin</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-12 md:h-14">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <img src="/logo.png" alt="Laptop Second Malang" className="h-8 md:h-10 w-auto object-contain" />
              </Link>
            </div>
            
            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
              <input 
                type="text" 
                placeholder="Cari laptop idaman Anda..." 
                className="w-full pl-3 pr-8 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-6 flex-shrink-0">
              <a href="tel:+62895626752967" className="text-slate-600 hover:text-blue-600 transition-colors font-medium text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.08-7.076-6.975l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                0895-6267-52967
              </a>
              <Link href="/admin" className="btn btn-primary">Hubungi Kami</Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-blue-600 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:block border-t border-slate-100 bg-white">
          <nav className="container mx-auto px-4 lg:px-8 flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
            <Link href="/products" className="nav-link pl-0 text-blue-600">Semua Laptop</Link>
            <Link href="/" className="nav-link">Laptop Gaming</Link>
            <Link href="/" className="nav-link">Kebutuhan Kuliah</Link>
            <Link href="/" className="nav-link">Desain Grafis</Link>
            <Link href="/" className="nav-link">Di Bawah 4 Juta</Link>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-4 shadow-lg absolute w-full left-0">
            {/* Mobile Search */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Cari laptop..." 
                className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {/* Mobile Menu Links */}
              <nav className="flex flex-col mt-2">
                <Link href="/products" className="py-2 border-b border-slate-100 text-slate-700 text-sm font-medium hover:text-blue-600">Semua Laptop</Link>
                <Link href="/" className="py-2 border-b border-slate-100 text-slate-700 text-sm font-medium hover:text-blue-600">Laptop Gaming</Link>
                <Link href="/" className="block py-2 text-slate-600 text-sm font-medium border-b border-slate-100">Kebutuhan Kuliah</Link>
                <Link href="/" className="block py-2 text-slate-600 text-sm font-medium border-b border-slate-100">Desain Grafis</Link>
                <Link href="/" className="block py-2 text-slate-600 text-sm font-medium">Di Bawah 4 Juta</Link>
              </nav>
            </div>
            
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <a href="tel:+62895626752967" className="text-slate-600 text-sm font-medium py-2 flex items-center justify-center gap-2 border border-slate-300 rounded-md">
                Hubungi 0895-6267-52967
              </a>
              <Link href="/admin" className="btn btn-primary w-full py-2 text-sm rounded-md">Hubungi Penjual</Link>
              <Link href="/admin" className="text-xs text-center text-slate-500 mt-1">Login Admin</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
