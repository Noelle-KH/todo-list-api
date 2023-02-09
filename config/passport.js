const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const User = require('../models/user')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true,
  session: false
}, (req, email, password, done) => {
  return User.findOne({ email })
    .then(user => {
      if (!user) return done(null, false, { message: '使用者不存在，請確認信箱或密碼是否有錯誤或註冊會員' })
      return bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return done(null, false, { message: '信箱或密碼不正確，請重新輸入' })
          return done(null, user)
        })
        .catch(error => done(error))
    })
    .catch(error => done(error))
}))

module.exports = passport
