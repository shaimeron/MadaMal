import { FC, useCallback, useMemo } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Delete, ModeEditOutline } from "@mui/icons-material";
import { IReportItem } from "../../../../models";
import swal from "sweetalert";
import { api } from "../../../../api";
import { style } from "./style";

interface IUpdateDisplayProps {
  reportId: string;
  update: IReportItem;
  openUpdate: (updateId: string) => void;
  isEditable?: boolean;
}

export const UpdateDisplay: FC<IUpdateDisplayProps> = ({
  reportId,
  update,
  openUpdate,
  isEditable = false,
}) => {
  const handleDelete = useCallback(async () => {
    const isDelete = await swal({
      title: "האם אתה בטוח שברצונך למחוק עדכון זה",
      text: "ברגע שהעדכון יימחק אין דרך לשחזר אותו",
      icon: "warning",
      buttons: ["בטל", "מחק"],
      dangerMode: true,
    });

    if (isDelete) await api.report.deleteUpdateFromReport(reportId, update._id);
  }, [reportId, update._id]);

  const handleUpdateClick = useCallback(async () => {
    openUpdate(update._id);
  }, [openUpdate, update._id]);

  const listItemButtons: JSX.Element = useMemo(
    () =>
      isEditable ? (
        <ListItemIcon>
          <Delete onClick={handleDelete} sx={style.cardButton} />
          <ModeEditOutline onClick={handleUpdateClick} sx={style.cardButton} />
        </ListItemIcon>
      ) : (
        <></>
      ),
    [handleDelete, handleUpdateClick, isEditable]
  );

  return (
    <ListItem key={update._id}>
      <ListItemText primary={update.data} />
      {listItemButtons}
    </ListItem>
  );
};
