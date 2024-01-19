import { FC, useCallback, useMemo } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Delete, ModeEditOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { IReportItem } from "../../../models";
import swal from "sweetalert";

interface IUpdateDisplayProps {
  reportId: string;
  update: IReportItem;
  isEditable?: boolean;
}

export const UpdateDisplay: FC<IUpdateDisplayProps> = ({
  reportId,
  update,
  isEditable = false,
}) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(async () => {
    const isDelete = await swal({
      title: "האם אתה בטוח שברצונך למחוק עדכון זה",
      text: "ברגע שהעדכון יימחק אין דרך לשחזר אותו",
      icon: "warning",
      buttons: ["בטל", "מחק"],
      dangerMode: true,
    });

    // if (isDelete) await api.report.deleteReport(report._id);
  }, [update]);

  const handleUpdateClick = useCallback(async () => {}, [dispatch]);

  const listItemButtons: JSX.Element = useMemo(
    () =>
      isEditable ? (
        <ListItemIcon>
          <Delete onClick={handleDelete} />
          <ModeEditOutline onClick={handleUpdateClick} />
        </ListItemIcon>
      ) : (
        <></>
      ),
    [handleDelete, handleUpdateClick, isEditable]
  );

  return (
    <ListItem>
      {listItemButtons}
      <ListItemText primary={update.data} />
    </ListItem>
  );
};
