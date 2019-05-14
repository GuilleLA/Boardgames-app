const mongoose    = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/boardgamiadb';

mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true })
  .then( () => console.info(`Connected to ${MONGODB_URI} succesfully`) )
  .catch( error => console.error(`An error ocurred while connecting to ${MONGODB_URI}`, error) )