const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const secure = require('../middlewares/secure.mid')
 
/* GET home page. */

router.get('/:id', secure.isAuthenticated, gameController.details);

module.exports = router;