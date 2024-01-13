import { useEffect } from "react"
import { api } from "../../api"
import { setReports } from "../../store/reports"
import { useDispatch } from "react-redux"
import { useQuery } from "@tanstack/react-query";

const refetchInterval = 3000;
 
export const useGetAllReports = async () => {
    const dispatch = useDispatch();
    const {data } = useQuery({
        queryKey: ['allReports'],
        queryFn: async () => {
          const data  = await api.report.getAll()
          return data.map(report => ({...report, creationDate: new Date(report.creationDate)}))
        },
        refetchInterval: refetchInterval,
      })

      dispatch(setReports(data ?? []))

}