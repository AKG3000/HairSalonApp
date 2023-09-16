const { body } = require('express-validator');

const registerValidationRules = [
  body('userName').notEmpty().isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isStrongPassword(),
];

const loginValidationRules = [
  body('email').isEmail(),
  body('password').isStrongPassword(),
];

module.exports = { registerValidationRules, loginValidationRules };
