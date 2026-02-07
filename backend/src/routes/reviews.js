import express from 'express';
import * as reviewController from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';
import { validateReview } from '../middleware/validation.js';

const router = express.Router();

router.post('/', authenticate, validateReview, reviewController.createReview);
router.get('/seller/:sellerId', reviewController.getSellerReviews);
router.get('/order/:orderId', reviewController.getOrderReview);

export default router;
