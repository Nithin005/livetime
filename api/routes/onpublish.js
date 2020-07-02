const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/onpublish',(req, res ) => {
    const API_KEY = (req.body.name).toString();
    console.log(API_KEY);
    if(API_KEY)
        {console.log('hi');
            User.findOne({apikey: API_KEY})
            .then(user => {
                if(user !== null)
                {   console.log('hi');
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(400);
                }
            })
            
        }
    else{
    res.sendStatus(400);
    }
})

module.exports = router;