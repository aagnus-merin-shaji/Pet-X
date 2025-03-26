const Animal = require('../models/animalModel');
const Shelter = require('../models/shelterModel');
const asyncHandler = require('express-async-handler');

const shelterController = {
    createProfile: asyncHandler(async (req, res) => {
        const {organizationName, missionStatement, contactInfo, location } = req.body;
        const userId=req.user.id
        const exist=await Shelter.findOne({organizationName,location})
        if(exist){
            throw new Error("Shelter already exists")
        }
        const newProfile = new Shelter({
            userId,
            organizationName,
            missionStatement,
            contactInfo,
            location,
            facilityImages:req.files,
        });
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile);
    }),

    getProfileById: asyncHandler(async (req, res) => {
        const {id}=req.body
        const profile = await Shelter.findById(id).populate('userId', 'name email');

        if (!profile) {
            res.status(404);
            throw new Error('Profile not found');
        }

        res.status(200).json(profile);
    }),

    // Update Shelter/Rescue Profile
    updateProfile: asyncHandler(async (req, res) => {
        const {id}=req.body
        const profile = await Shelter.findById(id);

        if (!profile) {
            res.status(404);
            throw new Error('Profile not found');
        }

        Object.assign(profile, req.body);
        const updatedProfile = await profile.save();
        res.status(200).json(updatedProfile);
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
