const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LibraryApp');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    emailId: String,
    password: String
});

var Userdata = mongoose.model('User',UserSchema);
module.exports = Userdata;