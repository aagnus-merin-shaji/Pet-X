const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const adoptionController = require("../controllers/adoptionController");
const adoptionRoutes = express.Router();

adoptionRoutes.post("/add", userAuthentication,adoptionController.createApplication);
adoptionRoutes.put("/edit", userAuthentication,adoptionController.updateApplicationStatus);
adoptionRoutes.get("/viewall", userAuthentication,adoptionController.getApplicationsByShelter);
adoptionRoutes.get("/search", userAuthentication,adoptionController.getApplicationById);
adoptionRoutes.get("/matches", userAuthentication,adoptionController.findBestMatches);
adoptionRoutes.delete("/delete", userAuthentication,adoptionController.deleteApplication);

module.exports = adoptionRoutes;