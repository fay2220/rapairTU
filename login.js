const express = require('express');
const UsersMD = require('../models/user');
const router = express.Router();


//user auth
router.post('/login', async (req, res) => {
    try {
        const check = await UsersMD.findOne({email: req.body.email});
        if (!check) {
            res.json({ message: "Email not found."});
        }
        let ifPasswordMatch;

        if (check.password === req.body.password) {
            ifPasswordMatch = true;
        } else {
            ifPasswordMatch = false;
        }

        if (!ifPasswordMatch) {
            res.json({ message: "Password incorect."});
        } else {
            res.json({ message: "Success"});
        }
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;