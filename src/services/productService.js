import api from "@/lib/api";

// ─── All product-related API calls live here ──────────────────────────────────
// When the API changes, only update this file — stores stay untouched.

const productService = {

  getAll: async (params = {}) => {
    const { data } = await api.get("/products", { params });
    return data;
  },
  
  getBySlug: async (slug) => {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  },

  getByCategory: async (categorySlug, params = {}) => {
    const { data } = await api.get("/products", {
      params: { category: categorySlug, ...params },
    });
    return data;
  },

  getFeatured: async () => {
    const { data } = await api.get("/products", {
      params: { is_featured: true },
    });
    return data;
  },

  search: async (query) => {
    const { data } = await api.get("/products", {
      params: { search: query },
    });
    return data;
  },
};

export default productService;