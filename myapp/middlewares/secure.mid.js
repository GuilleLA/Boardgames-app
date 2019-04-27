const createError = require('http-errors')

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  }
  else{
    res.redirect('/login')
  }
}

module.exports.isUser = (req, res, next) => {
    if (req.user.id === req.params.id) {
      next()
    }
    else {
      next(createError(403, 'Not your profile'))}
}

