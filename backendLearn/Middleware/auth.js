const jwt  = require('jsonwebtoken');

exports.auth = async(req,res,next) =>{ //middleware จะมี next คือไปต่อ
    try{
        const token = req.headers["authtoken"] //ชื่อต้องสื่อความหมาย และ ตรงกันกับหน้าบ้าน
        if(!token){
            return res.status(401).send("no token");
        }
        const decoded = jwt.verify(token,'jwtsecret'); //ยืนยัน token
        req.user = decoded.user; //decode ผ่าน สร้างตัวแปรมาเก็บ
        next();


    }
    catch(err){
        res.status(500).send("token invalid");
    }
}