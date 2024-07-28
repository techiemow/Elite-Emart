import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import axios from 'axios';
import { GrDocumentUser } from "react-icons/gr";

// import 'react-toastify/dist/ReactToastify.css';
// import "./Signup.css"
// import { apiurl } from '../Constants/apiurl';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:5173/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [terms, setTerms] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const hashedPassword = await bcrypt.hash(values.password, 10);
      const apiResponse = await axios.post(`${apiurl}/registration`, {
        username: values.username,
        phoneNumber: values.phoneNumber,
        emailaddress: values.email,
        password: hashedPassword,
      });

      console.log('API Response:', apiResponse.data);

      if (apiResponse?.data?._id) {
        resetForm();
        setTerms(false);
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black' } } className='mx-auto w-5'>
          <GrDocumentUser />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Box component={Form} noValidate sx={{ mt: 1, width: '100%' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      autoComplete="given-name"
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      autoFocus
                    />
                    <ErrorMessage name="username" component="div" className="error text-red-600" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                    <ErrorMessage name="email" component="div" className="error  text-red-600" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                    <ErrorMessage name="password" component="div" className="error  text-red-600" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="error  text-red-600" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      name="phoneNumber"
                      label="Phone Number"
                      type="text"
                      id="phoneNumber"
                      autoComplete="phoneNumber"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className="error  text-red-600" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I agree to the terms and regulations of the website."
                      onClick={() => setTerms(true)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!terms || isSubmitting}
                  sx={{ mt: 3, mb: 2 }}
                  onClick={()=> navigate("/")}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <NavLink to="/login" variant="body2">
                      Already have an account? Sign in
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}