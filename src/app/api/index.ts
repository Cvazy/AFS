import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${process.env.REACT_APP_TOKEN}`;
  return config;
});

export const setAuthHeader = (token: string) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("authToken", token);
};

export const clearAuthHeader = () => {
  delete apiClient.defaults.headers.common["Authorization"];
  localStorage.removeItem("authToken");
};
