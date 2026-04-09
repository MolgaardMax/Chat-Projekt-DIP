import express from 'express';
import { login, register, logout, updateUserLevel } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/update-level/:id', updateUserLevel);

export default router;