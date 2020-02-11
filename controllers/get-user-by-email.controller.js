const User = require('./../models/User.model');

module.exports.getUserByEmail = async function(req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    res.json({ success: true })
  } else {
    res.json({ success: false })
  }
}
