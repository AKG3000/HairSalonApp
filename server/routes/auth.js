const express = require('express');
const router = express.Router();
const {
  registerValidationRules,
  loginValidationRules,
} = require('../utils/Validations');
const {
  register,
  login,
  logOut,
  isLoggedIn,
} = require('../controllers/AuthController');

router.post('/register', registerValidationRules, register);
router.post('/login', loginValidationRules, login);
router.get('/logout', logOut);
router.get('/is_logged_in', isLoggedIn);

module.exports = router;
