require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000


connectDB();

//app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

//Routes-Section
app.use('/users', require('./routes/userRoutes'));

//Routes-Section

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
});

mongoose.connection.on('error', err => {
    console.log(err)
    //logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
});