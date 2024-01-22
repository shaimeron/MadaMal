import axios, { AxiosResponse } from "axios";
import { IReport, IReportDTO, IUpdateInReportDTO, UserDto, UserLoginDeatils, UserRegister } from "../models";
import { ACCSES_TOKEN } from "../components/Login/utils";

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
    const accessToken = localStorage.getItem(ACCSES_TOKEN);

    console.log('now is access is ', accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log('ohh nooo', accessToken);
    }
    return config;
  },
  (error) => {
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
    deleteUpdateFromReport: async (
      reportId: string,
      updateId: string
    ): Promise<void> =>
      await axiosInstance.delete(`/reports/update/${reportId}/${updateId}`),
  },
  image: {
    uploadImage: async (image: FormData): Promise<string> =>
      await axiosInstance.post("/image/uploadImage", image),
    getImage: async (filename: string): Promise<string> =>
      (await axiosInstance.get(`/image/getImage/${filename}`)).data,
  },
  auth: {
    register: async (data: UserRegister): Promise<AxiosResponse<UserRegister>> =>
      await axiosInstance.post(`auth/register`, data),
    login: async (details: UserLoginDeatils): Promise<AxiosResponse<LoginDecodedData>> =>
      await axiosInstance.post(`auth/login`, details),
    logout: async (): Promise<AxiosResponse<void>> =>
      await axiosInstance.post(`auth/logout`),
  },
  user: {
    getById: async (userId: string): Promise<UserDto> =>
      (await axiosInstance.get(`/users/${userId}`)).data,
  }
};
