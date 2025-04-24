const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const adoptionController = require("../controllers/adoptionController");
const adoptionRoutes = express.Router();

adoptionRoutes.post("/add/:id", userAuthentication,adoptionController.createApplication);
adoptionRoutes.put("/edit", userAuthentication,adoptionController.updateApplicationStatus);
adoptionRoutes.get("/viewall", userAuthentication,adoptionController.getApplicationsByShelter);
adoptionRoutes.get("/adopter", userAuthentication,adoptionController.getApplicationsByAdopter);
adoptionRoutes.get("/search", userAuthentication,adoptionController.getApplicationById);
adoptionRoutes.get("/matches", userAuthentication,adoptionController.findBestMatches);
adoptionRoutes.get("/adoptionanimal", userAuthentication,adoptionController.getAllAdoptions);
adoptionRoutes.delete("/delete", userAuthentication,adoptionController.deleteApplication);

module.exports = adoptionRoutes;