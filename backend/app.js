require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConnection');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000



app.use(express.json())
app.use(cookieParser())
app.use(errorHandler)

//Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'));
 
connectDB().then(()=>{
    console.log('Connected to MongoDB');
  });

app.listen(PORT,() => {
    console.log(`Server Running On Port ${PORT} `);
  });

