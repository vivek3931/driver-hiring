const express = require('express');
const router = express.Router();
const { getJobs, getJobById, createJob, updateJob } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getJobs)
    .post(protect, authorize('recruiter'), createJob);

router.route('/:id')
    .get(getJobById)
    .put(protect, authorize('recruiter'), updateJob);

module.exports = router;
