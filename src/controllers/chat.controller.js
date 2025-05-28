import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';

export const startChat = async (req, res, next) => {
    try {
        const { toUserId, adId } = req.body;
        const fromUserId = req.user._id.toString();
        let chat = await Chat.findOne({
            participants: { $all: [fromUserId, toUserId] },
        });

        if (!chat) {
            chat = await Chat.create({ participants: [fromUserId, toUserId] });
        }

        const messageCount = await Message.countDocuments({ chatId: chat._id });

        if (messageCount === 0 && adId) {
            await Message.create({
                chatId: chat._id,
                senderId: fromUserId,
                text: `Привет! Меня заинтересовало это объявление: ${adId}`,
                type: 'text',
            });
        }
        res.json({ chatId: chat._id });
    } catch (error) {
        next(error);
    }
};

export const getUserChats = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const chats = await Chat.find({ participants: userId })
            .populate({
                path: 'participants',
                select: 'username',
            })
            .sort({ updatedAt: -1 });
        const formattedChats = chats.map((chat) => {
            const otherUser = chat.participants.find(
                (participant) => participant._id.toString() !== userId.toString()
            );
            return {
                _id: chat._id,
                otherUser: {
                    _id: otherUser._id,
                    username: otherUser.username,
                },
            };
        });

        res.json(formattedChats);
    } catch (error) {
        next(error);
    }
};

export const getChatMessages = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const messages = await Message.find({ chatId }).sort({ createdAt: 1 }).populate('senderId', 'username');
        res.json(messages);
    } catch (error) {
        next(error);
    }
};
