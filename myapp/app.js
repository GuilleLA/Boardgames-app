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
//app.use('/search-game-filter', searchRouter);


app.get('/search-game-filter', function (req, res, next) {
  const Game = require('./models/game.model')
  const criteria = {};
  const criteriaGte = {}

  console.log('QUERY: ', req.query);

  if (req.query.name) {
    criteria.name =  new RegExp(req.query.name, 'i');
  }

  if (req.query.yearPublished) {
    criteria.yearPublished = parseInt(req.query.yearPublished, 10);
  }

  if (req.query.minPlayers) {
    criteria.minPlayers = parseInt(req.query.minPlayers, 10);
  }

  if (req.query.maxPlayers) {
    criteria.maxPlayers = parseInt(req.query.maxPlayers, 10);
  }

  if (req.query.maxPlaytime) {
    criteria.maxPlaytime = parseInt(req.query.maxPlaytime, 10);
  }

  if (req.query.averageUserRating) {
    criteriaGte.averageUserRating = parseFloat(req.query.averageUserRating);
  }

  if (req.query.minAge)  {
    criteria.minAge = parseInt(req.query.minAge, 10);
  }

  if (req.query.price) {
    criteria.price =  parseFloat(req.query.price);
  }



  Game.find( criteria, { averageUserRating : { $lte: criteriaGte.averageUserRating } }).limit(10)
    .then(games =>  {
      res.render('search', { 
        title: 'BoardGamia games', 
        games, 
        search: req.query })
    })
    .catch(next)
});


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
