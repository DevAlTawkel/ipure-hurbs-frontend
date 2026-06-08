import api from "@/lib/api";

// ─── All product-related API calls live here ──────────────────────────────────
// When the API changes, only update this file — stores stay untouched.

const productService = {

  // GET /products?page=1
  getAll: async (params = {}) => {
    const { data } = await api.get("/products", { params });
    return data; // { data: [...], meta: {...}, links: {...} }
  },

  // GET /products/{slug}
  getBySlug: async (slug) => {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  },

  // GET /products?category=herbal-oils
  getByCategory: async (categorySlug, params = {}) => {
    const { data } = await api.get("/products", {
      params: { category: categorySlug, ...params },
    });
    return data;
  },

  // GET /products?is_featured=true
  getFeatured: async () => {
    const { data } = await api.get("/products", {
      params: { is_featured: true },
    });
    return data;
  },

  // GET /products?search=ashwagandha
  search: async (query) => {
    const { data } = await api.get("/products", {
      params: { search: query },
    });
    return data;
  },
};

export default productService;