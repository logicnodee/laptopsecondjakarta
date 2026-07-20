import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma'; // Assuming prisma is available for dynamic routes

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://laptopsecondjakarta.vercel.app';
  
  // Static routes
  const staticRoutes = [
    '',
    '/products',
    '/info',
    '/cart',
    '/checkout',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch dynamic products if prisma is available
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await prisma.product.findMany({
      select: { id: true, updatedAt: true },
      where: { status: "Available" },
    });

    dynamicRoutes = products.map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: product.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
    // If prisma query fails, just return static routes
  }

  return [...staticRoutes, ...dynamicRoutes];
}
