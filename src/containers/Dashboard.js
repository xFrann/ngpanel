import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { logout } from '../actions/auth'
import { useFetch } from '../customHooks/useFetch';
import Loading from '../utils/Loading';
import { themeOptions } from '../utils/Theme'
export default function Dashboard(props) {


  const navigate = useNavigate()


  const {user, loading} = useFetch()


  const handleLogout = e => {
    logout().then(res => {
      res ? navigate('/') : console.log("error")
    })
  }

  return (
      <>
    {user ? 
    (
      <ThemeProvider theme={createTheme(themeOptions)}>
          
      </ThemeProvider>
    )
    : 
      <Loading /> 
    }
      <button onClick={e => handleLogout(e)}>Logout</button>

    </>
  )
}
