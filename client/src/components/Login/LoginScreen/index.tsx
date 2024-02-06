import {
  Button,
  Container,
  CssBaseline,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api";
import { LoginDecodedData } from "@/api/api";
import {
  MIN_PASSWORD_LENGTH,
  handleLoginHeaders,
  isValidEmail,
  parseJwt,
} from "../utils";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { LoginFormData, defaultFormValues, schema } from "./formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormBody } from "./loginFormBody";

const theme = createTheme({
  direction: "rtl",
});

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const { handleSubmit, control, reset } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  const handleValidFormData = async (formData: LoginFormData) => {
    const { email, password } = formData;
    try {
      const response = await api.auth.login({ email, password });
      onLoginSucsses(response.data);
    } catch (error: any) {
      if (error.response.status === 401) {
        setSnackbarMessage("פרטי ההתחברות שהזנת שגויים");
      } else {
        setSnackbarMessage("אירעה שגיאה בעת התחברות");
      }
      setOpenSnackbar(true);
    }
  };

  const handleWrongFormData = () => {
    setSnackbarMessage("נא למלא פרטי התחברות תקינים");
    setOpenSnackbar(true);
  };

  const onLoginSucsses = async (data: LoginDecodedData) => {
    const { accessToken } = data;
    const decodedAccessToken = parseJwt(accessToken);

    const userId = decodedAccessToken?._id;

    if (!userId) {
      setSnackbarMessage("שגיאה בפרטי ההתחברות נא לנסות שוב");
      setOpenSnackbar(true);

      return;
    }

    try {
      handleLoginHeaders(data);
      alert("התחברת בהצלחה!");
      navigate("/");
      window.location.reload();
    } catch (error: any) {
      setSnackbarMessage("שגיאה בפרטי ההתחברות נא לנסות שוב");
      setOpenSnackbar(true);
    }
  };

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const response = await api.auth.googleLogin(credentialResponse);
      onLoginSucsses(response.data);
    } catch (error: any) {
      handleGoogleLoginFailure();
    }
  };

  const handleGoogleLoginFailure = () => {
    setSnackbarMessage("אירעה שגיאה בעת התחברות עם גוגל יש לנסות שוב");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" style={{ textAlign: "center" }}>
        <Typography variant="h5">התחברות</Typography>
        <LoginFormBody control={control} />
        <Link href="#/register" style={{ marginTop: "10px", display: "block" }}>
          לחצו כאן להרשמה
        </Link>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleValidFormData, handleWrongFormData)}
          style={{ marginTop: "20px" }}
        >
          שלח
        </Button>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
};
