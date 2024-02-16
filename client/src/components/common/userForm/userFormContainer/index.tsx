import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserForm } from "./hooks";
import { UserFormData, defaultFormValues, userSchema } from "../formUtils";
import { UserFormBody } from "../userFormBody";

export const UserFormContainer: React.FC = () => {
  const {
    getUserForForm,
    handleValidFormData,
    handleWrongFormData,
    submitText,
    titleText,
    isUpdateForm,
    isButtonLoading,
  } = useUserForm();

  const { handleSubmit, control, reset } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  useEffect(() => {
    const func = async () => {
      const reportForForm = await getUserForForm();
      reset(reportForForm);
    };

    func();
  }, [getUserForForm, reset]);

  return (
    <>
      <Typography
        variant="h5"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        {titleText}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 15,
        }}
      ></div>
      <UserFormBody control={control} isUpdateForm={isUpdateForm} />
      <LoadingButton
        loading={isButtonLoading}
        type="submit"
        fullWidth
        variant="contained"
        role="progressbar"
        color="primary"
        onClick={handleSubmit(handleValidFormData, handleWrongFormData)}
        style={{ marginTop: "20px" }}
      >
        <span>{submitText}</span>
      </LoadingButton>
    </>
  );
};
