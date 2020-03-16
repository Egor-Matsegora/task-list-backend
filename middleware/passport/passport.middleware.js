const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./../../models/User.model');
const jwtKey = require('./../../config/keys.config').JWT_KEY;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtKey
};

module.exports = passport => {
  passport.use(
    new jwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id firstName lastName');

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        console.error(error);
      }
    })
  );
};
