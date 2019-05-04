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
<<<<<<< HEAD

app.get('/search', function (req, res, next) {
  const Game = require('./models/game.model')
  const criteria = {};
  if (req.query.search) {
    const exp =  new RegExp(req.query.search, 'i');
    criteria.$or = [ { name: exp } ]
  }
  Game.find( criteria ).limit(8)
    .then(games =>  {
      res.render('search', { 
        title: 'BoardGamia games', 
        games, 
        search: req.query.search })
    })
    .catch(next)
});
//app.use('/search', searchRouter);

app.get('/search-filters', function (req, res, next) {
  const Game = require('./models/game.model')
  const criteria = {};
  console.log('QUERY: ', req.query)
  if (req.query.search) {
    const exp  =  new RegExp(req.query.search, 'i');
    const exp2 =  new RegExp(req.query.minPlayers, 'i');
    criteria.$or = [ { name: exp }, { minPlayers: exp2 } ]
  }
  Game.find( criteria ).limit(5)
    .then(games =>  {
      res.render('search', { 
        title: 'BoardGamia games', 
        games, 
        search: req.query })
    })
    .catch(next)
});

=======
>>>>>>> 8db2fafb4648d43ba2e2a5d59bdf23d9e41ac058
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/search', searchRouter)


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
