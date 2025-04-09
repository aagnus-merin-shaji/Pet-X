const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const lostFoundController = require("../controllers/lostfoundController");
const { upload } = require("../middlewares/cloudinary");
const lostFoundRoutes = express.Router();

lostFoundRoutes.post("/add", userAuthentication,upload.fields([{ name: "photos", maxCount: 1 }]),lostFoundController.createReport);
lostFoundRoutes.put("/edit", userAuthentication,lostFoundController.updateReport);
lostFoundRoutes.get("/viewall", userAuthentication,lostFoundController.getAllReports);
lostFoundRoutes.get("/lostbyuser", userAuthentication,lostFoundController.getReportByUser);
lostFoundRoutes.get("/search", userAuthentication,lostFoundController.getReportById);
lostFoundRoutes.delete("/delete", userAuthentication,lostFoundController.deleteReport);

module.exports = lostFoundRoutes;