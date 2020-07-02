const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config/config');
const { response } = require('express');
const xml2js = require('xml2js');
const User = require('../models/User')


router.get('/streams',(req, res) => {
    axios.get(config.rtmp+'/stat')
    .then((response) => {
        xml2js.parseStringPromise(response.data)
        .then(async (result) =>  {
            console.log(result.rtmp.server[0].application[0].live[0].stream);
            var apikeys = [];
            var streams = [];
            (result.rtmp.server[0].application[0].live[0].stream)
            .forEach((stream) => {
                apikeys.push(stream.name[0]);
            })
            User.find({apikey: apikeys})
            .then((users) => {
                users.forEach((user) => {
                    streams.push(user.username.toString());
                })
                res.status(200).send(streams);
            })    
        })
        .catch((error) => {
            console.log('xml2js: ',error);
            res.sendStatus(500);
        })
    })
    .catch((error) => {
        console.log('axios: ', error);
        res.sendStatus(500);
    })
})

module.exports = router;