const express = require('express');
const router = express.Router();
const { applyForJob, getMyApplications, getJobApplications, updateApplicationStatus, getDriverStats, getRecruiterApplications } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/:jobId', protect, authorize('driver'), applyForJob);
router.get('/my', protect, authorize('driver'), getMyApplications);
router.get('/driver/stats', protect, authorize('driver'), getDriverStats);
router.get('/recruiter/all', protect, authorize('recruiter'), getRecruiterApplications);
router.get('/job/:jobId', protect, authorize('recruiter'), getJobApplications);
router.put('/:id/status', protect, authorize('recruiter'), updateApplicationStatus);

module.exports = router;
