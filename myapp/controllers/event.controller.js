const mongoose = require('mongoose');
const Game     = require('../models/game.model');
const User     = require('../models/user.model');
const Event    = require('../models/event.model');

module.exports.list = ((req, res, next) => {
  const user = req.user
  Event.find( ).limit(50)
    .then(events =>  {
      res.render('events/list', { 
        title: 'BoardGamia events', 
        events 
      })
    })
    .catch(next)
});

module.exports.detail = ((req, res, next) => {
  const id = req.param.id;
  Event.findById( id )
    .then(event =>  {
      res.render('events/detail', { 
        title: `BoardGamia ${event.name}`, 
        event
      })
    })
    .catch(next)
});

module.exports.create = ((req, res, next) => {

});

module.exports.doCreate = ((req, res, next) => {
  
});