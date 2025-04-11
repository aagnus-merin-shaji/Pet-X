const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const adminController = require("../controllers/adminController");
const adminAuthentication = require("../middlewares/admin");
const adminRoutes = express.Router();

adminRoutes.put("/approve", userAuthentication,adminAuthentication,adminController.approveShelter);
adminRoutes.put("/reject", userAuthentication,adminAuthentication,adminController.rejectShelter);
adminRoutes.get("/users", userAuthentication,adminAuthentication,adminController.getUsers);
adminRoutes.delete("/delete", userAuthentication,adminAuthentication,adminController.deleteUser);

adminRoutes.get("/adoptions", userAuthentication,adminAuthentication,adminController.getAdoptions);
adminRoutes.get("/viewall", userAuthentication,adminAuthentication,adminController.getAll);
adminRoutes.get("/viewtotalusers", userAuthentication,adminAuthentication,adminController.getTotalUsers);
adminRoutes.get("/viewlostpets", userAuthentication,adminAuthentication,adminController.getlostpets);

module.exports = adminRoutes;