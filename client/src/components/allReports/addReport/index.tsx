import { Button } from "@mui/material";
import { FC, useCallback } from "react";
import { openAdd } from "../../../store/addReport";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

export const AddReport: FC = () => {
  const dispatch = useDispatch();

  const openAddDialog = useCallback(() => {
    dispatch(openAdd());
  }, [dispatch]);

  return (
    <Button variant="contained" endIcon={<AddIcon />} onClick={openAddDialog}>
      הוסף דיווח
    </Button>
  );
};
