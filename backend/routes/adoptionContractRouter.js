const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const adoptionContractController = require("../controllers/adoptionContractController");
const contractRoutes = express.Router();

contractRoutes.post("/add", userAuthentication,adoptionContractController.createContract);
contractRoutes.put("/edit", userAuthentication,adoptionContractController.updateContract);
contractRoutes.get("/viewall", userAuthentication,adoptionContractController.getContracts);
contractRoutes.get("/search", userAuthentication,adoptionContractController.getContractById);
contractRoutes.delete("/delete", userAuthentication,adoptionContractController.deleteContract);

module.exports = contractRoutes;