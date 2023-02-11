const passport = require('passport')

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(401).json({
        status: 'Error',
        message: 'Unauthorized'
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

module.exports = { authenticate }
