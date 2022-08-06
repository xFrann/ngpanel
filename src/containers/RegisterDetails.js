import { Button, Container, CssBaseline, TextField, Grid, Box, Avatar, Input, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from '../utils/Theme';
import { PhotoCamera } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { registerProfile } from '../actions/register';
import { login } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';
import Notification from '../components/notifications/Notification';
export default function RegisterDetails(props) {

    const location = useLocation();
    const navigate = useNavigate()
    const regProfile = location.state.profile;

    regProfile.first_name = "";
    regProfile.last_name = "";
    regProfile.phone = "";
    regProfile.file = "";

    const [profile, setProfile] = useState(regProfile);
    const [registerError, setRegisterError] = useState(false)

    const onRegisterClick = (e) => {
        e.preventDefault()
        registerProfile(profile).catch(err => {setRegisterError(true)})
        login(profile.username, profile.password)
        .then(() => navigate('/'))
        .catch(err => setRegisterError(true))   

    }

    useEffect(() => {
        if (registerError) {
            setRegisterError(false)
        }
    }, [])


    return (
        <ThemeProvider theme={createTheme(themeOptions)}>
        {registerError ? <Notification message="Registration failed" /> : null}
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

        <ImageUpload setProfile={setProfile} profile={profile}></ImageUpload>
          <Box component="form" noValidate onSubmit={(e) => onRegisterClick(e)} sx={{ mt: 3 }}>
          <CSRFToken></CSRFToken>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field type="name" id="first_name" label="First Name" onChange={(e) => setProfile({...profile, [e.target.name]: e.target.value})} />
              </Grid>
              <Grid item xs={12}>
                <Field type="name" id="last_name" label="Last Name" onChange={(e) => setProfile({...profile, [e.target.name]: e.target.value})}  />
              </Grid>
              <Grid item xs={12}>
                <Field type="phone" id="phone" label="Phone Number" onChange={(e) => setProfile({...profile, [e.target.name]: e.target.value})} />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Register
            </Button>
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
        fullWidth
      />
    )
  }
  export const ImageUpload = (props) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const Input = styled('input')({
        display: 'none',
      });
    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        props.setProfile({...props.profile, file: e.target.files[0]})
    }

    return (
        <div>
            {selectedFile ? 
            <Avatar sx={{width: 150, height: 150}} src={preview}>
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={onSelectFile}/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                </label>
            </Avatar> :
             <Avatar sx={{width: 150, height: 150}}>
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={onSelectFile}/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                </label>
            </Avatar> 
            }

            
        </div>
    )
}
