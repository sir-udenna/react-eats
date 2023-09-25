import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const theme = createTheme();

const SplashContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'url(https://source.unsplash.com/1000x1000/?food) no-repeat center center fixed',
  backgroundSize: 'cover',
});

const SplashContent = styled('div')({
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  padding: '2rem',
  borderRadius: '8px',
  textAlign: 'center',
});

export default function Homepage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []); 

  useEffect(() => {
    if (loggedIn) {
      router.push('/home');
    }
  }, [loggedIn]);

  const handleLogin = () => {
    router.push('/login');
  };

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SplashContainer>
        <SplashContent>
          <Typography variant="h4" gutterBottom>
            Welcome to EATS
          </Typography>
          <Typography variant="h6" paragraph>
            Discover the best local restaurants near you!
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </SplashContent>
      </SplashContainer>
    </ThemeProvider>
  );
}
