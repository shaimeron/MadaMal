import { FC, useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, ModeEditOutline } from "@mui/icons-material";
import { IReportItem } from "../../../../models";
import swal from "sweetalert";
import { api } from "../../../../api";
import { style } from "./style";
import { dateFormater } from "../../../../utils/date";

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

  const HeadersAction: JSX.Element = useMemo(
    () =>
      isEditable ? (
        <>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
          <IconButton onClick={handleUpdateClick}>
            <ModeEditOutline />
          </IconButton>
        </>
      ) : (
        <></>
      ),
    [handleDelete, handleUpdateClick, isEditable]
  );

  const dateDisplay = useMemo(
    () => dateFormater(update?.creationDate),
    [update?.creationDate]
  );

  return (
    <Card sx={style.cardContainer}>
      <CardHeader
        sx={style.cardHeader}
        action={HeadersAction}
        title={update.ownerId}
        subheader={dateDisplay}
      />

      <CardContent>
        <Typography>{update.data}</Typography>
      </CardContent>
    </Card>
  );
};
