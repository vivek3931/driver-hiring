const express = require('express');
const router = express.Router();
const { getRecruiterProfile, updateRecruiterProfile } = require('../controllers/recruiterController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/profile')
    .get(protect, authorize('recruiter'), getRecruiterProfile)
    .put(protect, authorize('recruiter'), upload.single('companyLogo'), updateRecruiterProfile);

module.exports = router;
