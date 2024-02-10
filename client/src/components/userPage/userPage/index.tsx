import { api, serverURL } from "@/api";
import { useAppSelector } from "@/hooks/store";
import { IReport } from "@/models";
import { selectReportsofLoggedUser } from "@/store/reports";
import { selectUser, upadteUser } from "@/store/user";
import { uploadImage } from "@/utils/files";
import { ReportsList } from "@@/common/reports";
import {
  EUserFields,
  UpdateUserProfileFormData,
  defaultFormValues,
  updateUserProfileSchema,
} from "@@/common/userForm/formUtils";
import { UserFormBody } from "@@/common/userForm/userFormBody";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { style } from "./style";

export const UserPage: React.FC = () => {
  const userData = useAppSelector(selectUser);
  const allReports: IReport[] = useAppSelector(selectReportsofLoggedUser);
  const dispatch = useDispatch();

  const { handleSubmit, control, setValue } =
    useForm<UpdateUserProfileFormData>({
      resolver: zodResolver(updateUserProfileSchema),
      defaultValues: defaultFormValues,
      resetOptions: {
        keepDirtyValues: false,
      },
    });

  useEffect(() => {
    const fetchData = async () => {
      const { email, fullname, imageUrl } = userData;
      if (userData.email) {
        setValue(EUserFields.EMAIL, email);
        setValue(EUserFields.FULL_NAME, fullname);
        setValue(EUserFields.DEFAULT_IMAGE_NAME, imageUrl);
      }
    };

    fetchData();
  }, [setValue, userData]);

  const handleValidFormData = async (formData: UpdateUserProfileFormData) => {
    const { fullname, imageFile } = formData;
    try {
      let serverFileName = "";
      if (imageFile) {
        serverFileName = await uploadImage(imageFile);
      }

      await api.user.update({ fullname, imageUrl: serverFileName });
      dispatch(
        upadteUser({
          fullname,
          imageUrl: `${serverURL}/${serverFileName}`,
        })
      );

      alert("הפרטים עודכנו בהצלחה");
    } catch (error: any) {
      alert("אירעה שגיאה בעדכון הפרטים");
    }
  };

  const handleWrongFormData = () => {};

  return (
    <Grid container>
      <Grid item>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          עריכת פרטים
        </Typography>
        <UserFormBody control={control} mode="update" />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleValidFormData, handleWrongFormData)}
          style={{ marginTop: "20px" }}
        >
          עדכון פרטים
        </Button>
      </Grid>
      <Grid item sx={style.listContainer}>
        <ReportsList reports={allReports} />
      </Grid>
    </Grid>
  );
};
