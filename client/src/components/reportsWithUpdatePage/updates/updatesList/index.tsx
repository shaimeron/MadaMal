import { FC, useCallback, useState } from "react";
import { List, ListItem } from "@mui/material";
import { useAppSelector } from "../../../../hooks/store";
import { IReportItem } from "../../../../models";
import { selectUserId } from "../../../../store/user";
import { style } from "./style";
import { UpdateDisplay } from "../updateDisplay";
import { AddUpdateToReport } from "../addUpdateToReport";
import { ChangeUpdateDisplay } from "../changeUpdateDisplay";

interface IUpdatesListProps {
  updates: IReportItem[];
  reportId: string;
}
export const UpdatesList: FC<IUpdatesListProps> = ({ updates, reportId }) => {
  const userId: string = useAppSelector(selectUserId);
  const [updateIdToChange, setUpdateIdToChange] = useState<string>();

  const openChangeUpdateDisplay = useCallback(
    (updateId: string): void => setUpdateIdToChange(updateId),
    []
  );
  const closeChangeUpdateDisplay = useCallback(
    (): void => setUpdateIdToChange(""),
    []
  );

  const updateDisplayListItems =
    updates?.map((update) => (
      <ListItem key={update._id}>
        {update._id === updateIdToChange ? (
          <ChangeUpdateDisplay
            updateId={update._id}
            updateData={update.data}
            reportId={reportId}
            closeUpdate={closeChangeUpdateDisplay}
          />
        ) : (
          <UpdateDisplay
            openUpdate={openChangeUpdateDisplay}
            update={update}
            isEditable={update.ownerId === userId}
            reportId={reportId}
          />
        )}
      </ListItem>
    )) ?? [];

  return (
    <>
      <AddUpdateToReport reportId={reportId} userId={userId} />
      <List sx={style.listContainer}>{updateDisplayListItems}</List>
    </>
  );
};
