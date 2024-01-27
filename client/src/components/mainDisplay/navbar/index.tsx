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
import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { style } from "./style";
import { WeatherDisplay } from "../../Weather";
import { handleLogout, isUserLoggedIn } from "../../Login/utils";

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
  const [isUserLogged, setIdUserLogged] = useState(false);

  useEffect(() => {
    setIdUserLogged(isUserLoggedIn());
  }, []);

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
              {!isUserLogged && (
                <ListItemButton onClick={() => navigate("/login")}>
                  <ListItemText primary={"התחבר"} />
                </ListItemButton>
              )}{" "}
              <Grid item>
                <List sx={style.linkList}>{navListItems}</List>
              </Grid>
            </Grid>
            <Grid item sx={style.nameContainer}>
              <Typography variant="h6"> MADAMAL - דיווחי מדא</Typography>
            </Grid>
            <Grid item sx={style.itemContainer}>
              <Grid item>מזג אוויר{<WeatherDisplay />} </Grid>
              {isUserLogged && (
                <ListItemButton
                  onClick={() => {
                    handleLogout();
                    alert("התנתקת בהצלחה!");
                    navigate("/login");
                    window.location.reload();
                  }}
                >
                  <ListItemText primary={"התנתק"} />
                </ListItemButton>
              )}{" "}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
