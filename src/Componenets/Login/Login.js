import React from 'react';
import Avatar from '@mui/material/Avatar'; // Updated import
import Button from '@mui/material/Button'; // Updated import
import CssBaseline from '@mui/material/CssBaseline'; // Updated import
import TextField from '@mui/material/TextField'; // Updated import
import FormControlLabel from '@mui/material/FormControlLabel'; // Updated import
import Checkbox from '@mui/material/Checkbox'; // Updated import
import Link from '@mui/material/Link'; // Updated import
import Paper from '@mui/material/Paper'; // Updated import
import Box from '@mui/material/Box'; // Updated import
import Grid from '@mui/material/Grid'; // Updated import
import Typography from '@mui/material/Typography'; // Updated import

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        EATS.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn(props) {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: 'url(https://source.unsplash.com/1000x1000/?food)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
          margin: (theme) => theme.spacing(8, 4),
        }}>
          <Avatar sx={{ margin: (theme) => theme.spacing(1), backgroundColor: (theme) => theme.palette.secondary.main }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={props.handleLogin} sx={{ width: '100%', marginTop: (theme) => theme.spacing(1) }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="string"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: (theme) => theme.spacing(3, 0, 2) }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
