import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import config from './config/config';
import StreamGrid from './components/StreamGrid'
import Settings from './components/Settings';
import {
  Switch,
  Route,
} from "react-router-dom";
import api from './config/api'



const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
});


class App extends React.Component {

  state={
    isLoggedIn: false,
  }
  componentDidMount() {

    api.get('/user/validate',{enableReq: true})
    .then((res)=> {this.setState({isLoggedIn: true});})
    .catch((err)=> console.log(err));
  }

  handleLogout = (event) => {
       localStorage.removeItem('JWT');
       this.setState({
         isLoggedIn: false,
       });
  }


  render() {
    const { classes } = this.props;
    let buttons;
    if(!this.state.isLoggedIn)
    {
      buttons = (<React.Fragment>
           <Button href="/login" color="inherit">Login</Button>
          <Button href="/register" color="inherit">Register</Button>
      </React.Fragment>);
    }
    else{
      buttons = <Button onClick={this.handleLogout} color="inherit">Logout</Button>
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                LiveTime
                  </Typography>
             {buttons}
            </Toolbar>
          </AppBar>
          <Switch>
              <Route path='/' exact component={StreamGrid} />
              <Route path='/user/settings' exact component={Settings} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(App);