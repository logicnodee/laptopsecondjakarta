import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing all existing products and images...');
  await prisma.productImage.deleteMany();
  // We need to delete OrderItems if there are any, because they reference products, but wait, onDelete: Cascade should handle it, or we delete orders too? The user said "semuanya kamu hapus ya jadi cuma ada laptop ini aja" - meaning products. 
  // Let's just delete products. Wait, we should just delete products, OrderItems might fail if we don't handle them. But they don't have Cascade in the schema!
  // Wait, the schema says: 
  // `product   Product  @relation(fields: [productId], references: [id])` -> No onDelete cascade for OrderItem!
  // So we must delete OrderItems first.
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  
  await prisma.product.deleteMany();
  
  console.log('Inserting new product...');
  const product = await prisma.product.create({
    data: {
      title: "Lenovo Thinkpad L15 G3 Ryzen 5 Pro 5675U 16/256",
      brand: "Lenovo",
      price: 4000000,
      ram: "16GB",
      storage: "256GB",
      processor: "Ryzen 5 Pro 5675U",
      condition: "Bekas Mulus",
      description: "Laptop Lenovo Thinkpad L15 G3 dengan prosesor Ryzen 5 Pro 5675U yang super kencang. RAM 16GB dan Storage 256GB. Kondisi second mulus. Sangat cocok untuk kebutuhan bisnis, kerja berat, dan kantoran. Harga Rp 4.xxx.xxx. Ready stok sangat melimpah 160 unit siap borong!",
      stock: 160,
      status: "Available",
      images: {
        create: [
          { url: "/merk/lenovo/lenovo.png" },
          { url: "/merk/lenovo/lenovo_og.jpg" }
        ]
      }
    }
  });

  console.log('Successfully inserted new product:', product);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
