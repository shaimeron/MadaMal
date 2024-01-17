import {
  Button,
  Card,
  CardActions,
} from "@mui/material";
import { FC, useCallback } from "react";
import { openAdd } from "../../../store/addReport";
import { useDispatch } from "react-redux";

export const AddReport: FC = () => {
  const dispatch = useDispatch();

  const openAddDialog = useCallback(() => {
    dispatch(openAdd());
  }, [dispatch]);

  return (
    <Card>
      <CardActions>
        <Button size="small" onClick={openAddDialog}>
          הוסף דיווח
        </Button>
      </CardActions>
    </Card>
  );
};
