const Adoption = require('../models/adoptionModel'); // Adjust path as necessary
const asyncHandler = require('express-async-handler');
const Animal = require('../models/animalModel');
const Notification = require('../models/notificationModel');
const User = require('../models/userModel');
const Shelter = require('../models/shelterModel');

function calculateMatch(adopter, pet) {
    let score = 0;

    // Match species (e.g., dog vs dog, cat vs cat)
    if (adopter.adopterPreferences?.includes(pet.species)) {
        score += 15;
    }

    // Match size (small, medium, large)
    if (adopter.adopterPreferences?.includes(pet.size)) {
        score += 10;
    }

    // Match temperament (e.g., calm, playful)
    if (adopter.lifestyleInfo?.includes(pet.temperament)) {
        score += 10;
    }

    // Experience with pets
    if (adopter.experienceWithPets === 'first-time' && pet.age <= 5) {
        score += 5; // First-time owners may prefer younger pets
    }

    // Match health status (if the adopter wants a pet with specific health needs)
    if (adopter.lifestyleInfo?.includes(pet.healthStatus)) {
        score += 5;
    }

    // Match vaccination status (if relevant to adopter preferences)
    if (adopter.lifestyleInfo?.includes(pet.vaccinated ? 'vaccinated' : 'unvaccinated')) {       
         score += 5;
    }
    if (adopter.wishlist?.some(wishPet => wishPet._id.equals(pet._id))) {
        score += 20;
    }
    return score;
}

// Adoption Controller
const adoptionController = {
    // Create a new adoption application
    

    createApplication: asyncHandler(async (req, res) => {   
         try {
            const { id } = req.params;
            const pet = await Animal.findById(id);
            console.log(pet);
            
        if (!pet) {
                 return res.status(404).json({ message: "Pet not found" });
             }

        // Create a new adoption application
        const newApplication = new Adoption({
            applicantId: req.user.id,
            animalId:id,            
            shelterId:pet.shelterId
        });

        // Save the adoption application
        await newApplication.save();

        // Determine the recipient of the notification
        const recipientId = pet.shelterId // Either the shelter or the individual who listed the pet
        const shelter = await Shelter.findById(recipientId)
        // Create a new notification
        const notification = new Notification({
            user: shelter.userId,
            message: `New adoption application received for ${pet.name}.`,
        });

        // Save the notification
        await notification.save();
        pet.adopterId=req.user.id
        pet.save()
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
            const shelter = await Shelter.findOne({userId:req.user.id});
            const shelterId=shelter.id
            // Find adoption applications for the given shelter
            const applications = await Adoption.find({ shelterId })
                .populate('applicantId', 'username email') // Populate applicant information
                .populate('animalId') // Populate animal details
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
            const { id } = req.body;
            const { adoptionStatus } = req.body;
            console.log(adoptionStatus);
            
            // Validate adoption status
            if (!['Approved', 'Rejected'].includes(adoptionStatus)) {
                return res.status(400).json({ message: 'Invalid adoption status' });
            }

            // Find and update the adoption application
            const application = await Adoption.findById(id);

            if (!application) {
                return res.status(404).json({ message: 'Adoption application not found' });
            }

            application.adoptionStatus = adoptionStatus;

            await application.save();
            const notification = new Notification({
                user: application.applicantId,
                message: `Your adoption application for pet has been ${adoptionStatus.toLowerCase()}.`
            });
    
            await notification.save();
            if(application.adoptionStatus==="Rejected"){
                await Adoption.findByIdAndDelete(id)
            }
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
        const adopter = await User.findOne({ _id: req.user.id }).populate("wishlist");
         if (!adopter) {
             return res.status(404).json({ message: "Adopter not found" });
         }
         const pets = await Animal.find({ status: 'available' });    
        const matches = pets.map(pet => {
            return {
                pet,
                score: calculateMatch(adopter, pet),
            };
        });
        matches.sort((a, b) => b.score - a.score);
        return res.json(matches.slice(0, 5));
    }),
    getApplicationsByAdopter: asyncHandler(async (req, res) => {
        try {
            // Find adoption applications for the given shelter
            const applications = await Adoption.find({ applicantId:req.user.id })
                .populate('applicantId', 'username email') // Populate applicant information
                .populate('animalId') // Populate animal details
                .populate('shelterId', 'name location'); // Populate shelter information


            res.status(200).json({ applications });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }),

    getAllAdoptions: asyncHandler(async (req, res) => {
            const adoptions = await Adoption.find().populate("animalId").populate("applicantId");
            res.json({ adoption: adoptions }); // Wrap in { adoption }
        }),
};

module.exports = adoptionController;
