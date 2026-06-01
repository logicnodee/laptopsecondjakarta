"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function submitCheckout(formData: FormData) {
  const cartItemsJson = formData.get("cartItems") as string;
  const whatsappNumber = formData.get("whatsappNumber") as string;
  const address = formData.get("address") as string;
  const deliveryMethod = formData.get("deliveryMethod") as string;
  const paymentProof = formData.get("paymentProof") as File;

  if (!cartItemsJson) {
    throw new Error("Keranjang kosong!");
  }

  const items = JSON.parse(cartItemsJson) as { id: number; quantity: number }[];
  if (items.length === 0) {
    throw new Error("Keranjang kosong!");
  }

  let paymentProofUrl = "";

  if (paymentProof && paymentProof.size > 0) {
    const uploadDir = join(process.cwd(), "public", "uploads", "payments");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const bytes = await paymentProof.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${paymentProof.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const path = join(uploadDir, filename);
    
    await writeFile(path, buffer);
    paymentProofUrl = `/uploads/payments/${filename}`;
  } else {
    throw new Error("Bukti pembayaran harus diunggah.");
  }

  // Use a transaction to ensure all stock checks and updates happen safely
  await prisma.$transaction(async (tx) => {
    // 1. Check stock and get prices
    const orderItemsData = [];
    for (const item of items) {
      const product = await tx.product.findUnique({ where: { id: item.id } });
      if (!product) {
        throw new Error(`Produk dengan ID ${item.id} tidak ditemukan.`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Stok tidak mencukupi untuk ${product.title}. Tersisa: ${product.stock}`);
      }
      
      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // 2. Create the order with items
    await tx.order.create({
      data: {
        whatsappNumber,
        address,
        deliveryMethod,
        paymentProofUrl,
        items: {
          create: orderItemsData,
        },
      },
    });

    // 3. Decrement stock
    for (const item of orderItemsData) {
      const updatedProduct = await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
        },
      });

      // 4. Update status if stock reaches 0
      if (updatedProduct.stock <= 0) {
        await tx.product.update({
          where: { id: item.productId },
          data: { status: "Terjual", stock: 0 },
        });
      }
    }
  });

  redirect(`/checkout/success`);
}
