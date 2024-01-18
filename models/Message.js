const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MessageSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    subject: String,
    message: String,
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
