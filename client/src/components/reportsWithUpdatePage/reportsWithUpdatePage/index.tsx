import { FC } from "react";
import { useParams } from "react-router-dom";
import { IReport } from "@/models";
import { selectReportById } from "@/store/reports";
import { useAppSelector } from "@/hooks/store";
import { ReportDisplay } from "@@/common/reports";
import { UpdatesList } from "../updates";

export const ReportsWithUpdatePage: FC = () => {
  const { reportId } = useParams();
  const selectedReport: IReport | undefined = useAppSelector(
    selectReportById(reportId ?? "")
  );

  return !selectedReport ? (
    <></>
  ) : (
    <>
      <ReportDisplay report={selectedReport} isWithUpdateDisplayClick={false} />
      <UpdatesList reportId={selectedReport._id} />
    </>
  );
};
