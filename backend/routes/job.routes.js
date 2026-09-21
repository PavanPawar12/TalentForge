import express from 'express'
import { deleteJob, getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from '../controllers/jobs.controller.js';
import isAuthenticated from '../middleware/auth.js';
const router =  express.Router();

router.post('/post', isAuthenticated ,postJob);
router.get('/get', isAuthenticated ,getAllJobs);
router.get('/getadminjobs', isAuthenticated , getAdminJobs);
router.get('/get/:id', isAuthenticated ,getJobById);
router.put('/update/:id', isAuthenticated, updateJob);
router.delete('/delete/:id', isAuthenticated, deleteJob);

export default router;