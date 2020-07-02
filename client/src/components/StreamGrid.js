import React from 'react';
import axios from 'axios';
import config from '../config/config'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';



const useStyles = theme => ({
    root: {
        padding: 25,
        flexGrow: 1,
    },
 thumbnail: {
     maxWidth: '300px',
     width:'100%',
     height: 'auto',
     display: 'block'
 },
 streamLabel: {
     position: 'absolute',
     bottom: '10px',
     left: '20px',
     color: 'white',
     backgroundColor: 'black',
     fontSize: '20px',
     padding: '2',
     padding: '2px 8px',
      
 },
 container: {
    position: 'relative',
    
 },
 liveLabel: {
    position: 'absolute',
    top: '10px',
    left: '20px',
    backgroundColor: 'red',
    color: 'white',
    padding: '1px 5px'
 }
   
});

const objectMap = (obj, fn) =>
    Object.fromEntries(
        Object.entries(obj).map(
            ([k, v], i) => [k, fn(v, k, i)]
        )
    )

class StreamGrid extends React.Component {

    state = {
        streams: [],
    }
    componentDidMount() {
        this.getStreams();
    }

    getStreams = () => {
        axios.get(config.apiUrl + '/api/streams').then(res => {
            this.setState({
                streams: res.data
            });
            console.log(this.state.streams);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const { classes } = this.props;
        const streams = this.state.streams;
        return (
            <div className={classes.root}>
            <Grid>
                {this.state.streams.map((tile) => (
                    <Link to={config.apiUrl+'/live/'+tile+'/index.m3u8'}>
                    <Grid item>
                        <div className={classes.container}>
                        <img className={classes.thumbnail} src={config.apiUrl+'/thumbnails/'+tile+'.png'} />
                                <span className={classes.liveLabel}>LIVE</span>
                                <span className={classes.streamLabel}>{tile}</span>
                        </div>
                    </Grid>
                    </Link>
                ))}
            </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(StreamGrid);