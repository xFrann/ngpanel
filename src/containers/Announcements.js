import { Grid } from '@mui/material';
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Annoucement from '../components/Annoucement';
import { useFetchedData } from '../customHooks/useFetchData';
import Loading from '../utils/Loading';



export default function Annoucements(props) {

    const user = useOutletContext()
    const {fetchedData: announcement, loading} = useFetchedData("http://127.0.0.1:8000/announcements/")
    
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    style={{ minHeight: '100vh' }}
    >
      {loading ? <Loading></Loading> : 
      announcement.map((k,i) => <Annoucement id={announcement[i].id} user={user} title={announcement[i].title} date={announcement[i].date} content={announcement[i].content} />)}
    </Grid>
    // 
  );
}
