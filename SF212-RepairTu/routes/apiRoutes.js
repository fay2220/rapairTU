const express = require('express');
const login = require('./login');
const request = require('./request');
const logout = require('./logout');
const router = express();
const authenticateToken = require('./authenticateToken');


router.get('/requests', request);
router.post('/createRequest', request);
router.post('/login', login);
router.post('/login/token', login);
router.get('/requests/login', request);
router.post('/logout', logout)


module.exports = router;