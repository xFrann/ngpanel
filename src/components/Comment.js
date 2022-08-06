import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ProfileAvatar from './ProfileAvatar';
import { NotificationsPausedTwoTone } from '@mui/icons-material';

export default function Comment(props) {

  const { comment } = props;
  const { user, date, content } = comment;

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <ProfileAvatar username={user}></ProfileAvatar>
        </ListItemAvatar>
        <ListItemText
          secondary={<Typography variant="body2" sx={{fontSize: '0.8rem'}}>{date}</Typography>}
          primary={
            <React.Fragment>
              <Typography component="span" sx={{fontWeight: '500',}}>{user}</Typography>
              <Typography component="span" sx={{ margin: '0%', }}>  {content}</Typography>
              
              
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}