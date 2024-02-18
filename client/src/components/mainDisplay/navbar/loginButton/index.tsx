import {ListItemButton, ListItemText} from "@mui/material";
import {FC, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {selectUserName} from "@/store/user";
import {useAppSelector} from "@/hooks/store";

export const LoginButton: FC = () => {
  const navigate = useNavigate();
  const userName: string = useAppSelector(selectUserName);

  const handleLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <>
      {userName ? (
        <ListItemText primary={`שלום ${userName}`} />
      ) : (
        <ListItemButton onClick={handleLoginClick}>
          <ListItemText primary={"התחבר"} />
        </ListItemButton>
      )}
    </>
  );
};
