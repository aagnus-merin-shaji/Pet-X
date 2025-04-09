const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
    animalName: { 
        type: String
    },
    user : {
        type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
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
    },
     photos: { 
        type: String
    },
}, { timestamps: true });

const LostFound = mongoose.model('LostFound', lostFoundSchema);
module.exports = LostFound;
