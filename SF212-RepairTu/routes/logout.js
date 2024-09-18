const express = require('express');
const router = express();

router.post('/logout', (req, res) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    window.location.href = '/login';
})

module.exports = router;