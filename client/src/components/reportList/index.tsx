import { FC, useEffect, useMemo, useState } from "react";
import { ListItem, List, Box } from "@mui/material";
import { IReport } from "../../models";
import { fakeData } from "./fakeData";
import { ReportDisplay } from "../reportDisplay";
import { style } from "./style";
import { useAppSelector } from "../../hooks/store";
import { selectUserId } from "../../store/user";

export const ReportList: FC = () => {
  const [reportList, setReportList] = useState<IReport[]>();
  const userId: string = useAppSelector(selectUserId);

  useEffect(() => {
    setReportList(fakeData);
  }, []);

  const reportDisplayListItems = useMemo(
    () =>
      reportList?.map((report) => (
        <ListItem key={report._id}>
          <ReportDisplay
            report={report}
            isEditable={report.ownerId === userId}
          />
        </ListItem>
      )) ?? [],
    [reportList, userId]
  );
  return (
    <Box>
      <List sx={style.listContainer}>{reportDisplayListItems}</List>
    </Box>
  );
};
