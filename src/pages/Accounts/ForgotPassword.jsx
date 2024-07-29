import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import forgotpassword from "../../assest/forgotpassword.gif";
import { Grid } from '@mui/material';


const defaultTheme = createTheme();

const ForgotPassword = () => {
  const initialValues = {
    email: '',
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email } = values;

    try {
      const apiResponse = await axios.post(`api/ForgotPassword`, { email });
      if (apiResponse.data) {
        // handle successful password reset request
        showToast('Password reset link sent to your email');
        navigate('/Login');
      } else {
        // handle error
        showToast('Failed to send password reset link');
      }
    } catch (error) {
      showToast('Failed to send password reset link');
    }

    setSubmitting(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "white" }}>
            <img src={forgotpassword} alt="forgot password"  className='bg-blue-400' />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Box component={Form} noValidate sx={{ mt: 1, width: '100%' }}>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <ErrorMessage name="email" component="div" className="error text-red-600" />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                  onClick={()=>{navigate("/")}}
                >
                  Send Reset Link
                </Button>
                <Grid container justifyContent={"flex-end"}>
                  <Grid item>
                    <Link to="/Login" style={{ textDecoration: 'underline' }} className='text-blue-500 '>
                      {"Remembered your password? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPassword;
