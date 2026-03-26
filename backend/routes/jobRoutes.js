const express = require('express');
const router = express.Router();
const { 
    getJobs, 
    getJobById, 
    createJob, 
    updateJob, 
    getRecruiterJobs, 
    deleteJob, 
    getRecruiterStats 
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getJobs)
    .post(protect, authorize('recruiter'), createJob);

router.route('/recruiter/my')
    .get(protect, authorize('recruiter'), getRecruiterJobs);

router.route('/recruiter/stats')
    .get(protect, authorize('recruiter'), getRecruiterStats);

router.route('/:id')
    .get(getJobById)
    .put(protect, authorize('recruiter'), updateJob)
    .delete(protect, authorize('recruiter'), deleteJob);

module.exports = router;
