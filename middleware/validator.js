const { body } = require('express-validator')
const validator = [
  body('email')
    .isEmail()
    .withMessage('Not an email')
    .notEmpty()
    .withMessage('Email must be required.'),
  body('password')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password length should between 6 - 20.')
    .notEmpty()
    .withMessage('Password must be required.'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password and confirm password not the same.')
      }
      return true
    })
]

module.exports = validator
