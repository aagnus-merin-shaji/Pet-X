const Community = require('../models/communityModel');
const asyncHandler = require('express-async-handler');

const communityController = {
    createCommunity: asyncHandler(async (req, res) => {
        const { name, description, topics, isPrivate, rules } = req.body;
        
        if (!name || !description ) {
            res.status(400);
            throw new Error('Name, description are required');
        }

        const community = await Community.create({
            name,
            description,
            topics,
            createdBy:req.user.id,
            isPrivate,
            rules
        });

        res.status(201).json(community);
    }),

    getAllCommunities: asyncHandler(async (req, res) => {
        const communities = await Community.find()
        res.json(communities);
    }),

    getCommunityById: asyncHandler(async (req, res) => {
        const {id}=req.body
        const community = await Community.findById(id).populate('members');
        
        if (!community) {
            res.status(404);
            throw new Error('Community not found');
        }

        res.json(community);
    }),

    joinCommunity: asyncHandler(async (req, res) => {
        const {id}=req.body
        const community = await Community.findById(id);
        const userId = req.user.id;

        if (!community) {
            res.status(404);
            throw new Error('Community not found');
        }

        if (community.isPrivate) {
            if (!community.joinRequests.includes(userId)) {
                community.joinRequests.push(userId);
                await community.save();
                res.json({ message: 'Join request sent' });
            } else {
                res.json({ message: 'Already requested to join' });
            }
        } else {
            if (!community.members.includes(userId)) {
                community.members.push(userId);
                await community.save();
                res.json({ message: 'Joined community successfully' });
            } else {
                res.json({ message: 'Already a member' });
            }
        }
    }),

    leaveCommunity: asyncHandler(async (req, res) => {
        const {id}=req.body
        const community = await Community.findById(id);
        const userId = req.user.id;

        if (!community) {
            res.status(404);
            throw new Error('Community not found');
        }

        community.members = community.members.filter(member => member.toString() !== userId.toString());
        await community.save();
        res.json({ message: 'Left community successfully' });
    }),

    deleteCommunity: asyncHandler(async (req, res) => {
        const community = await Community.find({createdBy:req.user.id});

        if (!community) {
            res.status(404);
            throw new Error('Community not found or you are not authorised to delete');
        }

        await community.deleteOne();
        res.json({ message: 'Community deleted successfully' });
    }),

    addPost: asyncHandler(async (req, res) => {
        const { id, post } = req.body;
        const userId = req.user.id;

        const community = await Community.findById(id);

        if (!community) {
            res.status(404);
            throw new Error('Community not found');
        }

        // Check if the user is a member of the community
        if (!community.members.includes(userId)) {
            res.status(403);
            throw new Error('You must be a member of this community to post');
        }

        community.posts.push(post); // Storing user reference with post
        await community.save();

        res.json({ message: 'Post added successfully', community });
    }),
};

module.exports = communityController;