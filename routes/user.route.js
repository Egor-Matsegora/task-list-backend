const express = require('express');
const passport = require('passport');
const controller = require('../controllers/user.controller');
const upload = require('../middleware/uploads/uploads.middleware');
const router = express.Router();

router.post('/getuser', controller.getUserByEmail);
router.post('/getuserpassword', passport.authenticate('jwt', { session: false }), controller.getUserPassword);
router.get('/getuserinfo', passport.authenticate('jwt', { session: false }), controller.getUserInfo);
router.patch(
  '/updateuser',
  upload.single('image'),
  passport.authenticate('jwt', { session: false }),
  controller.updateUser
);
router.patch('/updatepassword', passport.authenticate('jwt', { session: false }), controller.updateUserPassword);

module.exports = router;
