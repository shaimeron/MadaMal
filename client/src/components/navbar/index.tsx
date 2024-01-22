import {
  AppBar,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { style } from "./style";
import { AddReportDialog } from "../addReportDialog";
import { selectUserId } from "../../store/user";
import { useAppSelector } from "../../hooks/store";


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
  const userId: string = useAppSelector(selectUserId);


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
    <>
      <AddReportDialog />

      <Grid container direction="column">
        <Grid item>
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

                    {
                      !userId &&
                      <ListItemButton onClick={() => navigate("/login")}>
                        <ListItemText primary={"התחבר"} />
                      </ListItemButton>
                    }

                    <Grid item>
                      <List sx={style.linkList}>{navListItems}</List>
                    </Grid>
                  </Grid>
                  <Grid item sx={style.nameContainer}>
                    <Typography variant="h6"> MADAMAL - דיווחי מדא</Typography>
                  </Grid>
                  <Grid item sx={style.itemContainer}>
                    <Grid item>מזג אוויר</Grid>
                    {
                      !!userId &&
                      <Grid item>התנתקות</Grid>
                    }
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </Box>
        </Grid>
        <Grid item sx={style.pageContainer}>
          <Container maxWidth="sm">
            <Outlet />
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
