const mongoose = require('mongoose');

const adoptionContractSchema = new mongoose.Schema({
    applicationId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Adoption', 
        required: true 
    },
    contractDetails: { 
        type: String, 
        required: true 
    },
    signedByAdopter: { 
        type: Boolean, 
        default: false 
    },
    signedByShelter: { 
        type: Boolean, 
        default: false 
    },
    signatureDate: { 
        type: Date 
    },
}, { timestamps: true });

const AdoptionContract = mongoose.model('AdoptionContract', adoptionContractSchema);
module.exports = AdoptionContract;
