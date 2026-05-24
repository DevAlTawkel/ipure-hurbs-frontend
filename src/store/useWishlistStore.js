import { create } from "zustand";

export const useWishlistStore = create((set, get) => ({
  wishlist: [],

  toggleWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    })),

  isWishlisted: (productId) => get().wishlist.includes(productId),

  clearWishlist: () => set({ wishlist: [] }),
}));