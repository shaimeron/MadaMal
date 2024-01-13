import { FC, useCallback, useMemo } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { IReport } from "../../../../models";
import { red } from "@mui/material/colors";
import { Update, ModeEditOutline, Delete } from "@mui/icons-material";
import { style } from "./style";
import swal from "sweetalert";
import { api } from "../../../../api";
import { useDispatch } from "react-redux";
import { openUpdate } from "../../../../store/addReport";
interface IReportDisplayProps {
  report: IReport;
  isEditable?: boolean;
}

export const ReportDisplay: FC<IReportDisplayProps> = ({
  report,
  isEditable = false,
}) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(async () => {
    const isDelete = await swal({
      title: "האם אתה בטוח שברצונך למחוק דיווח זה",
      text: "ברגע שהדיוח יימחק אין דרך לשחזר אותו",
      icon: "warning",
      buttons: ["בטל", "מחק"],
      dangerMode: true,
    });

    if (isDelete) await api.report.deleteReport(report._id);
  }, [report]);

  const handleUpdateClick = useCallback(async () => {
    dispatch(openUpdate(report._id));
  }, [dispatch, report._id]);

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

  return (
    <Card sx={style.cardContainer}>
      <CardHeader
        sx={style.cardHeader}
        action={HeadersAction}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={report.ownerId}
        subheader={report.creationDate.toDateString()}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {report.data}
        </Typography>
      </CardContent>
      <CardActions disableSpacing dir="ltr">
        <Button variant="contained" dir="ltr" startIcon={<Update />}>
          {report.updates.length
            ? `${report.updates.length} עדכונים`
            : "אין עדכונים"}
        </Button>
      </CardActions>
    </Card>
  );
};
