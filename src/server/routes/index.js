const eventRouter = require('./event.js');

const express = require('express');
const router  = express.Router();

router.use('/event', eventRouter);

module.exports = router;