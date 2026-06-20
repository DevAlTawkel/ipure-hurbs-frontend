import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCheckoutStore = create(
  persist(
    (set) => ({
      // ── Checkout Item (Buy Now) ──────────────────────────────────────────
      checkoutItem: null,
      setCheckoutItem: (item) => set({ checkoutItem: item }),
      clearCheckoutItem: () => set({ checkoutItem: null }),

      // ── Shipping Info ────────────────────────────────────────────────────
      shippingInfo: {
        country: "",
        firstName: "",
        lastName: "",
        contact: "",
        email: "",
        address1: "",
        address2: "",
        building: "",
        city: "",
        zip: "",
        defaultAddress: false,
        shippingMethod: "standard",
        promoCode: "",
      },

      setShippingInfo: (data) =>
        set((state) => ({
          shippingInfo: { ...state.shippingInfo, ...data },
        })),

      // ── Payment Info ─────────────────────────────────────────────────────
      paymentInfo: {
        nameOnCard: "",
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
        upiId: "",
        billingSameAsShipping: true,
      },

      setPaymentInfo: (data) =>
        set((state) => ({
          paymentInfo: { ...state.paymentInfo, ...data },
        })),

      clearPaymentInfo: () =>
        set({
          paymentInfo: {
            nameOnCard: "",
            cardNumber: "",
            expiryMonth: "",
            expiryYear: "",
            cvv: "",
            upiId: "",
            billingSameAsShipping: true,
          },
        }),
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        checkoutItem: state.checkoutItem,
        shippingInfo: state.shippingInfo,
        paymentInfo: state.paymentInfo,
      }),
    }
  )
);