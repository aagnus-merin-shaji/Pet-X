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
   
    adoptionStatus: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    shelterId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shelter', 
        required: true // Reference to the shelter managing the adoption
    },
    
}, { timestamps: true });

const Adoption = mongoose.model('Adoption', adoptionSchema);
module.exports = Adoption;
