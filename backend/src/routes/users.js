import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile/:username', userController.getProfile);
router.put('/profile', authenticate, userController.updateProfile);
router.get('/balance', authenticate, userController.getBalance);
router.get('/transactions', authenticate, userController.getTransactions);
router.post('/deposit', authenticate, userController.deposit);

export default router;
