import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserPictureURL } from '../actions/auth'

export default function ProfileAvatar(props) {

  const navigate = useNavigate()
  
    const [pictureUrl, setPictureURl] = useState("http://127.0.0.1:8000/static/default.svg")

    useEffect(() => {
      getUserPictureURL(props.username).then(res => {
        setPictureURl("http://127.0.0.1:8000" + res)
      })
    }, [])

    
  return (
    <Avatar 
    src={pictureUrl}
    onClick={() => navigate(`/dashboard/profile/${props.username}`)} 
    sx={props.sx}
    >

    </Avatar>
  )
}
