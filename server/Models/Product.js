const mongoose = require('mongoose');
const { auth } = require('../Middleware/auth');
const productSchema = mongoose.Schema({ //สร้าว model มาแล้ว เปรียบเสมือนสร้างตาราง
    name:String, //สร้าง field มาแล้ว
    detail:{
        type:String
    },
    location: {
        type:String
    },
    file: {
        type:String,
        default: 'noimage.jpg'
    }
},{timestamps:true})
//ที่ detail กับ location มีปีกกา แล้วก็ type มันเป็นการสร้างให้สามารถตั้งค่าคุณสมบัติอื่นๆอีกได้ แต่ name ตั้งค่าได้แค่ชื่อ ที่เป็น string

module.exports = mongoose.model('products',productSchema);

//model ใคร model มัน ต้องสร้างแยก


//แค่เพิ่ม key ที่กำหนดว่าสถานที่อยู่ไหน แล้วสร้าง model ที่เข้าแต่ละสำนักงาน