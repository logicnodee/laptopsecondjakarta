"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { cartItems, removeFromCart, totalItems, totalPrice } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-24">
      <Navbar />
      
      <main className="flex-grow flex flex-col p-4 sm:p-6 w-full max-w-[600px] mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 font-[family-name:var(--font-outfit)] border-b pb-2">Keranjang Belanja</h1>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center h-full">
            <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Keranjang Belanja Kosong</h2>
            <p className="text-slate-500 mb-8 max-w-[280px]">
              Sepertinya Anda belum memilih produk apa pun. Yuk, cari laptop idaman Anda sekarang!
            </p>
            <Link href="/" className="bg-[#2b2b2b] hover:bg-black text-white font-medium py-3 px-8 rounded-lg transition-colors w-full max-w-[300px]">
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-lg border flex-shrink-0 relative overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1 absolute inset-0" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No img</div>
                  )}
                </div>
                <div className="flex flex-col flex-grow justify-between py-1">
                  <div>
                    <h3 className="font-semibold text-slate-800 line-clamp-2 leading-tight mb-1">{item.title}</h3>
                    <p className="text-sm font-bold text-blue-600">Rp {item.price.toString().charAt(0)}.xxx.xxx</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Qty: {item.quantity}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mt-4">
              <h3 className="font-bold text-slate-800 mb-3 border-b pb-2">Ringkasan Keranjang</h3>
              <div className="flex justify-between text-slate-600 mb-2">
                <span>Total Items</span>
                <span>{totalItems} Produk</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 text-lg border-t pt-2 mt-2">
                <span>Total Harga</span>
                <span className="text-blue-600">Rp {totalPrice.toString().charAt(0)}.xxx.xxx</span>
              </div>
            </div>
            
            {/* If there's only 1 item, we can proceed to checkout directly. If multiple, maybe just checkout the first one for now since the schema only supports single item checkout, but we'll adapt. */}
            <Link 
              href="/checkout" 
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-center shadow-lg transition-transform active:scale-[0.98]"
            >
              Lanjut ke Pembayaran ({totalItems} Item)
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
