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

// ─── Dummy Data — fallback until API is stable ────────────────────────────────
// export const DUMMY_PRODUCTS = [
//   { id: 1, slug: "test-product-1", name: "Happy Knights Prash", brand: "Limited Time Deal", description: "Plant-based herbal formula for energy, and mens wellness.", price: 66.89, originalPrice: 89.99, discount: 25, rating: 4.7, reviewCount: 312, images: [{ id: 1, url: "/assets/products/product-01.png" }, { id: 2, url: "/assets/products/product-01_2.png" }], image: "/assets/products/product-01.png", badge: "25% off", category: "Best Seller", categorySlug: "best-seller", inStock: true },
//   { id: 2, slug: "test-product-2", name: "Happy Knights Prash", brand: "Limited Time Deal", description: "Plant-based herbal formula for energy, and mens wellness.", price: 66.89, originalPrice: 89.99, discount: 25, rating: 4.7, reviewCount: 289, images: [{ id: 1, url: "/assets/products/product-02.png" }], image: "/assets/products/product-02.png", badge: "Deal", category: "Deal", categorySlug: "deal", inStock: true },
//   { id: 3, slug: "test-product-3", name: "Happy Knights Prash", brand: "Limited Time Deal", description: "Plant-based herbal formula for energy, and mens wellness.", price: 66.89, originalPrice: 89.99, discount: 10, rating: 4.7, reviewCount: 198, images: [{ id: 1, url: "/assets/products/product-03.png" }], image: "/assets/products/product-03.png", badge: "10% off", category: "For you", categorySlug: "for-you", inStock: true },
//   { id: 4, slug: "test-product-4", name: "Happy Knights Prash", brand: "Limited Time Deal", description: "Plant-based herbal formula for energy, and mens wellness.", price: 66.89, originalPrice: 89.99, discount: 20, rating: 4.7, reviewCount: 445, images: [{ id: 1, url: "/assets/products/product-04.png" }], image: "/assets/products/product-04.png", badge: "Best Seller", category: "Best Seller", categorySlug: "best-seller", inStock: true },
//   { id: 5, slug: "test-product-5", name: "Happy Knights Prash", brand: "Limited Time Deal", description: "Plant-based herbal formula for energy, and mens wellness.", price: 66.89, originalPrice: 89.99, discount: 20, rating: 4.7, reviewCount: 156, images: [{ id: 1, url: "/assets/products/product-05.png" }], image: "/assets/products/product-05.png", badge: "20% off", category: "Essentials", categorySlug: "essentials", inStock: true },
//   { id: 6, slug: "test-product-6", name: "Happy Knights Prash", brand: "Limited Time Deal", description: "Plant-based herbal formula for energy, and mens wellness.", price: 66.89, originalPrice: 89.99, discount: 20, rating: 4.7, reviewCount: 223, images: [{ id: 1, url: "/assets/products/product-06.png" }], image: "/assets/products/product-06.png", badge: "20% off", category: "Deal", categorySlug: "deal", inStock: true },
//   { id: 7, slug: "test-product-7", name: "Happy Knights Prash", brand: "Limited Time Deal", description: "Plant-based herbal formula for energy, and mens wellness.", price: 46.89, originalPrice: 89.99, discount: 20, rating: 4.7, reviewCount: 367, images: [{ id: 1, url: "/assets/products/product-07.png" }], image: "/assets/products/product-07.png", badge: "20% off", category: "For you", categorySlug: "for-you", inStock: true },
//   { id: 8, slug: "test-product-8", name: "Happy Knights Prash", brand: "Limited Time Deal", description: "Plant-based herbal formula for energy, and mens wellness.", price: 56.89, originalPrice: 89.99, discount: 20, rating: 4.7, reviewCount: 512, images: [{ id: 1, url: "/assets/products/product-08.png" }], image: "/assets/products/product-08.png", badge: "20% off", category: "Best Seller", categorySlug: "best-seller", inStock: true },
//   { id: 9, slug: "test-product-9", name: "Happy Knights Prash", brand: "Limited Time Deal", description: "Plant-based herbal formula for energy, and mens wellness.", price: 56.89, originalPrice: 89.99, discount: 20, rating: 4.7, reviewCount: 512, images: [{ id: 1, url: "/assets/products/product-16.png" }], image: "/assets/products/product-16.png", badge: "20% off", category: "Best Seller", categorySlug: "best-seller", inStock: true },
// ];

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