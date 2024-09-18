const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId: {
        type: String,
        // required: true
    },
    username: {
        type: String,
        // required: true
    },
    image_path: {
        type: String,
        // required: true
    },
    detail_message: {
        type: String,
        // required: true
    },
    location: {
        type: String,
        // required: true
    },
    request_status: {
        type: String,
        // required: true
    },
    request_time: {
        type: Date,
        // required: false,
        default: Date.now
    }
}, { collection:"requestList" })

module.exports = mongoose.model('requestList', requestSchema);