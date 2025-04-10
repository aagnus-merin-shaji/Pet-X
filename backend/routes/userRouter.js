const express = require("express");
const userController = require("../controllers/userController");
const userAuthentication = require("../middlewares/userAuthentication");
const { upload } = require("../middlewares/cloudinary");
const userRoutes = express.Router();

userRoutes.post("/register", userController.register);
userRoutes.post("/login", userController.login);
userRoutes.put("/edit", userAuthentication, upload.single("photos"), userController.profile);
userRoutes.delete("/logout", userController.logout);
userRoutes.get("/view", userAuthentication,userController.getUserProfile);
userRoutes.post("/forgot", userController.forgotPassword);
userRoutes.post("/reset", userController.resetPassword);
userRoutes.put("/changepass",userAuthentication,userController.changePassword);

module.exports = userRoutes;