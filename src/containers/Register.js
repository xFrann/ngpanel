import { Alert, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { validateCode } from '../actions/register'
import Notification from '../components/notifications/Notification'


export default function Register() {

  const [code, setCode] = React.useState('')
  const [valid, setValid] = React.useState(false)
  const [full, setFull] = React.useState(false)
  const [redirect, setRedirect] = React.useState(false)
  
  useEffect(() => { 
    if (full) {
      validateCode(code).then(res => {
        if (res.success) {
          setValid(true)
          localStorage.setItem('code', code)
          setTimeout(() => setRedirect(true), 1000);
        } else {
          setValid(false)
        }
      })
    }

   }, [code, validateCode, valid])


  return (

    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
    >

        <Grid item xs={3}>
        <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label="Invite Code"
                name="code"
                autoFocus
                error={!valid && full}
                color={!valid ? null : full ? 'success' : null }
                onChange={e => {
                  setCode(e.target.value)
                  setFull(e.target.value.length == 6)
                }}
              />
          {valid ? <Notification severity='success'>Code is valid!</Notification> : full ? <Notification severity='error'>Invalid Code!</Notification> : null }
          {redirect ? <Navigate to="/registerProfile"></Navigate> : null}
        </Grid>   
    </Grid> 
  )
}
