import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import config from '../config/config';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import api from '../config/api';
import { Paper, Typography } from '@material-ui/core';
import './Settings.sass'



const useStyles = theme => (
    {

    }
);


class Settings extends React.Component {

    state = {
        apiKey: '',
    }

    componentDidMount() {
        api.get('/api/getapikey', { enableReq: true })
            .then(res => {
                console.log(res.data);
                this.setState({
                    apiKey: res.data,
                })

            })
            .catch(err => console.log(err));
    }

    handlegenapikey = e => {
        api.get('/api/genapikey', { enableReq: true })
            .then(res => {
                console.log(res.data);
                this.setState({
                    apiKey: res.data,
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <React.Fragment>
                <div className='title'>
        <Typography variant='h5'>Stream Settings</Typography>
      </div>
      <Paper className='paper'>
      <div>
        <Typography>
          Api Key
        </Typography>
        <TextField variant='outlined' size='small' label='Api Key' value={this.state.apiKey} ></TextField>
        <Button variant='contained' color='primary' onClick={this.handlegenapikey}>Generate Api Key</Button>
        </div>
        <div>
        <Typography>Stream Name</Typography>
        <TextField variant='outlined' size='small' label='Enter Stream Name'></TextField>
        </div>
        <div>
        <Typography>Game Name</Typography>
        <TextField variant='outlined' size='small' label='Enter Game Name'></TextField>
        </div>
        <div>
          <Button variant='contained' color='primary'>Save</Button>
        </div>
      </Paper>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(Settings);

