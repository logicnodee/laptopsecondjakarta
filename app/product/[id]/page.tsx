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
      { id: 1, title: "Asus ROG Zephyrus G14", brand: "Asus", price: 14500000, ram: "16GB", storage: "1TB SSD", processor: "Ryzen 9 5900HS", condition: "Mulus 95%", status: "Available", description: "Laptop gaming super tipis dan kencang. Baterai awet untuk ukuran laptop gaming. Kelengkapan fullset original. Cocok untuk gaming berat dan rendering.", images: [{ url: "/merk/asus/asus.png" }, { url: "/merk/asus/asus2.png" }] },
      { id: 2, title: "Lenovo ThinkPad T490", brand: "Lenovo", price: 6200000, ram: "8GB", storage: "512GB SSD", processor: "Intel Core i5-8365U", condition: "Lecet Pemakaian", status: "Available", description: "Laptop bisnis legendaris. Keyboard sangat nyaman, body kokoh standar militer. Minus lecet pemakaian di sudut. Mesin 100% normal.", images: [{ url: "/merk/lenovo/lenovo.png" }] },
      { id: 3, title: "Asus Vivobook 14", brand: "Asus", price: 5500000, ram: "8GB", storage: "512GB SSD", processor: "Intel Core i3-1115G4", condition: "Mulus 90%", status: "Available", description: "Laptop pelajar dan mahasiswa. Ringan, tipis, baterai awet, dan sudah SSD NVMe.", images: [{ url: "/merk/asus/asus2.png" }] },
      { id: 4, title: "HP Pavilion Gaming 15", brand: "HP", price: 8500000, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7-9750H", condition: "Normal", status: "Available", description: "Laptop gaming budget. Sudah upgrade RAM ke 16GB. Layar IPS jernih. Ada backlit keyboard.", images: [{ url: "/merk/hp/hp.png" }] },
    ];
    // @ts-ignore
    product = dummyProducts.find(p => p.id === parseInt(id));
  }

  if (!product) {
    notFound();
  }

  // Format WhatsApp message
  const waNumber = "62895626752967"; // Nomor WA Admin Baru
  const waMessage = encodeURIComponent(
    `Halo Admin Laptop Second Malang, saya tertarik dengan produk berikut:\n\n` +
    `*${product.title}*\n` +
    `Harga: Rp ${product.price.toLocaleString('id-ID')}\n` +
    `Merek: ${product.brand}\n` +
    `Prosesor: ${product.processor}\n` +
    `RAM: ${product.ram}\n` +
    `Storage: ${product.storage}\n` +
    `Kondisi: ${product.condition}\n\n` +
    `Apakah laptop ini masih tersedia? Saya ingin berkonsultasi lebih lanjut.`
  );
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

        <div className="flex flex-col gap-6 mt-1">
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
        </div>
      </div>
      
      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 w-full max-w-[600px] bg-white border-t border-slate-200 p-3 flex gap-3 z-50 rounded-t-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Link href={`/checkout/${product.id}`} className="btn btn-primary flex-1 text-center py-3.5 bg-[#2b2b2b] hover:bg-black text-white rounded-lg font-semibold">
          Beli Sekarang
        </Link>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn flex-1 text-center py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors">
          Konsultasi WA
        </a>
      </div>
      </div>
    </div>
  );
}
