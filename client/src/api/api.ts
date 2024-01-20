import axios, { AxiosResponse, HttpStatusCode } from "axios";
import { IReport, IReportDTO, IUpdateInReportDTO, UserLoginDeatils, UserRegister } from "../models";

export const serverURL = "http://localhost:3000";

export interface ApiResponse<T = any> {
  status: number;
  data?: T;
  error?: string;
}

const axiosInstance = axios.create({
  baseURL: serverURL,
  timeout: 1000,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
});

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
    login: async (details: UserLoginDeatils): Promise<AxiosResponse<UserLoginDeatils>> =>
    await axiosInstance.post(`auth/login`, details),
  }
};
