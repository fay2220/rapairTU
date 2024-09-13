const multer = require('multer');
const storage = multer.diskStorage({ //ก็อป code ในเว็ปหลักมา
    destination: function (req, file, cb) {
      cb(null, './uploads') //ปลายทางที่ต้องการให้ file ไปเก็บ
    },
    filename: function (req, file, cb) { //ตรงนี้คือการเปลี่ยนชื่อไฟลื
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,"learn" + file.originalname) // แก้ให้ไม่เปลี่ยนชื่อไฟล์
    }
  })
  
exports.upload = multer({ storage: storage }).single('file')
