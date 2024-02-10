import { Container, Grid } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { style } from "./style";
import { NavbarContainer } from "../navbar";
import { AddReportDialog } from "@@/addReport";

export const StaticDisplay: FC = () => {
  return (
    <>
      <AddReportDialog />

      <Grid container direction="column">
        <Grid item>
          <NavbarContainer />
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
