const Task = require('../models/Task.model');
const errorHandler = require('../helpers/error-handler.helper');

module.exports.getUserTasks = async function(req, res) {
  try {
    const tasks = await Task.find({
      user: req.user.id
    });
    res.status(200).json(tasks);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.create = async function(req, res) {
  try {
    const position = await new Position({
      tytle: req.body.tytle,
      description: req.body.description,
      done: false,
      date: new Date.now(),
      user: req.user.id
    }).save();
    res.status(201).json(position);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.update = async function(req, res) {
  try {
    const position = await Position.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    res.staus(200).json(position);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.delete = async function(req, res) {
  try {
    await Position.remove({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: 'position removed'
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
