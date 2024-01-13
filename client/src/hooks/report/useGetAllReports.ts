import { useEffect } from "react"
import { api } from "../../api"
import { setReports } from "../../store/reports"
import { useDispatch } from "react-redux"

export const useGetAllReports = async () => {
    const dispatch = useDispatch()
    useEffect(() => { 
        const fetchFunc = async () => {
            const data  = await api.report.getAll()
        dispatch(setReports(data.map(report => ({...report, creationDate: new Date(report.creationDate)}))))
        }
        fetchFunc()
    },[dispatch])
}