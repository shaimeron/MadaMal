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
import {WeatherDisplay} from "../../Weather";

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
              <Grid item>התחבר</Grid>
              <Grid item>
                <List sx={style.linkList}>{navListItems}</List>
              </Grid>
            </Grid>
            <Grid item sx={style.nameContainer}>
              <Typography variant="h6"> MADAMAL - דיווחי מדא</Typography>
            </Grid>
            <Grid item sx={style.itemContainer}>
              <Grid item>מזג אוויר{<WeatherDisplay/>} </Grid>
              <Grid item>התנתק</Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
