const express = require('express');
const router = express.Router();
const { register,login,create,list } = require('../Controllers/auth');

router.get('/user',list) //ดู studentID และ Password
router.post('/register',register) //post คือ หน้าบ้านส่งข้อมูลมาหลังบ้าน ส่วน get คือ ร้องขอข้อมูล
router.post('/register',create);
router.post('/login',login);


module.exports = router;
