const passport      = require('passport')
const User          = require('../models/user.model')
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, next) => {
  next(null, user.id)
})