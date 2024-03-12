import { FC } from "react";
import { AddReport } from "../addReport";
import { ReportsList } from "@@/common/reports";
import { useAppSelector } from "@/hooks/store";
import { IReport } from "@/models";
import { selectAllReports } from "@/store/reports";

export const AllReporsPage: FC = () => {
  const allReports: IReport[] = useAppSelector(selectAllReports);

  return (
    <>
      <AddReport />
      <ReportsList reports={allReports} />
    </>
  );
};
