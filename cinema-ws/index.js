const express = require('express')

const configDB = require('./mongoDB/config')

const PORT = 8080;
const app = express();
configDB.connectDB();


app.listen(PORT, async () => {
    console.log('Server is listening')
})