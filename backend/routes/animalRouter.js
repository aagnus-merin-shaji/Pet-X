const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const animalController = require("../controllers/animalController");
const  {upload}  = require("../middlewares/cloudinary");
const animalRoutes = express.Router();

animalRoutes.post("/add", userAuthentication,upload.fields([{ name: "photos", maxCount: 1 }]),animalController.createListing);
animalRoutes.put("/edit", userAuthentication,animalController.updateListing);
animalRoutes.get("/viewall", userAuthentication,animalController.getAllListings);
animalRoutes.get("/search", userAuthentication,animalController.getAnimalsByQuery);
animalRoutes.delete("/delete", userAuthentication,animalController.deleteListing);

module.exports = animalRoutes;