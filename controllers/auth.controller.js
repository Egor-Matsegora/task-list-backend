const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./../models/User.model');

const keys = require('./../config/keys.config');
const errorHandler = require('../helpers/error-handler.helper');

/** Проверяет email, озвращает false при невалидном email и true при валидном */
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/** Проверяет пароль, озвращает false при длинне пароля менее 6или более 20, символов bkb и true в другом случае */
function validatePassword(pass) {
  const stringPass = String(pass);
  if (stringPass.length >= 6 && stringPass.length <= 20) {
    return true;
  }
  return false;
}

module.exports.login = async function (req, res) {
  try {
    if (validateEmail(req.body.email) && validatePassword(req.body.password)) {
      const candidate = await User.findOne({ email: req.body.email });

      if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

        if (passwordResult) {
          const token = jwt.sign(
            {
              email: candidate.email,
              userId: candidate._id,
              firstName: candidate.firstName,
              lastName: candidate.lastName,
            },
            keys.JWT_KEY,
            { expiresIn: 60 * 60 * 3 }
          );

          res.status(200).json({
            token: `Bearer ${token}`,
            success: true,
            user: candidate,
          });
        } else {
          res.status(401).json({
            success: false,
            message: 'wrong password',
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: 'user not found',
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'invalid email or small password',
      });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.registration = async function (req, res) {
  try {
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
      res.status(409).json({
        massage: 'email already exists',
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const password = req.body.password;
      const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(password, salt),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });

      if (validateEmail(user.email) && validatePassword(password)) {
        try {
          await user.save().then(() => console.log(`user with email: ${user.email} was created`));
          res.status(201).json({
            success: true,
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            success: false,
            message: 'Internal server error',
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'invalid email or small password',
        });
      }
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
