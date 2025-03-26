const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    services: { 
        type: [String], 
        enum: ['general checkup', 'vaccination', 'spay/neuter', 'emergency care', 'dental care', 'surgery', 'other'], 
        required: true 
    },
    animals: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Animal' 
    }],
    verified: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

const Clinic = mongoose.model('Clinic', clinicSchema);
module.exports = Clinic;
