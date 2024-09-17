require("dotenv").config();
const express = require('express');
const route = require('../routes/apiRoutes')
const app = express();
const Users = require("../models/user");
const { connectAppDB } = require('./dbconfig');
// const insertRandomUsers = require('../models/insertRandomUsers')

//tell express to use json
app.use(express.json());
//connect database
connectAppDB();



app.get('/users', async (req, res) => {
    try {
        const users = await Users.find();
        // console.log(users);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await Users.findOne({ _id: userId});
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.use("/api", route);

app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log("Server connected...");
});