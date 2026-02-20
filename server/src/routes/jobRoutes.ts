import express from 'express';
import { createJob, getJobs, getMyJobs, getJobById } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getJobs);
router.post('/', protect, createJob);
router.get('/my-jobs', protect, getMyJobs);
router.get('/:id', getJobById);

export default router;
