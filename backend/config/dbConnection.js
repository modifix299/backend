const mongoose = require('mongoose');

// to query the database with invalid or unknown fields
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;