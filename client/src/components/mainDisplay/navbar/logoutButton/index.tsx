import { ListItemButton, ListItemText } from "@mui/material";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { logout, selectUserName } from "@/store/user";
import { useAppSelector } from "@/hooks/store";
import { store } from "@/store";
import { handleLogout } from "@/utils/login";

export const LogoutButton: FC = () => {
  const navigate = useNavigate();
  const userName: string = useAppSelector(selectUserName);

  const handleLogoutClick = useCallback(() => {
    handleLogout();
    store.dispatch(logout());
    alert("התנתקת בהצלחה!");
    navigate("/login");
  }, [navigate]);

  return (
    <>
      {userName && (
        <ListItemButton onClick={handleLogoutClick}>
          <ListItemText primary={"התנתק"} />
        </ListItemButton>
      )}
    </>
  );
};
