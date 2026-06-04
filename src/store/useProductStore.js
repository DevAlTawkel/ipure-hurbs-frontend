import { create } from "zustand";
import api from "@/lib/api";

// ─── Map API response shape → component shape ─────────────────────────────────
const mapProduct = (p) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  brand: p.brand?.name ?? "",
  description: p.short_description ?? p.description ?? "",
  price: parseFloat(p.price),
  originalPrice: p.compare_price ? parseFloat(p.compare_price) : parseFloat(p.price),
  discount: p.discount_percentage ?? 0,
  hasDiscount: p.has_discount ?? false,
  rating: p.rating ?? 0,
  reviewCount: p.review_count ?? 0,
  image: p.image_url ?? null,
  inStock: p.in_stock ?? false,
  category: p.category?.name ?? "",
  isFeatured: p.is_featured ?? false,
  isTrending: p.is_trending ?? false,
  // Derive badge from API flags
  badge: p.is_trending
    ? "Best Seller"
    : p.has_discount
      ? "Deal"
      : p.is_featured
        ? "New"
        : null,
});

// ─── Dummy Data — remove once API is stable ───────────────────────────────────
export const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Happy Knights Prash",
    slug: 'test-product-1',
    brand: "Limited Time Deal",
    description: "Plant-based herbal formula for energy, and mens wellness.",
    price: 66.89,
    originalPrice: 89.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 312,
    images: [
      {
        "id": 1,
        "url": "/assets/products/product-01.png"
      },
      {
        "id": 2,
        "url": "/assets/products/product-01_2.png"
      },
      {
        "id": 3,
        "url": "/assets/products/product-01.png"
      },
      {
        "id": 4,
        "url": "/assets/products/product-01_2.png"
      },
    ],
    badge: "25% off",
    category: "Best Seller",
    inStock: true,
  },
  {
    id: 2,
    name: "Happy Knights Prash",
    slug: 'test-product-2',
    brand: "Limited Time Deal",
    description: "Plant-based herbal formula for energy, and mens wellness.",
    price: 66.89,
    originalPrice: 89.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 289,
    images: [
      {
        "id": 1,
        "url": "/assets/products/product-02.png"
      },
      {
        "id": 2,
        "url": "/assets/products/product-02.png"
      },
      {
        "id": 3,
        "url": "/assets/products/product-02.png"
      },
    ],
    badge: "Deal",
    category: "Deal",
    inStock: true,
  },
  {
    id: 3,
    name: "Happy Knights Prash",
    slug: 'test-product-3',
    brand: "Limited Time Deal",
    description: "Plant-based herbal formula for energy, and mens wellness.",
    price: 66.89,
    originalPrice: 89.99,
    discount: 10,
    rating: 4.7,
    reviewCount: 198,
    images: [
      {
        "id": 1,
        "url": "/assets/products/product-03.png"
      },
      {
        "id": 2,
        "url": "/assets/products/product-03.png"
      },
      {
        "id": 3,
        "url": "/assets/products/product-03.png"
      },
    ],
    badge: "10% off",
    category: "For you",
    inStock: true,
  },
  {
    id: 4,
    name: "Happy Knights Prash",
    slug: 'test-product-4',
    brand: "Limited Time Deal",
    description: "Plant-based herbal formula for energy, and mens wellness.",
    price: 66.89,
    originalPrice: 89.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 445,
    images: [
      {
        "id": 1,
        "url": "/assets/products/product-04.png"
      },
      {
        "id": 2,
        "url": "/assets/products/product-04.png"
      },
      {
        "id": 3,
        "url": "/assets/products/product-04.png"
      },
    ],
    badge: "Best Seller",
    category: "Best Seller",
    inStock: true,
  },
  {
    id: 5,
    name: "Happy Knights Prash",
    slug: 'test-product-5',
    brand: "Limited Time Deal",
    description: "Plant-based herbal formula for energy, and mens wellness.",
    price: 66.89,
    originalPrice: 89.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 156,
    images: [
      {
        "id": 1,
        "url": "/assets/products/product-05.png"
      },
      {
        "id": 2,
        "url": "/assets/products/product-05.png"
      },
      {
        "id": 3,
        "url": "/assets/products/product-05.png"
      },
    ],
    badge: "20% off",
    category: "Essentials",
    inStock: true,
  },
  {
    id: 6,
    name: "Happy Knights Prash",
    slug: 'test-product-6',
    brand: "Limited Time Deal",
    description: "Plant-based herbal formula for energy, and mens wellness.",
    price: 66.89,
    originalPrice: 89.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 223,
    images: [
      {
        "id": 1,
        "url": "/assets/products/product-06.png"
      },
      {
        "id": 2,
        "url": "/assets/products/product-06.png"
      },
      {
        "id": 3,
        "url": "/assets/products/product-06.png"
      },
    ],
    badge: "20% off",
    category: "Deal",
    inStock: true,
  },
  {
    id: 7,
    name: "Happy Knights Prash",
    slug: 'test-product-7',
    brand: "Limited Time Deal",
    description: "Plant-based herbal formula for energy, and mens wellness.",
    price: 46.89,
    originalPrice: 89.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 367,
    images: [
      {
        "id": 1,
        "url": "/assets/products/product-07.png"
      },
      {
        "id": 2,
        "url": "/assets/products/product-07.png"
      },
      {
        "id": 3,
        "url": "/assets/products/product-07.png"
      },
    ],
    badge: "20% off",
    category: "For you",
    inStock: true,
  },
  {
    id: 8,
    name: "Happy Knights Prash",
    slug: 'test-product-8',
    brand: "Limited Time Deal",
    description: "Plant-based herbal formula for energy, and mens wellness.",
    price: 56.89,
    originalPrice: 89.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 512,
    images: [
      {
        "id": 1,
        "url": "/assets/products/product-08.png"
      },
      {
        "id": 2,
        "url": "/assets/products/product-08.png"
      },
      {
        "id": 3,
        "url": "/assets/products/product-08.png"
      },
    ],
    badge: "20% off",
    category: "Best Seller",
    inStock: true,
  },
];

// ─── Store ────────────────────────────────────────────────────────────────────
export const useProductStore = create((set, get) => ({
  products: DUMMY_PRODUCTS,
  activeTab: "For you",
  sortBy: "default",
  isLoading: false,
  error: null,

  // ─── Pagination ────────────────────────────────────────────────────────────
  currentPage: 1,
  lastPage: 1,
  total: 0,
  perPage: 20,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setPage: (page) => {
    set({ currentPage: page });
    get().fetchProducts(page);
  },

  // ─── Fetch — swap the dummy block with the real block below ───────────────
  fetchProducts: async (page = 1) => {
    set({ isLoading: true, error: null });

    // ── DUMMY (remove this block when API is ready) ──────────────────────
    await new Promise((r) => setTimeout(r, 600));
    set({ products: DUMMY_PRODUCTS, isLoading: false });
    // ── END DUMMY ────────────────────────────────────────────────────────

    // ── REAL API (uncomment when backend is ready) ───────────────────────
    // try {
    //   const { data } = await api.get("/products", { params: { page } });
    //   set({
    //     products:    data.data.map(mapProduct),
    //     currentPage: data.meta.current_page,
    //     lastPage:    data.meta.last_page,
    //     total:       data.meta.total,
    //     perPage:     data.meta.per_page,
    //     isLoading:   false,
    //   });
    // } catch (err) {
    //   set({ error: err.message, isLoading: false });
    // }
    // ── END REAL API ─────────────────────────────────────────────────────
  },

  // ─── Derived selectors ────────────────────────────────────────────────────
  getFilteredProducts: () => {
    const { products, activeTab, sortBy } = get();

    let filtered =
      activeTab === "For you"
        ? products
        : products.filter((p) => p.category === activeTab);

    const sorted = [...filtered];
    if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);

    return sorted;
  },
}));