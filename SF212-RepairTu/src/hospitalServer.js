const express = require('express');
const app = express();
const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    "message": String
}, { collection: "testest" })

const hospitalModel = mongoose.model('testest', hospitalSchema);

const connectDB = async () => {
    try {
        //local url
        const conn = await mongoose.connect("mongodb://localhost:27017/test2");
        const data = await hospitalModel.find();
        console.log(data);
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