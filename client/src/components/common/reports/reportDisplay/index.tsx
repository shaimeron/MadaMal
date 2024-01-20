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
import { useNavigate } from "react-router-dom";
import { dateFormater } from "../../../../utils/date";
import { useAppSelector } from "../../../../hooks/store";
import { selectUserId } from "../../../../store/user";
interface IReportDisplayProps {
  report: IReport;
  isWithUpdateDisplayClick?: boolean;
}

export const ReportDisplay: FC<IReportDisplayProps> = ({
  report,
  isWithUpdateDisplayClick = true,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId: string = useAppSelector(selectUserId);

  const displayUpdates = useCallback(() => {
    isWithUpdateDisplayClick && navigate(`/report/${report._id}`);
  }, [isWithUpdateDisplayClick, navigate, report._id]);

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

  const handleUpdateClick = useCallback(() => {
    dispatch(openUpdate(report._id));
  }, [dispatch, report._id]);

  const HeadersAction: JSX.Element = useMemo(
    () =>
      userId === report.ownerId ? (
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
    [handleDelete, handleUpdateClick, report.ownerId, userId]
  );

  const dateDisplay = useMemo(
    () => dateFormater(report?.creationDate),
    [report?.creationDate]
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
        subheader={dateDisplay}
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
        <Button
          variant="contained"
          dir="ltr"
          startIcon={<Update />}
          onClick={displayUpdates}
        >
          {report.updates.length
            ? `${report.updates.length} עדכונים`
            : "אין עדכונים"}
        </Button>
      </CardActions>
    </Card>
  );
};
