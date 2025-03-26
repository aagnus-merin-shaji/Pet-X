const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const lostFoundController = require("../controllers/lostfoundController");
const lostFoundRoutes = express.Router();

lostFoundRoutes.post("/add", userAuthentication,lostFoundController.createReport);
lostFoundRoutes.put("/edit", userAuthentication,lostFoundController.updateReport);
lostFoundRoutes.get("/viewall", userAuthentication,lostFoundController.getAllReports);
lostFoundRoutes.get("/search", userAuthentication,lostFoundController.getReportById);
lostFoundRoutes.delete("/delete", userAuthentication,lostFoundController.deleteReport);

module.exports = lostFoundRoutes;