"use client";

import { useState } from "react";
import { submitCheckout } from "../actions";

export default function CheckoutClient({ product }: { product: any }) {
  const [deliveryMethod, setDeliveryMethod] = useState("Toko");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Checkout Form */}
      <div className="lg:col-span-2 clean-card p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-primary mb-6 border-b border-border pb-4 font-[family-name:var(--font-outfit)]">Detail Pengiriman & Pembayaran</h2>
        
        <form 
          action={async (formData) => {
            setIsSubmitting(true);
            try {
              await submitCheckout(formData);
            } catch (error) {
              console.error(error);
              setIsSubmitting(false);
              alert("Terjadi kesalahan saat checkout. Pastikan semua data terisi.");
            }
          }} 
          className="flex flex-col gap-6"
        >
          <input type="hidden" name="productId" value={product.id} />
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Nomor WhatsApp Aktif</label>
            <input type="text" name="whatsappNumber" required className="input bg-surface" placeholder="0895626752967" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Alamat Lengkap</label>
            <textarea name="address" required className="input min-h-[100px] resize-y bg-surface" placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Metode Pengiriman</label>
            <select 
              name="deliveryMethod" 
              className="input bg-surface"
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
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-blue-700 text-sm">
              <p className="font-semibold mb-1">Catatan Pengiriman Ojek Online:</p>
              <p>Biaya ojek online <strong>tidak</strong> termasuk dalam tagihan ini. Pembayaran ojek online dilakukan langsung dari akun pembeli saat memesan ojek onlinenya.</p>
            </div>
          )}

          <div className="border-t border-border mt-2 pt-6">
            <h3 className="text-lg font-bold text-primary mb-4">Informasi Pembayaran</h3>
            <div className="bg-surface p-5 rounded border border-border mb-6">
              <p className="text-sm text-text-secondary mb-2">Silakan transfer sesuai dengan total pembayaran ke rekening berikut:</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-16 h-10 bg-white border border-border rounded flex items-center justify-center font-bold text-blue-800 text-sm">
                  BCA
                </div>
                <div>
                  <p className="font-bold text-lg text-primary">8161511935</p>
                  <p className="text-sm text-text-secondary">a.n Laptop Second Malang</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Unggah Bukti Pembayaran (Wajib)</label>
              <input type="file" name="paymentProof" accept="image/*" required className="input bg-white p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full py-4 mt-4 text-lg">
            {isSubmitting ? "Memproses..." : "Konfirmasi Pembayaran"}
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="clean-card p-6 h-fit">
        <h3 className="text-lg font-bold text-primary mb-4 border-b border-border pb-3">Ringkasan Pesanan</h3>
        <div className="flex gap-4 mb-6">
          <div className="w-20 h-20 bg-surface rounded overflow-hidden flex-shrink-0 relative border border-border">
            {product.images && product.images[0] ? (
              <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-secondary text-xs">No Image</div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-text-primary line-clamp-2">{product.title}</h4>
            <p className="text-sm text-text-secondary mt-1">{product.condition}</p>
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-text-secondary">Harga Produk</span>
            <span className="font-medium">Rp {product.price.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-text-secondary">Pengiriman ({deliveryMethod === "Toko" ? "Toko" : "Ojol"})</span>
            <span className="font-medium text-green-600">Rp 0</span>
          </div>
          
          <div className="flex justify-between items-center border-t border-border pt-4">
            <span className="font-bold text-lg text-primary">Total Pembayaran</span>
            <span className="font-bold text-xl text-primary">Rp {product.price.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
