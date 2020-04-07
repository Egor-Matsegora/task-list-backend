const express = require('express');
const controller = require('../controllers/statistics.controller');
const router = express.Router();

router.get('/', controller.getUserStat);

module.exports = router;
