const express = require('express');
const controller = require('../controllers/get-user-by-email.controller');
const router = express.Router();

router.post('/getuser', controller.getUserByEmail);

module.exports = router;
