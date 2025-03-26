const LostFound = require('../models/lostFoundModel');
const asyncHandler = require('express-async-handler');
const Notification = require('../models/notificationModel');

const lostFoundController = {
    createReport: asyncHandler(async (req, res) => {
        const { animal, lastSeenLocation, lastSeenCoordinates, dateLostOrFound, contact } = req.body;

        if (!animal || !lastSeenLocation || !lastSeenCoordinates || !dateLostOrFound || !contact) {
            res.status(400);
            throw new Error('All fields are required');
        }

        const report = await LostFound.create({
            animal,
            lastSeenLocation,
            lastSeenCoordinates,
            dateLostOrFound,
            contact,
        });
        await Notification.create({
            user: req.user.id,
            message: `Your lost/found pet report has been submitted successfully.`,
        });
        res.status(201).json(report);
    }),

    getAllReports: asyncHandler(async (req, res) => {
        const reports = await LostFound.find({status:'lost'}).populate('animal');
        res.json(reports);
    }),

    getReportById: asyncHandler(async (req, res) => {
        const {id}=req.body
        const report = await LostFound.findById(id).populate('animal');

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
