var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var messageRouter = require('./routes/message');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin: '*'}));
app.use(express.static(path.join(__dirname, 'client/build')));

//general route
app.use('/', indexRouter);

//send message route
app.use('/', messageRouter);
app.use('/send_message', messageRouter);

const server = app.listen(process.env.PORT || 3001, (err) => {
    console.log("messaging - listening on port: 3001..."); 
});

module.exports = app;
