import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetchedData } from '../customHooks/useFetchData'
import Loading from '../utils/Loading'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProfileAvatar from '../components/ProfileAvatar';
export default function Profile(props) {
    const params = useParams()
    const username = params.username;
    const {fetchedData: profile, loading} = useFetchedData(`http://127.0.0.1:8000/profiles/user/${username}`)
  return (
    <div>

        {console.log(username)}
        {profile ? (
        <div>
          <div>Exit</div>
          <div>Profile</div>
          <div>Settings</div>
        </div>
        ) : (<Loading></Loading>)}


    </div>
  )
}
