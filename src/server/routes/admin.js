const express = require('express');
const model = require('../models');
const router = express.Router();
const Event = model.Event;
const Fighter = model.Fighter;
const EventFighters = model.EventFighters;
const Record = model.Record;
const ufcSync = require('../util/scrape_data');
const stats = require('../util/stat_calculation');

router.get('/', function(req, res) {
    res.send('is this thing working?')
});

router.post('/scrape_data', (request, response) => {

    const test = [{
        title: 'test event',
        venue: 'test venue',
        event_date: '2019-01-01',
        sherdog_url: 'http://www.sherdog.com/events/UFC-Fight-Night-110-Hunt-vs-Lewis-58411',
        event_id: 58411
    }];

    const resultsObj = {};
    const fightsArray = [];

    // Scrape event data from sherdog
    ufcSync.getUpcomingEvents()
        .then((events) => {
            return Promise.all(
                // Go through each event, see if it exists. Update the mySQL database if it does, create if it doesn't.
                // Create a promise for each event so script does not moved forward until all are complete.
                 test.map(event => {
                     return new Promise((res, rej) => {
                         Event.findOne(event, {
                             where: {
                                 event_id: event.event_id
                             }
                         })
                             .then((foundEvent) => {
                                 if (foundEvent) {
                                     console.log('updating event: ' + event.event_id);
                                     return res(foundEvent.update(event))
                                 }
                                 else {
                                     console.log('event not found, creating event: ' + event.event_id);
                                     return res(Event.create(event))
                                 }
                             })
                             .catch(err => {
                                 console.log('upcoming events error: ', err);
                                 rej()
                             })
                     });
                 })
            )
         })
        .then((createdEvents) => {
            // Pull list of all event URLs from db.
            resultsObj.createdEvents = createdEvents;
            console.log('all events created/updated');
            return new Promise((res, rej) => {
                Event.findAll({
                    attributes: ['sherdog_url']
                }).then((eventURLs) => {
                    res(eventURLs)
                }).catch((err) => {
                    rej(err)
                })
            })
        })
        .then((eventURLs) => {
            // Take array of URLs and scrape all booked fighters
            resultsObj.eventURLs = eventURLs;
            // This will return an array of events with an array of the booked fighters
            return Promise.all(
                eventURLs.map(eventURL => {
                    // This will grab an array of fighters from each event
                    return new Promise((res, rej) => {
                        ufcSync.getFightersFromEvent(eventURL.sherdog_url)
                            .then((arrayOfFighters) => {
                                console.log('grabbed fighters from event', eventURL.sherdog_url);
                                res(arrayOfFighters)
                            }).catch((err) => {
                                rej(err)
                        })
                    })
                })
            )
        })
        .then((bookedFighters) => {
            // Take booked fighters and either update or create them in the mySQL database

            let mergedFightersArray = [];
            bookedFighters.map(arr => {
                Array.prototype.push.apply(mergedFightersArray, arr)
            });
            resultsObj.bookedFighters = mergedFightersArray;
            return Promise.all(
                mergedFightersArray.map(fighter => {
                    return new Promise((res, rej) => {
                        Fighter.findOne(fighter, {
                            where: {
                                fighter_id: fighter.fighter_id
                            }
                        }).then((foundFighter) => {
                            if (foundFighter) {
                                console.log('updating fighter: ' + fighter.fighter_id);
                                return res(foundFighter.update(fighter))
                            }
                            else {
                                console.log('creating fighter: ' + fighter.fighter_id);
                                return res(Fighter.create(fighter).catch(err => console.log('err found: ' + err + '. Fighter name: ' + fighter.fighter_name)))
                            }
                        }).catch((err) => {
                            console.log('did not update or create fighter');
                            rej(err)
                        })
                    })
                })
            )
        })
        .then((createdFighters) => {
            // Create associations in mySQL database
            resultsObj.createdFighters = createdFighters;
            return Promise.all(
                resultsObj.bookedFighters.map((fighter) => {
                    return new Promise((res, rej) => {
                        EventFighters.findOne({
                            where: {
                                eventEventId: fighter.event_id,
                                event_match_id: fighter.event_match_id
                            }
                        }).then((foundEventFighter) => {
                            if (foundEventFighter) {
                                console.log('updating association. fighter_id: ' + fighter.fighter_id + ' event_id: ' + fighter.event_id);
                                return res(foundEventFighter.update({
                                    fighterFighterId: fighter.fighter_id,
                                    event_match_position_id: fighter.event_match_position_id
                                }).catch(err => {
                                    console.log('error eventFighter update', err)
                                }))
                            }
                            else {
                                console.log('creating association. fighter_id: ' + fighter.fighter_id + ' event_id: ' + fighter.event_id);
                                return res(EventFighters.create({
                                    eventEventId: fighter.event_id,
                                    fighterFighterId: fighter.fighter_id,
                                    event_match_id: fighter.event_match_id,
                                    event_match_position_id: fighter.event_match_position_id
                                }).catch(err => {
                                    console.log('error association create', err)
                                }))
                            }
                        }).catch((err) => {
                            console.log('event_fighter error', err);
                            rej(err)
                        })
                    })
                })
            )
        })
        .then((createdAssociations) => {

            resultsObj.createdAssocations = createdAssociations;

            // Scrape detailed fighter info
            return Promise.all(
                resultsObj.createdFighters.map(fighter => {
                    return new Promise((res, rej) => {
                        ufcSync.getFighterData(fighter.fighter_url, fighter.fighter_id)
                            .then(detailedFighterInfo => {
                                console.log('retrieved detailed info for: ' + fighter.fighter_name);
                                res(detailedFighterInfo)
                            })
                            .catch(err => {
                                console.log('error detailed fighter info', err);
                                rej(err)
                        })
                    })
                })
            )
        })
        .then((fightersDetailed) => {
            resultsObj.fightersDetailed = fightersDetailed;
            // Import detailed fighter info into mySQL database
            return Promise.all(
                fightersDetailed.map(fighter => {
                    Array.prototype.push.apply(fightsArray, fighter.fights); // Merge all fight records into one array to make importing them easier later
                    return new Promise((res, rej) => {
                        Fighter.findOne({
                            where: {
                                fighter_id: fighter.id
                            }
                        }).then((foundFighter) => {
                            foundFighter.update(fighter.info)
                                .then(() => {
                                    console.log('imported stats for fighter_id: ' + fighter.id);
                                    res(fighter.id)
                                })
                                .catch(err => {
                                    console.log('fighter stats failed to import', err);
                                    rej(fighter.id)
                                    }
                                )
                        })
                    })
                })
            )
        })
        .then((fighterStatsImport) => {
            resultsObj.fighterStatsImport = fighterStatsImport;
            // Update records table with past fights
            return Promise.all(
                fightsArray.map(fight => {
                    return new Promise((res, rej) => {
                            Record.findOne({
                                where: {
                                    fighterFighterId: fight.fighterFighterId,
                                    name: fight.name
                                }
                            })
                            .then((foundFight) => {
                                if (foundFight) {
                                    console.log('updating fight record', fight.fighterFighterId);
                                    res(foundFight.update(fight))
                                }
                                else {
                                    console.log('creating new fight record: ', fight.fighterFighterId);
                                    res(Record.create(fight))
                                }
                            })
                            .catch(() => {
                                    console.log('failed to import fight');
                                    rej();
                            })
                    })
                })
            )

        })

        .then((fightRecordsImported) => {
            resultsObj.fightRecordsImported = fightRecordsImported;

            console.log('start');
            Fighter.findAll({
                include: [
                    {
                        model: EventFighters,
                        include: {
                            model: Event
                        }
                    },
                    {
                        model: Record
                    }]
            })

                .then((fighters_array) => {
                    console.log('found all fighters');
                    return Promise.all(
                        fighters_array.map(fighter => {
                            return new Promise((res, rej) => {
                                stats.statCalc(fighter)
                                    .then(updated_fighter_info => {
                                        setTimeout(() => {
                                            console.log('stat calc done: ' + updated_fighter_info.fighter_name);
                                            res(updated_fighter_info)
                                        }, 500)
                                    })
                                    .catch(err => {
                                        rej(err)
                                    })
                            })
                        })
                    )
                })
                .then((stat_calc_fighters) => {
                    return Promise.all(
                        stat_calc_fighters.map(fighter => {
                            return new Promise((res, rej) => {
                                Fighter.findOne({
                                    where: {
                                        fighter_id: fighter.fighter_id
                                    }
                                }).then((foundFighter) => {
                                    foundFighter.update({
                                        "fighter_id": fighter.fighter_id,
                                        "fighter_name": fighter.fighter_name,
                                        "fighter_url": fighter.fighter_url,
                                        "wins": fighter.wins,
                                        "wins_ko": fighter.wins_ko,
                                        "wins_sub": fighter.wins_sub,
                                        "wins_dec": fighter.wins_dec,
                                        "wins_other": fighter.wins_other,
                                        "losses": fighter.losses,
                                        "losses_ko": fighter.losses_ko,
                                        "losses_sub": fighter.losses_sub,
                                        "losses_dec": fighter.losses_dec,
                                        "losses_other": fighter.losses_other,
                                        "no_contest": fighter.no_contest,
                                        "draw": fighter.draw,
                                        "height": fighter.height,
                                        "weight": fighter.weight,
                                        "weight_class": fighter.weight_class,
                                        "age": fighter.age,
                                        "birthday": fighter.birthday,
                                        "locality": fighter.locality,
                                        "nationality": fighter.nationality,
                                        "association": fighter.association,
                                        "ufc_fights": fighter.ufc_fights,
                                        "mma_rounds": fighter.mma_rounds,
                                        "days_last_fight": fighter.days_last_fight,
                                        "days_last_win": fighter.days_last_win,
                                        "days_last_loss": fighter.days_last_loss,
                                        "years_mma_career": fighter.years_mma_career,
                                        "off_loss": fighter.off_loss,
                                        "year_avg_rounds": fighter.year_avg_rounds
                                    })
                                        .then(() => {
                                            console.log('stat calc for fighter_id: ' + fighter.fighter_id);
                                            res(fighter.fighter_id)
                                        })
                                        .catch(err => {
                                                console.log('stat calc failed to import', err);
                                                rej(fighter.fighter_id)
                                            }
                                        )
                                })
                            })
                        })
                    )
                })
                .then((stat_calc_import) => {
                    resultsObj.stat_calc_import = stat_calc_import;
                    response.status(200).json({Results: resultsObj});
                    console.log('** sync completed **')
                })
        })
});


router.get('/stat_calc', (req, res) => {
    console.log('start');
    Fighter.findOne({
        where: {
            fighter_id: fighter.fighter_id
        }
    }).then((foundFighter) => {
        foundFighter.update({
            "fighter_id": fighter.fighter_id,
            "fighter_name": fighter.fighter_name,
            "fighter_url": fighter.fighter_url,
            "wins": fighter.wins,
            "wins_ko": fighter.wins_ko,
            "wins_sub": fighter.wins_sub,
            "wins_dec": fighter.wins_dec,
            "wins_other": fighter.wins_other,
            "losses": fighter.losses,
            "losses_ko": fighter.losses_ko,
            "losses_sub": fighter.losses_sub,
            "losses_dec": fighter.losses_dec,
            "losses_other": fighter.losses_other,
            "no_contest": fighter.no_contest,
            "draw": fighter.draw,
            "height": fighter.height,
            "weight": fighter.weight,
            "weight_class": fighter.weight_class,
            "age": fighter.age,
            "birthday": fighter.birthday,
            "locality": fighter.locality,
            "nationality": fighter.nationality,
            "association": fighter.association,
            "ufc_fights": fighter.ufc_fights,
            "mma_rounds": fighter.mma_rounds,
            "days_last_fight": fighter.days_last_fight,
            "days_last_win": fighter.days_last_win,
            "days_last_loss": fighter.days_last_loss,
            "years_mma_career": fighter.years_mma_career,
            "off_loss": fighter.off_loss,
            "year_avg_rounds": fighter.year_avg_rounds
        })
            .then(() => {
                console.log('stat calc for fighter_id: ' + fighter.fighter_id);
                res(fighter.fighter_id)
            })
            .catch(err => {
                    console.log('stat calc failed to import', err);
                    rej(fighter.fighter_id)
                }
            )
    })
        .then(array => {
            console.log('sync complete');
            res.status(200).json(array)
        })
});

module.exports = router;