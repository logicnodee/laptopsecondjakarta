import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import CheckoutClient from "./CheckoutClient";
import Link from "next/link";

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let product = null;
  try {
    product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { images: true }
    });
  } catch (error) {
    console.error("Prisma error:", error);
  }

  // Fallback to dummy data for preview if DB is empty
  if (!product) {
    const dummyProducts = [
      { id: 1, title: "Asus ROG Zephyrus G14", brand: "Asus", price: 14500000, ram: "16GB", storage: "1TB SSD", processor: "Ryzen 9 5900HS", condition: "Mulus 95%", status: "Available", description: "Laptop gaming super tipis dan kencang. Baterai awet untuk ukuran laptop gaming. Kelengkapan fullset original. Cocok untuk gaming berat dan rendering.", images: [{ url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1000&q=80" }, { url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1000&q=80" }] },
      { id: 2, title: "Lenovo ThinkPad T490", brand: "Lenovo", price: 6200000, ram: "8GB", storage: "512GB SSD", processor: "Intel Core i5-8365U", condition: "Lecet Pemakaian", status: "Available", description: "Laptop bisnis legendaris. Keyboard sangat nyaman, body kokoh standar militer. Minus lecet pemakaian di sudut. Mesin 100% normal.", images: [{ url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1000&q=80" }] },
      { id: 3, title: "MacBook Air M1 2020", brand: "Apple", price: 11000000, ram: "8GB", storage: "256GB SSD", processor: "Apple M1", condition: "Like New", status: "Available", description: "CC baterai masih rendah. Tidak ada dent atau lecet. Performa luar biasa dengan chip M1. Cocok untuk desain dan coding.", images: [{ url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&q=80" }] },
      { id: 4, title: "HP Pavilion Gaming 15", brand: "HP", price: 8500000, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7-9750H", condition: "Normal", status: "Available", description: "Laptop gaming budget. Sudah upgrade RAM ke 16GB. Layar IPS jernih. Ada backlit keyboard.", images: [{ url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1000&q=80" }] },
    ];
    // @ts-ignore
    product = dummyProducts.find(p => p.id === parseInt(id));
  }

  if (!product) {
    notFound();
  }

  if (product.status !== 'Available' && product.status !== 'Tersedia') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 lg:px-8 py-20 flex-grow text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Produk Tidak Tersedia</h1>
          <p className="mb-8">Maaf, produk ini sudah terjual atau tidak tersedia untuk dibeli.</p>
          <Link href="/" className="btn btn-primary">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-8 py-10 flex-grow">
        <nav className="py-2 mb-6">
          <Link href={`/product/${product.id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium text-sm">
            &larr; Kembali ke Produk
          </Link>
        </nav>

        <h1 className="text-3xl font-bold text-primary mb-8 font-[family-name:var(--font-outfit)]">Checkout</h1>

        <CheckoutClient product={product} />
      </div>
    </div>
  );
}
