const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('notes', noteSchema);
