const express = require('express')

const configDB = require('./mongoDB/config')

const PORT = 8000;
const app = express();
configDB.connectDB();


app.listen(PORT, async () => {
    try {
        console.log('Server is listening')
        await configDB.populateDB()
    } catch (err) {
        console.error('Error fetching init data');
    }
})