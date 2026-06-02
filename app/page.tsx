import Link from "next/link";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import ProductFilters from "@/components/ProductFilters";
import { Prisma } from "@prisma/client";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const min = params.min ? parseInt(params.min as string) : undefined;
  const max = params.max ? parseInt(params.max as string) : undefined;
  const sort = params.sort as string;
  const brand = params.brand as string;
  const search = params.search as string;

  const whereClause: Prisma.ProductWhereInput = {};
  if (min !== undefined || max !== undefined) {
    whereClause.price = {};
    if (min !== undefined) whereClause.price.gte = min;
    if (max !== undefined) whereClause.price.lte = max;
  }
  if (brand) {
    whereClause.brand = { contains: brand };
  }
  if (search) {
    whereClause.title = { contains: search, mode: "insensitive" };
  }

  let orderByClause: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  if (sort === "price_asc") orderByClause = { price: "asc" };
  else if (sort === "price_desc") orderByClause = { price: "desc" };

  let products: any[] = [];
  let totalProductsInDb = 0;
  
  try {
    products = await prisma.product.findMany({
      where: whereClause,
      orderBy: orderByClause,
      include: { images: true },
    });
    totalProductsInDb = await prisma.product.count();
  } catch (error) {
    console.error("Prisma error:", error);
    // Ignore error, will fallback to dummy data
  }

  // Dummy products if db is empty for preview
  let displayProducts = totalProductsInDb > 0 ? products : [
    { id: 1, title: "Asus ROG Zephyrus G14", brand: "Asus", price: 14500000, ram: "16GB", storage: "1TB SSD", processor: "Ryzen 9 5900HS", condition: "Mulus 95%", status: "Available", images: [{ url: "/merk/asus/asus.png" }] },
    { id: 2, title: "Lenovo ThinkPad T490", brand: "Lenovo", price: 6200000, ram: "8GB", storage: "512GB SSD", processor: "Intel Core i5-8365U", condition: "Lecet Pemakaian", status: "Available", images: [{ url: "/merk/lenovo/lenovo.png" }] },
    { id: 3, title: "Asus Vivobook 14", brand: "Asus", price: 5500000, ram: "8GB", storage: "512GB SSD", processor: "Intel Core i3-1115G4", condition: "Mulus 90%", status: "Available", images: [{ url: "/merk/asus/asus2.png" }] },
    { id: 4, title: "HP Pavilion Gaming 15", brand: "HP", price: 8500000, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7-9750H", condition: "Normal", status: "Available", images: [{ url: "/merk/hp/hp.png" }] },
  ];

  if (totalProductsInDb === 0) {
    if (brand !== undefined) displayProducts = displayProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    if (search) displayProducts = displayProducts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    if (min !== undefined) displayProducts = displayProducts.filter(p => p.price >= min);
    if (max !== undefined) displayProducts = displayProducts.filter(p => p.price <= max);
    
    if (sort === "price_asc") {
      displayProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      displayProducts.sort((a, b) => b.price - a.price);
    }
  }

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
      <section className="w-full px-4 pt-6 bg-white">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">
          Pilih Merk
        </h3>
        
        <div className="grid grid-cols-3 gap-2">
          <Link href="/?brand=Asus" className="flex flex-col items-center group cursor-pointer">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl shadow-sm border border-slate-100 p-2 flex items-center justify-center group-hover:shadow-md transition-shadow">
              <img src="/asus.png" alt="Asus" className="max-w-full max-h-full object-contain" />
            </div>
            <span className="text-[11px] mt-2 font-medium text-slate-600 group-hover:text-blue-600">Asus</span>
          </Link>

          <Link href="/?brand=Lenovo" className="flex flex-col items-center group cursor-pointer">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl shadow-sm border border-slate-100 p-2 flex items-center justify-center group-hover:shadow-md transition-shadow">
              <img src="/lenovo.png" alt="Lenovo" className="max-w-full max-h-full object-contain" />
            </div>
            <span className="text-[11px] mt-2 font-medium text-slate-600 group-hover:text-blue-600">Lenovo</span>
          </Link>

          <Link href="/?brand=HP" className="flex flex-col items-center group cursor-pointer">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl shadow-sm border border-slate-100 p-2 flex items-center justify-center group-hover:shadow-md transition-shadow">
              <img src="/hp.png" alt="HP" className="max-w-full max-h-full object-contain" />
            </div>
            <span className="text-[11px] mt-2 font-medium text-slate-600 group-hover:text-blue-600">HP</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mt-6 mb-4">
          <form action="/" className="relative">
            <input 
              type="text" 
              name="search" 
              defaultValue={search || ""}
              placeholder="Cari produk atau brand..." 
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm shadow-sm text-slate-700 bg-slate-50 focus:bg-white" 
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
          </form>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="w-full px-4 mb-20 flex-grow bg-white">
        <div className="flex flex-col mb-4 border-b border-slate-100 pb-4 gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 m-0">Semua Stok Laptop</h2>
          </div>
          <div className="w-full sm:w-auto relative z-20">
            <Suspense fallback={<div className="h-10"></div>}>
              <ProductFilters basePath="/" />
            </Suspense>
          </div>
        </div>
        
        <div className="w-full">
            {displayProducts.length === 0 ? (
              <div className="clean-card p-12 flex items-center justify-center text-center">
                <div>
                  <p className="text-lg text-text-secondary mb-2">Tidak ada laptop yang sesuai dengan pencarian Anda.</p>
                  <p className="text-sm text-slate-400">Silakan ubah filter atau kata kunci untuk melihat produk lainnya.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {displayProducts.map((product) => {
                  const isAvailable = product.status === 'Available' || product.status === 'Tersedia';
                  return (
                    <div key={product.id} className="clean-card overflow-hidden flex flex-col group border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-square w-full bg-white relative overflow-hidden flex items-center justify-center">
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-slate-400 text-xs">No Image</div>
                        )}
                        
                        {/* Sold Out Badge */}
                        {!isAvailable && (
                          <div className="absolute left-2 bottom-2 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-md z-10 leading-tight text-center">
                            Sold<br/>Out
                          </div>
                        )}
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
            )}
        </div>
      </section>
    </div>
  );
}
