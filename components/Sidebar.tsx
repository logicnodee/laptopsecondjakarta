"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button 
        onClick={toggleSidebar}
        className="p-2 mr-2 text-slate-600 hover:text-blue-700 focus:outline-none"
        aria-label="Toggle Menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <img src="/logo.jpg" alt="Laptop Second Jakarta" className="h-10 w-auto" />
          <button onClick={closeSidebar} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="flex flex-col">
            <Link href="/" onClick={closeSidebar} className="px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-700 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products?brand=Asus" onClick={closeSidebar} className="px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-700 font-medium transition-colors">
              Asus
            </Link>
            <Link href="/products?brand=Lenovo" onClick={closeSidebar} className="px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-700 font-medium transition-colors">
              Lenovo
            </Link>
            <Link href="/products?brand=HP" onClick={closeSidebar} className="px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-700 font-medium transition-colors">
              HP
            </Link>
            
            {/* Accordion / Dropdown Info */}
            <div>
              <button 
                onClick={() => setIsInfoOpen(!isInfoOpen)}
                className="w-full flex justify-between items-center px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-700 font-medium transition-colors"
              >
                <span>Informasi</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  className={`w-5 h-5 transition-transform ${isInfoOpen ? "rotate-180" : ""}`}
                >
                  <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 bg-slate-50 ${isInfoOpen ? "max-h-64" : "max-h-0"}`}>
                <div className="flex flex-col py-2">
                  <a href="https://maps.app.goo.gl/h7K6hrkVmc72TiXG7?g_st=ic" target="_blank" rel="noopener noreferrer" onClick={closeSidebar} className="px-10 py-2.5 text-sm text-slate-600 hover:text-blue-700">Alamat Toko</a>
                  <a href="https://wa.me/62895626752967?text=Halo,%20saya%20ingin%20cek%20ongkir..." target="_blank" rel="noopener noreferrer" onClick={closeSidebar} className="px-10 py-2.5 text-sm text-slate-600 hover:text-blue-700">Cek Ongkir</a>
                  <a href="https://wa.me/62895626752967?text=Halo,%20saya%20ingin%20cek%20resi%20kiriman..." target="_blank" rel="noopener noreferrer" onClick={closeSidebar} className="px-10 py-2.5 text-sm text-slate-600 hover:text-blue-700">Cek Kiriman</a>
                  <Link href="/info?topic=syarat" onClick={closeSidebar} className="px-10 py-2.5 text-sm text-slate-600 hover:text-blue-700">Syarat & Ketentuan</Link>
                  <Link href="/info?topic=faq" onClick={closeSidebar} className="px-10 py-2.5 text-sm text-slate-600 hover:text-blue-700">FAQ</Link>
                </div>
              </div>
            </div>

            <a href="https://wa.me/62895626752967?text=Halo,%20saya%20ingin%20konfirmasi%20pembayaran..." target="_blank" rel="noopener noreferrer" onClick={closeSidebar} className="px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-700 font-medium transition-colors">
              Konfirmasi Pembayaran
            </a>
            <a href="https://wa.me/62895626752967" target="_blank" rel="noopener noreferrer" onClick={closeSidebar} className="px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-700 font-medium transition-colors">
              Hubungi Kami
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
