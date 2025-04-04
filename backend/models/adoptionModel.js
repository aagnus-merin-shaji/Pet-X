const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
    applicantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    animalId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Animal'
    },
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'completed', 'failed', 'refunded'], 
        default: 'pending' 
    },
    adoptionStatus: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    shelterId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shelter', 
         // Reference to the shelter managing the adoption
    },
    
}, { timestamps: true });

const Adoption = mongoose.model('Adoption', adoptionSchema);
module.exports = Adoption;
