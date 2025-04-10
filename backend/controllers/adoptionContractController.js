const AdoptionContract = require('../models/adoptionContractModel');
const asyncHandler = require('express-async-handler');
const Adoption = require('../models/adoptionModel');
const Animal = require('../models/animalModel');
const Shelter = require('../models/shelterModel');

const adoptionContractController = {
    // Add new adoption contract
    createContract: asyncHandler(async (req, res) => {
        const { id } = req.body;
        const adoption = await Adoption.findOne({animalId:id});
        const adoptionContract = new AdoptionContract({
            adoptionId:adoption.id,
            signedByAdopter:true,
            signatureDate:Date.now()
        });
        await adoptionContract.save();
        res.status(201).json(adoptionContract);
    }),

    // Get all adoption contracts
    getContracts: asyncHandler(async (req, res) => {
        const { shelterId, userId } = req.body;
        let filter = {};
        if (userId) {
            filter.applicantId = userId;  // Filter by applicant (user)
        }
        if (shelterId) {
            filter.shelterId = shelterId;  // Filter by shelter
        }
        const adoptions = await Adoption.find(filter);
        const adoptionContracts = await AdoptionContract.find({ adoptionId: { $in: adoptions.map(adoption => adoption._id) }}).populate('adoptionId');
        
        res.status(200).json(adoptionContracts);
    }),

    getContractsByShelter: asyncHandler(async (req, res) => {
        const shelter=await Shelter.findOne({userId:req.user.id})
        const shelterId=shelter.id
        const adoptions = await Adoption.find({shelterId});
        const adoptionContracts = await AdoptionContract.find({ adoptionId: { $in: adoptions.map(adoption => adoption._id) }}).populate('adoptionId');
        
        res.status(200).json(adoptionContracts);
    }),

    // Get a specific adoption contract by ID
    getContractById: asyncHandler(async (req, res) => {
        const {id}=req.body
        const adoptionContract = await AdoptionContract.findById(id).populate('adoptionId');
        if (!adoptionContract) {
            res.status(404);
            throw new Error('Adoption contract not found');        }
        res.status(200).json(adoptionContract);
    }),

    // Update adoption contract (signing)
    updateContract: asyncHandler(async (req, res) => {
        const { id } = req.body;
        const adoption = await Adoption.findOne({animalId:id});
        const animal = await Animal.findById(id);
        animal.status = "adopted"
        const adoptionContract = await AdoptionContract.findOne({
            adoptionId:adoption._id
        });
        adoptionContract.signedByShelter=true
        await adoptionContract.save();
        res.status(201).json(adoptionContract);
    }),

    // Delete an adoption contract
    deleteContract: asyncHandler(async (req, res) => {
        const {id}=req.body
        const adoptionContract = await AdoptionContract.findById(id);
        if (!adoptionContract) {
            res.status(404);
            throw new Error('Adoption contract not found');
        }
        await adoptionContract.remove();
        res.status(200).json({ message: 'Adoption contract removed' });
    })
};

module.exports = adoptionContractController;
