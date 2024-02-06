import {
  AppBar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { style } from "./style";
import { WeatherDisplay } from "../../Weather";
import { handleLogout } from "../../Login/utils";
import { store } from "@/store";
import { logout, selectUserId } from "@/store/user";
import { useAppSelector } from "@/hooks/store";

interface INavItem {
  link: string;
  text: string;
}
const navItems: INavItem[] = [
  {
    link: "/",
    text: "דף הבית",
  },
  {
    link: "/user",
    text: "פרופיל",
  },
  {
    link: "/chat",
    text: "צאט משתמשים",
  },
];
export const Navbar: FC = () => {
  const navigate = useNavigate();
  const storeUserId = useAppSelector(selectUserId);


  const handleLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleLogoutClick = useCallback(() => {
    handleLogout();
    store.dispatch(logout());
    alert("התנתקת בהצלחה!");
    navigate("/login");
    window.location.reload();
  }, [navigate]);

  const navListItems = useMemo(
    () =>
      navItems.map((item) => (
        <ListItem key={item.link} disablePadding>
          <ListItemButton
            sx={style.linkListItemButton}
            onClick={() => navigate(item.link)}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      )),
    [navigate]
  );

  return (
    <Box sx={style.containerBox}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item sx={style.itemContainer}>
              {!storeUserId && (
                <ListItemButton onClick={handleLoginClick}>
                  <ListItemText primary={"התחבר"} />
                </ListItemButton>
              )}{" "}
            </Grid>
            <Grid item sx={style.itemContainer}>
              <List sx={style.linkList}>{navListItems}</List>
            </Grid>
            <Grid item sx={style.nameContainer}>
              <Typography variant="h6"> MADAMAL - דיווחי מדא</Typography>
            </Grid>
            <Grid item sx={style.weatherContainer}>
              מזג אוויר{<WeatherDisplay />}
            </Grid>
            <Grid item sx={style.itemContainer}>
              {!!storeUserId && (
                <ListItemButton onClick={handleLogoutClick}>
                  <ListItemText primary={"התנתק"} />
                </ListItemButton>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
