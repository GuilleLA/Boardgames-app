const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const secure = require('../middlewares/secure.mid')
 
/* GET home page. */

router.get('/:id', secure.isAuthenticated, gameController.details);

router.post('/:id', gameController.add)

router.post('/:id', gameController.wish)

module.exports = router;