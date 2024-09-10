require('dotenv').config();
const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        //local url
        const conn = await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected.")
    } catch (err) {
        console.error(err)
    }
}

module.exports = connectDB;

