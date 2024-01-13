import { FC, useMemo } from "react";
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
import { IReport } from "../../models";
import { red } from "@mui/material/colors";
import { Update, ModeEditOutline, Delete } from "@mui/icons-material";
import { style } from "./style";
interface IReportDisplayProps {
  report: IReport;
  isEditable?: boolean;
}

export const ReportDisplay: FC<IReportDisplayProps> = ({
  report,
  isEditable = true,
}) => {
  const HeadersAction: JSX.Element = useMemo(
    () =>
      isEditable ? (
        <>
          <IconButton>
            <Delete />
          </IconButton>
          <IconButton>
            <ModeEditOutline />
          </IconButton>
        </>
      ) : (
        <></>
      ),
    [isEditable]
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
