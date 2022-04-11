const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const MountainLodgeSchema = mongoose.Schema({
    name: {
        type: String
    },
    mountain: {
        type: String
    },
    height: {
        type: Number
    },
    contact: {
        type: String
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MountainClub'
    },
    website: {
        type: String
    },
    numberOfBeds: {
        type: Number
    },
    description: {
        type: String
    }
});

const MountainLodge = module.exports = mongoose.model('MountainLodge', MountainLodgeSchema);

module.exports.getMountainLodgeById = function (id, callback) {
    MountainLodge.findById(id, callback);
}

module.exports.getAllMountainLodges = function (callback) {
    MountainLodge.find(callback);
}

module.exports.addMountainLodges = function (newMountainLodge, callback) {
    newMountainLodge.save(callback);
}