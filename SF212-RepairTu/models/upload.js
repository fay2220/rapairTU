const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: null
        // required: true
    },
    username: {
        type: String,
        default: null
        // required: true
    },
    image_path: {
        type: String,
        default: null
        // required: true
    },
    location: {
        type: String,
        default: null
        // required: true
    },
    issue: {
        type: String,
        default: null
        // required: true
    },
    details: {
        type: String,
        default: null
    },
    request_status: {
        type: String,
        default: "Not finish"
        // required: true
    },
    request_time: {
        type: Date,
        // required: false,
        default: Date.now
    }
}, { collection:"requestList" })

module.exports = mongoose.model('requestList', requestSchema);