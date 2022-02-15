import * as React from 'react';
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
import { getUser, login } from '../../auth/Authentication';
import { themeOptions } from '../../utils/Theme'
import { Rings } from "react-loader-spinner"
import WarningIcon from '@mui/icons-material/Warning';


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

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    login(formData.get('email'), formData.get('password'))
      .then(setLoading(true))
      .then(response => {
        getUser(response.access)
          .then(user => {
            setUser(user.data.username)
            setLoading(false)
          })
      })
      .catch(error => {
        console.log("Error while fetching auth data " + error)
        setLoginError(true)
        // setTimeout(() => { setLoginError(false) }, 3000)
        setLoading(false)
      })

  };

  const [user, setUser] = React.useState('nouser')
  const [loginError, setLoginError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    setUser(user)
    setLoginError(loginError)
  }, [user, loginError])



  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
      <Grid container component="main" sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
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
              {/* icon */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
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
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {loginError ?
              <Box display="flex" alignItems="center">
                <WarningIcon color="error" sx={{mr: 1}}></WarningIcon>
                <Typography component="h3" color="error">Incorrect login details</Typography>
              </Box> : null}
              {loading ?
                <Box display="flex" justifyContent="center">
                  <Rings height="50" width="50" color={themeOptions.palette.primary.main} />
                </Box>
                :
                <Button
                  type="submit"
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

              }


              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}