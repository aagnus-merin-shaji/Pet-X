const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
    animal: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Animal', 
        required: true 
    },
    lastSeenLocation: { 
        type: String, 
        required: true 
    },
    lastSeenCoordinates: { 
        type: { lat: Number, lng: Number },
        required: true 
    },
    dateLostOrFound: { 
        type: Date, 
        required: true 
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
