import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

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

//Splash screen
export default function Homepage() {
  const router = useRouter();

  const handleLearnMore = () => {
    // Redirect to a detailed features page
    router.push('/Login'); // Login for now
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
          }}
        >
          <Typography variant="h2" align="center" gutterBottom>
            Welcome to EATS
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Discover the best local restaurants near you with EATS!
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<RestaurantIcon />}
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}