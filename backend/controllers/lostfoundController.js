const LostFound = require('../models/lostFoundModel');
const asyncHandler = require('express-async-handler');
const Notification = require('../models/notificationModel');

const lostFoundController = {
    createReport: asyncHandler(async (req, res) => {
        const { animalName,animalType, lastSeenLocation, dateLostOrFound, contact } = req.body;
        if (!req.files || !req.files.photos){
            return res.status(400).send({message: "no photos uploaded"});
        }
        console.log(req.files.photos[0].path);
        
        const report = await LostFound.create({
            animalName,
            animalType,
            lastSeenLocation,
            dateLostOrFound,
            contact,
            photos:req.files.photos[0].path,
            user:req.user.id
        });
        await Notification.create({
            user: req.user.id,
            message: `Your lost/found pet report has been submitted successfully.`,
        });
        res.status(201).json(report);
    }),

    getAllReports: asyncHandler(async (req, res) => {
        const reports = await LostFound.find({status:"lost"});
        res.json(reports);
    }),

    getReportById: asyncHandler(async (req, res) => {
        const {id}=req.body
        const report = await LostFound.findById(id);

        if (!report) {
            res.status(404);
            throw new Error('Report not found');
        }

        res.json(report);
    }),

    getReportByUser: asyncHandler(async (req, res) => {
        const report = await LostFound.find({user:req.user.id});

        if (!report) {
            res.status(404);
            throw new Error('Report not found');
        }

        res.json(report);
    }),

    updateReport: asyncHandler(async (req, res) => {
        const {id}=req.body
        const report = await LostFound.findById(id);

        if (!report) {
            res.status(404);
            throw new Error('Report not found');
        }

        const updatedReport = await LostFound.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedReport);
    }),

    deleteReport: asyncHandler(async (req, res) => {
        const {id}=req.body
        const report = await LostFound.findById(id);

        if (!report) {
            res.status(404);
            throw new Error('Report not found');
        }

        await report.deleteOne();
        res.json({ message: 'Report deleted successfully' });
    })
};

module.exports = lostFoundController;
