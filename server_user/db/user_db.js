const mongoose = require('mongoose');
const userModel = require('../models/user_model');
const user = mongoose.model('user');
const trackingModel = require('../models/tracking_model');
const tracking = mongoose.model('tracking_list');
const userDB = {};
const config = require('../config');

userDB.conn = () => {   
    mongoose.connect(config.connectionString);
};