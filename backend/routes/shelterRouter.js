const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const  {upload}  = require("../middlewares/cloudinary");
const shelterController = require("../controllers/shelterController");
const shelterRoutes = express.Router();

shelterRoutes.put("/save", userAuthentication,upload.fields([{ name: "facilityImages", maxCount: 1 }]),shelterController.upsertShelterProfile);
shelterRoutes.get("/viewall", userAuthentication,shelterController.getVerifiedProfiles);
shelterRoutes.get("/search", userAuthentication,shelterController.getProfile);
shelterRoutes.get("/animals", userAuthentication,shelterController.getAnimalsByShelter);
shelterRoutes.delete("/delete", userAuthentication,shelterController.deleteProfile);

module.exports = shelterRoutes;