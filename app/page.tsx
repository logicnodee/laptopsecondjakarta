import Link from "next/link";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";

export default async function Home() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { images: true },
      take: 4,
    });
  } catch (error) {
    console.error("Prisma error:", error);
    // Ignore error, will fallback to dummy data
  }

  // Dummy products if db is empty for preview
  const displayProducts = products.length > 0 ? products : [
    { id: 1, title: "Asus ROG Zephyrus G14", brand: "Asus", price: 14500000, ram: "16GB", storage: "1TB SSD", processor: "Ryzen 9 5900HS", condition: "Mulus 95%", status: "Available", images: [{ url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80" }] },
    { id: 2, title: "Lenovo ThinkPad T490", brand: "Lenovo", price: 6200000, ram: "8GB", storage: "512GB SSD", processor: "Intel Core i5-8365U", condition: "Lecet Pemakaian", status: "Available", images: [{ url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80" }] },
    { id: 3, title: "MacBook Air M1 2020", brand: "Apple", price: 11000000, ram: "8GB", storage: "256GB SSD", processor: "Apple M1", condition: "Like New", status: "Available", images: [{ url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80" }] },
    { id: 4, title: "HP Pavilion Gaming 15", brand: "HP", price: 8500000, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7-9750H", condition: "Normal", status: "Available", images: [{ url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80" }] },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-16 sm:py-20 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4 sm:mb-6 font-[family-name:var(--font-outfit)]">
            Upgrade Harimu dengan Performa Maksimal
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-10 leading-relaxed">
            Pusat laptop second terpercaya di Malang. Kami menyediakan laptop untuk sekolah, bisnis, hingga gaming berat dengan harga terbaik dan jaminan kepuasan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full">
            <button className="btn btn-primary px-8 py-3 w-full sm:w-auto">Belanja Sekarang</button>
            <button className="btn btn-outline px-8 py-3 w-full sm:w-auto">Lihat Panduan</button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="container mx-auto px-4 lg:px-8 mt-16 mb-24 flex-grow">
        <div className="flex justify-between items-end mb-8 border-b border-border pb-4">
          <div>
            <h3 className="text-2xl font-bold text-text-primary m-0 font-[family-name:var(--font-outfit)]">Koleksi Pilihan</h3>
          </div>
          <Link href="/products" className="text-primary font-medium hover:underline hidden md:block">Lihat Semua</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="clean-card overflow-hidden flex flex-col group">
              <div className="h-56 w-full bg-surface relative overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-text-secondary">No Image</div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm ${
                    product.status === 'Available' || product.status === 'Tersedia' 
                      ? 'bg-green-100/90 text-green-700 border border-green-200' 
                      : 'bg-red-100/90 text-red-700 border border-red-200'
                  }`}>
                    {product.status === 'Available' ? 'Tersedia' : product.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-5 flex-grow">
                <div className="mb-4">
                  <span className="text-xs text-text-secondary font-semibold uppercase tracking-wider">{product.brand}</span>
                  <h4 className="text-lg font-bold text-primary mt-1 leading-tight line-clamp-2 hover:underline cursor-pointer">{product.title}</h4>
                </div>
                
                <div className="text-sm text-text-secondary mb-6 flex-grow">
                  <div className="flex flex-col gap-1">
                    <div>Prosesor: {product.processor}</div>
                    <div>RAM: {product.ram}</div>
                    <div>Storage: {product.storage}</div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-border flex justify-between items-center mb-4">
                  <p className="text-xl font-bold text-text-primary m-0">
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                </div>

                <Link href={`/product/${product.id}`} className="btn btn-outline w-full text-center">
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Corporate Footer */}
      <footer className="bg-white border-t border-border mt-auto">
        <div className="container mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-4 text-primary font-[family-name:var(--font-outfit)]">Laptop Second Malang</h2>
            <p className="text-text-secondary text-sm mb-4 leading-relaxed">
              Pusat penjualan laptop bekas berkualitas tinggi di Malang. Kami memberikan garansi dan layanan purna jual terbaik untuk setiap produk yang kami jual.
            </p>
          </div>
          <div>
            <h4 className="text-base font-bold mb-4 text-text-primary">Produk Kami</h4>
            <ul className="text-text-secondary text-sm space-y-3">
              <li><Link href="/" className="hover:text-primary transition-colors">Semua Laptop</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Laptop Gaming</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Laptop Kantoran</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">MacBook Second</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-bold mb-4 text-text-primary">Informasi</h4>
            <ul className="text-text-secondary text-sm space-y-3">
              <li><Link href="/" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Syarat & Ketentuan Garansi</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Kebijakan Pengembalian</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-bold mb-4 text-text-primary">Hubungi Kami</h4>
            <ul className="text-text-secondary text-sm space-y-3">
              <li>0812-3456-7890</li>
              <li>info@laptopsecondmalang.com</li>
              <li>Jl. Contoh Lokasi No. 123, Malang, Jawa Timur</li>
            </ul>
          </div>
        </div>
        <div className="bg-surface py-6 border-t border-border text-sm text-text-secondary">
          <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <span>&copy; {new Date().getFullYear()} Laptop Second Malang. All Rights Reserved.</span>
            <div className="flex flex-wrap justify-center gap-2 items-center">
              <span>Pembayaran Aman:</span>
              <span className="font-medium text-text-primary">BCA / Mandiri / BNI / COD</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
