import { FC, useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { api } from "../../../../api";
import { style } from "./style";

interface IChangeUpdateDisplayProps {
  reportId: string;
  updateData: string;
  updateId: string;
  closeUpdate: () => void;
}

export const ChangeUpdateDisplay: FC<IChangeUpdateDisplayProps> = ({
  reportId,
  updateData,
  updateId,
  closeUpdate,
}) => {
  const [dataOfUpdate, setDataOfUpdate] = useState("");

  useEffect(() => {
    setDataOfUpdate(updateData);
  }, []);

  const addNewUpdate = useCallback(
    async (): Promise<void> =>
      await api.report.changeUpdateInReport({
        reportId,
        data: dataOfUpdate,
        _id: updateId,
      }),
    [reportId, dataOfUpdate, updateId]
  );
  const handleClose = useCallback((): void => {
    closeUpdate();
  }, [closeUpdate]);

  const handleSubmit = useCallback(async (): Promise<void> => {
    await addNewUpdate();
    handleClose();
  }, [addNewUpdate, handleClose]);

  return (
    <Card sx={style.cardContainer}>
      <CardContent sx={style.cardContent}>
        <TextField
          onChange={(e) => setDataOfUpdate(e.target.value)}
          variant="outlined"
          margin="none"
          placeholder="מה העדכון שלך?"
          fullWidth
          multiline
          maxRows={4}
          value={dataOfUpdate}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="success"
          sx={style.changeButtom}
          onClick={handleSubmit}
        >
          שנה
        </Button>
        <Button variant="contained" color="error" onClick={handleClose}>
          בטל
        </Button>
      </CardActions>
    </Card>
  );
};
