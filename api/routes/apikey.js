const express = require('express');
const router = express.Router();
const User = require('../models/User');
const cryptoRandomString = require('crypto-random-string');
const jwtVerify = require('../config/jwtVerify');

router.get('/genapikey',jwtVerify,(req, res) => {
    API_KEY = cryptoRandomString({length: 10, type: 'base64'});
    User.updateOne({_id: req.id},{apikey:API_KEY})
    .then( _ => {
        console.log('api key generated.');
        res.status(200).send(API_KEY);
    }).catch((err) => {
        res.sendStatus(400);
    })
  
})

router.get('/getapikey',jwtVerify,(req, res) => { 
    User.findOne({_id: req.id})
    .then((user) => {
         res.status(200).send(user.apikey);
    }).catch((err) => {
        res.sendStatus(400);
    })
})
module.exports = router;