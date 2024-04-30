import { Message } from './models';

class MessageHandler {
    async createMessage(messageData: any) {
        try {
            const newMessage = new Message(messageData);
            const savedMessage = await newMessage.save();
            return savedMessage;
        } catch (error) {
            throw new Error(`Error creating message: ${error}`);
        }
    }

    async getMessageById(messageId: string) {
        try {
            const message = await Message.findById(messageId);
            return message;
        } catch (error) {
            throw new Error(`Error getting message by ID: ${error}`);
        }
    }

    async updateMessageById(messageId: string, updateData: any) {
        try {
            const updatedMessage = await Message.findByIdAndUpdate(messageId, updateData, { new: true });
            return updatedMessage;
        } catch (error) {
            throw new Error(`Error updating message by ID: ${error}`);
        }
    }

    async deleteMessageById(messageId: string) {
        try {
            const deletedMessage = await Message.findByIdAndDelete(messageId);
            return deletedMessage;
        } catch (error) {
            throw new Error(`Error deleting message by ID: ${error}`);
        }
    }
}

export default MessageHandler;
