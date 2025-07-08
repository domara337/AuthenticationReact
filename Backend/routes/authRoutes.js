// server/src/routes/authRoutes.js
import express from 'express';
import { register, login } from '../controllers/authController.js';
import { getMe } from '../controllers/authController.js';
import authMiddleware from '../middleware/authmiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me',authMiddleware,getMe)

export default router;
