import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    margin: 50
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function Landing(props){
  const { classes } = props;
  return(
    <div className={classes.root}>
      <Typography variant = 'display2' align='center'gutterBottom> Turn the music up!</Typography>
        <Grid container spacing={24}>
          <Grid item>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="/assets/images/cards/01.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Choose your music
                </Typography>
                <Typography component="p">
                  The world is full of music; why should you have to listen to music that someone else chose?
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="/assets/images/cards/02.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Unlimited, streaming, ad-free
                </Typography>
                <Typography component="p">
                  No arbitrary limits. No distractions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="/assets/images/cards/03.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Mobile enabled
                </Typography>
                <Typography component="p">
                  Listen to your music on the go. This streaming service is available on all mobile platforms.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </div>
  );
}


export default withStyles(styles)(Landing);
