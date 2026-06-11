import { create } from "zustand";
import productService from "@/services/productService";

// ─── Map API response shape → component shape ─────────────────────────────────
const mapProduct = (p) => ({
  id: p.id,
  slug: p.slug,
  sku: p.sku ?? "N/A",
  name: p.name,
  brand: p.brand?.name ?? "",
  description: p.short_description ?? "",
  overview: p.description ?? "",
  price: parseFloat(p.price),
  originalPrice: p.compare_price ? parseFloat(p.compare_price) : parseFloat(p.price),
  discount: p.discount_percentage ?? 0,
  hasDiscount: p.has_discount ?? false,
  rating: p.rating ?? 0,
  reviewCount: p.review_count ?? 0,
  images: p.images ?? [],
  image: p.image_url ?? p.images?.[0]?.url ?? null,
  inStock: p.in_stock ?? false,
  category: p.category?.name ?? "",
  categorySlug: p.category?.slug ?? "",
  isFeatured: p.is_featured ?? false,
  isTrending: p.is_trending ?? false,
  tags: p.tags ?? [],
  badge: p.is_trending ? "Best Seller"
    : p.has_discount ? `${p.discount_percentage}% off`
      : p.is_featured ? "New"
        : null,
  size: p.variants,
  additionalInfo: p.additional_info ?? null,
  currency_symbol: p.currency_symbol ?? "",
});


// ─── Store ────────────────────────────────────────────────────────────────────
export const useProductStore = create((set, get) => ({
  products: [],
  activeTab: "For you",
  sortBy: "default",
  isLoading: false,
  error: null,
  currentPage: 1,
  lastPage: 1,
  total: 0,
  perPage: 20,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setPage: (page) => { set({ currentPage: page }); get().fetchProducts(page); },

  fetchProducts: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productService.getAll({ page });
      set({
        products: response.data.map(mapProduct),
        currentPage: response.meta.current_page,
        lastPage: response.meta.last_page,
        total: response.meta.total,
        perPage: response.meta.per_page,
        isLoading: false,
      });
    } catch (err) {
      set({ products: DUMMY_PRODUCTS, error: err.message, isLoading: false });
    }
  },

  fetchBySlug: async (slug) => {
    try {
      const response = await productService.getBySlug(slug);
      return mapProduct(response.data);
    } catch (err) {
      set({ error: err.message });
      return null;
    }
  },


  getFilteredProducts: () => {
    const { products, activeTab, sortBy } = get();

    let filtered = activeTab === "For you"
      ? products
      : products.filter((p) =>
        p.category?.toLowerCase() === activeTab.toLowerCase() ||
        p.categorySlug?.toLowerCase() === activeTab.toLowerCase()
      );

    const sorted = [...filtered];
    if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  },
}));