const Application = require('../models/Application');
const Job = require('../models/Job');
const DriverProfile = require('../models/DriverProfile');

// @desc    Apply for a job
// @route   POST /api/applications/:jobId
// @access  Private/Driver
const applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        // Check if driver profile is complete
        const profile = await DriverProfile.findOne({ user: req.user.id });
        if (!profile) {
            res.status(400);
            throw new Error('Please create your driver profile before applying');
        }

        const isProfileComplete = profile.phone && 
                                 profile.location && 
                                 profile.drivingLicense && 
                                 profile.drivingLicense.number && 
                                 profile.vehicleTypes && 
                                 profile.vehicleTypes.length > 0;

        if (!isProfileComplete) {
            res.status(400);
            throw new Error('Please complete your profile (Phone, Location, Driving License, and Vehicle Types) before applying');
        }

        // Check if already applied
        const existingApplication = await Application.findOne({
            job: req.params.jobId,
            driver: req.user.id
        });

        if (existingApplication) {
            res.status(400);
            throw new Error('You have already applied for this job');
        }

        const application = new Application({
            job: req.params.jobId,
            driver: req.user.id,
            recruiter: job.recruiter,
            coverLetter: req.body.coverLetter || ''
        });

        const savedApplication = await application.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Get driver's applications
// @route   GET /api/applications/my
// @access  Private/Driver
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ driver: req.user.id }).populate('job');
        res.json(applications);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Get applications for a job
// @route   GET /api/applications/job/:jobId
// @access  Private/Recruiter
const getJobApplications = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }
        if (job.recruiter.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized');
        }

        const applications = await Application.find({ job: req.params.jobId })
            .populate('driver', ['name', 'email']);

        res.json(applications);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private/Recruiter
const updateApplicationStatus = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            res.status(404);
            throw new Error('Application not found');
        }

        if (application.recruiter.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized');
        }

        application.status = req.body.status;
        const updatedApplication = await application.save();

        res.json(updatedApplication);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Get driver statistics
// @route   GET /api/applications/driver/stats
// @access  Private/Driver
const getDriverStats = async (req, res) => {
    try {
        const total = await Application.countDocuments({ driver: req.user.id });
        const accepted = await Application.countDocuments({ driver: req.user.id, status: 'Accepted' });
        const rejected = await Application.countDocuments({ driver: req.user.id, status: 'Rejected' });
        const pending = await Application.countDocuments({ driver: req.user.id, status: { $in: ['Applied', 'Pending'] } });

        res.json({
            total,
            accepted,
            rejected,
            pending
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all applications for recruiter's jobs
// @route   GET /api/applications/recruiter/all
// @access  Private/Recruiter
const getRecruiterApplications = async (req, res) => {
    try {
        const applications = await Application.find({ recruiter: req.user.id })
            .populate('driver', ['name', 'email'])
            .populate('job', ['title', 'location'])
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    applyForJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus,
    getDriverStats,
    getRecruiterApplications
};
