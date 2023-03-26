const mongoose = require('mongoose');


const ReservationSchema = new mongoose.Schema({
    mountainLodgeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MountainLodge'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    numberOfNights: {
        type: Number
    },
    numberOfGuests: {
        type: Number
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['DEFAULT', 'CONFIRMED', 'DENIED']
    }
});

ReservationSchema.index({ mountainLodgeId: 1, startDate: 1, endDate: 1 }, { unique: true });

const Reservation = module.exports = mongoose.model('Reservation', ReservationSchema);

module.exports.getReservationById = function (id, callback) {
    Reservation.findById(id, callback);
}

module.exports.getReservationsByMountainLodgeId = function (id, callback) {
    Reservation.aggregate([
        { $match: { 'mountainLodgeId': mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
            },
        }], callback)
}

module.exports.addReservation = function (newReservation, callback) {
    newReservation.save(callback);
}

module.exports.checkLodgeAvailability = function (lodgeId, startDate, endDate, callback) {
    const query = {
        $and: [
            { 'mountainLodgeId': lodgeId },
            { 'startDate': { $lt: endDate } },
            { 'endDate': { $gt: startDate } }
        ]
    };
    Reservation.find(query, callback);
}

module.exports.updateReservation = function (id, reservation, callback) {
    Reservation.findByIdAndUpdate(id, reservation, callback);
}