const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  done: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('tasks', taskSchema);
