import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error(error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      try {
        localStorage.removeItem("token");
      } catch (error) {
        console.error(error);
      }

      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        const next = encodeURIComponent(
          window.location.pathname + window.location.search
        );

        window.location.href = `/login?next=${next}`;
      }
    }

    return Promise.reject(error);
  }
);

export default API;