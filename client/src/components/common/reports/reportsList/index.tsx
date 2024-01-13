import { FC, useMemo } from "react";
import { ListItem, List, Box } from "@mui/material";
import { IReport } from "../../../../models";
import { ReportDisplay } from "../reportDisplay";
import { style } from "./style";
import { useAppSelector } from "../../../../hooks/store";
import { selectUserId } from "../../../../store/user";

interface IReportsListProps {
  reports: IReport[];
}
export const ReportsList: FC<IReportsListProps> = ({ reports }) => {
  const userId: string = useAppSelector(selectUserId);

  const reportDisplayListItems = useMemo(
    () =>
      reports?.map((report) => (
        <ListItem key={report._id}>
          <ReportDisplay
            report={report}
            isEditable={report.ownerId === userId}
          />
        </ListItem>
      )) ?? [],
    [reports, userId]
  );
  return (
    <Box>
      <List sx={style.listContainer}>{reportDisplayListItems}</List>
    </Box>
  );
};
