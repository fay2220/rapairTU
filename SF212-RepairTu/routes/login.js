require('dotenv').config();
const express = require('express');
const UsersMD = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const refreshTokenM = require('../models/refreshToken');


router.post('/login', async (req, res) => {
    try {
        // check user exit?
        const check = await UsersMD.findOne({email: req.body.email});
        if (!check) {
            res.status(404).json({ message: "Email not found."});
        }
        // console.log(check.username)
        if (check.password === req.body.password) {

            //user autherization
            const user = {userId: check._id.toString(), username: check.username, email: check.email};
            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            
            //refreshToken store in database for each user
            await insertRefreshToken(refreshToken, check._id.toString());

            //accessToken always store in client side
            res.json({ accessToken: accessToken });
        } else {
            res.status(401).json({ message: "Password incorect." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "error occurr" });
    }
})

// generate Access Token
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECERT, { expiresIn: '15s'});
}

// insert refresh token into database
async function insertRefreshToken(token, userId) {
    try{
        const tokenModel = [{ userId: userId, refreshToken: token }];
        const insertToken = await refreshTokenM.insertMany(tokenModel);
        console.log("insert success: \n"+insertToken);
    } catch (err) {
        console.log(err);
        throw new Error("Insert token error");
    }
}

module.exports = router;