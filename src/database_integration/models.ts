import mongoose, { Schema, Document, Types } from 'mongoose';

interface Message extends Document {
    _id: Types.ObjectId;
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    content: string;
}

interface User extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
}

const messageSchema = new Schema({
    _id: { type: Types.ObjectId, required: true },
    senderId: { type: Types.ObjectId, required: true },
    receiverId: { type: Types.ObjectId, required: true },
    content: { type: String, required: true }
});

const userSchema = new Schema({
    _id: { type: Types.ObjectId, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const Message = mongoose.model<Message>('Message', messageSchema);
const User = mongoose.model<User>('User', userSchema);

export { Message, User };
