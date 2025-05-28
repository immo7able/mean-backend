import Message from './models/message.model.js';

export default function registerChatHandlers(io, socket) {
    socket.on('joinChat', (chatId) => {
        socket.join(chatId)
        console.log(`User ${socket.id} joined chat ${chatId}`)
    })

    socket.on('sendMessage', async ({ chatId, text }) => {
        try {
            const userId = socket.user._id;

            const message = await Message.create({
                chatId,
                senderId: userId,
                text,
            });

            const populatedMessage = await message.populate('senderId', 'username');

            io.to(chatId).emit('receiveMessage', populatedMessage);
        } catch (err) {
            console.error('Ошибка при отправке сообщения:', err);
        }
    });
}
