import express from 'express';
import {getChatMessages, getUserChats, startChat,} from '../controllers/chat.controller.js';
import {protect} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/start', protect, startChat);
router.get('/my', protect, getUserChats);
router.get('/:chatId/messages', protect, getChatMessages);

export default router;
