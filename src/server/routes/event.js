const express = require('express');
const model = require('../models');
const router = express.Router();
const Event = model.Event;
const ufcEventSync = require('../util/scrape_events');
// const ufcEventFighterSync = require('../util/scrape_fighters_from_event');

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
             })
         });
     }).then(() => {
         console.log('data');
     })
});

module.exports = router;