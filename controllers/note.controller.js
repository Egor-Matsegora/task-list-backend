const Note = require('../models/Note.model');
const errorHandler = require('../helpers/error-handler.helper');

module.exports.getUserNotes = async function(req, res) {
  try {
    const notes = await Note.find({
      user: req.user.id
    });
    res.status(200).json(notes);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.create = async function(req, res) {
  try {
    const note = await new Note({
      text: req.body.text,
      title: req.body.title,
      date: Date.now(),
      user: req.user.id
    }).save();
    res.status(201).json(note);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.update = async function(req, res) {
  try {
    const note = await Note.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    res.status(200).json(note);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.delete = async function(req, res) {
  try {
    await Note.remove({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: 'note removed'
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
