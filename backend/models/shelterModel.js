const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    logo:{
        type:String,
        default:"",
    },
    organizationName: { 
        type: String, 
        required: true 
    },
    missionStatement: { 
        type: String, 
        required: true 
    },
    phone: { 
            type: String, 
            required: true 
        },
            address: { 
            type: String, 
            required: true 
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
