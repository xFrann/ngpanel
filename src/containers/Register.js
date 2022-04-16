import { Grid, TextField } from '@mui/material'
import React from 'react'

export default function Register() {
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
                // onChange={e => onChange(e)}
                autoFocus
              />
        </Grid>   
   
    </Grid> 
  )
}
