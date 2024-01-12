import { FC } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { IReport } from "../../models";
import { red } from "@mui/material/colors";
import { Favorite } from "@mui/icons-material";

interface IReportDisplayProps {
  report: IReport;
}
export const ReportDisplay: FC<IReportDisplayProps> = ({ report }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
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
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
      </CardActions>
    </Card>
  );
};
