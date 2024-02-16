import { Button } from "@mui/material";
import { FC, useCallback } from "react";
import { openAdd } from "@/store/addReport";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "@/hooks/store";
import { selectIsUserLoggedIn } from "@/store/user";

export const AddReport: FC = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const openAddDialog = useCallback(() => {
    dispatch(openAdd());
  }, [dispatch]);

  return isUserLoggedIn ? (
    <Button variant="contained" endIcon={<AddIcon />} onClick={openAddDialog}>
      הוסף דיווח
    </Button>
  ) : (
    <></>
  );
};
