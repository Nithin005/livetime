const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwtVerify = require('../config/jwtVerify')

router.get('/validate',jwtVerify,(req,res) =>
  {
    res.sendStatus(200);
  }
);

module.exports = router;