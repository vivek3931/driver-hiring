const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Job title is required']
    },
    location: {
        type: String,
        required: true
    },
    salaryRange: {
        min: { type: Number },
        max: { type: Number }
    },
    experienceRequired: {
        type: Number, // in years
        default: 0
    },
    vehicleTypeRequired: {
        type: String,
        enum: ['Car', 'Truck', 'Bus', 'Ambulance', 'Bike', 'Delivery Van', 'Heavy Vehicle', 'Other'],
        required: true
    },
    shiftTiming: {
        type: String,
        enum: ['Day', 'Night', 'Flexible'],
        default: 'Day'
    },
    employmentType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract'],
        default: 'Full-time'
    },
    vacancies: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        required: true
    },
    benefits: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open'
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
