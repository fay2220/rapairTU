const express = require('express');
const RequestM = require('../models/request');
const authenticateToken = require('./authenticateToken');
const router = express();

//insert request json from frontend to database
router.post('/createRequest', async (req, res) => {
    const request = req.body;
    try {
        const insertData = await RequestM.insertMany(request);
        console.log("insertData Success\n"+insertData);
        res.status(201).json({ message: "success"});
    } catch (err) {
        console.error(err);
        res.status(500);
    }
})

router.get('/requests', async (req, res) => {
    try {
        const requests = await RequestM.find();
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/requests/login', authenticateToken, (req, res) => {
    res.json(req.user);
})

module.exports = router;