require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConnection');
const mongoose = require('mongoose');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 8000


app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(errorHandler)

//Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/admin/auth', require('./routes/adminAuthRoutes.js'));
 
connectDB().then(()=>{
    console.log('Connected to MongoDB');
});

app.listen(PORT,() => {
    console.log(`Server Running On Port ${PORT} `);
});

