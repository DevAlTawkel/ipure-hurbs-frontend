import api from "@/lib/api";

// ─── All cart-related API calls live here ─────────────────────────────────────

const cartService = {

  // GET /cart
  getCart: async () => {
    const { data } = await api.get("/cart");
    return data;
  },

  // POST /cart/sync  — send full cart state (debounced)
  sync: async (items) => {
    const { data } = await api.post("/cart/sync", {
      items: items.map((i) => ({
        product_id: i.id,
        quantity:   i.quantity,
      })),
    });
    return data;
  },

  // POST /cart/merge — merge guest cart on login
  merge: async (items) => {
    const { data } = await api.post("/cart/merge", {
      items: items.map((i) => ({
        product_id: i.id,
        quantity:   i.quantity,
      })),
    });
    return data;
  },

  // DELETE /cart  — clear cart on server
  clear: async () => {
    const { data } = await api.delete("/cart");
    return data;
  },
};

export default cartService;