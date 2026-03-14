const mongoose = require('mongoose');

const driverProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    phone: { type: String },
    location: { type: String },
    dateOfBirth: { type: Date },
    profilePhoto: { type: String }, // URL from cloud storage

    drivingLicense: {
        number: { type: String },
        expiryDate: { type: Date },
        documentUrl: { type: String }
    },

    aadhaar: {
        number: { type: String },
        documentUrl: { type: String }
    },

    experience: { type: Number, default: 0 },

    vehicleTypes: [{
        type: String,
        enum: ['Car', 'Truck', 'Bus', 'Ambulance', 'Bike', 'Delivery Van', 'Heavy Vehicle', 'Other']
    }],

    expectedSalary: { type: Number },

    availabilityStatus: {
        type: String,
        enum: ['Available', 'Hired', 'Unavailable'],
        default: 'Available'
    },

    languagesKnown: [{ type: String }],

    previousJobs: [{
        company: String,
        role: String,
        duration: String
    }],

    emergencyContact: {
        name: String,
        relation: String,
        phone: String
    },

    verificationStatus: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('DriverProfile', driverProfileSchema);
