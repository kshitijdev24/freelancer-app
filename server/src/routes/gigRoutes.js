import express from 'express';
import { createGig, getGigs, getGigById, updateGig, deleteGig } from '../controllers/gigController.js';
import { protect, sellerOnly } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', getGigs);
router.get('/:id', getGigById);
router.post('/', protect, sellerOnly, createGig);
router.put('/:id', protect, sellerOnly, updateGig);
router.delete('/:id', protect, sellerOnly, deleteGig);
export default router;
//# sourceMappingURL=gigRoutes.js.map