import { FC, useCallback, useEffect, useState } from "react";
import { Box, Button, Grid, ListItem, TextField } from "@mui/material";
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
    <ListItem key={updateId}>
      <Box
        component="form"
        sx={style.boxForm}
        noValidate
        onSubmit={handleSubmit}
        onReset={handleClose}
        autoComplete="off"
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item sx={style.gridText}>
            <TextField
              onChange={(e) => setDataOfUpdate(e.target.value)}
              variant="outlined"
              margin="none"
              placeholder="מה העדכון שלך?"
              fullWidth
              value={dataOfUpdate}
            />
          </Grid>
          <Grid item sx={style.gridButtons}>
            <Button variant="contained" color="success" type="submit">
              שנה
            </Button>
            <Button variant="contained" color="error" type="reset">
              בטל
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ListItem>
  );
};
