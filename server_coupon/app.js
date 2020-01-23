var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var couponRouter = require('./routes/coupon');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin: '*'}));
app.use(express.static(path.join(__dirname, 'client/build')));

//general route
app.use('/', indexRouter);

//coupon route
app.use('/', couponRouter);
app.use('/send_coupon', couponRouter);

const server = app.listen(process.env.PORT || 3002, (err) => {
    console.log("coupons - listening on port: 3002..."); 
});

module.exports = app;
