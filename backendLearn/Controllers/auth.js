const Users = require('../Models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');//ให้token user ไป จะกำหนดให้ อยู่กี่นาทีก็ได้
const { token } = require('morgan');

exports.register = async(req,res) => {
    try{ //ต้องจับ error ไว้ เพราะ nodejs ถ้ามี error แล้ว server มันจะ stop

        // 1.Check user ว่าเคยมีใน database หรือยัง
        const { StudentID,Password } = req.body; // ต้อง destructering คือ การดึงข้อมูลออกมา
        var user = await Users.findOne({ StudentID }) //ถ้าไม่่มีข้อมูล คือเป็น null ถ้าไม่มีก็ส่งไปบันทึกเลย
        if(user){
            return res.send("This Student ID has already use.").status(400);
        }
        
        console.log(user);
//------------------------------------------------------------------------------------------------------
        //2.Encrypt คือ การเข้ารหัส
        const salt = await bcrypt.genSalt(10); //ได้รหัสมั่วๆ มา เช่น $2a$10$v2YYutyyKVvZI แล้วเอาไปผสมกับรหัสของเรา
        user = new Users({
            StudentID,
            Password
        })
        console.log(salt)
        user.Password = await bcrypt.hash(Password,salt) //เอา salt ไปผสมกับ password
        console.log(user)
//------------------------------------------------------------------------------------------------------
        //3.save
        await user.save()
        res.send("Register Success"); //ร้องขอข้อมูล
    }
    catch(err){
        res.send(err);
    }
}

exports.login = async(req,res) => {
    try{ //ต้องจับ error ไว้ เพราะ nodejs ถ้ามี error แล้ว server มันจะ stop
        //1.check password ว่าถูกต้องไหม
        const { StudentID,Password } = req.body;
        var user = await Users.findOneAndUpdate({StudentID},{new:true});
        if (user){
            const password_correct = await bcrypt.compare(Password,user.Password);
            if(!password_correct){
                return res.status(400).send("Password is not correct!");
            }
//-----------------------------------------------------------------------------------------------------
            //2.payload เปรียบเสทือนเตรียมข้อมูลส่งให้หน้าบ้าน
            var payload = {
                user : {
                    StudentID:user.StudentID
                }
            }
//------------------------------------------------------------------------------------------------------
        //3.Generate token ใส่ '1d' คือ 1 วัน
            jwt.sign(payload,'jwtsecret',{ expiresIn : '1d'},(err,token)=>{ //เอาข้อมูลอะไรไปสร้าง token บ้าง
                if(err) throw err;
                res.json({token,payload}); //คือ ข้อมูลของ user
            }) //login เสร็จ หน้าบ้าน ได้ token ไปใช้งาน
            
        }else{
            return res.status(400).send("user not found");
        }
    }

    catch(err){
        res.send(err);
    }
}

exports.create = async(req,res) => {
    try{
        const user = await Users(req.body).save();
        res.send(user)
    }
    catch(err){
        res.send(err);
    }
}

exports.list = async(req,res) => {
    try{
        const user = await Users.find({}).exec();
        res.send(user);
    }
    catch(err){
        console.log(err)
        res.status(500).send("Server error")
    }
}