/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = require('../config/config');
const User = require('../models/User');
const express = require('express');
const router = express.Router();
/**
 * @swagger
 * /loginUser:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Logs in a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - username
 *           - password
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */


  router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, users, info) => {
      if (err) {
        console.error(`error ${err}`);
      }
      if (info !== undefined) {
        console.error(info.message);
        if (info.message === 'email not found') {
          res.status(401).send(info.message);
        } else {
          res.status(403).send(info.message);
        }
      } else {
        req.logIn(users, () => {
          User.findOne({
            
              email: req.body.email,
            
          }).then(user => {
            //console.log(user.id);
            const token = jwt.sign({ id: user.id }, jwtSecret.secret, {
              expiresIn: 60 * 60,
            });
            res.status(200).send({
              auth: true,
              token,
              message: 'user found & logged in',
            });
          });
        });
      }
    })(req, res, next);
  });


  module.exports = router;