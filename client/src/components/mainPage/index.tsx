import { FC } from "react";
import { AddReport } from "../addReport";
import { Box } from "@mui/material";
import { style } from "./style";
import { ReportList } from "../reportList";

export const MainPage: FC = () => {
  return (
    <Box sx={style.boxContainer}>
      <AddReport />
      <ReportList />
    </Box>
  );
};
