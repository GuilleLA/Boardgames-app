const mongoose = require('mongoose');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim : true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim : true,
    match: EMAIL_PATTERN
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  age: {
    type: Number,
    min: 1,
  },
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  avatarURL: {
    type: String,
    default: `https://gravatar.com/avatar/${Math.floor(Math.random()*90000)}?s=400&d=robohash&r=x`
  },
  games: [{
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    },
    owned: Boolean,
    wished: Boolean,
    toChange: Boolean,
    rated: Boolean,
    created: Boolean,
  }],
  city: {
    type: String,
    lowercase: true,
  },
  chatRoom: String,
  network:[{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    follow: Boolean,
    Blocked: Boolean
  }]
}, { timestamps:true });

userSchema.pre('save', function(next){
  const user = this
  if(user.isModified('password')){
    bcrypt.genSalt(SALT_FACTOR)
    .then(salt => {
      return bcrypt.hash(user.password, salt)
        .then(hash => {
          user.password = hash
          next()
        })
    })
    .catch(next)
  }
  else{
    next()
  }
});

userSchema.methods.checkPassword = function(password){
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;