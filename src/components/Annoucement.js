import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserPreview from './UserPreview';
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

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const {fetchedData: comment, loading} = useFetchedData(`http://127.0.0.1:8000/announcements/${props.id}/comments/`)

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={
            <ProfileAvatar></ProfileAvatar>
        }
        title={props.title}
        subheader={props.date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {props.content}
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
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comentarii</Typography>
          {loading ? <p>"loading..."</p> : comment.map((object, i) => <Comment user={props.user} date={comment[i].date} comment={comment[i].content}></Comment>)}
        </CardContent>  
      </Collapse>
    </Card>
  )
}
