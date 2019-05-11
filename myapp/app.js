require('dotenv').config();

const createError  = require('http-errors');
const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const passport     = require('passport');
const flash        = require('express-flash');

require('./config/db.config')
const session      = require('./config/session.config');
require('./config/hbs.config')

require('./config/passport.config')


const authRouter   = require('./routes/auth.routes');
const searchRouter = require('./routes/search.routes');
const usersRouter  = require('./routes/users.routes');
const gamesRouter  = require('./routes/game.routes');
const eventsRouter = require('./routes/event.routes');
const statsRouter = require('./routes/stats.routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.path = req.path;
  res.locals.session = req.user;
  res.locals.maps = process.env.GOOGLE_MAPS_API_KEY;
  const errors = req.flash('errors');
  if (errors && errors[0]) {
    console.log(JSON.parse(errors[0]))
    res.locals.errors = JSON.parse(errors[0])
  }
  next()
})

app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/search', searchRouter);
app.use('/events', eventsRouter);
app.use('/stats', statsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
