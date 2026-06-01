import Link from "next/link";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import { updateOrderStatus, deleteOrder } from "./actions";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 py-10 flex-grow">
        <div className="flex justify-between items-center py-4 mb-8 border-b border-border">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-primary m-0 font-[family-name:var(--font-outfit)]">Manajemen Pesanan</h2>
            <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1 rounded">
              &larr; Kembali ke Produk
            </Link>
          </div>
        </div>

        <div className="clean-card p-6">
          <h3 className="text-lg font-bold text-primary mb-6 border-b border-border pb-3">
            Daftar Pesanan Masuk ({orders.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="p-4 text-sm font-semibold text-text-secondary w-16">ID</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Produk & Pembeli</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Pengiriman</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Bukti Transfer</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Status</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-text-secondary italic">Belum ada data pesanan.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-surface transition-colors">
                      <td className="p-4 font-medium text-text-primary">#{order.id}</td>
                      <td className="p-4">
                        <div className="mb-2">
                          {order.items.map(item => (
                            <div key={item.id} className="font-bold text-primary text-sm flex justify-between">
                              <span>{item.quantity}x {item.product.title}</span>
                              <span className="text-blue-600">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-sm text-text-secondary mb-1">
                          <span className="font-semibold text-text-primary">WA:</span> {order.whatsappNumber}
                        </div>
                        <div className="text-sm text-text-secondary line-clamp-2" title={order.address}>
                          <span className="font-semibold text-text-primary">Alamat:</span> {order.address}
                        </div>
                        <div className="text-xs text-text-secondary mt-1">
                          {new Date(order.createdAt).toLocaleString("id-ID")}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${order.deliveryMethod === 'Ojol' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                          {order.deliveryMethod === 'Ojol' ? 'Ojek Online' : 'Ambil di Toko'}
                        </span>
                      </td>
                      <td className="p-4">
                        <a href={order.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="block w-16 h-16 bg-surface border border-border rounded overflow-hidden hover:opacity-80 transition-opacity">
                          <img src={order.paymentProofUrl} alt="Bukti Pembayaran" className="w-full h-full object-cover" />
                        </a>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded ${
                          order.status === 'Berhasil' ? 'bg-green-100 text-green-700' : 
                          order.status === 'Gagal' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex flex-col gap-2 items-end">
                          {order.status === 'Menunggu Konfirmasi' && (
                            <div className="flex gap-2">
                              <form action={updateOrderStatus.bind(null, order.id, 'Berhasil')}>
                                <button type="submit" className="text-xs font-medium text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded transition-colors">
                                  Konfirmasi
                                </button>
                              </form>
                              <form action={updateOrderStatus.bind(null, order.id, 'Gagal')}>
                                <button type="submit" className="text-xs font-medium text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition-colors">
                                  Tolak
                                </button>
                              </form>
                            </div>
                          )}
                          <form action={deleteOrder.bind(null, order.id)}>
                            <button type="submit" className="text-xs font-medium text-text-secondary hover:text-red-600 px-3 py-1 mt-1 transition-colors">
                              Hapus
                            </button>
                          </form>
                        </div>
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
  );
}
