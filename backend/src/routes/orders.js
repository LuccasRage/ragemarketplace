import express from 'express';
import * as orderController from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/my', authenticate, orderController.getMyOrders);
router.get('/:id', authenticate, orderController.getOrder);
router.post('/buy/:listingId', authenticate, orderController.buyItem);
router.put('/:id/delivered', authenticate, orderController.markDelivered);
router.put('/:id/confirm', authenticate, orderController.confirmReceipt);

export default router;
