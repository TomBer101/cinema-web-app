const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name : {require : true, type : String},
    email : String,
    city : String,
})

module.exports = mongoose.model('member', memberSchema);