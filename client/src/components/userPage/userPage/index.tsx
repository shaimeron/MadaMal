import { FC } from "react";
import { Container } from "@mui/material";
import { ReportsList } from "../../common/reports";
import { useAppSelector } from "../../../hooks/store";
import { IReport } from "../../../models";
import { selectReportsofLoggedUser } from "../../../store/reports";

export const UserPage: FC = () => {
  const allReports: IReport[] = useAppSelector(selectReportsofLoggedUser);

  return (
    <Container maxWidth="sm">
      <ReportsList reports={allReports} />
    </Container>
  );
};
