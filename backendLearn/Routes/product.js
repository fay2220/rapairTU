const express = require('express');
const router = express.Router() //เป็นฟังก์ชันของ expressjs
const {read,list,create,update,remove} = require('../Controllers/product'); //import การทำงานที่เกี่ยวกับ product จากไฟล์ Controller มา

const { auth } = require('../Middleware/auth');
const {upload} = require('../Middleware/upload');

//อยากให้ api ไหน ต้อง login ก่อน ก็ใส่ middleware
router.get('/product',list);//เมื่อมีการเรียกใช้ มันจะทำงานฟังก์ชัน auth ก่อน ว่าผ่านไหม ถ้าผ่านก็ไปต่อ
router.get('/product/:id',auth,read); 
router.post('/product',auth,upload,create) //login --> upload --> save
router.put('/product/:id',auth,update);

//router.delete('/product',(req,res)=>{
//   res.json({name:'fay',age:19})
//}) -->
router.delete('/product/:id',remove);

module.exports = router //export เพื่อให้ไฟล์อื่นเอาไปใช้ได้




//ข้อมูลเข้ารหัสแล้ว req.body หาไม่เจอ