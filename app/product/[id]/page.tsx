import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import ProductGallery from "@/components/ProductGallery";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Try to fetch from DB first
  let product = null;
  try {
    product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { images: true }
    });
  } catch (error) {
    console.error("Prisma error:", error);
    // Ignore error, will fallback to dummy data
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

  // Format WhatsApp message
  const waNumber = "62895626752967"; // Nomor WA Admin Baru
  const waMessage = encodeURIComponent(`Halo, saya tertarik dengan laptop: \n*${product.title}*\nHarga: Rp ${product.price.toLocaleString('id-ID')}\nApakah masih tersedia?`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-8 py-4 flex-grow">
        <nav className="py-1 mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium text-xs">
            &larr; Kembali ke Katalog
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-1">
        {/* Product Image Gallery */}
        <ProductGallery images={product.images || []} />

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 items-center">
              <span className="text-[10px] border border-border bg-white px-2 py-0.5 rounded font-semibold text-text-secondary uppercase tracking-wider">{product.brand}</span>
              <span className="text-[10px] bg-surface border border-border px-2 py-0.5 rounded font-semibold text-text-primary">{product.condition}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                product.status === 'Available' || product.status === 'Tersedia' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {product.status === 'Available' ? 'Tersedia' : product.status}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-primary mb-2 leading-tight font-[family-name:var(--font-outfit)]">{product.title}</h1>
            <p className="text-xl font-bold text-text-primary mt-2">
              Rp {product.price.toLocaleString('id-ID')}
            </p>
          </div>

          <div className="clean-card p-4 mb-4">
            <h3 className="text-base font-bold text-primary mb-3 border-b border-border pb-2">
              Spesifikasi Utama
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-text-secondary font-medium">Prosesor</span>
                <span className="font-semibold text-text-primary text-right">{product.processor}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-text-secondary font-medium">RAM</span>
                <span className="font-semibold text-text-primary text-right">{product.ram}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary font-medium">Penyimpanan</span>
                <span className="font-semibold text-text-primary text-right">{product.storage}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-base font-bold text-primary mb-2">Deskripsi Lengkap</h3>
            <div className="text-sm text-text-primary leading-relaxed bg-surface p-3 rounded border border-border">
              {product.description || "Tidak ada deskripsi rinci untuk produk ini."}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <Link href={`/checkout/${product.id}`} className="btn btn-primary flex-1 text-center py-3.5">
              Beli Sekarang
            </Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn bg-green-600 hover:bg-green-700 text-white flex-1 text-center py-3.5 rounded-lg font-semibold transition-colors">
              Konsultasi ke WA
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
