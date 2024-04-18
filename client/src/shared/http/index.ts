import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export const API_URL = "http://25.47.247.34:8081";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  
});

$api.interceptors.request.use((config) => {

  if (localStorage.getItem("AccessToken") !== null) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "AccessToken"
    )}`;
  }
  return config;
  
});

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 403 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post<AuthResponse>(
          `${API_URL}/auth/refresh`,
          { jwtRefreshToken: localStorage.getItem("refreshToken") },
          { withCredentials: true }
        );
        localStorage.setItem("AccessToken", response.data.jwtToken);
        return $api.request(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    } 
    return Promise.reject(error);
  }
);
export default $api;
