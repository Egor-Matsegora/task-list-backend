/** Import plugins */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const keys = require('./config/keys.config');

/** Import routes */
const authRoutes = require('./routes/auth.route');

const app = express();

/** Connect to db */
mongoose
  .connect(keys.MONGO_URL)
  .then(() => console.log('mongoDB connected'))
  .catch(error => console.error(error));

/** Plugins */
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Routes */
app.use('/auth', authRoutes);

module.exports = app;
