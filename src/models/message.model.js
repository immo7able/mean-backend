import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
            chatId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Chat',
                    required: true,
            },
            senderId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
            },
            text: {
                    type: String,
                    required: true,
            },
            type: {
                    type: String,
                    enum: ['text', 'link'],
                    default: 'text',
            },
    },
    { timestamps: true }
);

export default mongoose.model('Message', MessageSchema);
