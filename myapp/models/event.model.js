const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  imageURL: {
    type: String,
    default: 'https://www.science-emergence.com/media/images/thumbnails_1000_1000/question-mark-img.JPEG'
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