"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function submitCheckout(formData: FormData) {
  const productId = parseInt(formData.get("productId") as string);
  const whatsappNumber = formData.get("whatsappNumber") as string;
  const address = formData.get("address") as string;
  const deliveryMethod = formData.get("deliveryMethod") as string;
  const paymentProof = formData.get("paymentProof") as File;

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

  await prisma.order.create({
    data: {
      productId,
      whatsappNumber,
      address,
      deliveryMethod,
      paymentProofUrl,
    },
  });

  redirect(`/checkout/success`);
}
