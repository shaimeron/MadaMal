import { Container, Grid } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { style } from "./style";
import { Navbar } from "../navbar";
import { AddReportDialog } from "@@/addReport";

export const StaticDisplay: FC = () => {
  return (
    <>
      <AddReportDialog />

      <Grid container direction="column">
        <Grid item>
          <Navbar />
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
