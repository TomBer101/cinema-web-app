const mongoose = require('mongoose');
const Movie = require('./movieModel')

const subscriptionSchema = new mongoose.Schema({
    memberId : {
        require : true,
        type : mongoose.Schema.Types.ObjectId,
        ref: 'member'
    },
    movies: [
        {
            movieId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'movie',
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

module.exports = mongoose.model('subscription', subscriptionSchema);