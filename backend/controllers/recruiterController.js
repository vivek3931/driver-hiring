const RecruiterProfile = require('../models/RecruiterProfile');

// @desc    Get current recruiter profile
// @route   GET /api/recruiter/profile
// @access  Private/Recruiter
const getRecruiterProfile = async (req, res) => {
    try {
        const profile = await RecruiterProfile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);
        if (!profile) {
            res.status(404);
            throw new Error('Profile not found');
        }
        res.json(profile);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Update recruiter profile
// @route   PUT /api/recruiter/profile
// @access  Private/Recruiter
const updateRecruiterProfile = async (req, res) => {
    try {
        const profile = await RecruiterProfile.findOne({ user: req.user.id });

        if (!profile) {
            res.status(404);
            throw new Error('Profile not found');
        }

        const updateFields = { ...req.body };
        delete updateFields.user;
        delete updateFields.isVerified; // Prevent self-verification

        if (req.file) {
            updateFields.companyLogo = `/uploads/${req.file.filename}`;
        }

        const updatedProfile = await RecruiterProfile.findOneAndUpdate(
            { user: req.user.id },
            { $set: updateFields },
            { new: true }
        ).populate('user', ['name', 'email']);

        res.json(updatedProfile);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    getRecruiterProfile,
    updateRecruiterProfile
};
