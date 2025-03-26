const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    topics: [{
        type: String
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    posts: [{
        type: String,
    }],
    isPrivate: {
        type: Boolean,
        default: false
    },
    joinRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    rules: [{
        type: String
    }],
}, { timestamps: true });

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;
