const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    unique:true,
        minLength:[5,"Minimum 5 characters required"],
  },
  bio: {
    type: String,
},
wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }] ,
address: { type: String,},
livelihood: { type: String, },
adopterPreferences: { type: String, },
lifestyleInfo: { type: String, },
experienceWithPets: { type: String, },
desiredPetCharacteristics: { type: String, },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    minLength:[5,"Minimum 5 characters required"]
  },
  role: { 
    type: String, 
    enum: ["shelter", "clinic", "individual", "admin"], 
    required: true 
  },
  isApproved: { 
    type: Boolean, 
    default: false 
  },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;