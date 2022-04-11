const express = require('express');
const router = express.Router();
const MountainLodge = require('../models/mountainLodge');

router.post('/add', (req, res, next) => {
    let newMountainLodge = new MountainLodge({
        name: req.body.name,
        mountain: req.body.mountain,
        height: req.body.height,
        contact: req.body.contact,
        website: req.body.website,
        numberOfBeds: req.body.numberOfBeds,
        description: req.body.description
    });

    MountainLodge.addMountainLodges(newMountainLodge, (err, user) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});

router.get('/getAll', (req, res) => {
    MountainLodge.getAllMountainLodges((err, allLodges) => {
        if (err) {
            res.json({ success: false, data: err });
        } else {
            res.json({ success: true, data: allLodges });
        }
    });
});

router.get('/getLodge/:id', (req, res) => {
    MountainLodge.getMountainLodgeById(req.params.id, (err, mountainLodge) => {
        if (err) {
            res.json({ success: false, data: err });
        } else {
            res.json({ success: true, data: mountainLodge });
        }
    });
});

module.exports = router;