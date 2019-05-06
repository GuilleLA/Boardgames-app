const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date, // DGG: Así o con un paquete npm???
    required: true,
    unique: true
  },
  participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }],
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
  },
  city: {
    type: String,
    lowercase: true,
  }
}, { timestamps:true });

commentSchema.index({game: 1}, { unique: true })

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;