const express = require('express')
const session = require('express-session')
const cors = require('cors');
const configDB = require('./mongoDB/config')

const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/usersRouter')
const moviesRouter = require('./routes/moviesRouter')
const membersRouter = require('./routes/membersRouter')
const subscriptionRouter = require('./routes/subscriptionRouter')

const authMiddleware = require('./middlewares/authMiddlewares')

const PORT = 8080;
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Adjust the origin if necessary
configDB.connectDB();

app.use(express.json())

app.use(session({
    secret: 'dummy-secret',   // Replace with a secure key
    resave: false,
    saveUninitialized: false,
        // Default session duration (e.g., 1 minute), can be adjusted
}));

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/members', membersRouter)
app.use('/api/subscription', subscriptionRouter)

app.get('/test',(req, res) => {
    res.status(200).json({message: 'harray'})
} )


app.listen(PORT, async () => {
    console.log('Server is listening on port: ', PORT)
})

//admin 1234
//tester 12345