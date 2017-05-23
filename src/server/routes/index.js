const adminRouter = require('./admin.js');
const fighterRouter = require('./fighter');
const eventRouter = require('./event');

const express = require('express');
const router  = express.Router();

router.use('/admin', adminRouter);
router.use('/fighter', fighterRouter);
router.use('/event', eventRouter);

module.exports = router;