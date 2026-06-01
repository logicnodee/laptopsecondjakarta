import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Keranjang Belanja Kosong</h2>
        <p className="text-slate-500 mb-8 max-w-[280px]">
          Sepertinya Anda belum memilih produk apa pun. Yuk, cari laptop idaman Anda sekarang!
        </p>
        
        <Link href="/" className="bg-[#2b2b2b] hover:bg-black text-white font-medium py-3 px-8 rounded-lg transition-colors w-full max-w-[300px]">
          Mulai Belanja
        </Link>
      </main>
    </div>
  );
}
