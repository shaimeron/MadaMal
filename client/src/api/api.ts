import axios from "axios";
import { IReport, IReportDTO } from "../models";

export const serverURL = 'http://localhost:3000';

const axiosInstance = axios.create({
    baseURL: serverURL,
    timeout: 1000,
    headers: {
      'Access-Control-Allow-Credentials':true
    }
  });
  
export const api = {
    report: {
        getAll: async (): Promise<IReport[]> => (await axiosInstance.get('/reports/all')).data,
        getById: async (reportId: string): Promise<IReport> => (await axiosInstance.get(`/reports/${reportId}`)).data,
        deleteReport: async (reportId: string): Promise<void> => (await axiosInstance.delete(`/reports/${reportId}`)),
        addReport: async (reportDTO: IReportDTO): Promise<void> => (await axiosInstance.post(`/reports`, reportDTO)),
        updateReport: async (reportDTO: IReportDTO): Promise<void> => (await axiosInstance.put(`/reports`, reportDTO))
    },
    image: {
        uploadImage: async (image: FormData): Promise<string> => (await axiosInstance.post('/image/uploadImage', image)),
        getImage: async (filename: string): Promise<string> => (await axiosInstance.get(`/image/getImage/${filename}`)).data
    }
}