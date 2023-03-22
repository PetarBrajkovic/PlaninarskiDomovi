const mongoose = require('mongoose');

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
    },
    pictureUrl: {
        type: String
    },
    coordinates: {
        type: [Number]
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

module.exports.getMountainLodgeByClubId = function (id, callback) {
    const query = { club: id };
    MountainLodge.find(query, callback);
}

module.exports.updateMountainLodge = function (id, mountainLodge, callback) {
    MountainLodge.findByIdAndUpdate(id, mountainLodge, callback);
}