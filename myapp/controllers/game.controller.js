const mongoose = require('mongoose');
const Game     = require('../models/game.model');
const User     = require('../models/user.model')

module.exports.details = (req, res, next) => {
  const id = req.params.id;
  
  Game.findById(id)
    .then( data => res.render('game/details', { title: data.name, data } ) )
    .catch( next )
};

module.exports.add = (req, res, next) => {
  const user = req.user;
  if(req.user.games.filter(item => item.game == req.params.id).length > 0){
    console.log('en el if')
    user.games = user.games.map( item => {
      if (item.game == req.params.id){
        item.owned = true;
        return item
      }
      else {
        console.log('en el else')
        return item
      }
    })
  }
  else {
    console.log('en el else')
    user.games.push({ game: req.params.id, owned: true});
  }
  user.save()
    .then(user => res.redirect('/'))
    .catch(next)
};

module.exports.wish = (req, res, next) => {
  const user = req.user; 
  if(req.user.games.filter(item => item.game == req.params.id).length > 0){
    console.log('en el if')
    user.games = user.games.map( item => {
      if (item.game == req.params.id){
        item.wished = true;
        return item
      }
      else {
        return item
      }
    })
  }
  else {
    console.log('en el else')
    user.games.push({ game: req.params.id, wished: true});
  }
  user.save()
    .then(user => res.redirect('/'))
    .catch(next)
};


