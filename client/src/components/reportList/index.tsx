import { FC, useEffect, useMemo, useState } from "react";
import { ListItem, List, Box } from "@mui/material";
import { IReport } from "../../models";
import { fakeData } from "./fakeData";
import { ReportDisplay } from "../reportDisplay";
import { style } from "./style";

export const ReportList: FC = () => {
  const [reportList, setReportList] = useState<IReport[]>();

  useEffect(() => {
    setReportList(fakeData);
  }, []);

  const reportDisplayListItems = useMemo(
    () =>
      reportList?.map((report) => (
        <ListItem key={report._id}>
          <ReportDisplay report={report} />
        </ListItem>
      )) ?? [],
    [reportList]
  );
  return (
    <Box>
      <List sx={style.listContainer}>{reportDisplayListItems}</List>
    </Box>
  );
};
