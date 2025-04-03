const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
    animal: { 
        type: String 
    },
    lastSeenLocation: { 
        type: String, 
        required: true 
    },
    dateLostOrFound: { 
        type: Date, 
        required: true 
    },
    animalType:{
        type:String,
    },
    contact: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['lost', 'found'], 
        default: 'lost' 
    }
}, { timestamps: true });

const LostFound = mongoose.model('LostFound', lostFoundSchema);
module.exports = LostFound;
