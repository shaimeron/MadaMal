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
import { FC, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { handleLogout, isUserLoggedIn } from "../Login/utils";
import { AddReportDialog } from "../addReportDialog";
import { style } from "./style";


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
                      !isUserLogged &&
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
                      isUserLogged &&
                      <ListItemButton onClick={() => {
                        handleLogout();
                        alert('התנתקת בהצלחה!')
                        navigate("/login");
                        window.location.reload();
                      }}>
                        <ListItemText primary={"התנתק"} />
                      </ListItemButton>}
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
