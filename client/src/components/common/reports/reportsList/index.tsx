import {FC, useMemo} from "react";
import {Box, List, ListItem} from "@mui/material";
import {IReport} from "@/models";
import {ReportDisplay} from "../reportDisplay";
import {style} from "./style";

interface IReportsListProps {
  reports: IReport[];
}
export const ReportsList: FC<IReportsListProps> = ({ reports }) => {
  const reportDisplayListItems = useMemo(
    () =>
      reports?.map((report) => (
        <ListItem key={report._id}>
          <ReportDisplay report={report} />
        </ListItem>
      )) ?? [],
    [reports]
  );
  return (
    <Box>
      <List sx={style.listContainer}>{reportDisplayListItems}</List>
    </Box>
  );
};
