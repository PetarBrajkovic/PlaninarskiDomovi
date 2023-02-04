const mongoose = require('mongoose');


const ReservationSchema = new mongoose.Schema({
    mountainLodge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MountainLodge'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    numberOfNights: {
        type: Number
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
});

ReservationSchema.index({ mountainLodge: 1, startDate: 1, endDate: 1 }, { unique: true });

const Reservation = module.exports = mongoose.model('Reservation', ReservationSchema);

module.exports.getReservationById = function (id, callback) {
    Reservation.findById(id, callback);
}

module.exports.getReservationsByMountainLodgeId = function (id, callback) {
    Reservation.find({ mountainLodge: id }, callback);
}

module.exports.addReservation = function (newReservation, callback) {
    newReservation.save(callback);
}