"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function addProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const brand = formData.get("brand") as string;
  const price = parseInt(formData.get("price") as string);
  const ram = formData.get("ram") as string;
  const storage = formData.get("storage") as string;
  const processor = formData.get("processor") as string;
  const condition = formData.get("condition") as string;
  const description = formData.get("description") as string;
  
  // Handle multiple images
  const imageFiles = formData.getAll("images") as File[];
  const imageUrls: string[] = [];

  const uploadDir = join(process.cwd(), "public", "uploads");
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  for (const file of imageFiles) {
    if (file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create a unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
      const path = join(uploadDir, filename);
      
      await writeFile(path, buffer);
      imageUrls.push(`/uploads/${filename}`);
    }
  }

  await prisma.product.create({
    data: {
      title,
      brand,
      price,
      ram,
      storage,
      processor,
      condition,
      description,
      images: {
        create: imageUrls.map(url => ({ url }))
      }
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(id: number) {
  // Optionally, you can also delete the physical files here
  // by querying the product images first, but for simplicity we let them be or clean them up later.
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function toggleStatus(id: number, currentStatus: string) {
  const newStatus = currentStatus === 'Available' || currentStatus === 'Tersedia' ? 'Terjual' : 'Tersedia';
  await prisma.product.update({
    where: { id },
    data: { status: newStatus }
  });
  revalidatePath("/");
  revalidatePath("/admin");
}
