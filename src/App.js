import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 2,
  }
};

function App(props) {
const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Old Town Jams
          </Typography>
          <Button component = {Link} to='/' color="inherit">Home</Button>
          <Button component = {Link} to='/library' color="inherit">Library</Button>
        </Toolbar>
      </AppBar>
      <main>
        <Route exact path="/" component={Landing} />
        <Route path="/library" component={Library} />
        <Route path="/album/:slug" component={Album} />
      </main>
    </div>
  );
}

export default withStyles(styles)(App);
