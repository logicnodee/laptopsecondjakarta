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
      <section className="bg-blue-600 text-white w-full">
        <div className="w-full px-4 py-8 text-center flex flex-col items-center justify-center min-h-[160px] bg-gradient-to-r from-blue-600 to-blue-500">
          <h2 className="text-xl md:text-2xl font-bold leading-tight mb-2 font-[family-name:var(--font-outfit)]">
            Cicilan 0% Tenor 6 Bulan
          </h2>
          <p className="text-sm text-blue-100 mb-4">
            Bebas 1 Bulan Cicilan. Syarat & Ketentuan Berlaku.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="w-full px-4 pt-6 bg-white flex-grow">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-1">
          Pilih Merk
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-500">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0 1 12 2v5h4a1 1 0 0 1 .82 1.573l-7 10A1 1 0 0 1 8 18v-5H4a1 1 0 0 1-.82-1.573l7-10a1 1 0 0 1 1.12-.38Z" clipRule="evenodd" />
          </svg>
        </h3>
        
        <div className="grid grid-cols-3 gap-2">
          <Link href="/products?brand=Asus" className="flex flex-col items-center group cursor-pointer">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl shadow-sm border border-slate-100 p-2 flex items-center justify-center group-hover:shadow-md transition-shadow">
              <img src="/asus.png" alt="Asus" className="max-w-full max-h-full object-contain" />
            </div>
            <span className="text-[11px] mt-2 font-medium text-slate-600 group-hover:text-blue-600">Asus</span>
          </Link>

          <Link href="/products?brand=Lenovo" className="flex flex-col items-center group cursor-pointer">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl shadow-sm border border-slate-100 p-2 flex items-center justify-center group-hover:shadow-md transition-shadow">
              <img src="/lenovo.png" alt="Lenovo" className="max-w-full max-h-full object-contain" />
            </div>
            <span className="text-[11px] mt-2 font-medium text-slate-600 group-hover:text-blue-600">Lenovo</span>
          </Link>

          <Link href="/products?brand=HP" className="flex flex-col items-center group cursor-pointer">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl shadow-sm border border-slate-100 p-2 flex items-center justify-center group-hover:shadow-md transition-shadow">
              <img src="/hp.png" alt="HP" className="max-w-full max-h-full object-contain" />
            </div>
            <span className="text-[11px] mt-2 font-medium text-slate-600 group-hover:text-blue-600">HP</span>
          </Link>
        </div>
      </section>
      
      {/* End of Home Page Content */}

      {/* Simple Footer inside 600px */}
      <footer className="bg-slate-50 border-t border-slate-200 mt-auto px-4 py-8 text-center text-xs text-slate-500">
        <p className="mb-2 font-bold text-slate-700">Laptop Second Malang</p>
        <p className="mb-4">Jl. Mayjend Panjaitan No.111, Penanggungan, Kec. Klojen, Kota Malang</p>
        <p>&copy; {new Date().getFullYear()} Hak Cipta Dilindungi.</p>
      </footer>

    </div>
  );
}
