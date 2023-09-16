const express = require('express');
const router = express.Router();
const {
  registerValidationRules,
  loginValidationRules,
} = require('../utils/Validations');

router.post('/register', registerValidationRules, register);
router.post('/login', loginValidationRules, login);
router.get('/logout', logout);
router.get('/is_logged_in', isLoggedIn);
