import express from 'express';
import { getAllChats, createChat, deleteChat, getMessages, addMessage } from '../controllers/chatController.js';

const router = express.Router();

router.get('/', getAllChats);
router.post('/', createChat);
router.delete('/:id', deleteChat);
router.get('/:id/messages', getMessages);
router.post('/:id/messages', addMessage);

export default router;