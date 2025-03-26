const Animal = require('../models/animalModel');
const Clinic = require('../models/clinicModel');
const MedicalRecord = require('../models/medicalRecordModel');
const asyncHandler = require('express-async-handler');

const medicalRecordController = {
    createMedicalRecord: asyncHandler(async (req, res) => {
        const {
            petId,
            clinicId,
            shelterId,
            checkupDate,
            diagnosis,
            treatment,
            medications,
            vaccinations,
            specialNeeds,
            notes,
            attachments
        } = req.body;
        const medicalRecord = await MedicalRecord.create({
            petId,
            clinicId,
            shelterId,
            checkupDate,
            diagnosis,
            treatment,
            medications,
            vaccinations,
            specialNeeds,
            notes,
            attachments
        });
        await Animal.findByIdAndUpdate(petId, { $push: { medicalRecord: medicalRecord._id } });
        const clinic = await Clinic.findById(clinicId);
        if (clinic && !clinic.animals.includes(petId)) {
            await Clinic.findByIdAndUpdate(clinicId, { $push: { animals: petId } });
        }
        res.send("MedicalRecord added successfully");
    }),

    getMedicalRecords: asyncHandler(async (req, res) => {
        const {petId}=req.body
        const medicalRecords = await MedicalRecord.find({petId}).populate('petId clinicId shelterId');
        res.json(medicalRecords);
    }),

    getMedicalRecordById: asyncHandler(async (req, res) => {
        const {id}=req.params
        console.log(id);
        
        const medicalRecord = await MedicalRecord.findOne({petId:id}).populate('petId clinicId shelterId');
        if (!medicalRecord) {
            res.status(404);
            throw new Error('Medical record not found');
        }
        res.json(medicalRecord);
    }),

    updateMedicalRecord: asyncHandler(async (req, res) => {
        const {id}=req.body
        const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMedicalRecord) {
            res.status(404);
            throw new Error('Medical record not found');
        }
        res.json(updatedMedicalRecord);
    }),

    deleteMedicalRecord: asyncHandler(async (req, res) => {
        const {id}=req.body
        const medicalRecord = await MedicalRecord.findByIdAndDelete(id);
        if (!medicalRecord) {
            res.status(404);
            throw new Error('Medical record not found');
        }
        res.json({ message: 'Medical record deleted successfully' });
    }),
};

module.exports = medicalRecordController;
