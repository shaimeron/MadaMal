import React from 'react';
import { TextField, Grid, Avatar, Button } from '@mui/material';

interface UserFormProps {
  mode: 'signup' | 'edit';
  fullname: string;
  email: string;
  password: string;
  selectedImage: string | null;
  formErrors: { [key: string]: string };
  onFullnameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  mode,
  fullname,
  email,
  password,
  selectedImage,
  formErrors,
  onFullnameChange,
  onEmailChange,
  onPasswordChange,
  onImageChange,
  onSubmit,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="שם מלא"
            name="fullname"
            value={fullname}
            onChange={onFullnameChange}
            error={!!formErrors.fullname}
            helperText={formErrors.fullname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="אימייל"
            name="email"
            type="email"
            value={email}
            onChange={onEmailChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="סיסמה"
            name="password"
            type="password"
            placeholder='*******'
            value={password}
            onChange={onPasswordChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />
        </Grid>
        <Grid item xs={12}>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          {selectedImage && (
            <Avatar
              alt="Profile"
              src={selectedImage}
              sx={{ width: 100, height: 100 }}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            style={{ marginLeft: "10px" }}
          />
          </div>
        </Grid>
      </Grid>
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={onSubmit}
        style={{ marginTop: '20px' }}
      >
        {mode === 'signup' ? 'הרשמה' : 'עדכן פרטים'}
      </Button>
    </>
  );
};
