"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/components/CartProvider";
import { submitCheckout } from "./actions";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState("Toko");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 lg:px-8 py-20 flex-grow text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Keranjang Kosong</h1>
          <p className="mb-8 text-slate-500">Silakan tambahkan produk ke keranjang terlebih dahulu.</p>
          <Link href="/" className="bg-[#2b2b2b] hover:bg-black text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Kembali Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-8 py-6 flex-grow max-w-[800px]">
        <nav className="py-1 mb-4">
          <Link href="/cart" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium text-xs">
            &larr; Kembali ke Keranjang
          </Link>
        </nav>

        <h1 className="text-xl font-bold text-slate-800 mb-6 font-[family-name:var(--font-outfit)]">Checkout</h1>

        <div className="flex flex-col gap-6">
          {/* Checkout Form */}
          <div className="bg-white p-4 lg:p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3 font-[family-name:var(--font-outfit)]">Detail Pengiriman & Pembayaran</h2>
            
            <form 
              action={async (formData) => {
                setIsSubmitting(true);
                try {
                  // Add cart items to formData before submission
                  formData.append("cartItems", JSON.stringify(cartItems));
                  await submitCheckout(formData);
                  clearCart(); // Clear cart after successful checkout
                  router.push('/checkout/success');
                } catch (error: any) {
                  console.error(error);
                  setIsSubmitting(false);
                  alert(error.message || "Terjadi kesalahan saat checkout. Pastikan semua data terisi dan stok tersedia.");
                }
              }} 
              className="flex flex-col gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Nomor WhatsApp Aktif</label>
                <input type="text" name="whatsappNumber" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="0895626752967" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Alamat Lengkap</label>
                <textarea name="address" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px] resize-y" placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Metode Pengiriman</label>
                <select 
                  name="deliveryMethod" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  required
                >
                  <option value="Toko">Ambil di Toko</option>
                  <option value="Ojol">Menggunakan Ojek Online</option>
                </select>
              </div>

              {/* Ojek Online Note */}
              {deliveryMethod === "Ojol" && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded text-blue-700 text-xs">
                  <p className="font-semibold mb-1">Catatan Pengiriman Ojek Online:</p>
                  <p>Biaya ojek online <strong>tidak</strong> termasuk dalam tagihan ini. Pembayaran ojek online dilakukan langsung dari akun pembeli saat memesan ojek onlinenya.</p>
                </div>
              )}

              <div className="border-t border-slate-200 mt-1 pt-4">
                <h3 className="text-base font-bold text-slate-800 mb-3">Informasi Pembayaran</h3>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                  <p className="text-xs text-slate-500 mb-2">Silakan transfer sesuai dengan total pembayaran ke rekening berikut:</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-14 h-8 bg-white border border-slate-200 rounded flex items-center justify-center font-bold text-blue-800 text-xs shadow-sm">
                      BCA
                    </div>
                    <div>
                      <p className="font-bold text-base text-slate-800">8161511935</p>
                      <p className="text-xs text-slate-500">a.n Mukhammad ayatulloh husaini</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">Unggah Bukti Pembayaran (Wajib)</label>
                  <input type="file" name="paymentProof" accept="image/*" required className="w-full bg-white p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-slate-200 rounded-lg" />
                </div>
              </div>

              {/* Order Summary placed here */}
              <div className="border border-slate-200 rounded-lg p-4 mt-2 bg-slate-50">
                <h3 className="text-base font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Ringkasan Pesanan</h3>
                
                <div className="flex flex-col gap-3 mb-4 max-h-[300px] overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-white rounded overflow-hidden flex-shrink-0 relative border border-slate-200">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1 absolute inset-0" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No img</div>
                        )}
                      </div>
                      <div className="flex-grow flex flex-col justify-center">
                        <h4 className="font-semibold text-slate-800 line-clamp-2 text-sm">{item.title}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-slate-500">{item.quantity}x</span>
                          <span className="text-sm font-bold text-blue-600">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="text-slate-500">Total Harga Produk</span>
                    <span className="font-medium text-slate-800">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3 text-sm">
                    <span className="text-slate-500">Pengiriman ({deliveryMethod === "Toko" ? "Ambil di Toko" : "Ojek Online"})</span>
                    <span className="font-medium text-green-600">Rp 0</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-slate-200 pt-3">
                    <span className="font-bold text-base text-slate-800">Total Pembayaran</span>
                    <span className="font-bold text-lg text-blue-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-lg shadow-md transition-transform active:scale-[0.98] mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? "Memproses..." : "Konfirmasi Pembayaran"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
