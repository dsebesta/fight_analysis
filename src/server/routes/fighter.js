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
        attributes: ['title', 'venue'],
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
            },
        },
        where: {
            event_id: event_id
        },
        order: [[EventFighters, Fighter, Record, 'date', 'DESC']]
    }).then((results) => {
        // Merge fights against common opponents
        return new Promise((res, rej) => {

            const fighter_0_record = results.event_fighters[0].fighter.records;
            const fighter_1_record = results.event_fighters[1].fighter.records;

            // Find common opponents
            const merged = fighter_0_record.filter((obj1) => {
                return fighter_1_record.some((obj2) => {
                    return obj1.opponent === obj2.opponent
                });
            }).reduce((newObj, obj) => {
                newObj[obj.opponent] = [];
                return newObj;
            }, {});
            const keys = Object.keys(merged);

            // Group opponents so they can be displayed together

            const emptyFight = {
                "date": "-",
                "result": "-",
                "method": "-",
                "round": "-",
                "opponent": "-",
            };


            for (let i=0; i < keys.length; i++) {
                let arr0_placement = 0;
                let arr1_placement = 0;
                fighter_0_record.map(record => {
                    if (keys[i] === record.opponent) {
                        merged[record.opponent][arr0_placement++] = [record, emptyFight];
                    }
                });
                fighter_1_record.map(record => {
                    if (keys[i] === record.opponent) {
                        if (!merged[record.opponent][arr1_placement]) {
                            merged[record.opponent][arr1_placement++] = [emptyFight, record]
                        }
                        else {
                            merged[record.opponent][arr1_placement++][1] = record;
                        }
                    }
                })
            }

            const stats_with_common_opponents = JSON.parse(JSON.stringify(results));
            stats_with_common_opponents.common = merged;


            res(stats_with_common_opponents);

        });
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