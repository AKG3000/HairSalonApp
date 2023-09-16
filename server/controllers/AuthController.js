const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    //Check for Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { userName, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User Already Exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new User({
      userName,
      email,
      password: hashPassword,
    });
    await user.save();

    const payload = {
      id: user._id,
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

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = {
      id: user._id,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .status(200)
          .json({ token });
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};
const logOut = async (req, res) => {
  try {
    res.clearCookie('access_token');
    return res.status(200).json({ message: 'User is logged out' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error: ' + err });
  }
};

const isLoggedIn = async (req, res) => {
  const token = await req.cookies.access_token;
  if (!token) return res.json(false);
  return jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.json(false);
    return res.json(true);
  });
};

module.exports = {
  register,
  login,
  logOut,
  isLoggedIn,
};
