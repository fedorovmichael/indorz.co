const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},   
    password: {type: String, require: true},
    enable: {type: Boolean, require: true, default: true}   
})

module.exports = mongoose.model('user', UserSchema);