import { FC } from "react";
import { AddReport } from "../addReport";
import { Container } from "@mui/material";
import { ReportList } from "../reportList";

export const MainPage: FC = () => {
  return (
    <Container maxWidth="sm">
      <AddReport />
      <ReportList />
    </Container>
  );
};
