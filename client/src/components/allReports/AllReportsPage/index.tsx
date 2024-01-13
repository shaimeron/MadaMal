import { FC } from "react";
import { AddReport } from "../addReport";
import { Container } from "@mui/material";
import { ReportsList } from "../../common/reports";
import { useAppSelector } from "../../../hooks/store";
import { IReport } from "../../../models";
import { selectAllReports } from "../../../store/reports";

export const AllReporsPage: FC = () => {
  const allReports: IReport[] = useAppSelector(selectAllReports);

  return (
    <Container maxWidth="sm">
      <AddReport />
      <ReportsList reports={allReports} />
    </Container>
  );
};
