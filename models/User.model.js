const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    reqired: true,
    unique: true
  },
  password: {
    type: String,
    reqired: true,
    min: 6,
    max: 20
  },
  firstName: {
    type: String,
    reqired: true
  },
  lastName: {
    type: String,
    reqired: true
  },
  imageUrl: {
    type: String,
    reqired: false
  }
});

module.exports = mongoose.model('user', userSchema);
