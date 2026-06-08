import api from "@/lib/api";

const homeService = {
  getHomeData: async () => {
    const { data } = await api.get("/home");
    return data.data;
  },
};

export default homeService;