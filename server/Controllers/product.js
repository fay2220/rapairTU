
const Product = require('../Models/Product')
const fs = require('fs');
exports.read = async (req,res)=>{ //exports ตามด้วยชื่อได้เลย
    try{
        const id = req.params.id;
        const producted = await Product.findOne({_id:id}).exec(); //ค้นหาแค่ไอดี 1 record
        res.send(producted);
    }
    catch(err){
        console.log(err)
        res.status(500).send("Server error")
    }
} //อีกไฟล์จะได้แค่ เรียกตัวแปร แล้วทำงานได้เลย

exports.list = async (req,res) =>{ //ดึงข้อมูลจาก database ทั้งหมดออกมา
    try{
        const producted = await Product.find({}).exec();
        res.send(producted);
    }
    catch(err){
        console.log(err)
        res.status(500).send("Server error")
    }
    
}
exports.create = async (req,res) =>{
    try{
        var data = req.body;
        if (req.file){ //ถ้ามีไฟล์เข้ามา ก็เข้าเงื่อนไข เก็บ key แต่ถ้าไม่มีก็ไม่เป็นไร
            data.file = req.file.filename //สร้าง key 
        }
        
        console.log(data);
        const producted = await Product(data).save() //ส่งข้อมูลที่บันทึกเรียบร้อยแล้ว ไปให้หน้าบ้าน
        res.send(producted);
    }
    catch(err){
        console.log(err)
        res.status(500).send("Server error")
    }
    
}
exports.update = async (req,res) =>{
    try{
        const id = req.params.id;
        var newData = req.body //เก็บข้อมูลที่อยู่ในไฟล์

        if(typeof req.file !== 'undefined'){ //ถ้าตัวแปรที่ส่งมา ไม่ error
            newData.file = req.file.filename
            await fs.unlink('./uploads/'+newData.previousFile,(err)=>{ //นำชื่อไฟล์ของข้อมูลที่เรสลบ มาต่อท้าย
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Edit success");
                }
            })
        }
        const updated = await Product.findOneAndUpdate({_id: id},newData,{ new: true}).exec() //นอกจากส่ง id แล้วต้องส่งข้อมูลใหม่ด้วย
        res.send(updated)
    }
    catch(err){
        console.log(err)
        res.status(500).send("Server error")
    }
    
}
exports.remove = async (req,res) =>{
    try{
        const id = req.params.id;
        const remove = await Product.findOneAndDelete({_id:id}).exec(); //เริ่มจากการค้นหาแล้วลบ ต่อด้วย execute

        if(remove?.file){ //ถ้า remove มีไหม แล้ว file ล่ะ ถ้ามีก็เข้าเงื่อนไข ถ้าไม่มีก็ลบแบบธรรมดา ไม่ error
            await fs.unlink('./uploads/'+remove.file,(err)=>{ //นำชื่อไฟล์ของข้อมูลที่เรสลบ มาต่อท้าย
                if (err){
                    console.log(err)
                }
                else{
                    console.log("remove success");
                }
            })
        }
        
        res.send(remove);
    }
    catch(err){
        console.log(err)
        res.status(500).send("Server error")
    }
    
}