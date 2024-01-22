import { LoginDecodedData, axiosInstance } from "../../api/api";
import { store } from "../../store";
import { logout, setUser } from "../../store/user";

export const MIN_PASSWORD_LENGTH = 3;
export const ACCSES_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const isValidEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return "";
  }
};

export const handleLoginHeaders = (data: LoginDecodedData) => {
  const { accessToken, refreshToken } = data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  // Add an interceptor to include the access token in the request headers
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add an interceptor to include the access token in the request headers
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const handleLogout = () => {
  localStorage.removeItem(ACCSES_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);

  store.dispatch(logout());
}