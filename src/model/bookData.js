const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LibraryApp');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    imageUrl: String,
    title : String,
    author: String,
    about: String
});

const Bookdata = mongoose.model('Book',BookSchema);

module.exports = Bookdata;