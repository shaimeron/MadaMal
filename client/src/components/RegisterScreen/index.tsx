import { api } from "@/api";
import {
  RegistrUserFormData,
  defaultFormValues,
  registrUserSchema,
} from "@@/common/userForm/formUtils";
import { UserFormBody } from "@@/common/userForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Snackbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "@/utils/files";

const theme = createTheme({
  direction: "rtl",
});

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const { handleSubmit, control } = useForm<RegistrUserFormData>({
    resolver: zodResolver(registrUserSchema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  const handleValidFormData = async (formData: RegistrUserFormData) => {
    const { email, fullname, password, imageFile } = formData;

    try {
      let serverFileName = "";
      if (imageFile) {
        serverFileName = await uploadImage(imageFile);
      }

      const response = await api.auth.register({
        fullname,
        email,
        password,
        imageUrl: serverFileName,
      });

      if (response.status === 201) {
        alert("המשתמש נוצר בהצלחה");
        navigate("/login");
      } else {
        setSnackbarMessage("אירעה שגיאה ביצירת המשתמש");
        setOpenSnackbar(true);
      }
    } catch (error: any) {
      if (error.response.status === 406) {
        setSnackbarMessage("משתמש כבר קיים");
      } else {
        console.error("Error during signup:", error);
        setSnackbarMessage("אירעה שגיאה ביצירת המשתמש");
      }
      setOpenSnackbar(true);
    }
  };

  const handleWrongFormData = () => {
    setSnackbarMessage("נא למלא פרטים תקינים");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ textAlign: "right" }}>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          הרשמה
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 15,
          }}
        ></div>
        <UserFormBody control={control} mode="register" />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleValidFormData, handleWrongFormData)}
          style={{ marginTop: "20px" }}
        >
          הרשמה
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />{" "}
      </Container>
    </ThemeProvider>
  );
};
