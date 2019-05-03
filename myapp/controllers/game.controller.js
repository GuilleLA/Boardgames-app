const mongoose = require('mongoose');
const Game     = require('../models/game.model');
const User     = require('../models/user.model');

module.exports.details = (req, res, next) => {
  const id = req.params.id;
  
  Game.findById(id)
    .then( game => res.render('game/details', { title: game.name, game } ) )
    .catch( next )
};

module.exports.update = (req, res, next) => {
  const id = req.params.id

  Game.findById(id)
    .then( game => res.render('game/form', { title: `${game.name} update`, game } ) )
    .catch( next )
}

module.exports.doUpdate = (req, res, next) => {
  const id = req.params.id
  console.log(req.body)

  function renderWithErrors(errors) {
    res.render('game/form', { 
      game: req.body,
      errors: errors,
      title: 'Update game'})
  }

  Game.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then(game => {
      if (game) {
        res.redirect(`/games/${game.id}`)
      } else {
        next(createError(404, 'user not found'))
      } 
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) { 
        renderWithErrors(error.errors)
      }
      else {
        next(error);
      }
    })
}

module.exports.addGame = (req, res, next) => {
  res.render('game/create')
}

module.exports.add = (req, res, next) => {
  const user = req.user;
  if(req.user.games.filter(item => item.game == req.params.id).length > 0){
    user.games = user.games.map( item => {
      if (item.game == req.params.id){
        item.owned = true;
        item.wished = false;
        return item
      }
      else {
        return item
      }
    })
  }
  else {
    user.games.push({ game: req.params.id, owned: true});
  }
  user.save()
    .then(user => res.redirect(`/users/${user.id}`))
    .catch(next)
};

module.exports.wish = (req, res, next) => {
  const user = req.user; 
  if(req.user.games.filter(item => item.game == req.params.id).length > 0){
    user.games = user.games.map( item => {
      if (item.game == req.params.id){
        item.wished = true;
        item.owned = false;
        return item
      }
      else {
        return item
      }
    })
  }
  else {
    user.games.push({ game: req.params.id, wished: true});
  }
  user.save()
    .then(user => res.redirect(`/users/${user.id}`))
    .catch(next)
};

module.exports.change = (req, res, next) => {
  const user = req.user; 
  if(req.user.games.filter(item => item.game == req.params.id).length > 0){
    user.games = user.games.map( item => {
      if (item.game == req.params.id){
        item.toChange = true;
        return item
      }
      else {
        return item
      }
    })
  }
  else {
    user.games.push({ game: req.params.id, toChange: true});
  }
  user.save()
    .then(user => res.redirect(`/users/${user.id}`))
    .catch(next)
};

module.exports.removeOwned = (req, res, next) => {
  const user = req.user;
  const newUserGames = []
  user.games.forEach( item => {
    if (item.game == req.params.id){
      item.owned = false;
      if(item.owned === false && item.wished === false && item.toChange === false && item.rated === false && item.created === false){
        
      }
      else {
        newUserGames.push(item)
      }
    }
    else {
      newUserGames.push(item)
    }
  })
  user.games = newUserGames
  user.save()
    .then(user => res.redirect(`/users/${user.id}`))
    .catch(next)
}
module.exports.removeWish = (req, res, next) => {
  const user = req.user;
  const newUserGames = []
  user.games.forEach( item => {
    if (item.game == req.params.id){
      item.wished = false;
      if(item.owned === false && item.wished === false && item.toChange === false && item.rated === false && item.created === false){
        
      }
      else {
        newUserGames.push(item)
      }
    }
    else {
      newUserGames.push(item)
    }
  })
  user.games = newUserGames
  user.save()
    .then(user => res.redirect(`/users/${user.id}`))
    .catch(next)
}
module.exports.removeChange = (req, res, next) => {
  const user = req.user;
  const newUserGames = []
  user.games.forEach( item => {
    if (item.game == req.params.id){
      item.toChange = false;
      if(item.owned === false && item.wished === false && item.toChange === false && item.rated === false && item.created === false){
        
      }
      else {
        newUserGames.push(item)
      }
    }
    else {
      newUserGames.push(item)
    }
  })
  user.games = newUserGames
  user.save()
    .then(user => res.redirect(`/users/${user.id}`))
    .catch(next)
}


