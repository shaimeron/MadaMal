import axios, { AxiosResponse } from "axios";
import { ACCESSS_TOKEN, refreshAccessToken } from "../components/Login/utils";
import { IReport, IReportDTO, IUpdateInReportDTO, UserDto, UserLoginDeatils, UserRegister } from "../models";

// TODO - change to env
export const serverURL = "http://localhost:3000";

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
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        localStorage.setItem(ACCESSS_TOKEN, newAccessToken);

        // Update the authorization header and retry the original request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Error on refreshing token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export const api = {
  report: {
    getAll: async (): Promise<IReport[]> =>
      (await axiosInstance.get("/reports/all")).data,
    getById: async (reportId: string): Promise<IReport> =>
      (await axiosInstance.get(`/reports/${reportId}`)).data,
    deleteReport: async (reportId: string): Promise<void> =>
      await axiosInstance.delete(`/reports/${reportId}`),
    addReport: async (reportDTO: IReportDTO): Promise<void> =>
      await axiosInstance.post(`/reports`, reportDTO),
    updateReport: async (reportDTO: IReportDTO): Promise<void> =>
      await axiosInstance.put(`/reports`, reportDTO),
    addUpdateToReport: async (updateDTO: IUpdateInReportDTO): Promise<void> =>
      await axiosInstance.post(`/reports/update`, updateDTO),
    changeUpdateInReport: async (
      updateDTO: IUpdateInReportDTO
    ): Promise<void> => await axiosInstance.put(`/reports/update`, updateDTO),
    deleteUpdateFromReport: async (
      reportId: string,
      updateId: string
    ): Promise<void> =>
      await axiosInstance.delete(`/reports/update/${reportId}/${updateId}`),
  },
  image: {
    uploadImage: async (image: FormData, userId: string): Promise<string> =>
      await axiosInstance.post(`/image/uploadImage/${userId}`, image),
    getImage: async (userId: string): Promise<string> =>
      (await axiosInstance.get(`/image/getImage/${userId}`)).data,
  },
  auth: {
    register: async (data: UserRegister): Promise<AxiosResponse<UserRegister>> =>
      await axiosInstance.post(`auth/register`, data),
    login: async (details: UserLoginDeatils): Promise<AxiosResponse<LoginDecodedData>> =>
      await axiosInstance.post(`auth/login`, details),
    logout: async (): Promise<AxiosResponse<void>> =>
      await axiosInstance.post(`auth/logout`),
    refresh: async (): Promise<AxiosResponse<LoginDecodedData>> =>
      await axiosInstance.post(`auth/refresh`),
  },
  user: {
    getById: async (userId: string): Promise<UserDto> =>
      (await axiosInstance.get(`/users/${userId}`)).data,
  }
};
