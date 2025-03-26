const express = require("express");
const resourceRouter = express.Router();
const userAuthentication = require("../middlewares/userAuthentication");
const ResourceController = require("../controllers/resourceController");
const { upload } = require("../middlewares/cloudinary");

resourceRouter.post("/add",userAuthentication,upload.fields([{ name: "image", maxCount: 1 },{ name: "video", maxCount: 1 },]),ResourceController.createResource);
resourceRouter.get("/viewall", userAuthentication,ResourceController.getAllResources);
resourceRouter.get("/search", userAuthentication,ResourceController.getResourceById);
resourceRouter.put("/edit",userAuthentication, ResourceController.updateResource);
resourceRouter.delete("/delete",userAuthentication, ResourceController.deleteResource);

module.exports = resourceRouter;