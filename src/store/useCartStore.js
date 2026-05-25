import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
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
        });
        toast(`Item added to cart`);
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set((state) => ({
            cart: state.cart.filter((i) => i.id !== productId),
          }));
          toast(`Item removed from cart`);
        } else {
          set((state) => ({
            cart: state.cart.map((i) =>
              i.id === productId ? { ...i, quantity } : i
            ),
          }));
        }
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== productId),
        }));
        toast(`Item removed from cart`);
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () =>
        get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getCartCount: () =>
        get().cart.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);