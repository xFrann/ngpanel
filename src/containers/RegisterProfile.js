import React, { useEffect } from 'react'
import { emailExists, registerProfile, userExists, validateCode } from '../actions/register';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button }  from '@mui/material';
import { themeOptions } from '../utils/Theme'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function RegisterProfile() {

  const navigate = useNavigate()

    let register_profile = {
        username: '',
        password: '',
        re_password: '',
        email: '',
        receive_announcements: false,
    }

    const [profile, setProfile] = React.useState(register_profile);
    const [passwordError, setPasswordError] = React.useState(false);
    const [usernameError, setUsernameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [codeError, setCodeError] = React.useState(false);

    const onChange = e => {

      setProfile({...profile, [e.target.name]: e.target.value})

      if (e.target.name === "username") {
        // check if username is already taken
        doesExist(e.target.value, userExists, setUsernameError);
      }
      if (e.target.name === "email") {
        // check if email is valid or/and already taken
        validateEmail(e.target.value, emailExists, setEmailError);
      }
    }

    const next = (e) => {
      e.preventDefault();
      if (isFormInvalid(usernameError, emailError, passwordError, codeError)) return;
      navigate('/registerDetails', {state: { profile }});
    }

    useEffect(() => {

      if (profile.password !== profile.re_password) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      
      const code = localStorage.getItem('code')
      if (code !== null) {
        validateCode(code).then(res => {
          setCodeError(res.error);
        })
      } else {
        setCodeError(true);
      }

      if (codeError) {
        navigate('/register')
      }
    });


  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
    <Container component="main" maxWidth="xs">
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
        Sign up
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field type="username" id="username" label="Username" error={usernameError} onChange={(e) => onChange(e)} />
          </Grid>
          <Grid item xs={12}>
            <Field type="text" id="email" label="Email Address" autoComplete="email" error={emailError} onChange={(e) => onChange(e)}  />
          </Grid>
          <Grid item xs={12}>
            <Field type="password" id="password" label="Password" autoComplete="new-password" error={false} onChange={(e) => onChange(e)} />
          </Grid>
          <Grid item xs={12}>
            <Field type="password" id="re_password" label="Confirm Password" autoComplete="new-password" error={passwordError} onChange={(e) => onChange(e)} />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Receive important Announcements on Email."
              onChange={(e) => setProfile({...profile, receive_announcements: e.target.checked})}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={next}
        >
          Next
        </Button>
        {usernameError ? <Typography variant="body2" color="error">Username already taken</Typography> : null}
        {passwordError ? <Typography variant="body2" color="error">Passwords do not match</Typography> : null}
        {emailError ? <Typography variant="body2" color="error">Email invalid or already in use</Typography> : null}
      </Box>
    </Box>
  </Container>
  </ThemeProvider>
  )
}



const Field = (props) => {
  return (
    <TextField
      required
      error={props.error}
      id={props.id}
      type={props.type}
      label={props.label}
      name={props.id}
      onChange={props.onChange}
      autoComplete={props.autoComplete}
      fullWidth
    />
  )
}


const isValid = (email) => {
  const reg = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
  if (!reg.test(email) && email !== '') {
    return false;
  }
  return true;
}

const validateEmail = (value, fun, setfun) => {
  setTimeout(() => {
    if (isValid(value)) {
      fun(value)
      .then(res => {
        if (res.success) {
          setfun(true);
        } else { setfun(false); }
      })
      .catch(err => {
        setfun(true);
      }
      )
    } else {
      setfun(true);
    }
  }, 500);
}

const doesExist = (value, fun, setfun) => {
  setTimeout(() => {
    if (value !== '') {
      fun(value)
      .then(res => {
        if (res.success) {
          setfun(true);
        } else { setfun(false); }
      })
      .catch(err => {
        setfun(true);
      }
      )
    } else {
      setfun(false);
    }
  }, 500);
}

const isFormInvalid = (usernameError, emailError, passwordError, codeError) => {
  if (usernameError || emailError || passwordError || codeError) {
    return true;
  }
  return false;
}