const express = require('express');
const passport = require('passport');
const controller = require('../controllers/user.controller');
const router = express.Router();

router.post('/getuser', controller.getUserByEmail);
router.get('getUserInfo', passport.authenticate('jwt', { session: false }), controller.getUserInfo);

module.exports = router;
