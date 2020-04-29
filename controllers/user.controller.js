const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const errorHandler = require('../helpers/error-handler.helper');

module.exports.getUserByEmail = async function (req, res) {
  try {
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getUserPassword = async function (req, res) {
  try {
    const candidate = await User.findOne({ email: req.user.email });
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

    if (passwordResult) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getUserInfo = function (req, res) {
  const user = req.user;
  if (Object.keys(user).length) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ success: false });
  }
};
