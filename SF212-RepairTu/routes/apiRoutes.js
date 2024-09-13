const express = require('express');
const login = require('./login');
const request = require('./request');
const router = express();
const authenticateToken = require('./authenticateToken');


router.get('/requests', request);
router.post('/createRequest', request);
router.post('/login', login);
// router.get('/requests/login', request);

module.exports = router;