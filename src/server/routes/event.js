const express = require('express');
const model = require('../models');
const router = express.Router();
const Event = model.Event;
const ufcSync = require('./../util/ufc_events');

router.get('/', function(req, res) {
    res.send('is this thing working?')
});

router.post('/scrape_data', (req, res) => {
     ufcSync.getUpcomingEvents((data) => {
         data.forEach((event) => {
             Event
                 .create({
                 title: event.title,
                 venue: event.venue,
                 event_date: event.event_date,
                 event_id: event.event_id,
                 sherdog_url: event.sherdog_url
             })
         })
     })
});

module.exports = router;