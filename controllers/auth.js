const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const keys = require('../config/keys');
const errorHandler = require('./utils/errorHandler');

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    // Checking password. User exists
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      // Generating token. Passwords matched
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        keys.jwt,
        { expiresIn: 60 * 60 }
      );
      res.status(200).json({
        token: `Bearer ${token}`,
      });
    } else {
      // Password  does not match
      res.status(401).json({
        message: 'Password  does not match. Try again',
      });
    }
  } else {
    // User does not exist. Error
    res.status(404).json({
      message: 'A User with this name does not exist',
    });
  }
};

module.exports.register = async function (req, res) {
  //email password
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    // the user exists, need to send an error
    res.status(409).json({
      message: 'This email already exists in the database',
    });
  } else {
    // Need to create a user
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;

    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};
