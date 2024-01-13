import axios from "axios";
import { IReport, IReportDTO } from "../models";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
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
    }
}