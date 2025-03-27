const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler=require("express-async-handler")
const express=require('express');
const User = require("../models/userModel");

const userController={
    register : asyncHandler(async(req,res)=>{        
      const {username,email,password,role}=req.body
      const userExits=await User.findOne({email})
      if(userExits){
          throw new Error("User already exists")
      }
      const hashed_password=await bcrypt.hash(password,10)
      const userCreated=await User.create({
          username,
          email,
          password:hashed_password,
          role
      })
      if(!userCreated){
          throw new Error("User creation failed")
      }
      const payload={
        name:userCreated.username,  
        email:userCreated.email,
        role:userCreated.role,
        id:userCreated.id
    }
    const token=jwt.sign(payload,process.env.JWT_SECRET_KEY)
    res.json(token)
        }),  
  
    login :asyncHandler(async(req,res)=>{
        const {email,password}=req.body
        const userExist=await User.findOne({email})
        if(!userExist){
            throw new Error("User not found")
        }
        const passwordMatch= bcrypt.compare(userExist.password,password)
        if(!passwordMatch){
            throw new Error("Passwords not matching")
        }
        const payload={
            name:userExist.username,  
            email:userExist.email,
            role:userExist.role,
            id:userExist.id
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET_KEY)
        res.json(token)  
        }),

    logout:asyncHandler(async(req,res)=>{
        res.clearCookie("token")
        res.send("User logged out")
        }),

    profile: asyncHandler(async (req, res) => {
        const { 
            username, bio, address, interests, livelihood, adopterPreferences, 
            lifestyleInfo, experienceWithPets, desiredPetCharacteristics, 
            email, password, role, isApproved 
        } = req.body;

          const userId = req.user.id;         
            let userProfile = await User.findById(userId);
            if (!userProfile) {
                return res.status(404).json({ message: "User not found" });
            }
            
            userProfile.username = username ?? userProfile.username;
            userProfile.bio = bio ?? userProfile.bio;
            userProfile.address = address ?? userProfile.address;
            userProfile.interests  = interests  ?? userProfile.interests ;
            userProfile.livelihood = livelihood ?? userProfile.livelihood;
            userProfile.adopterPreferences  = adopterPreferences  ?? userProfile.adopterPreferences ;
        userProfile.adopterPreferences;
              userProfile.lifestyleInfo =lifestyleInfo  ??
        userProfile.lifestyleInfo;
              userProfile.experienceWithPets  =experienceWithPets ??
        userProfile.experienceWithPets;
              userProfile.desiredPetCharacteristics = desiredPetCharacteristics  
        ??userProfile.desiredPetCharacteristics;
              userProfile.email = email ?? userProfile.email;
              userProfile.role = role ?? userProfile.role;
              userProfile.isApproved = isApproved ?? userProfile.isApproved;
              if (password) {
                const bcrypt = require("bcryptjs");
                const salt = await bcrypt.genSalt(10);
                userProfile.password = await bcrypt.hash(password, salt);
            }
        
            try {
                await userProfile.save();
                res.status(200).json({ message: "Profile updated successfully", userProfile });
            } catch (error) {
                res.status(500).json({ message: "Error updating profile", error: error.message });
            }
    }),
        

    getUserProfile : asyncHandler(async (req, res) => {
        const userId = req.user.id;     
        const user = await User.findById(userId).select("-password"); 
        if (!user) {
            throw new Error("User not found");
        }    
        res.send(user);
    }),

    forgotPassword: asyncHandler(async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate Reset Token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 10);
        
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Send Email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            text: `Click on this link to reset your password: ${resetLink}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Email could not be sent" });
            }
            res.json({ message: "Reset link sent to your email" });
        });
    }),

    // Reset Password - Verifies Token & Updates Password
    resetPassword: asyncHandler(async (req, res) => {
        const { email, token, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user || !user.resetPasswordToken) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
        if (!isTokenValid || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: "Password reset successful" });
    }),
    getWishlist: asyncHandler(async (req, res) => {
        const userProfile = await User.findById(req.user.id).populate('wishlist');

        if (!userProfile) {
            res.status(404);
            throw new Error('User profile not found');
        }

        res.json(userProfile.wishlist);
    }),

    addToWishlist: asyncHandler(async (req, res) => {
        const { animalId } = req.body;

        const userProfile = await User.findById(req.user.id);

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

        const userProfile = await User.findById(req.user.id);

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
}
module.exports=userController