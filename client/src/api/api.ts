import axios from "axios";
import { IReport } from "../models";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: {
      'Access-Control-Allow-Credentials':true
    }
  });
  
export const api = {
    report: {
        getAll: async (): Promise<IReport[]> => (await axiosInstance.get('/reports/all')).data
    }
}