import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { api } from "@/api";
import { useAppSelector } from "@/hooks/store";
import { IReport, UserDto } from "@/models";
import { selectReportsofLoggedUser } from "@/store/reports";
import { getUserId, isUserLoggedIn, validateUserForm } from "../../Login/utils";
import { ReportsList } from "@@/common/reports";
import { UserForm } from "@@/common/userForm"; // Make sure the import path is correct
import { useNavigate } from "react-router-dom";
import { style } from "./style";

export const UserPage: React.FC = () => {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [selectedImageFile, setSelectedFile] = useState<File | undefined>(undefined);

  const allReports: IReport[] = useAppSelector(selectReportsofLoggedUser);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async (userId: string): Promise<UserDto> =>
      await api.user.getById(userId);
    const userId = getUserId();
    try {
      getUserData(userId).then((data) => {
        console.log('data is', data);
        setFullname(data.fullname);
        setEmail(data.email);
        setSelectedImage(data.imageUrl ?? '')
      });
    } catch (e) {
      alert("שגיאה בקבלת פרטי משתמש מהשרת");

      if (!isUserLoggedIn()) {
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const errors = validateUserForm({ fullname, email, password });
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        let imageName = '';
        if (!!selectedImageFile) {
          const image = new FormData();
          image.append("image", selectedImageFile);
          imageName = await api.image.uploadImage(image);
        }
        const response = await api.user.update({ fullname, password, imageUrl: imageName });
        alert('הפרטים עודכנו בהצלחה');
      } catch (e) {
        alert('שגיאה בעדכון הפרטים, יש לנסות שוב');
      }
    }
  }

  return (
    <Grid container>
      <Grid item>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          עריכת פרטים
        </Typography>
        <UserForm
          mode="edit"
          fullname={fullname}
          email={email}
          password={password}
          selectedImage={selectedImage}
          formErrors={formErrors}
          onFullnameChange={(e) => setFullname(e.target.value)}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onImageChange={handleImageChange}
          onSubmit={handleUpdate}
        />
      </Grid>
      <Grid item sx={style.listContainer}>
        <ReportsList reports={allReports} />
      </Grid>
    </Grid>
  );
};
