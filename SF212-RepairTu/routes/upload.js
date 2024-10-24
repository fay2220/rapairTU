const express = require('express');
const UploadM = require('../models/upload');
const authenticateToken = require('./authenticateToken');
const multer = require('multer')
const router = express();

//multer config
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './repairtuImage');
    },
    filename: function (req, file, callback) {
        const fileName = file.originalname
        let dotIndex = fileName.indexOf(".");
        let subString = fileName.substring(0, dotIndex);
        let fileType = "."+fileName.substring(dotIndex+1);
        callback(null, subString + "_" +req.username + fileType);
    }
})

const upload = multer({ storage });

//insert request json from frontend to database
// upload.array('name must be match with frontend name')
router.post('/upload', upload.array('image'), async (req, res) => {
    const request = req.body;
    console.log("request", request);
    try {
        const insertData = await UploadM.insertMany(request);
        console.log("insertData Success\n"+insertData);
        res.status(201).json({ message: "success"});
    } catch (err) {
        console.error(err);
        res.status(500);
    }
})

router.get('/upload', async (req, res) => {
    try {
        const requests = await UploadM.find();
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/upload/login', authenticateToken, (req, res) => {
    res.json(req.user);
})

module.exports = router;