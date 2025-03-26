const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
        unique: true
    },
    bio: {
        type: String,
        trim: true
    },
    location: {
        city: { type: String, trim: true },
        country: { type: String, trim: true }
    },
    interests: [String], // List of user interests

    // Livelihood Information
    livelihood: {
        occupation: { type: String, trim: true },
        incomeRange: { type: String, trim: true }, // e.g., "30k-50k", "50k-80k"
        housingType: { type: String, trim: true }, // e.g., "Apartment", "House with Yard"
        workSchedule: { type: String, trim: true }, // e.g., "Remote", "9-5 Office"
        petExperience: { type: Boolean, default: false } // Whether the user has experience with pets
    },

    // Adopter Preferences (for pet adoption platforms)
    adopterPreferences: {
        preferredPetType: [String], // e.g., ["Dog", "Cat", "Rabbit"]
        preferredPetSize: { type: String, trim: true }, // e.g., "Small", "Medium", "Large"
        openToSpecialNeedsPets: { type: Boolean, default: false },
        hasChildren: { type: Boolean, default: false },
        hasOtherPets: { type: Boolean, default: false },
        activityLevel: { type: String, trim: true } // e.g., "Active", "Moderate", "Low-energy"
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }] 
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;
