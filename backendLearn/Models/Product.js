const mongoose = require('mongoose');
const productSchema = mongoose.Schema({ //สร้าว model มาแล้ว เปรียบเสมือนสร้างตาราง
    name:String, //สร้าง field มาแล้ว
    detail:{
        type:String
    },
    location: {
        type:String
    },
    file:String
},{timestamps:true})
//ที่ detail กับ location มีปีกกา แล้วก็ type มันเป็นการสร้างให้สามารถตั้งค่าคุณสมบัติอื่นๆอีกได้ แต่ name ตั้งค่าได้แค่ชื่อ ที่เป็น string

module.exports = mongoose.model('products',productSchema);

//model ใคร model มัน ต้องสร้างแยก