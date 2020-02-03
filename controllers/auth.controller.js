const User = require('./../models/User.model');

module.exports.login = function(req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  });
};

module.exports.registration = async function(req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  /** Проверяет email, озвращает false при невалидном email и true при валидном */
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  /** Проверяет пароль, озвращает false при длинне пароля менее 6 символов и true в другом случае */
  function validatePassword(pass) {
    const stringPass = String(pass);
    if (stringPass.length >= 6) {
      return true;
    }
    return false;
  }

  if (candidate) {
    res.status(409).json({
      massage: 'email already exists'
    });
  } else {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    if (validateEmail(user.email) && validatePassword(user.password)) {
      try {
        await user.save().then(() => console.log(`user with email: ${user.email} was created`));
        res.status(201).json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: 'Internal server error'
        });
      }
    } else {
      res.status(400).json({
        message: 'invalid email or small password'
      });
    }
  }
};
