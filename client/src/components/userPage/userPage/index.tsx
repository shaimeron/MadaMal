import { useAppSelector } from "@/hooks/store";
import { IReport } from "@/models";
import { selectReportsofLoggedUser } from "@/store/reports";
import { ReportsList } from "@@/common/reports";
import { Grid } from "@mui/material";
import React from "react";
import { style } from "./style";
import { UserFormContainer } from "@@/common/userForm";

export const UserPage: React.FC = () => {
  const allReports: IReport[] = useAppSelector(selectReportsofLoggedUser);

  return (
    <Grid container>
      <Grid item>
        <UserFormContainer />
      </Grid>
      <Grid item sx={style.listContainer}>
        <ReportsList reports={allReports} />
      </Grid>
    </Grid>
  );
};
