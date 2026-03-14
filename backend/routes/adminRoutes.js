const express = require('express');
const router = express.Router();
const { getAllUsers, getDashboardStats, verifyDriverDocument, verifyRecruiter } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/users', protect, authorize('admin'), getAllUsers);
router.get('/stats', protect, authorize('admin'), getDashboardStats);
router.put('/driver/:id/verify', protect, authorize('admin'), verifyDriverDocument);
router.put('/recruiter/:id/verify', protect, authorize('admin'), verifyRecruiter);

module.exports = router;
