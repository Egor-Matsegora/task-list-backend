const moment = require('moment');
const Note = require('../models/Note.model');
const Task = require('../models/Task.model');
const errorHandler = require('../helpers/error-handler.helper');

const dateFormat = 'DD.MM.YYYY';

module.exports.getUserStat = async function (req, res) {
  try {
    const allNotes = await Note.find({
      user: req.user.id,
    });

    res.status(200).json({ message: 'иди на хуй' });
  } catch (error) {
    errorHandler(res, error);
  }
};
