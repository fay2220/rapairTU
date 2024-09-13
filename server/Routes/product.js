const express = require('express');
const router = express.Router() //เป็นฟังก์ชันของ expressjs
const {read,list,create,update,remove} = require('../Controllers/product'); //import การทำงานที่เกี่ยวกับ product จากไฟล์ Controller มา

const { auth } = require('../Middleware/auth');
const {upload} = require('../Middleware/upload');

//อยากให้ api ไหน ต้อง login ก่อน ก็ใส่ middleware
router.get('/product',list);//เมื่อมีการเรียกใช้ มันจะทำงานฟังก์ชัน auth ก่อน ว่าผ่านไหม ถ้าผ่านก็ไปต่อ
router.get('/product/:id',read); 
router.post('/product',upload,create) //login --> upload --> save
router.put('/product/:id',upload,update); //ถ้ามีการเข้ารหัสข้อมูลต้องใช้ middleware ต้องใส่ method อัพโหลดเข้าไปด้วย เพราะมีไฟล์ส่งมา

//router.delete('/product',(req,res)=>{
//   res.json({name:'fay',age:19})
//}) -->
router.delete('/product/:id',remove);

module.exports = router //export เพื่อให้ไฟล์อื่นเอาไปใช้ได้




//ข้อมูลเข้ารหัสแล้ว req.body หาไม่เจอ
//สร้างไฟล์ใน middleware แล้ว export ตัวแปร upload ซึ่งเป็น method
//จากนั้น import เข้ามาในไฟล์นี้ เอาไปใส่ใน post create req.body จะสามารถอ่านข้อมูลได้แล้ว
//ไปที่ model product แล้วแก้ model
//ไปตั้งตัวแปร data ใน controller product ให้เก็บไฟล์เป็นรูปภาพได้
//แก้ไขใน create และ remove