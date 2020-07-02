const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/:sname', (req, res) => {
    User.findOne({username: req.param.sname})
    .then((user) => {
         
    })
   
})

module.exports = router;