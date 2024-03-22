import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material/styles';
 // Import your BusBookingForm component
import { useNavigate } from 'react-router-dom';
const theme = createTheme();

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async () => {
    try {
      // Simple client-side validation
      if (!formData.email || !formData.password) {
        console.error('Please fill out all fields.');
        return;
      }
      alert('Login Successful!');
      const response = await axios.post('http://localhost:8080/admin/adminlogin', formData);
      console.log(response.data);

      // Assuming your server returns a success status
      if (response.status === 200 && response.data.success) {
        // Set isLoggedIn to true on successful login
        setLoggedIn(true);
        navigate('/book');
      } else {
        console.error('Login failed. Please check your credentials.');
        // Add error handling logic for unsuccessful login
      }
    } catch (error) {
      console.error('Error:', error);
      // Add error handling logic for network or server-side issues
    }
  };

  return (
    <ThemeProvider theme={theme}>
    
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 3 }}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
            <br /> <br />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <br /><br />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
                <br />
              </Grid>

              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <br />
        <br /><br />
        <br />
        <br />
        <br />
     

      {/* Render BusBookingForm if logged in */}
    
    </ThemeProvider>
  );
};

export default SignIn;
