const Animal = require('../models/animalModel');
const Shelter = require('../models/shelterModel');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const shelterController = {
    upsertShelterProfile : asyncHandler(async (req, res) => {
        const { organizationName, missionStatement, phone, address } = req.body;
        const userId = req.user.id;
    
        // Fetch user details
        const user = await User.findById(userId).select("username email");
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
    
        let shelterProfile;
    
        if (user) {
            // Updating an existing shelter profile
            shelterProfile = await Shelter.findOne({userId:user});
            if (!shelterProfile) {
                res.status(404);
                throw new Error("Shelter profile not found");
            }
            Object.assign(shelterProfile, { organizationName, missionStatement, phone, address, facilityImages: req.files });
        } else {
            // Check if a shelter with the same name and address exists
            const exists = await Shelter.findOne({ organizationName, address });
            if (exists) {
                throw new Error("Shelter already exists");
            }
    
            // Creating a new shelter profile
            shelterProfile = new Shelter({
                userId,
                organizationName,
                missionStatement,
                phone,
                address,
                facilityImages: req.files,
                username: user.username,
                email: user.email,
            });
        }
    
        const savedProfile = await shelterProfile.save();
        console.log(savedProfile);
        res.status(200).json(savedProfile);
    }),
    
    getProfile: asyncHandler(async (req, res) => {
        const id=req.user.id
        const profile = await Shelter.findOne({userId:id}).populate('userId', 'username email');


        if (!profile) {
            res.status(404);
            throw new Error('Profile not found');
        }

        res.status(200).json(profile);
    }),


    // Delete Shelter/Rescue Profile
    deleteProfile: asyncHandler(async (req, res) => {
        const {id}=req.body
        const profile = await Shelter.findById(id);

        if (!profile) {
            res.status(404);
            throw new Error('Profile not found');
        }

        await profile.deleteOne();
        res.status(200).json({ message: 'Profile deleted successfully' });
    }),

    // Get All Verified Shelter/Rescue Profiles
    getVerifiedProfiles: asyncHandler(async (req, res) => {
        const profiles = await Shelter.find({ verificationStatus: 'Verified' });
        res.status(200).json(profiles);
    }),

    getAnimalsByShelter: asyncHandler(async (req, res) => {
        const { shelterId } = req.body;    
        if (!shelterId) {
            res.status(400);
            throw new Error('Shelter ID is required');
        }    
        const animals = await Animal.find({ shelterId });
    
        if (!animals.length) {
            res.status(404);
            throw new Error('No animals found in this shelter');
        }
    
        res.send({ animals });
    }),
    
};

module.exports = shelterController;
