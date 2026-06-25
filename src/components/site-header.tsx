import { HeaderNav, type NavCategory } from "@/components/header-nav";
import {
  getCategories,
  getProductsByCategory,
  getProductCount,
} from "@/data/catalog";

export function SiteHeader() {
  const nav: NavCategory[] = getCategories().map((c) => ({
    name: c.name,
    slug: c.slug,
    blurb: c.blurb,
    icon: c.icon,
    productCount: c.productCount,
    image: getProductsByCategory(c.slug)[0]?.image,
    subcategories: c.subcategories.slice(0, 6).map((sc) => ({
      name: sc.name,
      slug: sc.slug,
    })),
  }));

  return <HeaderNav nav={nav} totalProducts={getProductCount()} />;
}
