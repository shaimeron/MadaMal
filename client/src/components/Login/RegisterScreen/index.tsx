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

  const handleSignUp = () => {
    // Add your signup logic here
    console.log('Sign up button clicked');
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
