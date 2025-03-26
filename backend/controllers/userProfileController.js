const UserProfile = require('../models/userProfileModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const userProfileController = {
    getProfile: asyncHandler(async (req, res) => {
        const userProfile = await UserProfile.findOne({ user: req.user.id }).populate('user', 'name email');

        if (!userProfile) {
            res.status(404);
            throw new Error('User profile not found');
        }

        res.json(userProfile);
    }),

    createOrUpdateProfile: asyncHandler(async (req, res) => {
        const { bio, address,  } = req.body;
        const userId = req.user.id; // Requires authentication middleware

        let userProfile = await UserProfile.findOne({ user: userId });

        if (userProfile) {
            userProfile.bio = bio || userProfile.bio;
            userProfile.location = location || userProfile.location;
            userProfile.interests = interests || userProfile.interests;
            userProfile.livelihood = livelihood || userProfile.livelihood;
            userProfile.adopterPreferences = adopterPreferences || userProfile.adopterPreferences;
        } else {
            // Create new profile
            userProfile = new UserProfile({
                user: userId,
                bio,
                location,
                interests,
                livelihood,
                adopterPreferences,
            });
        }

        await userProfile.save();
        res.json({ message: 'Profile saved successfully', userProfile });
    }),

    deleteProfile: asyncHandler(async (req, res) => {
        const userId = req.user.id;

        const userProfile = await UserProfile.findOneAndDelete({ user: userId });

        if (!userProfile) {
            res.status(404);
            throw new Error('User profile not found');
        }

        res.json({ message: 'User profile deleted successfully' });
    }),

    getWishlist: asyncHandler(async (req, res) => {
        const userProfile = await UserProfile.findOne({ user: req.user.id }).populate('wishlist');

        if (!userProfile) {
            res.status(404);
            throw new Error('User profile not found');
        }

        res.json({ wishlist: userProfile.wishlist });
    }),

    addToWishlist: asyncHandler(async (req, res) => {
        const { animalId } = req.body;

        const userProfile = await UserProfile.findOne({ user: req.user.id });

        if (!userProfile) {
            res.status(404);
            throw new Error('User profile not found');
        }

        // Check if the item is already in the wishlist
        if (userProfile.wishlist.includes(animalId)) {
            res.status(400);
            throw new Error('Item already in wishlist');
        }

        userProfile.wishlist.push(animalId);
        await userProfile.save();

        res.json({ message: 'Item added to wishlist', wishlist: userProfile.wishlist });
    }),

    removeFromWishlist: asyncHandler(async (req, res) => {
        const { animalId } = req.body;

        const userProfile = await UserProfile.findOne({ user: req.user.id });

        if (!userProfile) {
            res.status(404);
            throw new Error('User profile not found');
        }

        userProfile.wishlist = userProfile.wishlist.filter(id => id.toString() !== animalId);
        await userProfile.save();

        res.json({ message: 'Item removed from wishlist', wishlist: userProfile.wishlist });
    }),
    
    changePassword: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;
    
        // Validate input
        if (!oldPassword || !newPassword) {
            res.status(400);
            throw new Error("Both old and new passwords are required");
        }
    
        const user = await User.findById(userId);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
    
        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            res.status(401);
            throw new Error("Incorrect old password");
        }
    
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
    
        // Save the updated user
        await user.save();
    
        res.send({
            message: "Password changed successfully",
        });
    })
};

module.exports = userProfileController;
