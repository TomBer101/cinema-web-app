const express = require('express')
const session = require('express-session')
const configDB = require('./mongoDB/config')

const authRouter = require('./routes/authRouter')

const PORT = 8080;
const app = express();
configDB.connectDB();

app.use(express.json())

app.use(session({
    secret: 'dummy-secret',   // Replace with a secure key
    resave: false,
    saveUninitialized: false,
        // Default session duration (e.g., 1 minute), can be adjusted
}));

app.use('/api/auth', authRouter)




app.listen(PORT, async () => {
    console.log('Server is listening')
})