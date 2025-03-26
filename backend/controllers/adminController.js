const asyncHandler = require("express-async-handler");
const Shelter = require("../models/shelterModel");
const User = require("../models/userModel");
const Adoption = require("../models/adoptionModel");
const Animal = require("../models/animalModel");
const Notification = require("../models/notificationModel");

const adminController = {
    // Approve a shelter
    approveShelter: asyncHandler(async (req, res) => {
        const { shelterId } = req.body;
        const shelter = await Shelter.findById(shelterId);

        if (!shelter) {
            res.status(404);
            throw new Error("Shelter not found");
        }

        shelter.approved = true;
        await shelter.save();
        await Notification.create({
            user: shelter.userId, // Assuming shelter has an adminId field
            message: `Congratulations! Your shelter "${shelter.name}" has been approved. You can now list animals for adoption.`,
        });
        res.json({ message: "Shelter approved successfully" });
    }),

    // Reject a shelter
    rejectShelter: asyncHandler(async (req, res) => {
        const { shelterId } = req.body;
        const shelter = await Shelter.findById(shelterId);

        if (!shelter) {
            res.status(404);
            throw new Error("Shelter not found");
        }

        await Shelter.findByIdAndDelete(shelterId);
        await Notification.create({
            user: shelter.userId, // Assuming shelter has an adminId field
            message: `We regret to inform you that your shelter "${shelter.name}" has been rejected and removed from the platform.`,
        });
        res.json({ message: "Shelter rejected and removed" });
    }),

    // Get all users
    getUsers: asyncHandler(async (req, res) => {
        const users = await User.find();
        res.json(users);
    }),

    // Delete a user
    deleteUser: asyncHandler(async (req, res) => {
        const { userId } = req.body;
        await User.findByIdAndDelete(userId);
        res.json({ message: "User deleted successfully" });
    }),

    // Get all pending adoptions
    getPendingAdoptions: asyncHandler(async (req, res) => {
        const adoptions = await Adoption.find({ adoptionStatus: "Pending" });
        res.json(adoptions);
    }),

    getAll: asyncHandler(async (req, res) => {
            const animals = await Animal.find();
            
            res.json({ animals });
        }),
};

module.exports = adminController;