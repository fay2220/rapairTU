const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    StudentID : String,
    Password :{
        type : String
    }
},{timestamps : true});

module.exports = mongoose.model('users',userSchema);