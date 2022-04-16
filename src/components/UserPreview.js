import { Avatar, Chip } from '@mui/material'
import React from 'react'

export default function UserPreview(props) {



  return (
    <Chip
    avatar={
    <Avatar 
    alt={props.user.username.toUpperCase()} 
    src="http://127.0.0.1:8000/static/profile.jpg"
    onClick={() => console.log("avatar click")}
    />
    }
    onClick={() => console.log("User clicked")}
    label={props.user.first_name + " " + props.user.last_name}
    variant="outlined"
    sx={props.sx}
  />
  )
}
