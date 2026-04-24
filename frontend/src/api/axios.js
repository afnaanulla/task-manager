import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let interceptorsAdded = false;

const addInterceptors = () => {
  if (interceptorsAdded) return;
  interceptorsAdded = true;

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const isAuthRoute = error.config?.url?.includes('/authenticate');
      if (error.response?.status === 401 && !isAuthRoute) {
        // Session expired on a protected page — clear token and force re-login
        localStorage.removeItem("token");
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );
};

addInterceptors();

export default api;