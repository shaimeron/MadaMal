import { FC, useMemo } from "react";
import { List } from "@mui/material";
import { useAppSelector } from "../../../hooks/store";
import { IReportItem } from "../../../models";
import { selectUserId } from "../../../store/user";
import { style } from "./style";
import { UpdateDisplay } from "../updateDisplay";

interface IUpdatesListProps {
  updates: IReportItem[];
  reportId: string;
}
export const UpdatesList: FC<IUpdatesListProps> = ({ updates, reportId }) => {
  const userId: string = useAppSelector(selectUserId);

  const updateDisplayListItems = useMemo(
    () =>
      updates?.map((update) => (
        <UpdateDisplay
          update={update}
          isEditable={update.ownerId === userId}
          reportId={reportId}
        />
      )) ?? [],
    [reportId, updates, userId]
  );
  return <List sx={style.listContainer}>{updateDisplayListItems}</List>;
};
