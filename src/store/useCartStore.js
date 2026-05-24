import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart:
        quantity <= 0
          ? state.cart.filter((i) => i.id !== productId)
          : state.cart.map((i) =>
              i.id === productId ? { ...i, quantity } : i
            ),
    })),

  clearCart: () => set({ cart: [] }),

  getCartTotal: () =>
    get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),

  getCartCount: () =>
    get().cart.reduce((sum, i) => sum + i.quantity, 0),
}));