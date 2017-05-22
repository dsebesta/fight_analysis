const eventRouter = require('./event.js');
const fighterRouter = require('./fighter');

const express = require('express');
const router  = express.Router();

router.use('/import', eventRouter);
router.use('/fighter', fighterRouter);

module.exports = router;