const express = require('express');
const model = require('../models');
const router = express.Router();
const Event = model.Event;
const Fighter = model.Fighter;
const EventFighters = model.EventFighters;
const ufcEventSync = require('../util/scrape_events');
const ufcEventFighterSync = require('../util/scrape_fighters_from_event');

router.get('/', function(req, res) {
    res.send('is this thing working?')
});

router.post('/scrape_data', (req, res) => {

    // Scrapes event data from sherdog
     ufcEventSync.getUpcomingEvents()
         .then((data) => {

         // Creates a record for each event in mySQL
         data.forEach((event) => {
             Event
                 .create({
                 title: event.title,
                 venue: event.venue,
                 event_date: event.event_date,
                 event_id: event.event_id,
                 sherdog_url: event.sherdog_url
             }).then((event) => {

                 // Scrapes fighters in the event created above
                 ufcEventFighterSync.getEventData(event.sherdog_url)
                     .then((data) => {

                     // Creates a record for each fighter in the event
                     data.forEach((fighter) => {
                         if (fighter.fighter_name !== 'Unknown Fighter') {

                             const event_id = fighter.event_id;
                             const event_match_id = fighter.event_match_id;
                             const event_match_position_id = fighter.event_match_position_id;
                             const fighter_id = fighter.fighter_id;

                             Fighter
                                 .create({
                                     fighter_id: fighter.fighter_id,
                                     fighter_url: fighter.fighter_url,
                                     fighter_name: fighter.fighter_name
                                 })
                                 .then((result) => {

                                 EventFighters.create({
                                     eventEventId: event_id,
                                     fighterFighterId: fighter_id,
                                     event_match_id: event_match_id,
                                     event_match_position_id: event_match_position_id
                                 })
                             })
                         }
                     })
                 })
                     .then (
                         res.status(200).json({
                             Success: true
                         })
                     )
             })
         });
     })

});

module.exports = router;