const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    organizationName: { 
        type: String, 
        required: true 
    },
    missionStatement: { 
        type: String, 
        required: true 
    },
    contactInfo: {
        phone: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true 
        },
        website: { 
            type: String 
        },
    },
    location: {
        address: { 
            type: String, 
            required: true 
        },
        city: { 
            type: String, 
            required: true 
        },
        state: { 
            type: String, 
            required: true 
        },
        zipCode: { 
            type: String, 
            required: true 
        },
    },
    facilityImages: [
        { 
            type: String 
        }
    ], 
    verificationStatus: { 
        type: String, 
        enum: ['Pending', 'Verified', 'Rejected'], 
        default: 'Pending' 
    },
}, { timestamps: true });

const Shelter = mongoose.model('Shelter', shelterSchema);
module.exports = Shelter;
