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

router.get('/:id', (req, res) => {
    // const event_id = parseInt(req.params.id / 1.337);
    const event_id = parseInt(req.params.id);
    Event.findOne({
        where: {
            event_id: event_id
        },
        attributes: ['title'],
        include: {
            model: EventFighters,
            include: {
                model: Fighter,
                attributes: ['fighter_id', 'fighter_name']
            },
            attributes: [
                'event_match_id',
                'event_match_position_id'
            ],
            group: ['event_match_position_id'],
        }
    })
    //     .then((data) => {
    //     let eObject = {};
    //     eObject.title = data.title;
    //     eObject.fights = {};
    //     data.event_fighters.map((match) => {
    //         if (!eObject.fights[match.event_match_id]) {eObject.fights[match.event_match_id] = {}}
    //         eObject.fights[match.event_match_id][match.event_match_position_id] = {};
    //         eObject.fights[match.event_match_id][match.event_match_position_id].fighter_id = match.fighter.fighter_id;
    //         eObject.fights[match.event_match_id][match.event_match_position_id].fighter_name = match.fighter.fighter_name;
    //     });
    //     return eObject;
    // })
        .then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(404).json({
            Status: "Failed",
            Error: err
        })
    })
});

//TODO find out why catch isnt working

module.exports = router;