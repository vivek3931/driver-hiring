const DriverProfile = require('../models/DriverProfile');

// @desc    Get current driver profile
// @route   GET /api/driver/profile
// @access  Private/Driver
const getDriverProfile = async (req, res) => {
    try {
        const profile = await DriverProfile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);
        if (!profile) {
            res.status(404);
            throw new Error('Profile not found');
        }
        res.json(profile);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Update driver profile
// @route   PUT /api/driver/profile
// @access  Private/Driver
const updateDriverProfile = async (req, res) => {
    try {
        const profile = await DriverProfile.findOne({ user: req.user.id });

        if (!profile) {
            res.status(404);
            throw new Error('Profile not found');
        }

        // Prepare fields to update
        const { drivingLicense, aadhaar, ...rest } = req.body;
        const updateFields = { ...rest };

        // Handle nested drivingLicense
        if (drivingLicense) {
            updateFields.drivingLicense = {
                ...profile.drivingLicense,
                ...drivingLicense
            };
        }

        // Handle nested aadhaar
        if (aadhaar) {
            updateFields.aadhaar = {
                ...profile.aadhaar,
                ...aadhaar
            };
        }

        // If there were files uploaded
        if (req.files) {
            if (req.files.profilePhoto) {
                updateFields.profilePhoto = `/uploads/${req.files.profilePhoto[0].filename}`;
            }
            if (req.files.drivingLicenseDoc) {
                updateFields.drivingLicense = {
                    ...(updateFields.drivingLicense || profile.drivingLicense),
                    documentUrl: `/uploads/${req.files.drivingLicenseDoc[0].filename}`
                };
            }
            if (req.files.aadhaarDoc) {
                updateFields.aadhaar = {
                    ...(updateFields.aadhaar || profile.aadhaar),
                    documentUrl: `/uploads/${req.files.aadhaarDoc[0].filename}`
                };
            }
        }

        const updatedProfile = await DriverProfile.findOneAndUpdate(
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
    getDriverProfile,
    updateDriverProfile
};
