import { FC, useCallback, useState } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { style } from "./style";
import { api } from "../../../../api";
import SendIcon from "@mui/icons-material/Send";
interface IAddUpdateToReportProps {
  reportId: string;
  userId: string;
}

export const AddUpdateToReport: FC<IAddUpdateToReportProps> = ({
  reportId,
  userId,
}) => {
  const [dataToAdd, setDataToAdd] = useState("");

  const addNewUpdate = useCallback(
    async (): Promise<void> =>
      await api.report.addUpdateToReport({
        reportId,
        data: dataToAdd,
        ownerId: userId,
      }),
    [reportId, dataToAdd, userId]
  );

  const handleSubmit = useCallback(async (): Promise<void> => {
    await addNewUpdate();
    setDataToAdd("");
  }, [addNewUpdate]);

  return (
    <Card sx={style.cardContainer}>
      <CardContent>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setDataToAdd(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            multiline
            maxRows={4}
            placeholder="מה העדכון שלך?"
            sx={{ mb: 3 }}
            fullWidth
            value={dataToAdd}
          />

          <Button
            variant="outlined"
            type="submit"
            sx={{ direction: "ltr" }}
            endIcon={<SendIcon />}
          >
            הוסף עדכון
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
