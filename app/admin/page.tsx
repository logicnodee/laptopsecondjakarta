import { deleteProduct, addProduct, toggleStatus } from "./actions";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";

export default async function AdminPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 py-10 flex-grow">
        <div className="flex justify-between items-center py-4 mb-8 border-b border-border">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-primary m-0 font-[family-name:var(--font-outfit)]">Admin Dashboard</h2>
            <Link href="/admin/orders" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
              Lihat Pesanan
            </Link>
          </div>
        </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Form Add Product */}
        <div className="clean-card p-6 h-fit">
          <h3 className="text-lg font-bold text-primary mb-6 border-b border-border pb-3">
            Tambah Laptop Baru
          </h3>
          <form action={addProduct} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Nama Produk</label>
              <input type="text" name="title" required className="input" placeholder="e.g. Asus ROG Zephyrus G14" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Merek</label>
                <input type="text" name="brand" required className="input" placeholder="e.g. Asus" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Harga (Rp)</label>
                <input type="number" name="price" required className="input" placeholder="15000000" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">RAM</label>
                <input type="text" name="ram" required className="input" placeholder="16GB" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Penyimpanan</label>
                <input type="text" name="storage" required className="input" placeholder="512GB SSD" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Prosesor</label>
              <input type="text" name="processor" required className="input" placeholder="Intel Core i5-1135G7" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Kondisi</label>
              <input type="text" name="condition" required className="input" placeholder="Mulus 95%" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Unggah Gambar (Bisa pilih banyak)</label>
              <input type="file" name="images" multiple accept="image/*" className="input bg-white p-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Deskripsi</label>
              <textarea name="description" className="input min-h-[100px] resize-y" placeholder="Detail lengkap..."></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2 py-3">Simpan Produk</button>
          </form>
        </div>

        {/* List Products */}
        <div className="clean-card p-6 xl:col-span-2">
          <h3 className="text-lg font-bold text-primary mb-6 border-b border-border pb-3">
            Daftar Inventaris ({products.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="p-4 text-sm font-semibold text-text-secondary">Produk</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Harga</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Kondisi</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-text-secondary italic">Belum ada data produk. Silakan tambahkan.</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-surface transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-text-primary text-base">{product.title}</div>
                        <div className="text-xs text-text-secondary mt-1">{product.brand} &bull; {product.ram} &bull; {product.storage}</div>
                      </td>
                      <td className="p-4 font-semibold text-text-primary">Rp {product.price.toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        <span className="text-xs font-medium border border-border bg-white px-3 py-1 rounded">
                          {product.condition}
                        </span>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <form action={toggleStatus.bind(null, product.id, product.status)}>
                          <button type="submit" className={`text-sm font-medium text-white px-3 py-2 rounded transition-colors ${
                            product.status === 'Available' || product.status === 'Tersedia' ? 'bg-[#ffc107] hover:bg-[#e0a800] text-black' : 'bg-[#28a745] hover:bg-[#218838]'
                          }`}>
                            {product.status === 'Available' || product.status === 'Tersedia' ? 'Jadikan Terjual' : 'Jadikan Tersedia'}
                          </button>
                        </form>
                        <form action={deleteProduct.bind(null, product.id)}>
                          <button type="submit" className="text-sm font-medium text-white bg-[#dc3545] hover:bg-[#c82333] px-3 py-2 rounded transition-colors">
                            Hapus
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
