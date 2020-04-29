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
    const candidate = await User.findById(req.user.id);
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

module.exports.getUserInfo = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.updateUser = async function (req, res) {
  console.log(req.file);
  const values = {
    ...req.body,
    imageUrl: req.file ? req.file.path : '',
  };

  try {
    const user = await User.findOneAndUpdate({ _id: req.user.id }, { $set: values }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.updateUserPassword = async function (req, res) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const newPassword = { password: bcrypt.hashSync(req.body.password, salt) };
    const user = await User.findOneAndUpdate({ _id: req.user.id }, { $set: newPassword }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};
