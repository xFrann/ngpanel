import { Avatar } from '@mui/material'
import React from 'react'

export default function ProfileAvatar(props) {

    const profile_pic = "http://127.0.0.1:8000/static/profile.jpg"

  return (
    <Avatar src={profile_pic} onClick={() => console.log("test")}></Avatar>
  )
}
