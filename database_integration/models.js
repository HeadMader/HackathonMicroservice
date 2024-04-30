const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	_id: {type: mongoose.Types.ObjectId, required: true},
    senderId: { type: mongoose.Types.ObjectId, required: true },
    receiverId: { type: mongoose.Types.ObjectId, required: true },
    content: { type: Message, default: Date.now }
});

const userSchema = new mongoose.Schema({
	_id: {type: mongoose.Types.ObjectId, required: true},
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Message,
    User
};
