import api from "@/lib/api";

const orderService = {
    calculatePrice: async (payload) => {
        const { data } = await api.post("/order/calculate", payload);
        return data;
    },

    placeOrder: async (payload) => {
        const { data } = await api.post("/order/buy-now", payload);
        return data;
    },
};

export default orderService;