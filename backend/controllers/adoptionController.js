const Adoption = require('../models/adoptionModel'); // Adjust path as necessary
const asyncHandler = require('express-async-handler');
const Animal = require('../models/animalModel');
const Notification = require('../models/notificationModel');

function calculateMatch(adopter, pet) {
    let score = 0;

    // Match species (e.g., dog vs dog, cat vs cat)
    if (adopter.desiredPetCharacteristics.includes(pet.species)) {
        score += 10; // 10 points for species match
    }

    // Match size (small, medium, large)
    if (adopter.desiredPetCharacteristics.includes(pet.size)) {
        score += 10; // 10 points for size match
    }

    // Match temperament (e.g., calm, playful)
    if (adopter.lifestyleInfo.includes(pet.temperament)) {
        score += 10; // 10 points for temperament match
    }

    // Experience with pets
    if (adopter.experienceWithPets === 'first-time' && pet.age <= 5) {
        score += 5; // First-time owners may prefer younger pets
    }

    // Match health status (if the adopter wants a pet with specific health needs)
    if (adopter.lifestyleInfo.includes(pet.healthStatus)) {
        score += 5; // 5 points for health status match
    }

    // Match vaccination status (if relevant to adopter preferences)
    if (adopter.lifestyleInfo.includes(pet.vaccinated ? 'vaccinated' : 'unvaccinated')) {
        score += 5;
    }

    return score;
}

// Adoption Controller
const adoptionController = {
    // Create a new adoption application
    

createApplication: asyncHandler(async (req, res) => {
    try {
        const { animalId, lifestyleInfo, livingSituation, experienceWithPets, desiredPetCharacteristics, shelterId, notes } = req.body;
        const pet = await Animal.findById(animalId);

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        // Create a new adoption application
        const newApplication = new Adoption({
            applicantId: req.user.id,
            animalId,
            lifestyleInfo,
            livingSituation,
            experienceWithPets,
            desiredPetCharacteristics,
            shelterId,
            notes,
            rehomingIndividualId: pet.listedBy
        });

        // Save the adoption application
        await newApplication.save();

        // Determine the recipient of the notification
        const recipientId = shelterId || pet.listedBy; // Either the shelter or the individual who listed the pet

        // Create a new notification
        const notification = new Notification({
            user: recipientId,
            message: `New adoption application received for ${pet.name}.`,
        });

        // Save the notification
        await notification.save();

        res.status(201).json({ 
            message: 'Adoption application created successfully', 
            application: newApplication 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
}),


    // Get all adoption applications for a shelter
    getApplicationsByShelter: asyncHandler(async (req, res) => {
        try {
            const {shelterId} = req.body;

            // Find adoption applications for the given shelter
            const applications = await Adoption.find({ shelterId })
                .populate('applicantId', 'name email') // Populate applicant information
                .populate('animalId', 'name breed type') // Populate animal details
                .populate('shelterId', 'name location'); // Populate shelter information

            res.status(200).json({ applications });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }),

    // Get a specific adoption application by its ID
    getApplicationById: asyncHandler(async (req, res) => {
        try {
            const {applicationId} = req.body;

            // Find the adoption application by ID
            const application = await Adoption.findById(applicationId)
                .populate('applicantId', 'name email')
                .populate('animalId', 'name breed type')
                .populate('shelterId', 'name location');

            if (!application) {
                return res.status(404).json({ message: 'Adoption application not found' });
            }

            res.status(200).json({ application });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }),

    // Update adoption application status (Approved/Rejected)
    updateApplicationStatus: asyncHandler(async (req, res) => {
        try {
            const { applicationId } = req.body;
            const { adoptionStatus, notes } = req.body;

            // Validate adoption status
            if (!['Approved', 'Rejected'].includes(adoptionStatus)) {
                return res.status(400).json({ message: 'Invalid adoption status' });
            }

            // Find and update the adoption application
            const application = await Adoption.findById(applicationId);

            if (!application) {
                return res.status(404).json({ message: 'Adoption application not found' });
            }

            application.adoptionStatus = adoptionStatus;
            application.notes = notes || application.notes;

            await application.save();
            const notification = new Notification({
                user: application.applicantId,
                message: `Your adoption application for pet has been ${adoptionStatus.toLowerCase()}.`
            });
    
            await notification.save();
            res.status(200).json({ message: 'Adoption application updated successfully', application });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }),

    // Delete an adoption application
    deleteApplication: asyncHandler(async (req, res) => {
        try {
            const { applicationId } = req.body;

            // Find the adoption application and delete it
            const application = await Adoption.findById(applicationId);

            if (!application) {
                return res.status(404).json({ message: 'Adoption application not found' });
            }

            await application.remove();

            res.status(200).json({ message: 'Adoption application deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }),

    findBestMatches: asyncHandler(async (req, res) => {
        const adopter = await Adoption.findOne({ applicantId: req.user.id });
        const pets = await Animal.find({ status: 'available' });    
        const matches = pets.map(pet => {
            return {
                pet,
                score: calculateMatch(adopter, pet)
            }
        });    
        matches.sort((a, b) => b.score - a.score);    
        return res.send(matches);
    })
};

module.exports = adoptionController;
