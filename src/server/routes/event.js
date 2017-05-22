const express = require('express');
const model = require('../models');
const router = express.Router();
const Event = model.Event;
const Fighter = model.Fighter;
const ufcEventSync = require('../util/scrape_events');
const ufcEventFighterSync = require('../util/scrape_fighters_from_event');

router.get('/', function(req, res) {
    res.send('is this thing working?')
});

router.post('/scrape_data', (req, res) => {
     ufcEventSync.getUpcomingEvents()
         .then((data) => {
         res.status(200).json({Success: true});

         data.forEach((event) => {
             Event
                 .create({
                 title: event.title,
                 venue: event.venue,
                 event_date: event.event_date,
                 event_id: event.event_id,
                 sherdog_url: event.sherdog_url
             }).then((event) => {
                 ufcEventFighterSync.getEventData(event.sherdog_url)
                     .then((data) => {
                         data.forEach((fighter) => {
                             if (fighter.fighter_name !== 'Unknown Fighter') {
                                 Fighter
                                     .create({
                                         fighter_id: fighter.fighter_id,
                                         fighter_url: fighter.fighter_url,
                                         fighter_name: fighter.fighter_name,
                                         event_id: fighter.event_id,
                                         event_match_id: fighter.event_match_id
                                     }, {
                                        include: [Event]
                                     })
                                     .then(() => {

                                     })
                                     // .then((fighter) => {
                                     //    Event
                                     //        .addFighter({
                                     //            fighter_id: fighter.fighter_id,
                                     //            event_id: fighter.event_id
                                     //        })
                                     // })
                                     // .catch((err) => {
                                     //    console.log('fighter error', err)
                                     // })
                             }
                         })
                     })
             })
         });
     }).then(() => {

     })
});

module.exports = router;