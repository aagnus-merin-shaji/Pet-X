const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    species: { 
        type: String, 
        enum: ['dog', 'cat', 'bird', 'reptile', 'other'], 
        required: true 
    },
    breed: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    size: { 
        type: String, 
        enum: ['small', 'medium', 'large'], 
        required: true 
    },
    temperament: { 
        type: String 
    },
    healthStatus: { 
        type: String 
    },
    vaccinated: { 
        type: Boolean, 
        default: false 
    },
    adoptionFee: { 
        type: Number, 
        required: true ,
        default:4500
    },
    description: { 
        type: String 
    },
    photos: { 
        type: [String] 
    },
    status: { 
        type: String, 
        enum: ['available', 'pending', 'adopted'], 
        default: 'available' 
    },
    listedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    shelterId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shelter'
    },
    medicalRecord: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MedicalRecord'
    },
    listedByIndividual: { 
        type: Boolean, 
        default: false // Set this to true if the pet is being rehomed by an individual 
    },
    adopterId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
}, { timestamps: true });

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;
