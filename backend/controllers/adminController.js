const User = require('../models/User');
const DriverProfile = require('../models/DriverProfile');
const RecruiterProfile = require('../models/RecruiterProfile');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const driversCount = await User.countDocuments({ role: 'driver' });
        const recruitersCount = await User.countDocuments({ role: 'recruiter' });
        const jobsCount = await Job.countDocuments();
        const applicationsCount = await Application.countDocuments();

        const pendingDrivers = await DriverProfile.countDocuments({ verificationStatus: 'Pending' });
        const unverifiedRecruiters = await RecruiterProfile.countDocuments({ isVerified: false });

        res.json({
            totalDrivers: driversCount,
            totalRecruiters: recruitersCount,
            totalJobs: jobsCount,
            totalApplications: applicationsCount,
            pendingDrivers,
            unverifiedRecruiters
        });
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Verify or reject driver documents
// @route   PUT /api/admin/driver/:id/verify
// @access  Private/Admin
const verifyDriverDocument = async (req, res) => {
    try {
        const { status } = req.body; // 'Verified' or 'Rejected'
        const profile = await DriverProfile.findOneAndUpdate(
            { user: req.params.id },
            { verificationStatus: status },
            { new: true }
        );

        if (!profile) {
            res.status(404);
            throw new Error('Driver profile not found');
        }
        res.json(profile);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Verify a recruiter
// @route   PUT /api/admin/recruiter/:id/verify
// @access  Private/Admin
const verifyRecruiter = async (req, res) => {
    try {
        const { isVerified } = req.body; // boolean
        const profile = await RecruiterProfile.findOneAndUpdate(
            { user: req.params.id },
            { isVerified },
            { new: true }
        );

        if (!profile) {
            res.status(404);
            throw new Error('Recruiter profile not found');
        }
        res.json(profile);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getDashboardStats,
    verifyDriverDocument,
    verifyRecruiter
};
