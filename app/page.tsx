import Link from "next/link";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand } = await searchParams;
  let products: any[] = [];
  
  try {
    const whereClause = brand ? { brand: { contains: brand } } : {};
    
    products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: { images: true },
      take: 12, // Take more products since this is the main catalog now
    });
  } catch (error) {
    console.error("Prisma error:", error);
    // Ignore error, will fallback to dummy data
  }

  // Dummy products if db is empty for preview
  const allDummyProducts = [
    { id: 1, title: "Asus ROG Zephyrus G14", brand: "Asus", price: 14500000, ram: "16GB", storage: "1TB SSD", processor: "Ryzen 9 5900HS", condition: "Mulus 95%", status: "Available", images: [{ url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80" }] },
    { id: 2, title: "Lenovo ThinkPad T490", brand: "Lenovo", price: 6200000, ram: "8GB", storage: "512GB SSD", processor: "Intel Core i5-8365U", condition: "Lecet Pemakaian", status: "Sold Out", images: [{ url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80" }] },
    { id: 3, title: "MacBook Air M1 2020", brand: "Apple", price: 11000000, ram: "8GB", storage: "256GB SSD", processor: "Apple M1", condition: "Like New", status: "Available", images: [{ url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80" }] },
    { id: 4, title: "HP Pavilion Gaming 15", brand: "HP", price: 8500000, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7-9750H", condition: "Normal", status: "Available", images: [{ url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80" }] },
  ];

  const filteredDummy = brand 
    ? allDummyProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase())
    : allDummyProducts;

  const displayProducts = products.length > 0 ? products : filteredDummy;

  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

      {/* Top Promo Banner */}
      <section className="bg-blue-600 text-white border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-8 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 font-[family-name:var(--font-outfit)]">
              Kualitas Terbaik, Harga Bersahabat
            </h2>
            <p className="text-sm md:text-base text-blue-100 mb-6 leading-relaxed">
              Dapatkan laptop pilihan Anda dengan jaminan kepuasan. Semua unit telah melewati proses QC yang ketat.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="#katalog" className="btn bg-white text-blue-700 hover:bg-slate-50 px-6 py-2.5 w-full sm:w-auto text-sm">Lihat Katalog</Link>
            </div>
          </div>
          <div className="hidden md:flex flex-1 justify-end">
            <div className="w-64 h-40 bg-blue-500/50 rounded-xl flex items-center justify-center p-4">
              <span className="text-blue-100 text-sm italic opacity-80 text-center">Your Banner Image Here</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Scroll target for catalog */}
      <div id="katalog" className="pt-2"></div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 lg:px-8 mt-6 mb-20 flex-grow">
        <div className="flex justify-between items-center mb-6 pb-4">
          <div>
            <h3 className="text-xl font-medium text-slate-800 m-0">Kategori Pilihan {brand ? `"${brand}"` : ""}</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => {
            const isAvailable = product.status === 'Available' || product.status === 'Tersedia';
            return (
              <div key={product.id} className="clean-card overflow-hidden flex flex-col group border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="h-56 w-full bg-slate-50 relative overflow-hidden flex items-center justify-center p-4">
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[0].url} alt={product.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-slate-400">No Image</div>
                  )}
                  
                  {/* Sold Out Badge (Circle) */}
                  {!isAvailable && (
                    <div className="absolute left-2 bottom-2 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-md z-10 leading-tight text-center">
                      Sold<br/>Out
                    </div>
                  )}

                  {/* Condition Badge centered at bottom of image area */}
                  <div className="absolute bottom-2 left-0 w-full flex justify-center pointer-events-none">
                    <span className="bg-[#b3e59f] text-green-900 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-sm rounded-sm">
                      {product.condition === 'New' || product.condition.toLowerCase().includes('baru') ? 'NEW UNIT' : 'SECONDHAND UNIT'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col p-4 flex-grow bg-white">
                  <div className="mb-2">
                    <h4 className="text-sm font-semibold text-slate-800 mt-1 leading-snug line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors">{product.title}</h4>
                  </div>
                  
                  <div className="mt-auto pt-2 flex justify-between items-center mb-3">
                    <p className="text-sm font-bold text-slate-900 m-0">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <Link href={`/product/${product.id}`} className={`w-full text-center py-2 text-sm font-medium transition-colors rounded ${isAvailable ? 'bg-[#2b2b2b] hover:bg-black text-white' : 'bg-slate-300 text-slate-500 cursor-not-allowed pointer-events-none'}`}>
                    Beli
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        
        {displayProducts.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Tidak ada produk ditemukan untuk kategori ini.
          </div>
        )}
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
              <li>0895-6267-52967</li>
              <li>info@laptopsecondmalang.com</li>
              <li className="leading-relaxed">Jl. Mayjend Panjaitan No.111, Penanggungan, Kec. Klojen, Kota Malang, Jawa Timur 65113</li>
            </ul>
          </div>
        </div>
        <div className="bg-surface py-6 border-t border-border text-xs text-text-secondary">
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
