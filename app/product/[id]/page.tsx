import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import ProductGallery from "@/components/ProductGallery";
import ProductActionBar from "@/components/ProductActionBar";

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
      { id: 1, title: "Asus ROG Zephyrus G14", brand: "Asus", price: 14500000, stock: 1, ram: "16GB", storage: "1TB SSD", processor: "Ryzen 9 5900HS", condition: "Mulus 95%", status: "Available", description: "Laptop gaming super tipis dan kencang. Baterai awet untuk ukuran laptop gaming. Kelengkapan fullset original. Cocok untuk gaming berat dan rendering.", images: [{ url: "/merk/asus/asus.png" }, { url: "/merk/asus/asus2.png" }] },
      { id: 2, title: "Lenovo ThinkPad T490", brand: "Lenovo", price: 6200000, stock: 1, ram: "8GB", storage: "512GB SSD", processor: "Intel Core i5-8365U", condition: "Lecet Pemakaian", status: "Available", description: "Laptop bisnis legendaris. Keyboard sangat nyaman, body kokoh standar militer. Minus lecet pemakaian di sudut. Mesin 100% normal.", images: [{ url: "/merk/lenovo/lenovo.png" }] },
      { id: 3, title: "Asus Vivobook 14", brand: "Asus", price: 5500000, stock: 1, ram: "8GB", storage: "512GB SSD", processor: "Intel Core i3-1115G4", condition: "Mulus 90%", status: "Available", description: "Laptop pelajar dan mahasiswa. Ringan, tipis, baterai awet, dan sudah SSD NVMe.", images: [{ url: "/merk/asus/asus2.png" }] },
      { id: 4, title: "HP Pavilion Gaming 15", brand: "HP", price: 8500000, stock: 1, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7-9750H", condition: "Normal", status: "Available", description: "Laptop gaming budget. Sudah upgrade RAM ke 16GB. Layar IPS jernih. Ada backlit keyboard.", images: [{ url: "/merk/hp/hp.png" }] },
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
      
      <div className="flex flex-col flex-grow pb-36">
        <div className="container mx-auto px-4 lg:px-8 pt-4 pb-2">
          <nav className="py-1">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium text-xs">
              &larr; Kembali ke Katalog
            </Link>
          </nav>
        </div>

        <div className="w-full">
          {/* Product Image Gallery Edge-to-Edge */}
          <ProductGallery images={product.images || []} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 mt-6">
          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-medium border border-slate-200 bg-white px-3 py-1 rounded">
                {product.brand}
              </span>
              <span className="text-xs font-medium border border-slate-200 bg-white px-3 py-1 rounded">
                {product.condition}
              </span>
              {product.stock === 0 ? (
                <span className="text-xs font-medium bg-red-100 text-red-700 px-3 py-1 rounded">
                  Habis Terjual
                </span>
              ) : product.stock === 1 ? (
                <span className="text-xs font-medium bg-orange-100 text-orange-700 px-3 py-1 rounded">
                  Stok Terakhir
                </span>
              ) : (
                <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded">
                  Sisa Stok: {product.stock}
                </span>
              )}
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
      </div>
      
      <ProductActionBar product={product} waLink={waLink} />
    </div>
  );
}
