const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jwtVerify = require('./config/jwtVerify');
const cors = require('cors');
//const utils = require('./utils/utils')
const config = require('./config/config')
const app = express();

mongoose
  .connect(
    config.monogodb,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./config/passport');
app.use(passport.initialize());
app.use((req,res,next) => {
    console.log(req.body);
    next();
});

app.use('/user',require('./routes/login'));
app.use('/user',require('./routes/register'));
app.use('/user',require('./routes/validate'));
app.use('/api',require('./routes/onpublish'));
app.use('/api',require('./routes/apikey'));
app.use('/api',require('./routes/streams'))



//app.get('/streams', jwtVerify, (req, res) => {
//    res.send('hi');
//})


//rtmp server

const PORT = process.env.PORT || 8000;
app.use(express.static('public'));
app.listen(PORT,() => {
    console.log(`Server is listening on ${PORT}`);
})






