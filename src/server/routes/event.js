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

    model.sequelize.query(
        "SELECT `events`.`event_id`, `events`.`title`, `event_fighters`.`id` " +
        "AS `id`, `event_fighters`.`event_match_id` " +
        "AS `match_id`, GROUP_CONCAT(`event_fighters`.`event_match_position_id`) " +
        "AS `position_id`, GROUP_CONCAT(`f`.`fighter_id`) " +
        "AS `fighter_id`, GROUP_CONCAT(`f`.`fighter_name`) " +
        "AS `fighter_name` " +
        "FROM `events` " +
        "LEFT OUTER JOIN `event_fighters` ON `events`.`event_id` = `event_fighters`.`eventEventId` " +
        "LEFT OUTER JOIN `fighters`AS `f` ON `event_fighters`.`fighterFighterId` = `f`.`fighter_id` " +
        "WHERE `events`.`event_id` = " + event_id + " " +
        "GROUP BY `match_id` DESC"
    )





    // Event.findOne({
    //     where: {
    //         event_id: event_id
    //     },
    //     attributes: ['title'],
    //     include: {
    //         model: EventFighters,
    //         include: {
    //             model: Fighter,
    //             attributes: ['fighter_id', 'fighter_name']
    //         },
    //         attributes: [
    //             'event_match_id',
    //             'event_match_position_id'
    //         ],
    //         group: ['event_match_position_id'],
    //     }
    // })
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
        .spread((data) => {
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