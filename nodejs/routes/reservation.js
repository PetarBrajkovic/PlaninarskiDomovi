const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

router.post('/add', (req, res, next) => {
    let newReservation = new Reservation({
        mountainLodgeId: req.body.mountainLodgeId,
        userId: req.body.userId,
        numberOfNights: req.body.numberOfNights,
        numberOfGuests: req.body.numberOfGuests,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    Reservation.addReservation(newReservation, (err, reservation) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            res.json({ success: true, msg: 'New reservation added' });
        }
    });
});

router.get('/getReservation/:id', (req, res) => {
    Reservation.getReservationById(req.params.id, (err, reservation) => {
        if (err) {
            res.json({ success: false, data: err });
        } else {
            res.json({ success: true, data: reservation });
        }
    });
});

router.get('/getReservationByLodge/:id', (req, res) => {
    Reservation.getReservationsByMountainLodgeId(req.params.id, (err, reservation) => {
        if (err) {
            res.json({ success: false, data: err });
        } else {
            res.json({ success: true, data: reservation });
        }
    });
});

module.exports = router;