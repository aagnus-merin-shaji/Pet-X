const AdoptionContract = require('../models/adoptionContractModel');
const asyncHandler = require('express-async-handler');
const Adoption = require('../models/adoptionModel');

const adoptionContractController = {
    // Add new adoption contract
    createContract: asyncHandler(async (req, res) => {
        const { applicationId, contractDetails } = req.body;
        const adoption = await Adoption.findById(applicationId);
        if (!adoption) {
            res.status(400);
            throw new Error('Adoption application not found');
        }
        const adoptionContract = new AdoptionContract({
            applicationId,
            contractDetails
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
        const adoptionContracts = await AdoptionContract.find({ applicationId: { $in: adoptions.map(adoption => adoption._id) }}).populate('applicationId');
        
        res.status(200).json(adoptionContracts);
    }),

    // Get a specific adoption contract by ID
    getContractById: asyncHandler(async (req, res) => {
        const {id}=req.body
        const adoptionContract = await AdoptionContract.findById(id).populate('applicationId');
        if (!adoptionContract) {
            res.status(404);
            throw new Error('Adoption contract not found');        }
        res.status(200).json(adoptionContract);
    }),

    // Update adoption contract (signing)
    updateContract: asyncHandler(async (req, res) => {
        const { id,signedByAdopter, signedByShelter, signatureDate } = req.body;
        const adoptionContract = await AdoptionContract.findById(id);
        if (!adoptionContract) {
            res.status(404);
            throw new Error('Adoption contract not found');
        }
        if (signedByAdopter) adoptionContract.signedByAdopter = signedByAdopter;
        if (signedByShelter) adoptionContract.signedByShelter = signedByShelter;
        if (signatureDate) adoptionContract.signatureDate = signatureDate;
        await adoptionContract.save();
        res.status(200).json(adoptionContract);
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
