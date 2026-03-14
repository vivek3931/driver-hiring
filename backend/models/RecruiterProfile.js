const mongoose = require('mongoose');

const recruiterProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required']
    },
    phone: { type: String },
    address: { type: String },
    companyLogo: { type: String }, // URL from cloud storage
    website: { type: String },
    description: { type: String },

    // Verification by Admin
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('RecruiterProfile', recruiterProfileSchema);
