// SignUpPage.tsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
});

export const SignUpPage: React.FC = () => {
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

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

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!fullname.trim()) {
      errors.fullname = 'שם מלא הינו שדה חובה';
    }

    if (!email.trim()) {
      errors.email = 'אימייל הינו שדה חובה';
    } else if (!isValidEmail(email.trim())) {
      errors.email = 'אנא הזן כתובת דוא"ל חוקית';
    }

    if (!password.trim()) {
      errors.password = 'סיסמה הינה שדה חובה';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (value: string) => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSignUp = () => {
    if (validateForm()) {
      // Add your signup logic here
      console.log('Sign up button clicked');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ textAlign: 'right' }}>
        <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px' }}>
          הרשמה
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="שם מלא"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
          </Grid>
          <Grid item xs={12}>
            {selectedImage && (
              <Avatar alt="Profile" src={selectedImage} sx={{ width: 100, height: 100 }} />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginLeft: '10px' }}
            />
          </Grid>
        </Grid>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          style={{ marginTop: '20px' }}
        >
          הרשמה
        </Button>
      </Container>
    </ThemeProvider>
  );
};
