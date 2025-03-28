import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Har bir so‘rovdan oldin tokenni avtomatik qo‘shish
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
