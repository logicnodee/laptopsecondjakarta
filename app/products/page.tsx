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

  const whereClause: Prisma.ProductWhereInput = {};
  if (min !== undefined || max !== undefined) {
    whereClause.price = {};
    if (min !== undefined) whereClause.price.gte = min;
    if (max !== undefined) whereClause.price.lte = max;
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
    { id: 1, title: "Lenovo Thinkpad L15 G3 Ryzen 5 Pro 5675U 16/256", brand: "Lenovo", price: 4000000, ram: "16GB", storage: "256GB SSD", processor: "Ryzen 5 Pro 5675U", condition: "Normal", status: "Available", images: [{ url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80" }] },
  ];

  // If using dummy data, apply filters manually for preview purposes
  if (totalProductsInDb === 0) {
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

      <main className="container mx-auto px-4 lg:px-8 mt-10 mb-24 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-border pb-4 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary m-0 font-[family-name:var(--font-outfit)]">Semua Laptop</h1>
            <p className="text-text-secondary mt-2">Menampilkan {displayProducts.length} produk yang sesuai</p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
            )}
        </div>
      </main>

      {/* Corporate Footer */}
      <footer className="bg-white border-t border-border mt-auto">
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
