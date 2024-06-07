import AxiosBaseUrl from "./axios-base-url";
import { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

AxiosBaseUrl.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
AxiosBaseUrl.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.data.code === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      return AxiosBaseUrl(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default AxiosBaseUrl;
