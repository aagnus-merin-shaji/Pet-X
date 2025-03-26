const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const medicalRecordController = require("../controllers/medicalRecordController");
const medicalRoutes = express.Router();

medicalRoutes.post("/add", userAuthentication,medicalRecordController.createMedicalRecord);
medicalRoutes.put("/edit", userAuthentication,medicalRecordController.updateMedicalRecord);
medicalRoutes.get("/viewall", userAuthentication,medicalRecordController.getMedicalRecords);
medicalRoutes.get("/search/:id", userAuthentication,medicalRecordController.getMedicalRecordById);
medicalRoutes.delete("/delete", userAuthentication,medicalRecordController.deleteMedicalRecord);

module.exports = medicalRoutes;