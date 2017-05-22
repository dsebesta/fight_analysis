const express = require('express');
const model = require('../models');
const router = express.Router();
const Event = model.Event;
const Fighter = model.Fighter;
const EventFighters = model.EventFighters;


router.get('/fighter', function(req, res) {
    Fighter.findAll({
        include: {
            model: EventFighters,
            include: {
                model: Event,
                where: {
                    event_id: '58241'
                }
            }
        }
    }).then(fighter => {
        res.status(200).json(fighter)
    });
});

module.exports = router;