import { useState, React, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from '../utils/Theme'
import WarningIcon from '@mui/icons-material/Warning';
import { login, isAuthenticated, getUser } from '../actions/auth';
import { Navigate } from 'react-router-dom';
import Loading from '../utils/Loading';
import CSRFToken from '../components/CSRFToken';
import { Alert, AlertTitle, LinearProgress } from '@mui/material';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://frann.dev">
        frann.dev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignInSide = () => {

  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(false)
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const {username, password} = formData;
  const [signing, setSigning] = useState(false);


  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const handleSubmit = e => {
    e.preventDefault()
    setSigning(true)
    login(username, password)
    .then(response => setUser(response.user))
    .catch(err => {
      setSigning(false)
      setLoginError(true)
    })
  };


  useEffect(() => {
    isAuthenticated().then(res => { 
      setAuthenticated(res) 
      setLoading(false)
    })
  }, [user])

  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
      {loading ? <Loading></Loading> :
      <Grid container component="main" sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
        {authenticated && <Navigate to='/dashboard' />}
        <CssBaseline />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={e => handleSubmit(e)} sx={{ mt: 1 }}>
              <CSRFToken></CSRFToken>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="username"
                autoComplete="email"
                onChange={e => onChange(e)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => onChange(e)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {loginError ?
              <>
              <Alert severity="error">
                <AlertTitle>Incorrect credentials</AlertTitle>
                User or password is incorrect
              </Alert>
              </>
              : null}
                <Button
                  type="submit"
                  fullWidth
                  disabled={signing}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
          {signing && <LinearProgress color="primary" />}
        </Grid>
      </Grid>
      }
    </ThemeProvider>
    );
}
export default SignInSide;