const express = require('express');
const model = require('../models');
const router = express.Router();
const Event = model.Event;
const Fighter = model.Fighter;
const EventFighters = model.EventFighters;


router.get('/', function(req, res) {
    Event.findAll({
        include: {
            model: EventFighters,
            include: {
                model: Fighter
            }
        },
        order: 'event_date ASC'
    }).then(fighter => {
        res.status(200).json(fighter)
    });
});

module.exports = router;