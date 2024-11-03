const express = require('express')

const configDB = require('./mongoDB/config')

const moviesRoute = require('./routes/moviesRouter')
const membersRouter = require('./routes/membersRouter')

const PORT = 8000;
const app = express();
configDB.connectDB();

app.use(express.json())

app.use('/api/movies', moviesRoute)
app.use('/api/members', membersRouter)


app.use('/test', (req, res) => {
    res.json({message: 'subscription ws server'})
})

app.listen(PORT, async () => {
    try {
        console.log('Server is listening on port: ', PORT)
        await configDB.populateDB()
    } catch (err) {
        console.error('Error fetching init data');
    }
})