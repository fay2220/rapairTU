const express = require('express');
const login = require('./login');
const request = require('./request');
const router = express();


router.get('/requests', request);
router.post('/createRequest', request);
router.post('/login', login);

module.exports = router;