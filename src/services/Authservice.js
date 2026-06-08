import api from "@/lib/api";

// ─── All auth-related API calls live here ─────────────────────────────────────

const authService = {

  // POST /auth/login
  login: async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data.token) {
      localStorage.setItem("auth_token", data.token);
    }
    return data; // { token, user }
  },

  // POST /auth/register
  register: async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    if (data.token) {
      localStorage.setItem("auth_token", data.token);
    }
    return data;
  },

  // POST /auth/logout
  logout: async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("auth_token");
  },

  // GET /auth/me
  getUser: async () => {
    const { data } = await api.get("/auth/me");
    return data; // { id, name, email, ... }
  },
};

export default authService;