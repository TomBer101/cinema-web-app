const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name : {require : true, type : String, unique: true},
    genres : [String],
    image : String,
    premiered: Date
})

module.exports = mongoose.model('movie', movieSchema);