const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  },
  participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }],
  maxParticipants: Number,
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps:true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;