const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    //Check for Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User Already Exists' });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new User({
      userName,
      email,
      password: hashPassword,
    });
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
};

const login = async (req, res) => {};
const logOut = async (req, res) => {};
const isLoggedIn = async (req, res) => {};

module.exports = {
  register,
};
