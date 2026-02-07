import express from 'express';
import * as disputeController from '../controllers/disputeController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = express.Router();

router.post('/', authenticate, disputeController.createDispute);
router.get('/my', authenticate, disputeController.getMyDisputes);
router.get('/:id', authenticate, disputeController.getDispute);
router.put('/:id/resolve', authenticate, requireAdmin, disputeController.resolveDispute);

export default router;
