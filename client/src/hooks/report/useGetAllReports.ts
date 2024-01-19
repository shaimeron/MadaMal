import { api } from "../../api";
import { setReports } from "../../store/reports";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { IReport } from "../../models";

const refetchInterval = 3000;

export const useGetAllReports = async () => {
  const dispatch = useDispatch();
  const { data } = useQuery({
    queryKey: ["allReports"],
    queryFn: async () => await api.report.getAll(),

    refetchInterval: refetchInterval,
  });

  const dataForStore: IReport[] =
    data?.map((report) => ({
      ...report,
      creationDate: new Date(report.creationDate),
    })) ?? [];
  dispatch(setReports(dataForStore));
};
