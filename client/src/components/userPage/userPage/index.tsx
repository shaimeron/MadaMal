import { FC } from "react";
import { ReportsList } from "../../common/reports";
import { useAppSelector } from "../../../hooks/store";
import { IReport } from "../../../models";
import { selectReportsofLoggedUser } from "../../../store/reports";

export const UserPage: FC = () => {
  const allReports: IReport[] = useAppSelector(selectReportsofLoggedUser);

  return <ReportsList reports={allReports} />;
};
