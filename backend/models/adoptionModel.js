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
    lifestyleInfo: { 
        type: String 
    },
    livingSituation: { 
        type: String 
    },
    experienceWithPets: { 
        type: String 
    },
    desiredPetCharacteristics: { 
        type: String 
    },
    adoptionStatus: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    notes: { 
        type: String 
    },
    shelterId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shelter', 
        required: true // Reference to the shelter managing the adoption
    },
    screeningQuestions: [{ 
        type: String 
    }],
    rehomingIndividualId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
}, { timestamps: true });

const Adoption = mongoose.model('Adoption', adoptionSchema);
module.exports = Adoption;
