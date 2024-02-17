import axios, { AxiosResponse } from "axios";
import {
  IReport,
  IReportDTO,
  IReportItem,
  IUpdateInReportDTO,
  UserDto,
  UserLoginDeatils,
  UserRegister,
} from "@/models";
import { CredentialResponse } from "@react-oauth/google";
import { ACCESSS_TOKEN, refreshAccessToken } from "@/utils/login";

export const REFETCH_INTERVAL = 3000;

export const serverURL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export interface ApiResponse<T = any> {
  status: number;
  data?: T;
  error?: string;
}

export interface LoginDecodedData {
  accessToken: string;
  refreshToken: string;
}

export const axiosInstance = axios.create({
  baseURL: serverURL,
  timeout: 15000,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESSS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        localStorage.setItem(ACCESSS_TOKEN, newAccessToken);

        // Update the authorization header and retry the original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error on refreshing token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// TODO - ADD HERE GOOGLE LOGIN

const apiUrls = {
  report: `/api/reports`,
  update: `/api/reports/update`,
  image: `/api/image`,
  auth: `/api/auth`,
  user: `/api/users`,
};

export const api = {
  report: {
    getAll: async (): Promise<IReport[]> =>
      (await axiosInstance.get(`${apiUrls.report}/all`)).data,
    getById: async (reportId: string): Promise<IReport> =>
      (await axiosInstance.get(`${apiUrls.report}/${reportId}`)).data,
    deleteReport: async (reportId: string): Promise<void> =>
      await axiosInstance.delete(`${apiUrls.report}/${reportId}`),
    addReport: async (reportDTO: IReportDTO): Promise<void> =>
      await axiosInstance.post(`${apiUrls.report}`, reportDTO),
    updateReport: async (reportDTO: IReportDTO): Promise<void> =>
      await axiosInstance.put(`${apiUrls.report}`, reportDTO),
    getUpdatesById: async (reportId: string): Promise<IReportItem[]> =>
      (await axiosInstance.get(`${apiUrls.update}/${reportId}`)).data,
    addUpdateToReport: async (updateDTO: IUpdateInReportDTO): Promise<void> =>
      await axiosInstance.post(`${apiUrls.update}`, updateDTO),
    changeUpdateInReport: async (
      updateDTO: IUpdateInReportDTO
    ): Promise<void> => await axiosInstance.put(`${apiUrls.update}`, updateDTO),
    deleteUpdateFromReport: async (
      reportId: string,
      updateId: string
    ): Promise<void> =>
      await axiosInstance.delete(`${apiUrls.update}/${reportId}/${updateId}`),
  },
  image: {
    uploadImage: async (image: FormData, imageName?: string): Promise<string> =>
      (
        await axiosInstance.post(
          `${apiUrls.image}/uploadImage/${imageName ?? ""}`,
          image
        )
      ).data,
  },
  auth: {
    register: async (
      data: UserRegister
    ): Promise<AxiosResponse<UserRegister>> =>
      await axiosInstance.post(`${apiUrls.auth}/register`, data),

    login: async (
      details: UserLoginDeatils
    ): Promise<AxiosResponse<LoginDecodedData>> =>
      await axiosInstance.post(`${apiUrls.auth}/login`, details),

    googleLogin: async (
      credentials: CredentialResponse
    ): Promise<AxiosResponse<LoginDecodedData>> =>
      await axiosInstance.post(`${apiUrls.auth}/google`, credentials),

    logout: async (): Promise<AxiosResponse<void>> =>
      await axiosInstance.get(`${apiUrls.auth}/logout`),

    refresh: async (): Promise<AxiosResponse<LoginDecodedData>> =>
      await axiosInstance.post(`${apiUrls.auth}/refresh`),
  },
  user: {
    getById: async (userId: string): Promise<UserDto> =>
      (await axiosInstance.get(`${apiUrls.user}/${userId}`)).data,

    update: async (
      details: Partial<UserDto | UserLoginDeatils>
    ): Promise<UserDto> =>
      (await axiosInstance.put(`${apiUrls.user}/update`, details)).data,
  },
};
