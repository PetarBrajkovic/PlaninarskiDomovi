const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const routeCache = require('route-cache');

router.post('/add', (req, res, next) => {
    let newReservation = new Reservation({
        mountainLodgeId: req.body.mountainLodgeId,
        userId: req.body.userId,
        numberOfNights: req.body.numberOfNights,
        numberOfGuests: req.body.numberOfGuests,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status
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

router.get('/getReservationByLodge/:id', routeCache.cacheSeconds(120), (req, res) => {
    Reservation.getReservationsByMountainLodgeId(req.params.id, (err, reservation) => {
        if (err) {
            res.json({ success: false, data: err });
        } else {
            res.json({ success: true, data: reservation });
        }
    });
});

router.get('/checkLodgeAvailability/:lodgeId', (req, res) => {
    Reservation.checkLodgeAvailability(
        req.params.lodgeId,
        req.query.startDate,
        req.query.endDate,
        (err, reservation) => {
            if (err) {
                res.json({ success: false, data: err });
            } else {
                const datesTaken = reservation.length;
                res.json({ success: true, data: { 'availability': datesTaken === 0 } });
            }
        });
})

router.put('/updateReservation/:id', (req, res) => {
    Reservation.updateReservation(req.params.id, req.body.reservation, (err, data) => {
        if (err) {
            res.json({ success: false, data: err });
        } else {
            res.json({ success: true, data: data });
        }
    });
});

module.exports = router;