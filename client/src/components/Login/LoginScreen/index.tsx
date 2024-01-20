import React, { useState } from 'react';
import { Container, Typography, TextField, Button, CssBaseline, Link  } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google'; // Import the Google icon

const theme = createTheme({
  direction: 'rtl',
});

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    // Add your login logic here
    console.log('Login button clicked');
  };

  const handleGoogleLogin = () => {
    // Add your Google login logic here
    console.log('Login with Google button clicked');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" style={{ textAlign: 'center' }}>
        <Typography variant="h5">התחברות</Typography>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="אימייל"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="rtl"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="סיסמה"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="rtl"
          />
        </div>
        <Link href="#/register" style={{ marginTop: '10px', display: 'block' }}>
          לחצו כאן להרשמה
        </Link>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          style={{ marginTop: '20px' }}
        >
          שלח
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleGoogleLogin}
          style={{ marginTop: '10px' }}
        >
          <GoogleIcon style={{ marginRight: '5px' }} />
          התחברות עם Google
        </Button>
      </Container>
    </ThemeProvider>
  );
};
