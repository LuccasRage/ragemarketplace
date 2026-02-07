import express from 'express';
import * as listingController from '../controllers/listingController.js';
import { authenticate } from '../middleware/auth.js';
import { validateListing } from '../middleware/validation.js';

const router = express.Router();

router.get('/', listingController.getListings);
router.get('/my', authenticate, listingController.getMyListings);
router.get('/:id', listingController.getListing);
router.post('/', authenticate, validateListing, listingController.createListing);
router.put('/:id', authenticate, listingController.updateListing);
router.delete('/:id', authenticate, listingController.deleteListing);

export default router;
