const express = require('express');
const router = express.Router();
const { getDriverProfile, updateDriverProfile } = require('../controllers/driverController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/profile')
    .get(protect, authorize('driver'), getDriverProfile)
    .put(protect, authorize('driver'), upload.fields([
        { name: 'profilePhoto', maxCount: 1 },
        { name: 'drivingLicenseDoc', maxCount: 1 },
        { name: 'aadhaarDoc', maxCount: 1 }
    ]), updateDriverProfile);

module.exports = router;
