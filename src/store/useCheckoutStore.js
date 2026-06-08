// stores/useCheckoutStore.js

import { create } from "zustand";

export const useCheckoutStore = create((set) => ({
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
      shippingInfo: {
        ...state.shippingInfo,
        ...data,
      },
    })),
}));