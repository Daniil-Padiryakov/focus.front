import axios, { type AxiosRequestConfig } from "axios";

export const API_URL = "http://localhost:5500/api";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    accept: "application/json",
  },
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // @ts-ignore
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default instance;
