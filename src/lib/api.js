import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://ipureherbs.org/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // browser sends Sanctum cookie automatically
});

// ─── CSRF token for Sanctum (required before login) ───────────────────────────
export const initCSRF = () =>
  axios.get(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:8000"}/sanctum/csrf-cookie`, {
    withCredentials: false,
  });

// ─── Response interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;