const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const clinicController = require("../controllers/clinicController");
const clinicRoutes = express.Router();

clinicRoutes.post("/add", userAuthentication,clinicController.createClinic);
clinicRoutes.put("/edit", userAuthentication,clinicController.updateClinic);
clinicRoutes.get("/viewall", userAuthentication,clinicController.getClinics);
clinicRoutes.get("/search", userAuthentication,clinicController.getClinicById);
clinicRoutes.delete("/delete", userAuthentication,clinicController.deleteClinic);

module.exports = clinicRoutes;