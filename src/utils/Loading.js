import React from 'react'
import { CircularProgress } from '@mui/material'
import { Grid } from '@mui/material'

export default function Loading() {
  return (
    <Grid container justifyContent = "center" spacing={0} alignItems="center" style={{ minHeight: "100vh" }}>
      <CircularProgress />
    </Grid>
  )
}
