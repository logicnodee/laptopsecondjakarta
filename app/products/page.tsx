import Link from "next/link";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import ProductFilters from "@/components/ProductFilters";
import { Prisma } from "@prisma/client";
import { Suspense } from "react";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const min = params.min ? parseInt(params.min as string) : undefined;
  const max = params.max ? parseInt(params.max as string) : undefined;
  const sort = params.sort as string;
  const brand = params.brand as string;

  const whereClause: Prisma.ProductWhereInput = {};
  if (min !== undefined || max !== undefined) {
    whereClause.price = {};
    if (min !== undefined) whereClause.price.gte = min;
    if (max !== undefined) whereClause.price.lte = max;
  }
  if (brand) {
    whereClause.brand = { contains: brand };
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
    { id: 1, title: "Asus ROG Zephyrus G14", brand: "Asus", price: 14500000, ram: "16GB", storage: "1TB SSD", processor: "Ryzen 9 5900HS", condition: "Mulus 95%", status: "Available", images: [{ url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80" }] },
    { id: 2, title: "Lenovo ThinkPad T490", brand: "Lenovo", price: 6200000, ram: "8GB", storage: "512GB SSD", processor: "Intel Core i5-8365U", condition: "Lecet Pemakaian", status: "Available", images: [{ url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80" }] },
    { id: 3, title: "MacBook Air M1 2020", brand: "Apple", price: 11000000, ram: "8GB", storage: "256GB SSD", processor: "Apple M1", condition: "Like New", status: "Available", images: [{ url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80" }] },
    { id: 4, title: "HP Pavilion Gaming 15", brand: "HP", price: 8500000, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7-9750H", condition: "Normal", status: "Available", images: [{ url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80" }] },
  ];

  // If using dummy data, apply filters manually for preview purposes
  if (totalProductsInDb === 0) {
    if (brand !== undefined) displayProducts = displayProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
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

      <main className="w-full px-4 mt-6 mb-20 flex-grow bg-white">
        <div className="flex flex-col mb-6 border-b border-slate-100 pb-4 gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800 m-0">Produk {brand ? `"${brand}"` : "Semua Laptop"}</h1>
            <p className="text-slate-500 text-xs mt-1">Menampilkan {displayProducts.length} produk</p>
          </div>
          <div className="w-full sm:w-auto relative z-20">
            <Suspense fallback={<div className="h-10"></div>}>
              <ProductFilters />
            </Suspense>
          </div>
        </div>
        
        <div className="w-full">
            {displayProducts.length === 0 ? (
              <div className="clean-card p-12 flex items-center justify-center text-center">
                <div>
                  <p className="text-lg text-text-secondary mb-2">Tidak ada laptop yang sesuai dengan filter Anda.</p>
                  <p className="text-sm text-slate-400">Silakan ubah rentang harga atau hapus filter untuk melihat semua produk.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
            )}
        </div>
      </main>
    </div>
  );
}
