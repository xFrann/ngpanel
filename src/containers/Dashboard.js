import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { logout } from '../actions/auth'
import Loading from '../utils/Loading';
import { themeOptions } from '../utils/Theme'
import PersistentDrawerLeft from './SideNav';
import UserPreview from '../components/UserPreview';
import { useFetchedData } from '../customHooks/useFetchData';
import { isCSRFTokenSet } from '../components/CSRFToken';

export default function Dashboard(props) {


  const navigate = useNavigate()

  const {fetchedData: user, loading} = useFetchedData("http://127.0.0.1:8000/accounts/get_user")
  
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
          <PersistentDrawerLeft user={user} />
          <UserPreview user={user} sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }} />
      </ThemeProvider>
    )
    : 
      isCSRFTokenSet() ? <Loading /> : <Navigate to="/"></Navigate>
    }
      <button onClick={e => handleLogout(e)}>Logout</button>
      
    </>
  )
}

