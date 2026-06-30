import type { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/data/catalog";
import { site } from "@/lib/site";

/**
 * Regenerate the sitemap on the same ISR cadence as product pages so a
 * supplier scrape that lands between deploys eventually surfaces the new
 * SKUs to search engines instead of waiting for the next code push.
 */
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/shipping`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/quote`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sell`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = [];
  for (const c of getCategories()) {
    categoryRoutes.push({
      url: `${base}/category/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const sc of c.subcategories) {
      categoryRoutes.push({
        url: `${base}/category/${c.slug}/${sc.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
    url: `${base}/product/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
