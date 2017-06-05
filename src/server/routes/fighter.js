const express = require('express');
const model = require('../models');
const router = express.Router();
const Event = model.Event;
const Fighter = model.Fighter;
const EventFighters = model.EventFighters;
const Record = model.Record;


router.get('/:id/:matchup', (req, res) => {
    const event_id = parseInt(req.params.id);
    const matchup_id = parseInt(req.params.matchup);

    Event.findOne({
        include: {
            model: EventFighters,
            where: {
                event_match_id: matchup_id
            },
            include: {
                model: Fighter,
                include: {
                    model: Record
                }
            }
        },
        where: {
            event_id: event_id
        }
    }).then((results) => {
        res.status(200).json(results)
    })
});

router.get('/:id', (req, res) => {
    const fighter_id = parseInt(req.params.id);
    Fighter.findOne({
        where: {
            fighter_id: fighter_id
        },
        include: {
            model: Record
        },
        order: [[Record, 'date', 'DESC']]
    })
        .then(results => {
            res.status(200).json(results)
        })
});

module.exports = router;