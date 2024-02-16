import { useAppSelector } from "@/hooks/store";
import { selectUserId } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Link, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  LoginFormData,
  defaultFormValues,
  schema,
} from "../loginFormBody/formUtils";
import { LoginFormBody } from "../loginFormBody";
import { toast } from "react-toastify";
import { useHandleLogin } from "./hooks";

export const LoginPage: React.FC = () => {
  const storeUserId = useAppSelector(selectUserId);

  const navigate = useNavigate();

  useEffect(() => {
    if (storeUserId) {
      toast.warn("הינך מחובר כעת");
      navigate("/");
    }
  }, []);

  const {
    handleGoogleLoginFailure,
    handleGoogleLoginSuccess,
    handleValidFormData,
  } = useHandleLogin();

  const { handleSubmit, control } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  const handleWrongFormData = () => {
    toast.error("נא למלא פרטי התחברות תקינים");
  };

  return (
    <>
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
    </>
  );
};
