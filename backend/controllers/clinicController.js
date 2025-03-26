const Clinic = require('../models/clinicModel');
const asyncHandler = require('express-async-handler');

const clinicController = {
    createClinic: asyncHandler(async (req, res) => {
        const clinic = await Clinic.create(req.body);
        res.status(201).json(clinic);
    }),

    getClinics: asyncHandler(async (req, res) => {
        const clinics = await Clinic.find()
        res.json(clinics);
    }),

    getClinicById: asyncHandler(async (req, res) => {
        const { name, address, services } = req.body;

        let query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }
        if (address) {
            query.address = { $regex: address, $options: 'i' };
        }
        if (services) {
            const servicesArray = services.split(','); // Allows searching multiple services
            query.services = { $all: servicesArray };
        }

        const clinics = await Clinic.find(query);
        res.status(200).json(clinics);
    }),

    updateClinic: asyncHandler(async (req, res) => {
        const {id}=req.body
        const updatedClinic = await Clinic.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedClinic) {
            res.status(404);
            throw new Error('Clinic not found');
        }
        res.json(updatedClinic);
    }),

    deleteClinic: asyncHandler(async (req, res) => {
        const {id}=req.body
        const clinic = await Clinic.findByIdAndDelete(id);
        if (!clinic) {
            res.status(404);
            throw new Error('Clinic not found');
        }
        res.json({ message: 'Clinic deleted successfully' });
    }),
};

module.exports = clinicController;
