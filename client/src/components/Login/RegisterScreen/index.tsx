// SignUpPage.tsx
import { Container, Snackbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api";
import { UserForm } from "../../common/userForm";
import { validateUserForm, googleApi } from "../utils"; // adjust the import path
// import {
//   GoogleLogin,
//   GoogleLoginResponse,
//   GoogleLoginResponseOffline,
// } from "react-google-login";

const theme = createTheme({
  direction: "rtl",
});

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignUp = async () => {
    const errors = validateUserForm({ fullname, email, password });
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await api.auth.register({ fullname, email, password });

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
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // const handleGoogleLoginSucsses = (
  //   response: GoogleLoginResponse | GoogleLoginResponseOffline
  // ) => {
  //   const { profileObj } = response as GoogleLoginResponse;
  //   setEmail(profileObj.email);
  //   setFullname(`${profileObj.givenName} ${profileObj.familyName}`);
  //   setSelectedImage(profileObj.imageUrl);
  //   console.log(response);
  // };

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
        >
          {/* <GoogleLogin
            clientId={googleApi.clientId}
            buttonText="הרשמה באמצעות גוגל"
            onSuccess={handleGoogleLoginSucsses}
            onFailure={() => alert("התחברות באמצעות גוגל נכשלה")}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          /> */}
        </div>
        <UserForm
          mode="signup"
          fullname={fullname}
          email={email}
          password={password}
          selectedImage={selectedImage}
          formErrors={formErrors}
          onFullnameChange={(e) => setFullname(e.target.value)}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onImageChange={handleImageChange}
          onSubmit={handleSignUp}
        />
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
