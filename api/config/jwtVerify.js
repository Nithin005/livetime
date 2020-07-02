const jwt = require('jsonwebtoken');
const jwtSecret = require('./config');
const User = require('../models/User');


module.exports = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, jwtSecret.secret, (err, data) => {
            if(err)
            {
                res.sendStatus(403);
            }
            else
            {  
               User.findOne({ _id: data.id },).then((user) => {
                   if(user)
                    {
                        req.id = data.id;
                        next();
                    }
                    else
                    {
                        res.sendStatus(403);
                    }
               })
            }
        })
       
       // next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}