import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotesIcon from '@mui/icons-material/Notes';
import ProfileAvatar from './ProfileAvatar';
import { useFetchedData } from '../customHooks/useFetchData';
import Comment from './Comment';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function Annoucement(props) {
    const [expanded, setExpanded] = React.useState(false);
    const { announcement } = props;
    const { id, title, date, content, user } = announcement;
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const {fetchedData: comment, loading} = useFetchedData(`http://127.0.0.1:8000/announcements/${id}/comments/`)
    

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={
            <ProfileAvatar username={user}></ProfileAvatar>
        }
        title={title}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <NotesIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" >
        <CardContent>
          {loading ? <p>"loading..."</p> :
           comment.map((object, i) => <Comment key={`comment_${i}`} comment={comment[i]}></Comment>)}
        </CardContent>  
      </Collapse>
    </Card>
  )
}
