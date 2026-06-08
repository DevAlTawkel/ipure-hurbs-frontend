import { create } from "zustand";
import homeService from "@/services/homeService";

// ─── Mapper: API product shape → component shape ──────────────────────────────
const mapProduct = (p) => ({
  id:            p.id,
  slug:          p.slug,
  name:          p.name,
  brand:         p.brand?.name ?? "",
  description:   p.short_description ?? p.description ?? "",
  price:         parseFloat(p.price),
  originalPrice: p.compare_price ? parseFloat(p.compare_price) : parseFloat(p.price),
  salePrice:     p.sale_price ? parseFloat(p.sale_price) : null,
  discount:      p.discount_percentage ?? 0,
  hasDiscount:   p.has_discount ?? false,
  rating:        p.rating ?? 0,
  reviewCount:   p.review_count ?? 0,
  salesCount:    p.sales_count ?? 0,
  image:         p.image_url ?? null,
  images:        p.images ?? [],
  inStock:       p.in_stock ?? false,
  stockStatus:   p.stock_status ?? "in_stock",
  category:      p.category?.name ?? "",
  categorySlug:  p.category?.slug ?? "",
  isFeatured:    p.is_featured ?? false,
  isTrending:    p.is_trending ?? false,
  tags:          p.tags ?? [],
  seo:           p.seo ?? {},
  badge: p.is_trending  ? "Best Seller"
       : p.has_discount ? `${p.discount_percentage}% off`
       : p.is_featured  ? "New"
       : null,
});

// ─── Mapper: API category shape → component shape ─────────────────────────────
const mapCategory = (c) => ({
  id:           c.id,
  name:         c.name,
  slug:         c.slug,
  description:  c.description ?? "",
  image:        c.image_url ?? null,
  sortOrder:    c.sort_order ?? 0,
  productCount: c.product_count ?? 0,
});

// ─── Store ────────────────────────────────────────────────────────────────────
export const useHomeStore = create((set) => ({
  categories:       [],
  featuredProducts: [],
  trendingProducts: [],
  newProducts:      [],
  isLoading:        false,
  error:            null,

  fetchHomeData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await homeService.getHomeData();
      set({
        categories:       (data.categories       ?? []).map(mapCategory),
        featuredProducts: (data.featured_products ?? []).map(mapProduct),
        trendingProducts: (data.trending_products ?? []).map(mapProduct),
        newProducts:      (data.new_products      ?? []).map(mapProduct),
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));