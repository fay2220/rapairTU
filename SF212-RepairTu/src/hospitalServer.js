const express = require('express');
const app = express();
const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    userId: {
        type: String,
        // required: true
    },
    username: {
        type: String,
        // required: true
    },
    image_path: {
        type: String,
        // required: true
    },
    detail_message: {
        type: String,
        // required: true
    },
    location: {
        type: String,
        // required: true
    },
    request_status: {
        type: String,
        // required: true
    },
    request_time: {
        type: Date,
        // required: false,
        default: Date.now
    }
}, { collection: "testest" })

const hospitalModel = mongoose.model('testest', hospitalSchema);

const connectDB = async () => {
    try {
        //local url
        const conn = await mongoose.connect("mongodb://localhost:27017/test2");
        console.log("Hospital Database connected.")
    } catch (err) {
        console.error(err)
    }
}
connectDB();

//


app.listen(3001, () => {
    console.log("Hospital Server connected...");
});