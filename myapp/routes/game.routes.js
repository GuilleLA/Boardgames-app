const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const secure = require('../middlewares/secure.mid')
 
/* GET home page. */

router.get('/:id', secure.isAuthenticated, gameController.details);

router.post('/:id/add', gameController.add)
router.post('/:id/wish', gameController.wish)

module.exports = router;