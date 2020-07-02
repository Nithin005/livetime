/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const bcrypt = require('bcrypt');

const jwtSecret = require('./config');

const BCRYPT_SALT_ROUNDS = 10;
// eslint-disable-next-line prefer-destructuring


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    (req, email, password, done) => {
      console.log(email);

      try {
        User.findOne({ email: email },).then(user => {
          if (user != null) {
            console.log('username or email already taken');
            return done(null, false, {
              message: 'username or email already taken',
            });
          }
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
            User.create({
              username: req.body.username,
              password: hashedPassword,
              email: email,
              apikey: '',
            }).then(user => {
              console.log('user created');
              return done(null, user);
            });
          });
        });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      try {
        User.findOne({
         email : email
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: 'email not found' });
          }
          bcrypt.compare(password, user.password).then(response => {
            if (response !== true) {
              console.log('passwords do not match');
              return done(null, false, { message: 'passwords do not match' });
            }
            console.log('user found & authenticated');
            return done(null, user);
          });
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      
      User.findOne({
        
          _id: jwt_payload.id,
        
      }).then(user => {
        
        if (user) {
          console.log('user found in db in passport');
          
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);
