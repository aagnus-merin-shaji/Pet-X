const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    petId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Animal', 
        required: true 
    },
    clinicId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Clinic' 
    },
    shelterId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shelter' 
    },
    checkupDate: { 
        type: Date, 
        default: Date.now 
    },
    diagnosis: { 
        type: String 
    },
    treatment: { 
        type: String 
    },
    medications: [{ 
        name: String, 
        dosage: String, 
        frequency: String 
    }],
    vaccinations: [{ 
        name: String, 
        dateGiven: Date, 
        nextDueDate: Date 
    }],
    specialNeeds: { 
        type: String // For chronic conditions, disabilities, or special care instructions
    },
    notes: { 
        type: String 
    },
    attachments: [{ 
        type: String // URLs or file paths for medical reports or test results
    }]
}, { timestamps: true });

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
module.exports = MedicalRecord;
