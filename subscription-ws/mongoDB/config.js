const mongoose = require('mongoose');

const membresRepo = require('../repositories/memebersRepo')
const moviesRepo = require('../repositories/moviesRepo')
const Member = require('../models/memberModel')
const Movie = require('../models/movieModel')


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/SubscriptionsDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

const populateDB = async () => {
    try {
        const {data: members} = await membresRepo.populateMemebers();
        const movies = await moviesRepo.populateMovies()

        // members.forEach(member => {
        //     const newMember = new Member(member)
        //     newMember.save().catch(err => console.error('Error saving member: ', err))
        // });

        // movies.forEach(movie => {
        //     const newMovie = new Movie(movie)
        //     newMovie.save().catch(err => console.error('Error saving movie: ', err))
        // })

        Member.insertMany(members).catch(err => console.error('Error saving member: ', err))
        Movie.insertMany(movies).catch(err => console.error('Error saving movie: ', err))

    } catch (err) {
        console.error(err)
        throw new Error('Failed populating DB.')
    }
}

module.exports = {
    connectDB,
    populateDB
}
