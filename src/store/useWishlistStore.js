import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      wishlistIds: [],

      toggleWishlist: (product) => {
        const isWishlisted = get().wishlistIds.includes(product.id);

        if (isWishlisted) {
          set((state) => ({
            wishlist:    state.wishlist.filter((p) => p.id !== product.id),
            wishlistIds: state.wishlistIds.filter((id) => id !== product.id),
          }));
          toast(`Item removed from wishlist`);
        } else {
          set((state) => ({
            wishlist:    [...state.wishlist, product],
            wishlistIds: [...state.wishlistIds, product.id],
          }));
          toast(`Item added to wishlist`);
        }
      },

      isWishlisted: (productId) => get().wishlistIds.includes(productId),

      removeFromWishlist: (productId) => {
        const item = get().wishlist.find((p) => p.id === productId);
        set((state) => ({
          wishlist:    state.wishlist.filter((p) => p.id !== productId),
          wishlistIds: state.wishlistIds.filter((id) => id !== productId),
        }));
        toast(`Item removed from wishlist`);
      },

      clearWishlist: () => set({ wishlist: [], wishlistIds: [] }),

      getWishlistCount: () => get().wishlistIds.length,
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({
        wishlist:    state.wishlist,
        wishlistIds: state.wishlistIds,
      }),
    }
  )
);