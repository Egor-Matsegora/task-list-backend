/** Import plugins */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

/** Import config keys */
const keys = require('./config/keys.config');

/** Import routes */
const authRoutes = require('./routes/auth.route');
const tasksRoutes = require('./routes/tasks.route');
const notesRoutes = require('./routes/notes.route');
const getUserRoutes = require('./routes/get-user-by-email.route');
const statisticsRoutes = require('./routes/statistics.route');

/** import middleware */
const passportMiddleware = require('./middleware/passport/passport.middleware');

const app = express();

/** Connect to db */
mongoose
  .connect(keys.MONGO_URL)
  .then(() => console.log('mongoDB connected'))
  .catch((error) => console.error(error));

/** passport usage */
app.use(passport.initialize());
passportMiddleware(passport);

/** Plugins */
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Routes */
app.use('/api', authRoutes);
app.use('/api', getUserRoutes);
app.use('/api/tasks', passport.authenticate('jwt', { session: false }), tasksRoutes);
app.use('/api/notes', passport.authenticate('jwt', { session: false }), notesRoutes);
app.use('/api/statistics', passport.authenticate('jwt', { session: false }), statisticsRoutes);

module.exports = app;
