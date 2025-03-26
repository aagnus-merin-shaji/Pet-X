const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication");
const communityController = require("../controllers/communityController");
const communityRoutes = express.Router();

communityRoutes.post("/add", userAuthentication,communityController.addPost);
communityRoutes.post("/create", userAuthentication,communityController.createCommunity);
communityRoutes.put("/join", userAuthentication,communityController.joinCommunity);
communityRoutes.put("/leave", userAuthentication,communityController.leaveCommunity);
communityRoutes.get("/viewall", userAuthentication,communityController.getAllCommunities);
communityRoutes.get("/search", userAuthentication,communityController.getCommunityById);
communityRoutes.delete("/delete", userAuthentication,communityController.deleteCommunity);

module.exports = communityRoutes;