const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
 
/* GET home page. */

router.get('/:id', gameController.details);

module.exports = router;