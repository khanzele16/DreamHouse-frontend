import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const config = axios.create({
  baseURL: "https://api.dreamhouse05.com/api/",
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Interceptor для добавления токена к запросам
config.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor для обработки 401 ошибок и обновления токена
config.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Если токен уже обновляется, добавляем запрос в очередь
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return config(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        // Нет refresh токена, перенаправляем на логин
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        isRefreshing = false;
        processQueue(error, null);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // Обновляем токен
        const response = await axios.post(
          "https://api.dreamhouse05.com/api/token/refresh/",
          { refresh: refreshToken }
        );

        const { access } = response.data;

        if (access) {
          localStorage.setItem("access_token", access);
          config.defaults.headers.common["Authorization"] = `Bearer ${access}`;
          originalRequest.headers.Authorization = `Bearer ${access}`;
          processQueue(null, access);
          isRefreshing = false;
          return config(originalRequest);
        }
      } catch (refreshError) {
        // Ошибка при обновлении токена, очищаем данные и перенаправляем на логин
        processQueue(refreshError as AxiosError, null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        isRefreshing = false;
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default config;