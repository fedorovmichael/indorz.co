const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.urlencoded({ extended: false }));
app.use( cors({origin: '*'}) );
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));


//general route
app.use('/', indexRouter);

//users route
app.use('/', usersRouter);
app.use('/login', usersRouter);
app.use('/registration', usersRouter);

const server = app.listen(process.env.PORT || 3003, (err) => {
    console.log("users - listening on port: 3003..."); 
});

module.exports = app;
