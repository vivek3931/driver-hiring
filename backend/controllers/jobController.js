const Job = require('../models/Job');

// @desc    Get all jobs (with filtering)
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
    try {
        const { location, vehicleType, keyword } = req.query;
        let query = {};

        if (location) query.location = { $regex: location, $options: 'i' };
        if (vehicleType) query.vehicleTypeRequired = vehicleType;
        if (keyword) query.title = { $regex: keyword, $options: 'i' };

        query.status = 'Open';

        const jobs = await Job.find(query).populate('recruiter', ['name', 'email']);
        res.json(jobs);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('recruiter', ['name', 'email']);
        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }
        res.json(job);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private/Recruiter
const createJob = async (req, res) => {
    try {
        const job = new Job({
            ...req.body,
            recruiter: req.user.id
        });

        const createdJob = await job.save();
        res.status(201).json(createdJob);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private/Recruiter
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        // Check if job belongs to recruiter
        if (job.recruiter.toString() !== req.user.id) {
            res.status(401);
            throw new Error('Not authorized to update this job');
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    getJobs,
    getJobById,
    createJob,
    updateJob
};
