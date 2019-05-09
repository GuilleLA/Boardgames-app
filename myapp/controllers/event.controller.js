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
  const id = req.params.id;
  Event.findById( id )
    .populate('participants')
    .populate('game')
    .populate('owner')
    .then(event =>  {
      res.render('events/detail', { 
        title: `BoardGamia ${event.name}`, 
        event
      })
    })
    .catch(next)
});

module.exports.create = ((req, res, next) => {
  const id = req.user.id;
  User.findById(id)
    .populate('games.game')
    .populate('network.user')
    .then(user => {      
      res.render('events/form', {
        title: 'Create Event',
        user
      })
    })
    .catch(next)
});

module.exports.doCreate = (req, res, next) => {
  const newEvent = req.body
  newEvent.owner = req.user.id
  newEvent.location = {
    type: "Point",
    coordinates: [req.body.longitude, req.body.latitude]
  }

  const event = new Event(newEvent);

  if (req.file) {
    event.imageURL = req.file.secure_url;
  }

  event.save()
    .then( event => res.redirect('/') )
    //.then( event => res.redirect(`/events/${event.id}`) )
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) { 
        res.render(`events/create`, { 
          event: req.body,
          errors: error.errors
        })}
      else { next(error); }
    })  
};

module.exports.coordinates = ((req, res, next) => {
  const id = req.params.id

  Event.findById(id)
    .then(event => res.json(event.location))
    .catch(next)
})