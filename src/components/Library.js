import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import albumData from './../data/albums';
import './Library.css';


class Library extends Component {
  constructor(props){
    super(props);
    this.state = {albums: albumData};
  }
   render() {
    return (
      <div className = "root">
        <Grid container spacing={24}>
        {
          this.state.albums.map((album, index) =>
            <Grid item>
              <Card className="card">
                <CardActionArea component = {Link} to= {`/album/${album.slug}`}>
                  <CardMedia
                    className="media"
                    image={album.albumCover}
                    title={album.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {album.title}
                    </Typography>
                    <Typography component="p">
                      {album.artist}
                    </Typography>
                    <Typography component="p">
                      {album.songs.length} songs
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        }
        </Grid>
      </div>
     );
   }
 }

export default Library;
