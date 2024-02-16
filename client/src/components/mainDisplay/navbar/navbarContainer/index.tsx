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
import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { style } from "./style";
import { WeatherDisplay } from "../../../Weather";
import { LoginButton } from "../loginButton";
import { LogoutButton } from "../logoutButton";

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
export const NavbarContainer: FC = () => {
  const navigate = useNavigate();

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
              <LoginButton />
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
              <LogoutButton />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
