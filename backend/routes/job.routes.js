import express from 'express'
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/jobs.controller.js';
import isAuthenticated from '../middleware/auth.js';
const router =  express.Router();

router.post('/post', isAuthenticated ,postJob);
router.get('/get', isAuthenticated ,getAllJobs);
router.get('/getadminjobs', isAuthenticated , getAdminJobs);
router.get('/get/:id', isAuthenticated ,getJobById);

export default router;