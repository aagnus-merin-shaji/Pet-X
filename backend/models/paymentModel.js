const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    adopterId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    adoptionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Adoption', 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    paymentMethod: { 
        type: String, 
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash'], 
    },
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'completed', 'failed', 'refunded'], 
        default: 'pending' 
    },
    transactionId: { 
        type: String 
    },
    paymentDate: { 
        type: Date, 
        default: Date.now 
    },
    receiptUrl: { 
        type: String 
    }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
