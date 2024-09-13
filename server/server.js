const express = require('express'); //สร้างตัวแปร express
const morgan = require('morgan'); //เรียกใช้จาก morgan
const cors = require('cors');
const connectDB = require('./Config/db');

const { readdirSync } = require('fs'); //เรียกเพื่อใช้แบบ auto เป็นฟังก์ชันแบบ built in ไม่ต้องโหลด
const app = express(); 

connectDB();

const bodyParse = require('body-parser');
// Middleware สำหรับจัดการ JSON ควรมาอยู่ก่อน Route 
app.use(bodyParse.json({limit:'10mb'})) // มี limit ว่าส่งข้อมูลจาก front ได้ไม่เกิน 10 mb


//วิธีแบบนี้ต้องมาเรียก มาเอาออกแต่ละตัว ต้องไปทำแบบ auto
//const ProductRouter = require('./Routes/product'); 
//app.use('/api',ProductRouter);

//ไม่ต้องมาคอย import ในแต่ละ endpoint แล้ว
app.use(cors()) 
readdirSync('./Routes').map((r)=> app.use('/api',require('./Routes/'+ r ))) //อ่าน path ของไฟล์ แล้วใช้ map เพื่อลูป เพราะ ในไฟล์ไม่ได้มีตัวเดียว

app.use(morgan('dev')) //ช่วยบอกว่า รีเควส method อะไรมาใน terminal

//---------------------------------------------------------------------------------
//มีแล้วไม่ error 404
//const path = require('path');

// Serve static files from the React app
//app.use(express.static(path.join(__dirname, '../client/build')));

// API route
//app.get('/api/product', (req, res) => {
//    res.json({ message: "This is the product route!" });
//});

// The "catchall" handler: for any request that doesn't match API routes, send back React's index.html file
//app.get('*', (req, res) => {
 //   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
//});
//---------------------------------------------------------------------------------

app.listen(5000,()=>console.log("Server is running"));//เวลาเอา project ไป deploy ต้องเปลี่ยน  end point myh's,f