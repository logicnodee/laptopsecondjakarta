"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function updateOrderStatus(orderId: number, status: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
  revalidatePath("/admin/orders");
}

export async function deleteOrder(orderId: number) {
  await prisma.order.delete({
    where: { id: orderId }
  });
  revalidatePath("/admin/orders");
}
